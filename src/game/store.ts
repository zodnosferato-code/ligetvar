import { create } from "zustand";
import { GIFTS } from "./content/catalog.ts";
import {
  applyChoice,
  buyGift,
  chooseAction,
  commitRoute,
  createInitial,
  giveGift,
  inviteGirl,
  nextWeek,
  resolveJob,
  speakHonest,
  type StageId,
} from "./engine/logic.ts";
import { SAVE_KEY, type GameState, type GirlId, type RouteId } from "./engine/types.ts";

interface GameStore {
  mode: "title" | "play";
  state: GameState;
  hasSave: boolean;
  boot: () => void;
  start: (name: string, stage?: StageId, route?: RouteId) => void;
  resume: () => void;
  toTitle: () => void;
  act: (id: string) => void;
  pick: (id: string) => void;
  open: (phase: GameState["phase"]) => void;
  backToPlanner: () => void;
  call: (girl: GirlId) => void;
  honest: (girl: GirlId) => void;
  buy: (id: string) => void;
  gift: (id: string) => void;
  finishJob: (kind: "mohu" | "brick", pay: number) => void;
  cancelJob: () => void;
  advanceWeek: () => void;
  lockRoute: (route: RouteId, told: boolean) => void;
  showGirl: (girl: GirlId) => void;
}

function persist(state: GameState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

function readSave(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.version !== 1 || !parsed.girls?.rebeka) return null;
    return parsed;
  } catch {
    return null;
  }
}

export const useGame = create<GameStore>((set, get) => ({
  mode: "title",
  state: createInitial("Márton Kelényi"),
  hasSave: false,
  boot: () => set({ hasSave: !!readSave() }),
  start: (name, stage, route) => {
    const state = createInitial(name, stage ?? 1, route ?? "boglarka");
    persist(state);
    set({ mode: "play", state, hasSave: true });
  },
  resume: () => {
    const state = readSave();
    if (!state) {
      get().start(get().state.name);
      return;
    }
    set({ mode: "play", state, hasSave: true });
  },
  toTitle: () => set({ mode: "title" }),
  act: (id) => {
    const state = chooseAction(get().state, id);
    persist(state);
    set({ state });
  },
  pick: (id) => {
    const state = applyChoice(get().state, id);
    persist(state);
    set({ state });
  },
  open: (phase) => set({ state: { ...get().state, phase } }),
  backToPlanner: () => {
    const state = { ...get().state, phase: "planner" as const, dossier: null, minigame: null };
    persist(state);
    set({ state });
  },
  call: (girl) => {
    const state = inviteGirl(get().state, girl);
    persist(state);
    set({ state });
  },
  honest: (girl) => {
    const state = speakHonest(get().state, girl);
    persist(state);
    set({ state });
  },
  buy: (id) => {
    const gift = GIFTS.find((g) => g.id === id);
    if (!gift) return;
    const state = buyGift(get().state, id, gift.price);
    persist(state);
    set({ state });
  },
  gift: (id) => {
    const state = giveGift(get().state, id);
    persist(state);
    set({ state });
  },
  finishJob: (kind, pay) => {
    const state = resolveJob(get().state, kind, pay);
    persist(state);
    set({ state });
  },
  cancelJob: () => {
    const state = { ...get().state, phase: "planner" as const, minigame: null };
    persist(state);
    set({ state });
  },
  advanceWeek: () => {
    const state = nextWeek(get().state);
    persist(state);
    set({ state });
  },
  lockRoute: (route, told) => {
    const state = commitRoute(get().state, route, told);
    persist(state);
    set({ state });
  },
  showGirl: (girl) => set({ state: { ...get().state, phase: "dossier", dossier: girl } }),
}));
