import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ACTIONS, NODES, STORY, assertCatalog } from "../content/catalog.ts";
import {
  applyChoice,
  choiceAvailable,
  chooseAction,
  commitRoute,
  createInitial,
  evaluateEnding,
  giftResolution,
  giveGift,
  girlPhase,
  isCandidate,
  nextWeek,
  openGirlTalk,
  resolveJob,
  routeOptions,
  visibleActions,
  actionStatus,
} from "./logic.ts";
import type { GameState, RouteId, SceneState } from "./types.ts";
import rebeka1 from "../../../dialogues/part1/rebeka.json" with { type: "json" };
import boglarka1 from "../../../dialogues/part1/boglarka.json" with { type: "json" };
import greta1 from "../../../dialogues/part1/greta.json" with { type: "json" };
import rebeka2 from "../../../dialogues/part2/rebeka.json" with { type: "json" };
import boglarka2 from "../../../dialogues/part2/boglarka.json" with { type: "json" };
import greta2 from "../../../dialogues/part2/greta.json" with { type: "json" };
import rebeka3 from "../../../dialogues/part3/rebeka.json" with { type: "json" };
import boglarka3 from "../../../dialogues/part3/boglarka.json" with { type: "json" };
import greta3 from "../../../dialogues/part3/greta.json" with { type: "json" };

function withScene(state: GameState, nodeId: string): GameState {
  const scene: SceneState = { node: NODES[nodeId]!, location: "holdkor", source: "repeat" };
  return { ...state, phase: "scene", scene };
}

const QUALITY = ["very_bad", "bad", "risky", "good", "very_good"];

function playSemester(start: GameState, lock: (state: GameState) => RouteId, style: "visit" | "rest" = "visit"): GameState {
  let state = start;
  const repeats = new Map<string, number>();
  for (let step = 0; step < 500; step += 1) {
    if (state.phase === "ending") return state;
    const mark = `${state.week}|${state.slot}|${state.phase}|${state.scene?.node.id ?? ""}|${state.minigame ?? ""}`;
    const again = (repeats.get(mark) ?? 0) + 1;
    repeats.set(mark, again);
    if (again > 4) throw new Error(`stuck at ${mark}: ${state.lastNote}`);
    if (state.phase === "summary") {
      state = nextWeek(state);
      continue;
    }
    if (state.phase === "route") {
      state = commitRoute(state, lock(state), true);
      continue;
    }
    if (state.phase === "minigame" && state.minigame) {
      state = resolveJob(state, state.minigame, 8000);
      continue;
    }
    if (state.phase === "scene" && state.scene) {
      const girl = state.scene.node.speaker === "narrator" ? null : state.scene.node.speaker;
      const open = state.scene.node.choices.filter((choice) => choiceAvailable(state, choice, girl));
      const pool = open.length ? open : state.scene.node.choices;
      const choice = pool.slice().sort((a, b) => QUALITY.indexOf(b.quality) - QUALITY.indexOf(a.quality))[0];
      if (!choice) throw new Error(`no choice on ${state.scene.node.id}`);
      state = applyChoice(state, choice.id);
      continue;
    }
    if (state.phase === "planner") {
      const open = visibleActions(state).filter((entry) => entry.ok);
      if (!open.length) throw new Error(`no action in week ${state.week} slot ${state.slot} strain ${state.strain}`);
      const rest = open.find((entry) => entry.action.id.startsWith("rest"));
      const job = open.find((entry) => entry.action.kind === "minigame");
      const order = style === "rest"
        ? (["stat", "job", "minigame", "visit", "date"] as const)
        : (["visit", "date", "job", "stat", "minigame"] as const);
      let picked =
        style === "visit" && (state.workShifts ?? 0) < 1 && job
          ? job
          : style === "visit" && rest && (state.strain ?? 0) >= 3
            ? rest
            : order.map((kind) => open.find((entry) => entry.action.kind === kind)).find(Boolean);
      picked = picked ?? rest ?? open[0]!;
      state = chooseAction(state, picked.action.id);
      continue;
    }
    throw new Error(`unhandled phase ${state.phase}`);
  }
  throw new Error(`no ending by week ${state.week}, phase ${state.phase}`);
}

describe("Ligetvár engine", () => {
  it("keeps every dialogue between 1 and 4 choices", () => {
    assertCatalog();
    for (const node of Object.values(NODES)) {
      assert.ok(node.choices.length <= 4, node.id);
    }
  });

  it("starts the semester with salary already paid", () => {
    const state = createInitial("  ");
    assert.equal(state.name, "Márton Kelényi");
    assert.equal(state.money, 105_000);
    assert.equal(state.week, 1);
    assert.equal(state.route, "none");
  });

  it("opens a later stage without rewriting the first week", () => {
    const first = createInitial("Márton", 1);
    assert.equal(first.week, 1);
    assert.equal(first.money, 105_000);
    assert.equal(first.girls.rebeka.trust, 0);

    const early = createInitial("Márton", 2);
    assert.equal(early.week, 5);
    assert.equal(early.money, 30_000);
    assert.equal(early.girls.boglarka.trust, 2);
    assert.equal(early.girls.boglarka.closeness, 25);
    assert.equal(early.route, "none");
    assert.equal(early.phase, "planner");

    const lock = createInitial("Márton", 3);
    assert.equal(lock.week, 8);
    assert.equal(lock.phase, "route");
    assert.equal(isCandidate(lock, "greta"), true);
    assert.equal(routeOptions(lock).options.find((o) => o.id === "boglarka_greta")?.ok, true);

    const late = createInitial("Márton", 4, "greta");
    assert.equal(late.week, 13);
    assert.equal(late.route, "greta");
    assert.equal(late.phase, "planner");
    assert.equal(late.girls.greta.trust, 4);

    const end = createInitial("Márton", 5, "boglarka");
    assert.equal(end.phase, "scene");
    assert.equal(end.scene?.node.id, "boglarka_ending_true");
    assert.equal(evaluateEnding(end).id, "true");

    const pair = createInitial("Márton", 5, "boglarka_greta");
    assert.equal(evaluateEnding(pair).id, "pair-true");
  });

  it("applies a very good intro and remembers the flag", () => {
    let state = createInitial("Márton");
    state.slot = 2;
    state = chooseAction(state, "holdkor");
    assert.equal(state.scene?.node.id, "rebeka_intro");
    state = applyChoice(state, "very_good");
    assert.equal(state.girls.rebeka.trust, 1);
    assert.equal(state.girls.rebeka.closeness, 6);
    assert.ok(state.girls.rebeka.flags.includes("rebeka_kor"));
    assert.ok(state.seen.includes("rebeka_intro"));
    assert.equal(state.energy, 70);
    assert.equal(state.phase, "scene");
    assert.equal(state.scene?.node.id, "rebeka_intro_vg_react");
    assert.equal(state.slot, 2);
    state = applyChoice(state, "continue");
    assert.equal(state.energy, 70);
    assert.equal(state.scene?.node.id, "rebeka_foto_kerdes");
    assert.equal(state.slot, 2);
  });

  it("keeps every follow-up inside the catalog", () => {
    for (const node of Object.values(NODES)) {
      for (const choice of node.choices) {
        if (!choice.followNode) continue;
        assert.ok(NODES[choice.followNode], `${node.id} -> ${choice.followNode}`);
      }
    }
  });

  it("halves the second talk and zeroes the third", () => {
    let state = createInitial("Márton");
    state = applyChoice(withScene(state, "rebeka_repeat_0"), "very_good");
    assert.equal(state.girls.rebeka.closeness, 4);
    assert.equal(state.girls.rebeka.trust, 0);
    assert.equal(state.talkCounts.rebeka, 1);

    state = applyChoice(withScene(state, "rebeka_repeat_1"), "good");
    assert.equal(state.girls.rebeka.closeness, 5);

    state = applyChoice(withScene(state, "rebeka_repeat_0"), "very_good");
    assert.equal(state.girls.rebeka.closeness, 5);
    assert.match(state.lastNote, /Fáradt sor/);
  });

  it("reads route candidacy from the week-8 gate, not from a stored phase", () => {
    const state = createInitial("Márton");
    state.week = 7;
    state.girls.boglarka.trust = 2;
    state.girls.boglarka.closeness = 30;
    assert.equal(girlPhase(state, "boglarka"), "route_candidate");
    assert.equal(isCandidate(state, "boglarka"), true);
    state.girls.boglarka.anger = 4;
    assert.equal(girlPhase(state, "boglarka"), "broken");
    state.girls.boglarka.anger = 0;
    state.risk = 80;
    assert.equal(girlPhase(state, "boglarka"), "broken");
  });

  it("offers the compatible pairs only after an honest sentence", () => {
    const state = createInitial("Márton");
    for (const id of ["boglarka", "greta", "rebeka"] as const) {
      state.girls[id].closeness = 42;
      state.girls[id].trust = 2;
    }
    const closed = routeOptions(state);
    assert.equal(closed.options.find((o) => o.id === "boglarka_greta")?.ok, false);
    assert.equal(
      closed.options.some((o) => (o.id as string) === "rebeka_boglarka"),
      false,
    );
    state.flags.push("honest_boglarka", "honest_greta");
    const open = routeOptions(state);
    assert.equal(open.options.find((o) => o.id === "boglarka_greta")?.ok, true);
    assert.equal(open.options.find((o) => o.id === "rebeka_greta")?.ok, false);
    state.flags.push("honest_rebeka");
    assert.equal(routeOptions(state).options.find((o) => o.id === "rebeka_greta")?.ok, true);
  });

  it("drops the other girl's trust when the lock is gossip, not a conversation", () => {
    const state = createInitial("Márton");
    state.week = 8;
    state.girls.rebeka.closeness = 40;
    state.girls.rebeka.trust = 3;
    state.girls.greta.closeness = 36;
    state.girls.greta.trust = 2;
    const next = commitRoute(state, "rebeka", false);
    assert.equal(next.route, "rebeka");
    assert.equal(next.week, 9);
    assert.equal(next.girls.greta.trust, 1);
    assert.ok(next.flags.includes("pletyka"));
  });

  it("keeps a true ending behind the boundary flag and breaks it on scandal", () => {
    const state = createInitial("Márton");
    state.week = 16;
    state.route = "rebeka";
    state.girls.rebeka.closeness = 90;
    state.girls.rebeka.trust = 5;
    state.girls.rebeka.flags = ["rebeka_kor", "rebeka_feny", "rebeka_foto", "hatar"];
    assert.equal(evaluateEnding(state).id, "true");
    state.girls.rebeka.flags = ["rebeka_kor", "rebeka_feny", "rebeka_foto"];
    assert.equal(evaluateEnding(state).id, "quiet");
    state.risk = 90;
    assert.equal(evaluateEnding(state).id, "broken");
    state.route = "alone";
    state.risk = 0;
    assert.equal(evaluateEnding(state).id, "alone");
  });

  it("pays trust for the right gift once a week", () => {
    let state = createInitial("Márton");
    state.girls.rebeka.flags.push("rebeka_kor");
    state.inventory.pen = 2;
    state = giveGift(withScene(state, "rebeka_repeat_0"), "pen");
    assert.equal(state.girls.rebeka.trust, 1);
    assert.equal(state.girls.rebeka.closeness, 6);
    state.giftMeeting = false;
    state = giveGift(withScene(state, "rebeka_repeat_0"), "pen");
    assert.equal(state.girls.rebeka.trust, 1);
    assert.ok(state.lastNote.includes("udvarias"));
    const bad = giftResolution(createInitial("Márton"), "rebeka", "flowers");
    assert.equal(bad.effect.anger, 1);
  });

  it("pays the Monday salary and refuses a promised evening", () => {
    const state = nextWeek(createInitial("Márton"));
    assert.equal(state.week, 2);
    assert.equal(state.money, 165_000);
    let stood = createInitial("Márton");
    stood.slot = 2;
    stood.invite = "boglarka";
    stood.girls.boglarka.trust = 2;
    stood = chooseAction(stood, "proof");
    assert.equal(stood.girls.boglarka.trust, 1);
    assert.equal(stood.invite, null);
    assert.match(stood.scene?.node.text ?? "", /otthagyod/);
  });

  it("plays a semester from the first morning to an ending", () => {
    const quiet = playSemester(createInitial("Márton"), () => "alone", "rest");
    assert.equal(quiet.phase, "ending");
    assert.equal(quiet.week, 16);
    assert.equal(quiet.route, "alone");
    assert.equal(evaluateEnding(quiet).id, "alone");
    assert.ok(quiet.money >= 0);

    const social = playSemester(createInitial("Márton"), (state) => {
      const route = routeOptions(state).options.find((option) => option.ok && option.id !== "alone");
      return route?.id ?? "alone";
    });
    assert.equal(social.phase, "ending");
    assert.equal(social.week, 16);
    assert.notEqual(social.route, "none");
    assert.ok(social.seen.length > 0);
    assert.ok(evaluateEnding(social).title.length > 0);
    assert.ok(social.workShifts >= 1);
    assert.ok(social.seen.some((id) => id.includes("part2")));
  });

  it("loads every written dialogue, including part 2 and part 3", () => {
    const packs = [rebeka1, boglarka1, greta1, rebeka2, boglarka2, greta2, rebeka3, boglarka3, greta3];
    for (const pack of packs) {
      for (const raw of pack.nodes) {
        const node = NODES[raw.id];
        assert.ok(node, raw.id);
        assert.equal(node.text.startsWith("dialogue."), false, raw.id);
        for (const choice of node.choices) assert.equal(choice.text.startsWith("dialogue."), false, `${raw.id}:${choice.id}`);
      }
    }
  });

  it("requires rest before another push, and a minigame before a date", () => {
    const visit = ACTIONS.find((action) => action.id === "department")!;
    const rest = ACTIONS.find((action) => action.id === "rest-m")!;
    let tired = createInitial("Márton");
    tired.strain = 4;
    assert.equal(actionStatus(tired, visit).ok, false);
    assert.equal(actionStatus(tired, rest).ok, true);
    tired = chooseAction(tired, "rest-m");
    assert.equal(tired.strain, 0);

    const date = ACTIONS.find((action) => action.id === "date-peron")!;
    let dating = createInitial("Márton");
    dating.week = 9;
    dating.slot = 2;
    dating.route = "rebeka";
    dating.girls.rebeka.trust = 3;
    dating.girls.rebeka.closeness = 50;
    assert.equal(actionStatus(dating, date).ok, false);
    dating = resolveJob({ ...dating, phase: "minigame", minigame: "brick" }, "brick", 8000);
    assert.equal(dating.workShifts, 1);
    dating.phase = "planner";
    dating.scene = null;
    assert.equal(actionStatus(dating, date).ok, true);
  });

  it("opens act 1 scenes at her own place before the route lock", () => {
    const only = (id: string) => STORY.map((event) => event.id).filter((seen) => seen !== id);
    let state = createInitial("Márton");
    state.week = 4;
    state.girls.rebeka.trust = 1;
    state.seen = only("rebeka_nappali_feny");
    assert.equal(openGirlTalk(state, "rebeka", "holdkor").id, "rebeka_nappali_feny");

    state = createInitial("Márton");
    state.week = 6;
    state.girls.boglarka.trust = 2;
    state.seen = only("boglarka_lakas_kutatas");
    assert.equal(openGirlTalk(state, "boglarka", "apartment").id, "boglarka_lakas_kutatas");

    state = createInitial("Márton");
    state.week = 7;
    state.girls.rebeka.trust = 3;
    state.seen = only("rebeka_intimate_private");
    assert.equal(openGirlTalk(state, "rebeka", "holdkor").id, "rebeka_intimate_private");

    state.week = 9;
    assert.notEqual(openGirlTalk(state, "rebeka", "holdkor").id, "rebeka_intimate_private");
  });
});
