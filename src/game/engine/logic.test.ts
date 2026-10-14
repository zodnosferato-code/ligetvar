import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NODES, assertCatalog } from "../content/catalog.ts";
import {
  applyChoice,
  chooseAction,
  commitRoute,
  createInitial,
  evaluateEnding,
  giftResolution,
  giveGift,
  girlPhase,
  isCandidate,
  nextWeek,
  routeOptions,
} from "./logic.ts";
import type { GameState, SceneState } from "./types.ts";

function withScene(state: GameState, nodeId: string): GameState {
  const scene: SceneState = { node: NODES[nodeId]!, location: "holdkor", source: "repeat" };
  return { ...state, phase: "scene", scene };
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
});
