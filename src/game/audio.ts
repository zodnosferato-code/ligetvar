import { SCENES } from "./content/catalog.ts";
import type { GameState, LocationId } from "./engine/types.ts";

export type MoodId =
  | "classroom_calm"
  | "holdkor_night"
  | "library_quiet"
  | "office_morning"
  | "apartment_evening"
  | "bekas_to_dark"
  | "tension_low"
  | "ending_true";

const FILE: Record<MoodId, string> = {
  classroom_calm: pub("music/classroom_calm.mp3?v=3"),
  holdkor_night: pub("music/holdkor_night.mp3?v=3"),
  library_quiet: pub("music/library_quiet.mp3?v=3"),
  office_morning: pub("music/office_morning.mp3?v=3"),
  apartment_evening: pub("music/apartment_evening.mp3?v=3"),
  bekas_to_dark: pub("music/bekas_to_dark.mp3?v=3"),
  tension_low: pub("music/tension_low.mp3?v=3"),
  ending_true: pub("music/ending_true.mp3?v=3"),
};

function pub(file: string) {
  const env = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env;
  const base = env?.BASE_URL ?? "/";
  return `${base}${file}`;
}

const LEVEL: Record<MoodId, number> = {
  classroom_calm: 0.7,
  holdkor_night: 0.75,
  library_quiet: 1,
  office_morning: 0.8,
  apartment_evening: 0.9,
  bekas_to_dark: 0.5,
  tension_low: 0.35,
  ending_true: 0.8,
};

const PLACE: Partial<Record<LocationId, MoodId>> = {
  classroom: "classroom_calm",
  holdkor: "holdkor_night",
  library: "library_quiet",
  department: "office_morning",
  apartment: "apartment_evening",
  bekas: "bekas_to_dark",
  courtyard: "classroom_calm",
  chamber: "tension_low",
};

const MUTE_KEY = "ligetvar-mute";

let ctx: AudioContext | null = null;
let musicGain: GainNode | null = null;
let current: { mood: MoodId; source: AudioBufferSourceNode; gain: GainNode } | null = null;
const buffers = new Map<MoodId, AudioBuffer>();
const loading = new Map<MoodId, Promise<AudioBuffer>>();
let wanted: MoodId | null = null;
let muted = false;
let unlocked = false;
let listening = false;

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function ensure() {
  if (ctx && musicGain) return;
  muted = readMuted();
  ctx = new AudioContext();
  const warmth = ctx.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = 7200;
  warmth.Q.value = 0.4;
  musicGain = ctx.createGain();
  musicGain.gain.value = muted ? 0 : 0.28;
  musicGain.connect(warmth);
  warmth.connect(ctx.destination);
  if (!listening) {
    listening = true;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && ctx?.state === "suspended") void ctx.resume();
    });
  }
}

export function unlockAudio() {
  try {
    ensure();
    if (ctx && ctx.state === "suspended") void ctx.resume().catch(() => undefined);
    unlocked = true;
    if (wanted) void play(wanted).catch(() => undefined);
  } catch (error) {
    unlocked = false;
    throw error;
  }
}

export function setMood(mood: MoodId) {
  wanted = mood;
  if (unlocked) void play(mood).catch(() => undefined);
}

export function toggleMute() {
  try {
    ensure();
  } catch {
    return muted;
  }
  muted = !muted;
  const now = ctx!.currentTime;
  musicGain!.gain.setTargetAtTime(muted ? 0 : 0.28, now, 0.05);
  try {
    localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (ctx!.state === "suspended") void ctx!.resume();
  unlocked = true;
  if (wanted) void play(wanted).catch(() => undefined);
  return muted;
}

async function load(mood: MoodId) {
  const cached = buffers.get(mood);
  if (cached) return cached;
  let job = loading.get(mood);
  if (!job) {
    job = fetch(FILE[mood])
      .then((response) => {
        if (!response.ok) throw new Error(FILE[mood]);
        return response.arrayBuffer();
      })
      .then((bytes) => ctx!.decodeAudioData(bytes))
      .then((buffer) => {
        buffers.set(mood, buffer);
        return buffer;
      });
    loading.set(mood, job);
  }
  return job;
}

async function play(mood: MoodId) {
  if (!ctx || !musicGain || !unlocked) return;
  if (current?.mood === mood) return;
  const buffer = await load(mood);
  if (wanted !== mood || !ctx || !musicGain) return;
  const now = ctx.currentTime;
  if (current) {
    const previous = current;
    previous.gain.gain.setTargetAtTime(0, now, 0.35);
    previous.source.stop(now + 2.2);
    current = null;
  }
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.setTargetAtTime(LEVEL[mood], now, 0.45);
  gain.connect(musicGain);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gain);
  source.start();
  current = { mood, source, gain };
}

export function moodFor(state: GameState): MoodId {
  if (state.phase === 'ending') return state.confrontation === 'supported' ? 'ending_true' : 'apartment_evening';
  if (state.week >= 14 && state.week <= 15) return 'tension_low';
  const place = state.scene ? PLACE[SCENES[state.scene.id]?.location] : undefined;
  if (place) return place;
  return state.slot === 0 ? 'office_morning' : state.slot === 1 ? 'library_quiet' : 'apartment_evening';
}
