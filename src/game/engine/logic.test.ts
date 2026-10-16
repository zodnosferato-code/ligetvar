import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { existsSync } from "node:fs";
import { ACTIONS, NODES, STORY, assertCatalog, horrorNode, illustrationFor, portraitFor, PORTRAIT, weeklyHorrorSummary } from "../content/catalog.ts";
import {
  applyChoice,
  choiceAvailable,
  chooseAction,
  commitRoute,
  createInitial,
  evaluateEnding,
  finishScene,
  giftResolution,
  giveGift,
  girlPhase,
  inviteGirl,
  isCandidate,
  nextWeek,
  openGirlTalk,
  resolveJob,
  routeOptions,
  visibleActions,
  actionStatus,
} from "./logic.ts";
import type { GameState, GirlId, RouteId, SceneState } from "./types.ts";
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

function playSemester(
  start: GameState,
  lock: (state: GameState) => RouteId,
  style: "visit" | "rest" = "visit",
  focus?: GirlId,
): GameState {
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
      const choice = pool.slice().sort((a, b) => {
        const quality = QUALITY.indexOf(b.quality) - QUALITY.indexOf(a.quality);
        if (quality !== 0 || !focus) return quality;
        const hers = (choiceId: string, follow?: GirlId) => (follow === focus || choiceId === focus ? 1 : 0);
        return hers(b.id, b.follow) - hers(a.id, a.follow);
      })[0];
      if (!choice) throw new Error(`no choice on ${state.scene.node.id}`);
      state = applyChoice(state, choice.id);
      continue;
    }
    if (state.phase === "planner") {
      if (focus && !state.invite && state.girls[focus].trust >= 2 && state.girls[focus].anger < 3) {
        const invited = inviteGirl(state, focus);
        if (invited.invite === focus) state = invited;
      }
      const open = visibleActions(state).filter((entry) => entry.ok);
      if (!open.length) throw new Error(`no action in week ${state.week} slot ${state.slot} strain ${state.strain}`);
      const rest = open.find((entry) => entry.action.id.startsWith("rest"));
      const job = open.find((entry) => entry.action.kind === "minigame");
      const hers = focus ? open.find((entry) => entry.action.girl === focus) : undefined;
      const home = focus && state.invite === focus ? open.find((entry) => entry.action.id === "apartment") : undefined;
      const order = style === "rest"
        ? (["stat", "job", "minigame", "visit", "date"] as const)
        : (["visit", "date", "job", "stat", "minigame"] as const);
      let picked =
        style === "visit" && (state.workShifts ?? 0) < 1 && job
          ? job
          : rest && (state.strain ?? 0) >= 3
            ? rest
            : focus
              ? (home ?? hers ?? rest ?? open.find((entry) => entry.action.kind === "stat"))
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

  it("opens on a prologue and recaps the act breaks", () => {
    const start = createInitial("Márton");
    assert.equal(start.phase, "scene");
    assert.equal(start.scene?.node.id, "brief_open");
    assert.match(start.scene?.node.text ?? "", /^Márton vagy/);
    assert.match(start.scene?.node.text ?? "", /Gréta/);
    const monday = applyChoice(start, "continue");
    assert.equal(monday.phase, "planner");
    assert.equal(monday.week, 1);
    assert.equal(monday.slot, 0);

    let mid = createInitial("Márton");
    mid.week = 8;
    mid.route = "greta";
    mid.scene = null;
    mid = nextWeek(mid);
    assert.equal(mid.week, 9);
    assert.equal(mid.scene?.node.id, "brief_act2");
    assert.match(mid.scene?.node.text ?? "", /Gréta van az útvonalon/);
    const after = applyChoice(mid, "continue");
    assert.equal(after.phase, "planner");
    assert.equal(after.slot, 0);

    let late = createInitial("Márton");
    late.week = 15;
    late.route = "alone";
    late.scene = null;
    late = nextWeek(late);
    assert.equal(late.scene?.node.id, "brief_act3");
    assert.match(late.scene?.node.text ?? "", /Egyedül zártad/);
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

  it("applies the current Part 1 intro choice and follows its dialogue node", () => {
    let state = applyChoice(createInitial("Márton"), "continue");
    state.slot = 2;
    state = chooseAction(state, "holdkor");
    assert.equal(state.scene?.node.id, "rebeka_intro");

    // The rewritten dialogue rewards trust more than quick romantic closeness.
    // The first answer should continue to the evidence-focused photo conversation.
    state = applyChoice(state, "very_good");
    assert.equal(state.girls.rebeka.trust, 2);
    assert.equal(state.girls.rebeka.closeness, 1);
    assert.ok(state.girls.rebeka.flags.includes("rebeka_kor"));
    assert.ok(state.seen.includes("rebeka_intro"));
    assert.equal(state.energy, 70);
    assert.equal(state.phase, "scene");
    assert.equal(state.scene?.node.id, "rebeka_foto");
    assert.equal(state.scene?.source, "follow");
    assert.equal(state.slot, 2);

    // The next node uses its current JSON choice IDs, not the removed
    // "continue" choice from the former synthetic reaction node.
    state = applyChoice(state, "very_good");
    assert.equal(state.energy, 70);
    assert.equal(state.scene?.node.id, "rebeka_nappali");
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
    let state = applyChoice(createInitial("Márton"), "continue");
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
    let state = applyChoice(createInitial("Márton"), "continue");
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
    let stood = applyChoice(createInitial("Márton"), "continue");
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

  it("plays Rebeka's and Boglárka's routes from week 1 through the ending", () => {
    for (const girl of ["rebeka", "boglarka"] as const) {
      const state = playSemester(
        createInitial("Márton"),
        (current) => routeOptions(current).options.some((option) => option.id === girl && option.ok)
          ? girl
          : "alone",
        "visit",
        girl,
      );
      assert.equal(state.phase, "ending", girl + " playthrough did not reach an ending");
      assert.equal(state.week, 16, girl + " playthrough should reach week 16");
      assert.equal(state.route, girl, girl + " route should remain locked");
      assert.ok(state.seen.length > 0, girl + " playthrough should visit story scenes");
      assert.ok(
        state.seen.some((id) => id.startsWith(girl + "_part2") || id.startsWith(girl + "_")),
        girl + " playthrough should see at least one character scene",
      );
      assert.ok(state.workShifts >= 1, girl + " playthrough should complete at least one job");
    }
  });

  it("plays Gréta's semester on her best lines", () => {
    const focused = playSemester(
      createInitial("Márton"),
      (state) => (routeOptions(state).options.some((option) => option.id === "greta" && option.ok) ? "greta" : "alone"),
      "visit",
      "greta",
    );
    assert.equal(focused.phase, "ending");
    assert.equal(focused.week, 16);
    assert.equal(focused.route, "greta");
    assert.ok(focused.girls.greta.closeness > focused.girls.rebeka.closeness);
    assert.ok(focused.girls.greta.closeness > focused.girls.boglarka.closeness);
    assert.ok(focused.seen.some((id) => id.startsWith("greta_part2") || id === "greta_yield" || id === "greta_rule_break"));
    assert.ok(focused.workShifts >= 1);
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
    let tired = applyChoice(createInitial("Márton"), "continue");
    tired.strain = 4;
    assert.equal(actionStatus(tired, visit).ok, false);
    assert.equal(actionStatus(tired, rest).ok, true);
    tired = chooseAction(tired, "rest-m");
    assert.equal(tired.strain, 0);

    const date = ACTIONS.find((action) => action.id === "date-peron")!;
    let dating = applyChoice(createInitial("Márton"), "continue");
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

  it("shows the emotion portrait that matches the dialogue reaction", () => {
    assert.match(portraitFor("rebeka", "hideg_tekintet"), /anger/);
    assert.match(portraitFor("rebeka", "sebezheto"), /vulnerable/);
    assert.match(portraitFor("rebeka", "yielding"), /yielding/);
    assert.match(portraitFor("boglarka", "elpirulas"), /blush/);
    assert.match(portraitFor("boglarka", "lágy_bizalom"), /trust/);
    assert.match(portraitFor("boglarka", "enyhe_mosoly"), /smile/);
    assert.match(portraitFor("greta", "zavar"), /flustered/);
    assert.match(portraitFor("greta", "engedelmes"), /yielding/);
    assert.equal(portraitFor("rebeka", "semleges"), PORTRAIT.rebeka);
  });

  it("shows an encounter illustration, and keeps the call separate from letting her in", () => {
    const cases = [
      ["rebeka_intimate_private_vg_react", "rebeka", "rebeka", "rebeka-medium-apartment-bed.jpg"],
      ["boglarka_desire_fulfill", "boglarka", "boglarka", "boglarka-nude-reclining.jpg"],
      ["greta_yield_full", "greta", "greta", "greta-hardcore-bound-yield.jpg"],
      ["rebeka_desire_fulfill", "rebeka", "rebeka_greta", "rebeka-greta-kiss-soft.jpg"],
      ["boglarka_ending_true", "boglarka", "boglarka_greta", "boglarka-greta-kiss-bed.jpg"],
    ] as const;
    for (const [id, girl, route, file] of cases) {
      const url = illustrationFor(id, girl, route);
      assert.ok(url?.endsWith(file), id);
      assert.equal(existsSync(new URL(`../../../assets/references/intim/${file}`, import.meta.url).pathname), true, file);
    }
    assert.equal(illustrationFor("rebeka_intro", "rebeka", "none"), null);

    let called = applyChoice(createInitial("Márton"), "continue");
    called.girls.greta.trust = 2;
    called = inviteGirl(called, "greta");
    assert.equal(called.invite, "greta");
    assert.equal(visibleActions(called).some((row) => row.action.id === "apartment"), false);
    called.slot = 2;
    const door = visibleActions(called).find((row) => row.action.id === "apartment");
    assert.equal(door?.ok, true);
  });

  it("keeps optional romance behind the late investigation milestones", () => {
    const only = (id: string) => STORY.map((event) => event.id).filter((seen) => seen !== id);
    let state = applyChoice(createInitial("Márton"), "continue");
    state.week = 4;
    state.girls.rebeka.trust = 1;
    state.seen = only("rebeka_nappali");
    assert.equal(openGirlTalk(state, "rebeka", "holdkor").id, "rebeka_nappali");

    state = createInitial("Márton");
    state.week = 6;
    state.girls.boglarka.trust = 2;
    state.seen = only("boglarka_lakas");
    assert.equal(openGirlTalk(state, "boglarka", "apartment").id, "boglarka_repeat_0");
    state.girls.boglarka.trust = 3;
    assert.equal(openGirlTalk(state, "boglarka", "apartment").id, "boglarka_lakas");

    // A kiss is optional and cannot appear before the final evidence/relationship gate.
    state = createInitial("Márton");
    state.week = 15;
    state.route = "rebeka";
    state.girls.rebeka.trust = 4;
    state.girls.rebeka.closeness = 60;
    state.seen = only("rebeka_kiss");
    assert.equal(openGirlTalk(state, "rebeka", "apartment").id, "rebeka_kiss");

    state.week = 8;
    state.girls.rebeka.trust = 3;
    state.girls.rebeka.closeness = 45;
    state.route = "none";
    assert.notEqual(openGirlTalk(state, "rebeka", "apartment").id, "rebeka_kiss");
  });
});

describe("campus horror story", () => {
  it("offers victim cases and monster evidence independently of romance progress", () => {
    const first = horrorNode(4, [], 0);
    assert.ok(first);
    assert.equal(first.node.id, "horror_lilla_report");
    assert.ok(first.node.choices.length >= 2 && first.node.choices.length <= 4);
    const second = horrorNode(4, [first.node.id], 4);
    assert.ok(second);
    assert.notEqual(second.node.id, first.node.id);
    assert.match(weeklyHorrorSummary(1).text, /Varga Lilla/);
    assert.match(weeklyHorrorSummary(12).text, /köpenyes alak/);
    const shadowSeed = Array.from({ length: 128 }, (_, seed) => seed).find(
      (seed) => horrorNode(4, [], seed)?.node.id === "horror_shadow_frame",
    );
    assert.notEqual(shadowSeed, undefined);
    assert.match(horrorNode(4, [], shadowSeed!)?.node.artCaption ?? "", /egyetlen izzó vörös szem/);

    const courtyardSeed = Array.from({ length: 128 }, (_, seed) => seed).find(
      (seed) => horrorNode(4, [], seed)?.node.id === "horror_cloaked_attack_courtyard",
    );
    assert.notEqual(courtyardSeed, undefined);
    assert.match(horrorNode(4, [], courtyardSeed!)?.node.artCaption ?? "", /egyetlen izzó vörös szem/);
  });

  it("keeps week-limited incidents available as catch-up events after their window", () => {
    const missed = horrorNode(16, [], 0);
    assert.ok(missed);
    assert.equal(missed.node.id, "horror_lilla_report");
  });

  it("offers cloaked-figure attacks and named faculty without changing romance stats", () => {
    const seenAtWeekFour = new Set<string>();
    for (let seed = 0; seed < 128; seed += 1) {
      const event = horrorNode(4, [], seed);
      if (event) seenAtWeekFour.add(event.node.id);
    }
    assert.ok(seenAtWeekFour.has("horror_cloaked_attack_courtyard"));
    assert.ok(seenAtWeekFour.has("horror_teacher_folklore"));

    const teacherSeed = Array.from({ length: 128 }, (_, seed) => seed).find(
      (seed) => horrorNode(4, [], seed)?.node.id === "horror_teacher_folklore",
    );
    assert.notEqual(teacherSeed, undefined);
    const teacher = horrorNode(4, [], teacherSeed!);
    assert.ok(teacher);
    assert.equal(teacher.node.speaker, "narrator");
    assert.match(teacher.node.speakerLabel ?? "", /Dr\. Sárközi Júlia/);
    assert.match(teacher.node.artCaption ?? "", /portrékép hiányzik/);

    const state = createInitial("Márton");
    state.phase = "scene";
    state.rolled = true;
    state.scene = { node: teacher.node, location: teacher.location, source: "story" };
    const before = structuredClone(state.girls);
    const after = applyChoice(state, teacher.node.choices[0]!.id);
    assert.deepEqual(after.girls, before);
  });

  it("reveals the cloaked figure as a predatory half-vampire without changing romance stats", () => {
    const otherEvents = [
      "horror_lilla_report",
      "horror_voice_witness",
      "horror_shadow_frame",
      "horror_old_case",
      "horror_survivor_statement",
      "horror_sealed_door",
      "horror_bell_clapper",
      "horror_mimic_call",
      "horror_full_sighting",
      "horror_reports_bundle",
      "horror_last_trace",
      "horror_cloaked_attack_courtyard",
      "horror_teacher_folklore",
      "horror_cloaked_attack_peron",
      "horror_teacher_archive",
    ];
    const reveal = horrorNode(16, otherEvents, 0);
    assert.ok(reveal);
    assert.equal(reveal.node.id, "horror_half_vampire_reveal");
    assert.match(reveal.node.text, /félvér vámpír/);
    assert.match(reveal.node.text, /szexuális vágya/);
    assert.match(reveal.node.text, /birtoklásként és kényszerként/);
    assert.match(reveal.node.text, /nem romantika/);
    assert.match(reveal.node.text, /rövid fekete haj/);
    assert.match(reveal.node.text, /ritkás bajusz/);
    assert.match(reveal.node.text, /kissé túlsúlyos testalkat/);
    assert.match(reveal.node.text, /felnőtt nőkre/);
    assert.match(reveal.node.artCaption ?? "", /rövid fekete haj/);

    const state = createInitial("Márton");
    state.phase = "scene";
    state.rolled = true;
    state.scene = { node: reveal.node, location: reveal.location, source: "story" };
    const before = structuredClone(state.girls);
    const after = applyChoice(state, reveal.node.choices[0]!.id);
    assert.deepEqual(after.girls, before);
  });

  it("can trigger a horror encounter when every relationship is still at zero", () => {
    const state = applyChoice(createInitial("Márton"), "continue");
    state.week = 4;
    state.slot = 0;
    state.rolled = false;
    state.doingPhysio = false;
    state.phase = "scene";
    state.scene = { node: NODES["brief_open"]!, location: "courtyard", source: "brief" };
    state.girls.rebeka.closeness = 0;
    state.girls.boglarka.closeness = 0;
    state.girls.greta.closeness = 0;

    let encounter: GameState | null = null;
    for (let remainder = 0; remainder < 97; remainder += 1) {
      state.money = remainder;
      const candidate = finishScene(state);
      if (candidate.scene?.node.id.startsWith("horror_")) {
        encounter = candidate;
        break;
      }
    }
    assert.ok(encounter, "a horror incident should not require closeness with a character");
    assert.equal(encounter!.phase, "scene");
    assert.equal(encounter!.rolled, true);
  });
});

describe("dialogue translations", () => {
  it("never shows a raw text_key as dialogue text", () => {
    const rawKey = /^dialogue\./;
    for (const node of Object.values(NODES)) {
      assert.equal(rawKey.test(node.text), false, `missing translation for node ${node.id}: ${node.text.slice(0, 60)}`);
      for (const choice of node.choices) {
        assert.equal(rawKey.test(choice.text), false, `missing translation for choice in ${node.id}: ${choice.text.slice(0, 60)}`);
      }
    }
  });
});
