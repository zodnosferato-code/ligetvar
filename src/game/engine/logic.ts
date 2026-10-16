import {
  ACTIONS,
  GIRL_NAME,
  NODES,
  REQUIRED_FLAGS,
  STORY,
  jobNode,
  physioNode,
  rumorNode,
} from "../content/catalog.ts";
import {
  GIRLS,
  type ActionDef,
  type Choice,
  type DialogueNode,
  type Effect,
  type GameState,
  type GirlId,
  type GirlPhase,
  type LocationId,
  type RouteId,
  emptyGirl,
  takeSnap,
} from "./types.ts";

const HOST: Partial<Record<LocationId, GirlId>> = {
  department: "greta",
  library: "boglarka",
  holdkor: "rebeka",
};

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function createInitial(name: string): GameState {
  const girls = {
    rebeka: emptyGirl(),
    boglarka: emptyGirl(),
    greta: emptyGirl(),
  };
  const state: GameState = {
    version: 1,
    name: name.trim() || "Márton Kelényi",
    week: 1,
    slot: 0,
    phase: "planner",
    money: 45_000 + 60_000,
    energy: 78,
    presence: 1,
    insight: 1,
    calm: 1,
    risk: 0,
    girls,
    flags: [],
    route: "none",
    inventory: {},
    talkCounts: { rebeka: 0, boglarka: 0, greta: 0 },
    giftsWeek: { rebeka: 0, boglarka: 0, greta: 0 },
    seen: [],
    journal: ["Hétfő. A fizetés megjött, a műhely még üres."],
    invite: null,
    scene: null,
    minigame: null,
    doingPhysio: false,
    rolled: false,
    giftMeeting: false,
    lastNote: "Kezdőtőke 45 000 Ft, heti fizetés 60 000 Ft.",
    mohuWeek: 0,
    brickWeek: 0,
    bekasThisWeek: false,
    riskSoothed: false,
    snap: { money: 0, risk: 0, closeness: { rebeka: 0, boglarka: 0, greta: 0 }, trust: { rebeka: 0, boglarka: 0, greta: 0 } },
    dossier: null,
  };
  state.snap = takeSnap(state);
  return state;
}

function addFlag(list: string[], flag: string) {
  if (!list.includes(flag)) list.push(flag);
}

export function applyEffect(state: GameState, girl: GirlId | null, effect: Effect): GameState {
  const next: GameState = structuredClone(state);
  if (girl) {
    const g = next.girls[girl];
    if (effect.closeness) g.closeness = clamp(g.closeness + effect.closeness, 0, 100);
    if (effect.trust) g.trust = clamp(g.trust + effect.trust, 0, 5);
    if (effect.anger) g.anger = clamp(g.anger + effect.anger, 0, 5);
    for (const f of effect.flags ?? []) addFlag(g.flags, f);
  }
  if (effect.risk) next.risk = clamp(next.risk + effect.risk, 0, 100);
  if (effect.presence) next.presence = clamp(next.presence + effect.presence, 0, 10);
  if (effect.insight) next.insight = clamp(next.insight + effect.insight, 0, 10);
  if (effect.calm) next.calm = clamp(next.calm + effect.calm, 0, 10);
  if (effect.money) next.money = Math.max(0, next.money + effect.money);
  if (effect.energy) next.energy = clamp(next.energy + effect.energy, 0, 100);
  for (const f of effect.world ?? []) addFlag(next.flags, f);
  if (effect.soothe && !next.riskSoothed) {
    next.risk = clamp(next.risk - 4, 0, 100);
    next.riskSoothed = true;
  }
  return next;
}

export function scaleRepeat(effect: Effect, nth: number): Effect {
  const next = { ...effect, flags: effect.flags ? [...effect.flags] : undefined, world: effect.world ? [...effect.world] : undefined };
  if (nth >= 2) {
    if ((next.closeness ?? 0) > 0) next.closeness = 0;
    next.trust = 0;
  } else if (nth === 1) {
    if ((next.closeness ?? 0) > 0) next.closeness = Math.floor((next.closeness ?? 0) / 2);
    next.trust = 0;
  } else {
    next.trust = 0;
  }
  return next;
}

export function girlOnRoute(route: RouteId, girl: GirlId): boolean {
  if (route === girl) return true;
  if (route === "boglarka_greta" && (girl === "boglarka" || girl === "greta")) return true;
  if (route === "rebeka_greta" && (girl === "rebeka" || girl === "greta")) return true;
  return false;
}

export function offRoute(state: GameState, girl: GirlId): boolean {
  if (state.week < 9) return false;
  if (state.route === "none" || state.route === "alone") return false;
  return !girlOnRoute(state.route, girl);
}

export function girlPhase(state: GameState, girl: GirlId): GirlPhase {
  const s = state.girls[girl];
  if (s.anger >= 4 || state.risk >= 80) return "broken";
  if (s.flags.includes("flag_desire_fulfill")) return "fulfilled";
  if (state.week >= 9 && girlOnRoute(state.route, girl)) return "route_locked";
  if (state.week >= 7 && s.trust >= 2 && s.closeness >= 30) return "route_candidate";
  if (s.flags.some((f) => f.includes("kiss_light"))) return "intimate_early";
  if (s.trust >= 2 || s.flags.includes("rebeka_foto") || s.flags.includes("boglarka_margo") || s.flags.includes("greta_lista")) {
    return "private";
  }
  if (s.closeness >= 10 || s.flags.includes("rebeka_kor") || s.flags.includes("boglarka_margo") || s.flags.includes("greta_lista")) {
    return "warming";
  }
  if (s.closeness > 0 || s.trust > 0) return "introduced";
  return "unknown";
}

export const PHASE_LABEL: Record<GirlPhase, string> = {
  unknown: "ismeretlen",
  introduced: "bemutatkozott",
  warming: "melegszik",
  private: "magán",
  intimate_early: "közeli",
  route_candidate: "jelölt",
  route_locked: "útvonal",
  broken: "törés",
  fulfilled: "beteljesült",
};

export function isCandidate(state: GameState, girl: GirlId): boolean {
  const s = state.girls[girl];
  return s.closeness >= 30 && s.trust >= 2 && s.anger < 4 && state.risk < 80;
}

export function choiceAvailable(state: GameState, choice: Choice, girl: GirlId | null): boolean {
  const r = choice.requires;
  if (!r) return true;
  if (r.insight && state.insight < r.insight) return false;
  if (r.calm && state.calm < r.calm) return false;
  if (r.presence && state.presence < r.presence) return false;
  if (r.trust && (!girl || state.girls[girl].trust < r.trust)) return false;
  return true;
}

export function choiceLockReason(choice: Choice): string | null {
  const r = choice.requires;
  if (!r) return null;
  if (r.insight) return `Ehhez éleslátás ${r.insight} kell.`;
  if (r.calm) return `Ehhez nyugalom ${r.calm} kell.`;
  if (r.presence) return `Ehhez jelenlét ${r.presence} kell.`;
  if (r.trust) return `Ehhez bizalom ${r.trust} kell.`;
  return null;
}

function targetOf(node: DialogueNode, invite: GirlId | null): GirlId | null {
  if (node.speaker !== "narrator") return node.speaker;
  if (node.id === "bekas") return invite;
  return null;
}

export function describeDelta(before: GameState, after: GameState, girl: GirlId | null, reaction: string): string {
  const bits: string[] = [];
  const push = (label: string, d: number, suffix = "") => {
    if (!d) return;
    bits.push(`${label} ${d > 0 ? "+" : ""}${d}${suffix}`);
  };
  if (girl) {
    push("közelség", after.girls[girl].closeness - before.girls[girl].closeness);
    push("bizalom", after.girls[girl].trust - before.girls[girl].trust);
    push("harag", after.girls[girl].anger - before.girls[girl].anger);
  }
  push("kockázat", after.risk - before.risk);
  push("jelenlét", after.presence - before.presence);
  push("éleslátás", after.insight - before.insight);
  push("nyugalom", after.calm - before.calm);
  push("energia", after.energy - before.energy);
  const money = after.money - before.money;
  if (money) bits.push(`${money > 0 ? "+" : ""}${money.toLocaleString("hu-HU")} Ft`);
  const who = girl ? GIRL_NAME[girl].split(" ")[0] : "Jegyzet";
  const body = bits.length ? bits.join(", ") : "a számok nem mozdultak";
  return `${who}: ${reaction}. ${body}.`;
}

function fatigue(effect: Effect, energy: number): Effect {
  if (energy >= 20) return effect;
  if ((effect.closeness ?? 0) > 0) return { ...effect, closeness: (effect.closeness ?? 0) - 1 };
  return effect;
}

function bestStory(state: GameState, girl: GirlId, location: LocationId): (typeof STORY)[number] | null {
  const list = STORY.filter((e) => {
    if (e.girl !== girl || state.seen.includes(e.id)) return false;
    if (!e.locations.includes(location)) return false;
    if ((e.minWeek ?? 1) > state.week) return false;
    if (e.maxWeek && state.week > e.maxWeek) return false;
    if ((e.minTrust ?? 0) > state.girls[girl].trust) return false;
    if ((e.minClose ?? 0) > state.girls[girl].closeness) return false;
    if (e.part === 2 && !girlOnRoute(state.route, girl)) return false;
    if (e.part === 1 && state.week >= 9) return false;
    return true;
  });
  if (!list.length) return null;
  const urgent = list.filter((e) => e.maxWeek === state.week);
  const pool = urgent.length ? urgent : list;
  pool.sort((a, b) => (urgent.length ? b.priority - a.priority : a.priority - b.priority));
  return pool[0] ?? null;
}

export function openGirlTalk(state: GameState, girl: GirlId, location: LocationId): DialogueNode {
  if (state.girls[girl].anger >= 4) return NODES[`${girl}_refuse`] ?? NODES.empty!;
  if (offRoute(state, girl)) return NODES[`${girl}_cold`] ?? NODES.empty!;
  const story = bestStory(state, girl, location);
  if (story) return NODES[story.node]!;
  const n = state.talkCounts[girl] % 2;
  return NODES[`${girl}_repeat_${n}`] ?? NODES.empty!;
}

function advance(state: GameState): GameState {
  const next = structuredClone(state);
  next.scene = null;
  next.giftMeeting = false;
  next.minigame = null;
  if (next.doingPhysio) {
    next.doingPhysio = false;
    next.rolled = false;
    if (next.week === 8 && next.route === "none") next.phase = "route";
    else if (next.week >= 16) next.phase = "ending";
    else next.phase = "summary";
    return next;
  }
  if (next.slot < 2) {
    next.slot = (next.slot + 1) as 0 | 1 | 2;
    next.phase = "planner";
    next.rolled = false;
    return next;
  }
  next.doingPhysio = true;
  next.rolled = true;
  const present = GIRLS.filter((g) => next.girls[g].anger < 4).map((id) => ({
    id,
    label: GIRL_NAME[id],
  }));
  next.phase = "scene";
  next.scene = { node: physioNode(present), location: "classroom", source: "physio" };
  return next;
}

function rumorGate(state: GameState): boolean {
  if (state.rolled || state.doingPhysio) return false;
  if (state.week < 2 && state.risk < 8) return false;
  const heat = GIRLS.some((g) => state.girls[g].closeness >= 20);
  if (!heat) return false;
  const n = (state.week * 13 + state.slot * 7 + (state.money % 97) + state.seen.length) % 10;
  return n < 3;
}

function maybeRumor(state: GameState): GameState | null {
  if (!rumorGate(state)) return null;
  const node = rumorNode();
  return {
    ...state,
    rolled: true,
    phase: "scene",
    scene: { node, location: "department", source: "story" },
  };
}

export function finishScene(state: GameState): GameState {
  const rumor = maybeRumor(state);
  if (rumor) return rumor;
  return advance(state);
}

export function applyChoice(state: GameState, choiceId: string): GameState {
  const scene = state.scene;
  if (!scene) return state;
  const choice = scene.node.choices.find((c) => c.id === choiceId);
  if (!choice) return state;
  const girl = choice.follow ?? targetOf(scene.node, state.invite);
  if (!choiceAvailable(state, choice, scene.node.speaker === "narrator" ? null : scene.node.speaker)) return state;

  let effect: Effect = { ...choice.effect, flags: choice.effect.flags ? [...choice.effect.flags] : undefined };
  const speaker = scene.node.speaker === "narrator" ? null : scene.node.speaker;
  const nth = speaker ? state.talkCounts[speaker] : 0;
  if (scene.node.kind === "repeat" && speaker) effect = scaleRepeat(effect, nth);
  effect = fatigue(effect, state.energy);
  const continued = scene.source === "follow";
  const cost = scene.node.cost ?? (continued || scene.node.speaker === "narrator" ? 0 : 8);
  effect.energy = (effect.energy ?? 0) - cost;

  const target = speaker ?? (scene.node.id === "bekas" ? state.invite : null);
  let next = applyEffect(state, target, effect);
  if (scene.node.kind === "repeat" && speaker) next.talkCounts[speaker] += 1;
  if (scene.node.kind === "story" && !next.seen.includes(scene.node.id)) {
    next.seen.push(scene.node.id);
    if (scene.node.journal) next.journal.push(`${next.week}. hét — ${scene.node.journal}`);
  }
  const tired = state.energy < 20 && scene.node.speaker !== "narrator" ? " Fáradt vagy." : "";
  const capped = scene.node.kind === "repeat" && speaker && nth >= 2 ? " Fáradt sor, a szám már nem nő." : "";
  if (scene.node.id === "bekas") next.invite = null;
  next.lastNote = describeDelta(state, next, target, choice.reaction) + tired + capped;

  if (choice.followNode) {
    const node = NODES[choice.followNode];
    if (node) {
      next.scene = { node, location: scene.location, source: "follow", expression: choice.reaction };
      next.phase = "scene";
      return next;
    }
  }
  if (choice.follow) {
    const node = openGirlTalk(next, choice.follow, "classroom");
    next.scene = { node, location: "classroom", source: node.kind === "story" ? "story" : "repeat" };
    next.phase = "scene";
    next.doingPhysio = true;
    return next;
  }
  return finishScene(next);
}

export function actionStatus(state: GameState, action: ActionDef): { ok: boolean; reason: string } {
  if (state.phase !== "planner") return { ok: false, reason: "Most nem választhatsz sávot." };
  const slotName = (["morning", "afternoon", "evening"] as const)[state.slot]!;
  if (!action.slots.includes(slotName)) return { ok: false, reason: "Más napszak." };
  if (action.once && action.node && state.seen.includes(action.node)) return { ok: false, reason: "Ez a randi már megvolt." };
  if (action.kind === "date" && action.id === "bekas") {
    if (state.week < 9 || state.route === "none" || state.route === "alone") return { ok: false, reason: "A tó a zárt útvonalon nyílik." };
    if (state.bekasThisWeek) return { ok: false, reason: "A héten már kint voltál." };
    const girls = GIRLS.filter((g) => girlOnRoute(state.route, g));
    const ready = girls.some((g) => state.girls[g].trust >= 3 && state.girls[g].closeness >= 45 && state.girls[g].anger < 4);
    if (!ready) return { ok: false, reason: "Még korai. Bizalom 3 és közelség 45 kell." };
  }
  if (action.kind === "date" && action.girl) {
    if (state.week < 9) return { ok: false, reason: "Randi a 9. héttől." };
    if (!girlOnRoute(state.route, action.girl)) return { ok: false, reason: "Ő nincs az útvonalon." };
    const g = state.girls[action.girl];
    if (g.anger >= 4) return { ok: false, reason: "Most nem jön veled." };
    if (g.trust < 3 || g.closeness < 45) return { ok: false, reason: "Ehhez bizalom 3 és közelség 45 kell." };
    if ((action.cost ?? 0) > state.money) return { ok: false, reason: "Nincs meg rá a pénz." };
  }
  if (action.id === "apartment") {
    if (!state.invite) return { ok: false, reason: "Előbb hívd meg valakit." };
    if (state.girls[state.invite].anger >= 4) return { ok: false, reason: "A meghívást visszavonta." };
  }
  if (action.girl && action.kind === "visit") {
    if (state.girls[action.girl].anger >= 4) return { ok: false, reason: "Nem akar ajtót nyitni." };
  }
  if (state.energy < 8 && action.kind !== "stat") return { ok: true, reason: "Fáradt vagy: a beszélgetés kevesebbet ér." };
  return { ok: true, reason: action.detail };
}

export function chooseAction(state: GameState, actionId: string): GameState {
  const action = ACTIONS.find((a) => a.id === actionId);
  if (!action) return state;
  const status = actionStatus(state, action);
  if (!status.ok) return { ...state, lastNote: status.reason };
  if (action.kind === "minigame") {
    const id = action.id.startsWith("mohu") ? "mohu" : "brick";
    return { ...state, phase: "minigame", minigame: id, lastNote: "" };
  }
  let next = structuredClone(state);
  if (action.kind === "date") {
    const routed = GIRLS.filter((g) => girlOnRoute(next.route, g) && next.girls[g].anger < 4);
    const focus = action.girl ?? routed[next.week % Math.max(1, routed.length)] ?? null;
    next = applyEffect(next, focus, { money: -(action.cost ?? 0), risk: action.risk ?? 0 });
    if (action.id === "bekas") {
      next.bekasThisWeek = true;
      next.invite = focus;
    }
    next.lastNote = describeDelta(state, next, null, "a sáv pénzbe és kockázatba került");
  }
  if (action.id === "proof" && next.invite) {
    const stoodUp = next.invite;
    next = applyEffect(next, stoodUp, { trust: -1 });
    next.journal.push(`${next.week}. hét — ${GIRL_NAME[stoodUp].split(" ")[0]} hiába várt este.`);
    next.invite = null;
    next.lastNote = `${GIRL_NAME[stoodUp].split(" ")[0]} bizalma csökkent: otthagytad a megbeszélt estét.`;
  }
  let node: DialogueNode;
  let source = "ambient";
  if (action.kind === "visit" && action.location === "apartment" && next.invite) {
    node = openGirlTalk(next, next.invite, "apartment");
    source = node.kind;
    next.invite = null;
  } else if (action.kind === "visit" && action.girl) {
    node = openGirlTalk(next, action.girl, action.location);
    source = node.kind;
  } else if (action.node && NODES[action.node]) {
    node = NODES[action.node]!;
    source = node.kind;
  } else {
    node = NODES.empty!;
  }
  if (action.id === "proof" && state.invite) {
    node = {
      ...node,
      text: `${node.text} ${GIRL_NAME[state.invite].split(" ")[0]} ma este várt. A korrektúra helyett otthagyod.`,
    };
  }
  next.phase = "scene";
  next.scene = { node, location: action.location, source };
  next.giftMeeting = false;
  if (action.kind !== "date" && action.id !== "proof") next.lastNote = "";
  return next;
}

export function visibleActions(state: GameState): { action: ActionDef; ok: boolean; reason: string }[] {
  const slotName = (["morning", "afternoon", "evening"] as const)[state.slot]!;
  return ACTIONS.filter((a) => a.slots.includes(slotName)).map((action) => {
    const status = actionStatus(state, action);
    return { action, ...status };
  });
}

export function inviteGirl(state: GameState, girl: GirlId): GameState {
  if (state.phase !== "planner" && state.phase !== "phone") return state;
  if (state.girls[girl].anger >= 3) {
    return { ...state, lastNote: `${GIRL_NAME[girl].split(" ")[0]} nem veszi fel. A hangnem még rossz.` };
  }
  if (state.girls[girl].trust < 2) {
    return { ...state, lastNote: "A lakásra még korai. Előbb a saját helyén beszélj vele." };
  }
  if (offRoute(state, girl)) {
    return { ...state, lastNote: "Az útvonal zárva. Ő már nem jön fel." };
  }
  return {
    ...state,
    invite: girl,
    phase: "planner",
    lastNote: `${GIRL_NAME[girl].split(" ")[0]} este feljön, ha a lakást választod. A korrektúra ezt elrontja.`,
  };
}

export function speakHonest(state: GameState, girl: GirlId): GameState {
  if (state.girls[girl].closeness < 18) {
    return { ...state, lastNote: "Erre még nincs alap. Előbb legyen közelség." };
  }
  const flag = `honest_${girl}`;
  if (state.flags.includes(flag)) return { ...state, lastNote: "Ezt már kimondtad neki." };
  const next = applyEffect(state, girl, { closeness: 1, world: [flag] });
  next.journal.push(`${next.week}. hét — ${GIRL_NAME[girl].split(" ")[0]} tudja, hogy nem csak őt keresed.`);
  next.lastNote = `${GIRL_NAME[girl].split(" ")[0]} meghallgatta. Nem örül, de nem hazudtál.`;
  next.phase = "planner";
  return next;
}

export function buyGift(state: GameState, giftId: string, price: number): GameState {
  if (state.money < price) return { ...state, lastNote: "A Polc nem hitelez." };
  const next = structuredClone(state);
  next.money -= price;
  next.inventory[giftId] = (next.inventory[giftId] ?? 0) + 1;
  next.lastNote = "A csomag reggel a tanszéki postán lesz. Átadni csak személyesen lehet.";
  return next;
}

export function giftResolution(state: GameState, girl: GirlId, giftId: string): { effect: Effect; line: string } {
  const second = state.giftsWeek[girl] >= 1;
  const g = state.girls[girl];
  const polite = (effect: Effect, line: string) => {
    if (!second) return { effect, line };
    return {
      effect: { closeness: Math.max(0, Math.min(1, effect.closeness ?? 0)) },
      line: `${line} A második ajándék a héten már csak egy udvarias mondat.`,
    };
  };
  if (giftId === "pen" && girl === "rebeka" && g.flags.includes("rebeka_kor")) {
    return polite({ closeness: 6, trust: 1 }, "Rebeka végighúzza a tollat a papíron. Nem köszöni túl.");
  }
  if (giftId === "pen" && girl === "rebeka") return polite({ closeness: 3 }, "Rebeka megnézi a tollat. „Még nem ismered a körömet.”");
  if (giftId === "pen" && girl === "boglarka") return { effect: { closeness: 0 }, line: "Boglárka nem érti, mire való. Visszaadja." };
  if (giftId === "photo" && girl === "rebeka") return polite({ closeness: 4 }, "Az üres füzet pontosabb, mint egy dicséret. Beteszi a táskába.");
  if (giftId === "flowers" && girl === "rebeka") return { effect: { closeness: -2, anger: 1 }, line: "Rebeka a virágot a padra teszi. „Lusta gesztus.”" };
  if (giftId === "flowers" && girl === "greta") return { effect: {}, line: "Gréta kimondja: nem a tárgy a lényeg. A csokor a folyosón marad." };
  if (giftId === "flowers" && girl === "boglarka") {
    return g.trust >= 2
      ? polite({ closeness: 2 }, "Boglárka a szándékot nézi, nem a virágot.")
      : { effect: {}, line: "Boglárka megköszöni, és nem tud mit kezdeni vele." };
  }
  if (giftId === "novel" && girl === "boglarka") {
    const trust = state.insight >= 3 && !second ? 1 : 0;
    return polite({ closeness: 6, trust }, "A margó üres. Nem olvasod fel helyette a fülszöveget.");
  }
  if (giftId === "novel" && girl === "rebeka") return { effect: {}, line: "Rebeka belelapoz, és unja. Visszaadja." };
  if (giftId === "tea" && girl === "boglarka") return polite({ closeness: 3 }, "A tea a könyv mellé kerül. A könyvjelző a fejezetnél marad.");
  if (giftId === "notes" && girl === "greta") return polite({ closeness: 5 }, "Gréta megszámolja a lapokat. Elég sűrű. Ez tetszik neki.");
  if (giftId === "article" && girl === "greta") {
    const trust = g.flags.includes("greta_lista") && !second ? 1 : 0;
    return polite({ closeness: 4, trust }, "A cikk pontosan van idézve. A ceruzabél a hajgumi mellé kerül.");
  }
  if (giftId === "article" && girl === "rebeka") return { effect: {}, line: "Rebeka házi feladatnak hallja. A papír a táskáján marad." };
  if (giftId === "card") {
    if (girl === "boglarka" && state.week >= 10 && g.trust >= 3) return polite({ closeness: 3 }, "A képeslapot a könyvbe teszi, a szívet befelé.");
    if (girl === "greta") return { effect: {}, line: "Gréta elolvassa, és egy mondatban elutasítja." };
    return { effect: {}, line: "A képeslap korai. Udvariasan a zsebben marad." };
  }
  return polite({ closeness: 1 }, "Átveszi. Nem ez az ízlése, de a szándékot látja.");
}

export function giveGift(state: GameState, giftId: string): GameState {
  const scene = state.scene;
  if (!scene || scene.node.speaker === "narrator") return { ...state, lastNote: "Most nincs kinek átadni." };
  const girl = scene.node.speaker;
  if (state.giftMeeting) return { ...state, lastNote: "Egy találkozón egy ajándék." };
  if ((state.inventory[giftId] ?? 0) < 1) return state;
  const resolved = giftResolution(state, girl, giftId);
  let next = applyEffect(state, girl, resolved.effect);
  next.inventory[giftId] = (next.inventory[giftId] ?? 1) - 1;
  next.giftsWeek[girl] += 1;
  next.giftMeeting = true;
  next.lastNote = describeDelta(state, next, girl, resolved.line);
  if (next.scene) {
    next.scene = {
      ...next.scene,
      node: { ...next.scene.node, text: `${resolved.line}\n\n${next.scene.node.text}` },
    };
  }
  return next;
}

export function resolveJob(state: GameState, kind: "mohu" | "brick", rawPay: number): GameState {
  let pay = Math.max(0, Math.round(rawPay));
  const next = structuredClone(state);
  if (kind === "mohu") {
    next.mohuWeek += 1;
    if (next.mohuWeek === 2) pay = Math.round(pay * 0.6);
    if (next.mohuWeek >= 3) pay = Math.round(pay * 0.35);
    next.energy = clamp(next.energy - 18, 0, 100);
  } else {
    next.brickWeek += 1;
    if (next.brickWeek >= 2) pay = Math.round(pay * 0.7);
    next.energy = clamp(next.energy - 22, 0, 100);
    if (rawPay >= 14000) next.presence = clamp(next.presence + 1, 0, 10);
  }
  next.money += pay;
  next.minigame = null;
  next.lastNote = `A sáv ${pay.toLocaleString("hu-HU")} Ft-ot hozott.`;
  next.phase = "scene";
  next.scene = {
    node: jobNode(
      kind === "mohu"
        ? `A zsák a visszaváltónál ${pay.toLocaleString("hu-HU")} forintot ér. A versenytárs már a következő utcában van.`
        : `A fal áll, amennyire áll. A műszak ${pay.toLocaleString("hu-HU")} forint.`,
    ),
    location: kind === "mohu" ? "mohu" : "construction",
    source: "story",
  };
  return next;
}

export interface RouteOption {
  id: RouteId;
  label: string;
  ok: boolean;
  reason: string;
}

export function routeOptions(state: GameState): { girls: { id: GirlId; ok: boolean; reason: string }[]; options: RouteOption[] } {
  const girls = GIRLS.map((id) => {
    const g = state.girls[id];
    const ok = isCandidate(state, id);
    const reason = ok
      ? `közelség ${g.closeness}, bizalom ${g.trust}`
      : g.anger >= 4
        ? "törés"
        : `kell 30 közelség és 2 bizalom (most ${g.closeness} / ${g.trust})`;
    return { id, ok, reason };
  });
  const q = girls.filter((g) => g.ok).map((g) => g.id);
  const honest = (id: GirlId) => state.flags.includes(`honest_${id}`);
  const options: RouteOption[] = [
    { id: "alone", label: "Senki. A félév a műhelyé.", ok: true, reason: "Mindig járható." },
  ];
  for (const id of GIRLS) {
    options.push({
      id,
      label: `Csak ${GIRL_NAME[id].split(" ")[0]}.`,
      ok: q.includes(id),
      reason: q.includes(id) ? "Eléri a küszöböt." : "Még nem jelölt.",
    });
  }
  const pairBG = q.includes("boglarka") && q.includes("greta");
  options.push({
    id: "boglarka_greta",
    label: "Boglárka és Gréta.",
    ok: pairBG && honest("boglarka") && honest("greta"),
    reason: !pairBG
      ? "Mindkettőnek el kell érnie a küszöböt."
      : honest("boglarka") && honest("greta")
        ? "A járható pár. Mindkettő tudja, hogy nem csak őt keresed."
        : "Előbb mindkettőjüknek őszintén meg kell mondani.",
  });
  const pairRG = q.includes("rebeka") && q.includes("greta");
  options.push({
    id: "rebeka_greta",
    label: "Rebeka és Gréta.",
    ok: pairRG && honest("rebeka") && honest("greta") && state.girls.rebeka.closeness >= 40 && state.girls.greta.closeness >= 40,
    reason: !pairRG
      ? "Mindkettőnek el kell érnie a küszöböt."
      : state.girls.rebeka.closeness < 40 || state.girls.greta.closeness < 40
        ? "Szűk pár: mindkettő közelsége legalább 40."
        : honest("rebeka") && honest("greta")
          ? "Szűk, de járható, ha mindketten tudják."
          : "Előbb mindkettőjüknek őszintén meg kell mondani.",
  });
  return { girls, options };
}

export function commitRoute(state: GameState, route: RouteId, told: boolean): GameState {
  const { options } = routeOptions(state);
  const picked = options.find((o) => o.id === route);
  if (!picked?.ok) return { ...state, lastNote: picked?.reason ?? "Ezt az útvonalat nem zárhatod." };
  let next = structuredClone(state);
  const qualified = GIRLS.filter((g) => isCandidate(next, g));
  if (next.flags.includes("honest_rebeka") && next.flags.includes("honest_boglarka") && qualified.includes("rebeka") && qualified.includes("boglarka")) {
    next.girls.boglarka.trust = clamp(next.girls.boglarka.trust - 2, 0, 5);
    next.journal.push("Boglárka bizalma esett: Rebekával párként mondtad ki, és ők nem férnek össze.");
  }
  next.route = route;
  if (route === "boglarka_greta" || route === "rebeka_greta") addFlag(next.flags, "par_oszinte");
  if (route !== "alone" && !route.includes("_")) {
    for (const g of qualified) {
      if (g === route) continue;
      if (!told) {
        next.girls[g].trust = clamp(next.girls[g].trust - 1, 0, 5);
        addFlag(next.flags, "pletyka");
        next.risk = clamp(next.risk + 6, 0, 100);
        next.journal.push(`${GIRL_NAME[g].split(" ")[0]} a pletykából tudta meg, hogy nem őt választottad.`);
      } else {
        next.journal.push(`${GIRL_NAME[g].split(" ")[0]}nak személyesen megmondtad a zárás előtt.`);
      }
    }
  }
  next.journal.push(`Útvonal: ${route}.`);
  return nextWeek(next);
}

export function nextWeek(state: GameState): GameState {
  const next = structuredClone(state);
  next.week += 1;
  next.slot = 0;
  next.money += 60_000;
  next.energy = clamp(next.energy + 30, 0, 100);
  for (const g of GIRLS) {
    next.girls[g].anger = clamp(next.girls[g].anger - 1, 0, 5);
    next.talkCounts[g] = 0;
    next.giftsWeek[g] = 0;
  }
  next.mohuWeek = 0;
  next.brickWeek = 0;
  next.bekasThisWeek = false;
  next.riskSoothed = false;
  next.invite = null;
  next.scene = null;
  next.doingPhysio = false;
  next.rolled = false;
  next.giftMeeting = false;
  next.minigame = null;
  next.phase = "planner";
  next.dossier = null;
  next.snap = takeSnap(next);
  next.lastNote = `${next.week}. hét. A fizetés megjött.`;
  next.journal.push(`${next.week}. hét kezdete.`);
  return next;
}

export interface Ending {
  id: "true" | "quiet" | "broken" | "alone" | "fade" | "pair-true" | "pair-quiet" | "pair-broken" | "scandal";
  title: string;
  text: string;
  girls: GirlId[];
  location: LocationId;
}

function hasFlags(state: GameState, girl: GirlId, flags: string[]) {
  return flags.every((f) => state.girls[girl].flags.includes(f));
}

function soloTrue(state: GameState, girl: GirlId, riskMax: number) {
  const g = state.girls[girl];
  return (
    g.closeness >= 80 &&
    g.trust >= 5 &&
    g.flags.includes("hatar") &&
    hasFlags(state, girl, REQUIRED_FLAGS[girl]) &&
    state.risk < riskMax &&
    !g.flags.includes("greta_eszkoz") &&
    !g.flags.includes("rebeka_kozonseg")
  );
}

export function evaluateEnding(state: GameState): Ending {
  if (state.route === "none" || state.route === "alone") {
    if (state.risk >= 80) {
      return {
        id: "scandal",
        title: "Botrány",
        text: "A félév végén a tanszék kimond két nevet, pedig útvonalat sem zártál. A műhely megvolt. A folyosó már nem a tiéd.",
        girls: [],
        location: "department",
      };
    }
    return {
      id: "alone",
      title: "Egyedül",
      text: "A félév rendben lezárul. A gyógytorna megvolt. A folyosón köszönnek, és ennyi. Senki nem került közel. A kulcs, a margó és a lista a helyén marad.",
      girls: [],
      location: "classroom",
    };
  }
  if (state.route === "boglarka_greta" || state.route === "rebeka_greta") {
    const pair: GirlId[] = state.route === "boglarka_greta" ? ["boglarka", "greta"] : ["rebeka", "greta"];
    const broken = state.risk >= 80 || pair.some((g) => state.girls[g].anger >= 4);
    if (broken) {
      return {
        id: "pair-broken",
        title: "A pár szétesik",
        text: "A botrány vagy a harag erősebb, mint a kimondott egyezség. Külön-külön mennek el a vizsgaidőszakba. A hármas soha nem sétált a kampuszon, és már kettes sem fog.",
        girls: pair,
        location: "courtyard",
      };
    }
    const riskMax = state.route === "rebeka_greta" ? 40 : 45;
    const closeMin = state.route === "rebeka_greta" ? 80 : 75;
    const honest = pair.every((g) => state.flags.includes(`honest_${g}`));
    const ready = pair.every(
      (g) =>
        state.girls[g].trust >= 5 &&
        state.girls[g].closeness >= closeMin &&
        state.girls[g].flags.includes("hatar") &&
        hasFlags(state, g, REQUIRED_FLAGS[g]),
    );
    const spoiled = pair.some(
      (g) => state.girls[g].flags.includes("greta_eszkoz") || state.girls[g].flags.includes("rebeka_kozonseg"),
    );
    if (ready && honest && !spoiled && state.risk < riskMax && state.flags.includes("par_oszinte")) {
      return {
        id: "pair-true",
        title: "Páros, igaz",
        text:
          state.route === "boglarka_greta"
            ? "Mindketten tudják, és külön-külön vállalják. Boglárka nem a titkolt második, Gréta nem kivétel a szabály alól. Nincs hármas a kampuszon. A félév után is írnak — külön."
            : "Rebeka nem lesz a Holdkör dísze, Gréta nem lesz a kör rendje. Mindketten tudják a másikat. A kockázat alacsony maradt, a határ kimondva. Két út, egy félév, közönség nélkül.",
        girls: pair,
        location: "bekas",
      };
    }
    return {
      id: "pair-quiet",
      title: "Csendes pár",
      text: "Együtt maradnak a szó szintjén. A feltételek közül valamelyik hiányzik: a határ, a bizalom, vagy a túl magas kockázat. A félév után eltávolodnak, harag nélkül.",
      girls: pair,
      location: "courtyard",
    };
  }
  const girl = state.route as GirlId;
  const g = state.girls[girl];
  if (state.risk >= 80 || g.anger >= 4) {
    const text =
      girl === "rebeka"
        ? "Nyilvánosan használja, amit rábíztál, vagy a pletyka előbb ér oda, mint a magyarázat. A tanszéken kimondják a neved. Ő nem véd meg."
        : girl === "boglarka"
          ? "Türelmetlen voltál, vagy a pletyka előbb érte, mint a magyarázat. Visszahúzódik a polcok közé, és nem jön elő."
          : "A demonstrátori helyét vagy a precizitását használtad közelítésre. Észreveszi, és lezárja. A lista tiszta. Te nem vagy rajta.";
    return { id: "broken", title: "Törés", text, girls: [girl], location: girl === "rebeka" ? "holdkor" : girl === "boglarka" ? "library" : "department" };
  }
  if (soloTrue(state, girl, 60)) {
    const text =
      girl === "rebeka"
        ? "Nappal is marad. A Holdkör kulcsa a zsebében marad, nem a történetedben. Nem kell a veszélyesebbnek lennie. A műhely nem tartozás, és ezt mindketten tudjátok."
        : girl === "boglarka"
          ? "Nem csak a könyvtár sarkában fér hozzá a viszonyhoz. Az udvaron is megáll melletted, és kibírja, hogy látják. A margó tele van. A mondatait végighallgattad."
          : "Nem vizsga a viszony. Elront egy mondatot a listán, és mégsem ér véget. A ceruza a hajában marad. Zárt ajtónál, nem a demonstrátori hely miatt.";
    return { id: "true", title: "Igaz vég", text, girls: [girl], location: girl === "rebeka" ? "holdkor" : girl === "boglarka" ? "courtyard" : "department" };
  }
  if (g.closeness >= 55 && g.trust >= 3) {
    const text =
      girl === "rebeka"
        ? "A kör része maradsz. Kedvel, de a gőg mögül nem lép ki teljesen. A fotók pontosak. A félév után a kulcs nála van."
        : girl === "boglarka"
          ? "Megbízik benned, de csak ott, ahol nincs közönség. A félév végén ez így marad. A könyvjelző a helyén."
          : "Tisztel, talán szeret, de a szabályos távolságban hagy, mert az átláthatóbb. A lista stimmel. A kivétel nem.";
    return { id: "quiet", title: "Csendes vég", text, girls: [girl], location: girl === "rebeka" ? "holdkor" : girl === "boglarka" ? "library" : "department" };
  }
  return {
    id: "fade",
    title: "Távol",
    text: `${GIRL_NAME[girl].split(" ")[0]} az útvonalon maradt, de a félév végére a számok nem érték utol a szót. Udvariasan köszön. A műhely bezár.`,
    girls: [girl],
    location: "classroom",
  };
}

export function formatFt(n: number) {
  return `${n.toLocaleString("hu-HU")} Ft`;
}
