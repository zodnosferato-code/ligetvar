import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import {
  CAST,
  GIRL_NAME,
  GIFTS,
  HEART_EMPTY,
  HEART_FULL,
  HUB_ICON,
  FULL_BODY,
  LOCATION_BG,
  LOCATION_LABEL,
  PORTRAIT,
  portraitFor,
  illustrationFor,
  SLOT_LABEL,
  STAT_ICON,
  chapterName,
} from "../content/catalog.ts";
import {
  PHASE_LABEL,
  choiceAvailable,
  choiceLockReason,
  evaluateEnding,
  formatFt,
  girlPhase,
  isCandidate,
  routeOptions,
  visibleActions,
  type StageId,
} from "../engine/logic.ts";
import { GIRLS, type ActionDef, type RouteId } from "../engine/types.ts";
import { useGame } from "../store.ts";
import { moodFor, setMood, toggleMute, unlockAudio } from "../audio.ts";
import { MohuGame, TriviaGame } from "./minigames.tsx";

type ShownError = { message: string; stack?: string };

let shownError: ShownError | null = null;
const errorListeners = new Set<(error: ShownError) => void>();

function reportError(error: unknown, extra?: string) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = [error instanceof Error ? error.stack : "", extra].filter(Boolean).join("\n");
  const entry = { message, stack: stack || undefined };
  shownError = entry;
  for (const listener of errorListeners) listener(entry);
}

function beginSemester(kind: "resume" | "new", name: string, stage: StageId = 1, route: RouteId = "boglarka") {
  if (useGame.getState().mode === "play") return;
  const trigger = document.querySelector<HTMLElement>("[data-begin]");
  if (trigger) trigger.textContent = "Nyílik…";
  enterSemester(() => {
    if (kind === "resume") useGame.getState().resume();
    else useGame.getState().start(name, stage, route);
  });
  if (useGame.getState().mode !== "play") {
    reportError(new Error("A gomb lefutott, de a félév nem indult el."));
  }
}

function enterSemester(run: () => void) {
  try {
    run();
  } catch (error) {
    reportError(error);
    return;
  }
  try {
    unlockAudio();
  } catch (error) {
    reportError(error);
  }
}

function ErrorPopup() {
  const [error, setError] = useState<ShownError | null>(shownError);

  useEffect(() => {
    errorListeners.add(setError);
    const onError = (event: ErrorEvent) => {
      if (event.target && event.target !== window) return;
      reportError(event.error ?? event.message);
    };
    const onReject = (event: PromiseRejectionEvent) => {
      reportError(event.reason);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    return () => {
      errorListeners.delete(setError);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
    };
  }, []);

  if (!error) return null;

  const text = [error.message, error.stack].filter(Boolean).join("\n\n");

  return (
    <div className="error-pop" role="alertdialog" aria-labelledby="error-title">
      <div className="error-card">
        <h2 id="error-title">Hiba</h2>
        <p>{error.message}</p>
        {error.stack ? <pre>{error.stack}</pre> : null}
        <div className="error-actions">
          <button
            type="button"
            className="pixel-btn"
            onClick={() => {
              void navigator.clipboard?.writeText(text).catch(() => undefined);
            }}
          >
            Másolás
          </button>
          <button type="button" className="pixel-btn good" onClick={() => setError(null)}>
            Bezár
          </button>
        </div>
      </div>
    </div>
  );
}

class ShellBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    reportError(error, info.componentStack);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function GameApp() {
  return (
    <>
      <ShellBoundary>
        <GameShell />
      </ShellBoundary>
      <ErrorPopup />
    </>
  );
}

function GameShell() {
  const mode = useGame((s) => s.mode);
  const state = useGame((s) => s.state);
  const boot = useGame((s) => s.boot);
  useEffect(() => {
    boot();
  }, [boot]);
  useEffect(() => {
    if (mode !== "title") return;
    const onPress = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest("[data-begin]");
      if (!trigger) return;
      event.preventDefault();
      const kind = trigger.getAttribute("data-begin") === "resume" ? "resume" : "new";
      const input = document.querySelector<HTMLInputElement>(".name-field input");
      const stage = Number(trigger.getAttribute("data-stage") || "1") as StageId;
      const route = (trigger.getAttribute("data-route") || "boglarka") as RouteId;
      beginSemester(kind, input?.value ?? "", stage, route);
    };
    window.addEventListener("pointerdown", onPress, true);
    return () => window.removeEventListener("pointerdown", onPress, true);
  }, [mode]);
  useEffect(() => {
    if (mode !== "play") return;
    try {
      setMood(moodFor(state));
    } catch (error) {
      reportError(error);
    }
  }, [mode, state]);
  return (
    <div className="stage">
      {mode === "title" ? (
        <Title />
      ) : (
        <div
          key={`${state.phase}:${state.slot}:${state.scene?.node.id ?? ""}:${state.minigame ?? ""}`}
          className={`screen-fade time-${(["morning", "afternoon", "evening"] as const)[state.slot]}`}
        >
          <Play />
        </div>
      )}
    </div>
  );
}

function Title() {
  const hasSave = useGame((s) => s.hasSave);
  const [name, setName] = useState("Márton Kelényi");
  const [stage, setStage] = useState<StageId>(1);
  const [route, setRoute] = useState<RouteId>("boglarka");
  const stages: StageId[] = [1, 2, 3, 4, 5];
  const routes: RouteId[] = ["rebeka", "boglarka", "greta", "boglarka_greta", "rebeka_greta", "alone"];

  return (
    <div className="title-screen">
      <div className="title-hero">
        <p className="eyebrow">Ligetvári Főiskola</p>
        <h1 className="serif title-mark">Ligetvár</h1>
        <label className="name-field">
          A neved a műhelyen
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") beginSemester(hasSave ? "resume" : "new", name);
            }}
            maxLength={32}
            autoComplete="name"
          />
        </label>
        <div className="title-actions">
          {hasSave ? (
            <button type="button" className="pixel-btn good" data-begin="resume" data-stage={stage} data-route={route} onPointerDown={() => beginSemester("resume", name, stage, route)}>
              Folytatás
            </button>
          ) : (
            <button type="button" className="pixel-btn good" data-begin="new" data-stage={stage} data-route={route} onPointerDown={() => beginSemester("new", name, stage, route)}>
              Új félév
            </button>
          )}
          {hasSave ? (
            <button type="button" className="pixel-btn ghost" data-begin="new" data-stage={stage} data-route={route} onPointerDown={() => beginSemester("new", name, stage, route)}>
              Új félév
            </button>
          ) : null}
        </div>
        <div className="stage-pick" role="group" aria-label="Szakasz">
          {stages.map((id) => (
            <button key={id} type="button" className={`pixel-btn ghost ${stage === id ? "good" : ""}`} onClick={() => setStage(id)}>
              {id === 1 ? "1. hét" : id === 2 ? "5. hét" : id === 3 ? "Zárás" : id === 4 ? "13. hét" : "Vég"}
            </button>
          ))}
        </div>
        {stage >= 4 ? (
          <div className="stage-pick" role="group" aria-label="Útvonal">
            {routes.map((id) => (
              <button key={id} type="button" className={`pixel-btn ghost ${route === id ? "good" : ""}`} onClick={() => setRoute(id)}>
                {id === "alone" ? "Egyedül" : id === "boglarka_greta" ? "B+G" : id === "rebeka_greta" ? "R+G" : id === "rebeka" ? "Rebeka" : id === "greta" ? "Gréta" : "Boglárka"}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="scroll title-copy">
        <p className="serif lead">
          Tizenhat hét a Ligetvárban. Az irodád és a lakosztályod a kastély szárnyában van: kőfal, íves ablak, modern asztal a régi gerendák alatt.
        </p>
        <div className="cast-row">
          {GIRLS.map((id) => (
            <article key={id} className="cast-card">
              <img src={PORTRAIT[id]} alt={GIRL_NAME[id]} />
              <div className="cast-caption">
                <strong>{GIRL_NAME[id].split(" ")[0]}</strong>
                <span>{CAST[id].age} éves</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Play() {
  const phase = useGame((s) => s.state.phase);
  if (phase === "scene") return <Scene />;
  if (phase === "minigame") return <Job />;
  if (phase === "shop") return <Shop />;
  if (phase === "phone") return <Phone />;
  if (phase === "summary") return <Summary />;
  if (phase === "route") return <RouteLock />;
  if (phase === "ending") return <Ending />;
  if (phase === "dossier") return <Dossier />;
  return <Planner />;
}

function Hud() {
  const state = useGame((s) => s.state);
  const toTitle = useGame((s) => s.toTitle);
  const [quiet, setQuiet] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("ligetvar-mute") === "1") setQuiet(true);
    } catch {
      /* ignore */
    }
  }, []);
  return (
    <header className="hud">
      <div>
        <strong>
          {state.week}. hét · {SLOT_LABEL[state.slot]}
        </strong>
        <div className="day-cycle" aria-hidden>
          <i className="sky sun" />
          <i className="sky dusk" />
          <i className="sky moon" />
        </div>
        <div style={{ color: "var(--color-muted)", fontSize: "0.78rem" }}>{chapterName(state.week)}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div>{formatFt(state.money)}</div>
        <button
          type="button"
          className="pixel-btn ghost"
          style={{ minHeight: "2rem", padding: "0.2rem 0.45rem" }}
          onClick={() => setQuiet(toggleMute())}
        >
          {quiet ? "Csend" : "Zene"}
        </button>
        <button type="button" className="pixel-btn ghost" style={{ minHeight: "2rem", padding: "0.2rem 0.45rem" }} onClick={toTitle}>
          Főcím
        </button>
      </div>
    </header>
  );
}

function Hearts({ value }: { value: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "0.1rem" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <img key={i} className="heart" src={i < value ? HEART_FULL : HEART_EMPTY} alt="" />
      ))}
    </span>
  );
}

function guideFor(state: { week: number; strain?: number; workShifts?: number; route: string }): string {
  if ((state.strain ?? 0) >= 4) return "Fáradt vagy. Most csak a fotel nyílik.";
  if ((state.strain ?? 0) >= 3) return "Még egy kemény sáv, aztán pihenő kell.";
  if (state.week <= 8) return "A bizalom új jelenetből nő. Ismétlés a másodiknál felez, a harmadiknál már nem ad.";
  if ((state.workShifts ?? 0) < 1) return "Randihoz és a Polchoz egy műszak kell: palack vagy kérdőív.";
  if (state.route === "none" || state.route === "alone") return "Mély jelenet csak a zárt útvonalon jön.";
  return "A mély jelenet a saját helyén vagy a lakosztályban nyílik, ha a bizalom megvan.";
}

function hotspotFor(action: ActionDef): "door" | "book" | "rest" | "bag" {
  if (action.id.startsWith("rest")) return "rest";
  if (action.id.startsWith("mohu") || action.id === "gym") return "bag";
  if (action.kind === "job" || action.id === "study" || action.id === "proof" || action.id === "brick") return "book";
  return "door";
}

function Planner() {
  const state = useGame((s) => s.state);
  const act = useGame((s) => s.act);
  const open = useGame((s) => s.open);
  const showGirl = useGame((s) => s.showGirl);
  const [tray, setTray] = useState<"door" | "book" | "rest" | "bag" | null>(null);
  const home = state.slot === 2;
  const actions = visibleActions(state).filter((row) => row.action.kind !== "date" || state.week >= 9);
  const groups = {
    door: actions.filter((row) => hotspotFor(row.action) === "door" && row.action.id !== "apartment"),
    book: actions.filter((row) => hotspotFor(row.action) === "book"),
    rest: actions.filter((row) => hotspotFor(row.action) === "rest"),
    bag: actions.filter((row) => hotspotFor(row.action) === "bag"),
  };

  const press = (id: "door" | "book" | "rest" | "bag") => {
    const rows = groups[id].filter((row) => row.ok);
    if (rows.length === 1) {
      setTray(null);
      act(rows[0].action.id);
      return;
    }
    setTray((current) => (current === id ? null : id));
  };

  const guest = state.invite ? actions.find((row) => row.action.id === "apartment") : undefined;
  const spots = (
    [
      ["door", "Ajtó", HUB_ICON.door],
      ["book", "Könyv", HUB_ICON.book],
      ["rest", "Fotel", HUB_ICON.rest],
      ["bag", "Zsák", HUB_ICON.bag],
    ] as const
  ).filter(([id]) => groups[id].length > 0);

  return (
    <div className="hub">
      <Hud />
      <div
        className={`hub-room ${home ? "hub-home" : "hub-office"}`}
        style={{ backgroundImage: `url(${home ? LOCATION_BG.apartment : LOCATION_BG.department})` }}
      >
        <div className="sky-window" aria-hidden>
          <i />
        </div>
        {spots.map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            className={`hotspot at-${id} ${tray === id ? "is-open" : ""}`}
            aria-label={label}
            onClick={() => press(id)}
          >
            <img src={icon} alt="" />
          </button>
        ))}
        <button type="button" className="hotspot at-phone" aria-label="Telefon" onClick={() => open("phone")}>
          <img src={HUB_ICON.phone} alt="" />
        </button>
        <button type="button" className="hotspot at-shelf" aria-label="Polc" onClick={() => open("shop")}>
          <img src={HUB_ICON.shelf} alt="" />
        </button>
        {state.invite ? (
          <button
            type="button"
            className="hotspot at-guest"
            aria-label={`Engedd be: ${GIRL_NAME[state.invite]}`}
            disabled={!guest?.ok}
            title={guest?.ok ? "Engedd be" : "Este jön fel. A gomb akkor enged be."}
            onClick={() => act("apartment")}
          >
            <img src={PORTRAIT[state.invite]} alt="" />
            <em>Beenged</em>
          </button>
        ) : null}
        <div className="hub-faces">
          {GIRLS.map((id) => (
            <button key={id} type="button" className="hub-face" onClick={() => showGirl(id)} aria-label={GIRL_NAME[id]} title={PHASE_LABEL[girlPhase(state, id)]}>
              <img src={PORTRAIT[id]} alt="" />
              <Hearts value={state.girls[id].trust} />
              <em>{PHASE_LABEL[girlPhase(state, id)]}</em>
            </button>
          ))}
        </div>
        {tray ? (
          <div className="hotspot-menu">
            {groups[tray].map(({ action, ok, reason }) => (
              <button
                key={action.id}
                type="button"
                className="icon-choice"
                disabled={!ok}
                title={ok ? action.detail : reason}
                aria-label={ok ? action.label : reason}
                onClick={() => act(action.id)}
              >
                <img src={action.icon} alt="" />
                <span>{ok ? action.label : reason}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="hub-bar">
        <span title="Jelenlét">
          <img src={STAT_ICON.presence} alt="Jelenlét" />
          {state.presence}
        </span>
        <span title="Éleslátás">
          <img src={STAT_ICON.insight} alt="Éleslátás" />
          {state.insight}
        </span>
        <span title="Nyugalom">
          <img src={STAT_ICON.calm} alt="Nyugalom" />
          {state.calm}
        </span>
        <span title="Energia">
          <img src={STAT_ICON.energy} alt="Energia" />
          {state.energy}
        </span>
        {state.lastNote ? <p className="note">{state.lastNote}</p> : null}
        <p className="hint">{guideFor(state)}</p>
      </div>
    </div>
  );
}

function Scene() {
  const state = useGame((s) => s.state);
  const pick = useGame((s) => s.pick);
  const gift = useGame((s) => s.gift);
  const scene = state.scene;
  const text = scene?.node.text ?? "";
  const [shown, setShown] = useState(0);
  const shownRef = useRef(0);
  shownRef.current = shown;
  useEffect(() => {
    setShown(0);
    if (!text) return;
    let i = 0;
    const step = Math.max(1, Math.ceil(text.length / 80));
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + step);
      setShown(i);
      if (i >= text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [scene?.node.id, text]);
  useEffect(() => {
    if (!scene) return;
    const onKey = (e: KeyboardEvent) => {
      if (shownRef.current < text.length) {
        setShown(text.length);
        return;
      }
      const idx = ["Digit1", "Digit2", "Digit3", "Digit4"].indexOf(e.code);
      const choice = idx >= 0 ? scene.node.choices[idx] : undefined;
      if (!choice) return;
      const girl = scene.node.speaker === "narrator" ? null : scene.node.speaker;
      if (!choiceAvailable(state, choice, girl)) return;
      pick(choice.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene, pick, state, text]);

  if (!scene) return null;
  const girl = scene.node.speaker === "narrator" ? null : scene.node.speaker;
  const plate = girl ? illustrationFor(scene.node.id, girl, state.route) : null;
  const owned = GIFTS.filter((g) => (state.inventory[g.id] ?? 0) > 0);
  const expression = scene.expression ?? "";
  const mood = /pir|szegy|zavar/.test(expression)
    ? "blush"
    : /hideg|duh|unalom|gongy/.test(expression)
      ? "cold"
      : /nyug|eleged|mosoly|intenz/.test(expression)
        ? "warm"
        : "still";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
      <Hud />
      <div className="scene-bg" style={{ backgroundImage: `url(${LOCATION_BG[scene.location]})` }}>
        {plate ? <img className="scene-plate" src={plate} alt="" /> : null}
        {girl ? (
          <div className={`portrait-frame expr-${mood}`}>
            <img src={portraitFor(girl, expression)} alt={GIRL_NAME[girl]} />
            {expression ? <em>{expression.replaceAll("_", " ")}</em> : null}
          </div>
        ) : null}
      </div>
      <div className="sheet scroll">
        <div className="nameplate">
          <span>{girl ? GIRL_NAME[girl] : LOCATION_LABEL[scene.location]}</span>
          {girl ? <Hearts value={state.girls[girl].trust} /> : null}
        </div>
        <p className="line" onClick={() => setShown(text.length)}>
          {text.slice(0, shown)}
          {shown < text.length ? <i className="caret" /> : null}
        </p>
        {scene.source === "follow" ? <p className="hint">A beszélgetés még tart.</p> : null}
        {shown >= text.length ? (
          <div className="choices">
            {scene.node.choices.map((choice, index) => {
              const open = choiceAvailable(state, choice, girl);
              const lock = choiceLockReason(choice);
              return (
                <button key={choice.id} type="button" className="pixel-btn" disabled={!open} onClick={() => pick(choice.id)}>
                  <span>{index + 1}</span>
                  {open ? choice.text : lock}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="hint">Koppints, vagy nyomj egy gombot a sor végére.</p>
        )}
        {girl && owned.length > 0 && !state.giftMeeting ? (
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.7rem" }}>
            {owned.map((g) => (
              <button key={g.id} type="button" className="pixel-btn" onClick={() => gift(g.id)}>
                Ajándék: {g.name}
              </button>
            ))}
          </div>
        ) : null}
        {state.lastNote ? <p className="note">{state.lastNote}</p> : null}
      </div>
    </div>
  );
}

function Job() {
  const kind = useGame((s) => s.state.minigame);
  const finishJob = useGame((s) => s.finishJob);
  const cancelJob = useGame((s) => s.cancelJob);
  return (
    <>
      <Hud />
      {kind === "brick" ? (
        <TriviaGame onDone={(pay) => finishJob("brick", pay)} onCancel={cancelJob} />
      ) : (
        <MohuGame onDone={(pay) => finishJob("mohu", pay)} onCancel={cancelJob} />
      )}
    </>
  );
}

function Shop() {
  const state = useGame((s) => s.state);
  const buy = useGame((s) => s.buy);
  const back = useGame((s) => s.backToPlanner);
  return (
    <>
      <Hud />
      <div className="scroll" style={{ padding: "0.8rem 1rem 1.2rem" }}>
        <h2 className="serif" style={{ margin: "0 0 0.3rem" }}>
          Polc
        </h2>
        <p className="serif" style={{ marginTop: 0 }}>
          {(state.workShifts ?? 0) < 1
            ? "A Polc a műszak után nyílik. Előbb egy palackos kör vagy egy kérdőív."
            : "A rendelés nem visz sávot. Átadni csak találkozón lehet, egyet."}
        </p>
        {GIFTS.map((gift) => (
          <button
            key={gift.id}
            type="button"
            className="pixel-btn"
            style={{ width: "100%", marginBottom: "0.45rem" }}
            disabled={state.money < gift.price || (state.workShifts ?? 0) < 1}
            onClick={() => buy(gift.id)}
          >
            <strong>{gift.name}</strong> · {formatFt(gift.price)}
            {(state.inventory[gift.id] ?? 0) > 0 ? ` · nálad ${state.inventory[gift.id]}` : ""}
            <span style={{ display: "block", fontWeight: 400 }}>{gift.blurb}</span>
          </button>
        ))}
        <button type="button" className="pixel-btn ghost" onClick={back}>
          Vissza
        </button>
        {state.lastNote ? <p className="note">{state.lastNote}</p> : null}
      </div>
    </>
  );
}

function Phone() {
  const state = useGame((s) => s.state);
  const call = useGame((s) => s.call);
  const honest = useGame((s) => s.honest);
  const back = useGame((s) => s.backToPlanner);
  return (
    <>
      <Hud />
      <div className="scroll" style={{ padding: "0.8rem 1rem 1.2rem" }}>
        <h2 className="serif" style={{ marginTop: 0 }}>
          Telefon
        </h2>
        <p className="serif">A hívás nem visz sávot. A lakás este igen. Az őszinte mondat sem visz sávot.</p>
        {GIRLS.map((id) => (
          <div key={id} style={{ marginBottom: "0.7rem" }}>
            <strong>{GIRL_NAME[id]}</strong>
            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.35rem" }}>
              <button type="button" className="pixel-btn" onClick={() => call(id)}>
                Meghívom este
              </button>
              <button type="button" className="pixel-btn" onClick={() => honest(id)}>
                Nem csak őt keresem
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="pixel-btn ghost" onClick={back}>
          Vissza
        </button>
        {state.lastNote ? <p className="note">{state.lastNote}</p> : null}
      </div>
    </>
  );
}

function Summary() {
  const state = useGame((s) => s.state);
  const advanceWeek = useGame((s) => s.advanceWeek);
  return (
    <>
      <Hud />
      <div className="scroll sheet">
        <h2 className="serif" style={{ marginTop: 0 }}>
          {state.week}. hét vége
        </h2>
        <p className="serif">A gyógytorna megvolt. Hétfőn jön a fizetés.</p>
        {GIRLS.map((id) => {
          const d = state.girls[id].closeness - state.snap.closeness[id];
          const t = state.girls[id].trust - state.snap.trust[id];
          return (
            <p key={id} style={{ margin: "0.3rem 0" }}>
              {GIRL_NAME[id].split(" ")[0]}: közelség {d >= 0 ? "+" : ""}
              {d}, bizalom {t >= 0 ? "+" : ""}
              {t}
            </p>
          );
        })}
        <p>
          Pénz {formatFt(state.money - state.snap.money)} a hét közben. Kockázat {state.risk - state.snap.risk >= 0 ? "+" : ""}
          {state.risk - state.snap.risk}.
        </p>
        <button type="button" className="pixel-btn good" onClick={advanceWeek}>
          Hétfő
        </button>
      </div>
    </>
  );
}

function RouteLock() {
  const state = useGame((s) => s.state);
  const lockRoute = useGame((s) => s.lockRoute);
  const report = routeOptions(state);
  const [told, setTold] = useState(true);
  const clash = state.flags.includes("honest_rebeka") && state.flags.includes("honest_boglarka") && isCandidate(state, "rebeka") && isCandidate(state, "boglarka");

  return (
    <>
      <Hud />
      <div className="scroll" style={{ padding: "0.8rem 1rem 1.2rem" }}>
        <h2 className="serif" style={{ marginTop: 0 }}>
          Útvonalzár
        </h2>
        <p className="serif">A nyolcadik hét vége. Egy lány, egy összeillő pár, vagy senki. Rebeka és Boglárka nem fér össze.</p>
        {report.girls.map((g) => (
          <p key={g.id} style={{ margin: "0.25rem 0" }}>
            {GIRL_NAME[g.id].split(" ")[0]} — {g.ok ? "jelölt" : "nem jelölt"}. {g.reason}
          </p>
        ))}
        {clash ? (
          <p className="note">Ha mindkettőjüknek párként mondtad, Boglárka bizalma a záráskor esik.</p>
        ) : null}
        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", minHeight: "2.75rem" }}>
          <input type="checkbox" checked={told} onChange={(e) => setTold(e.target.checked)} />
          A kihagyott jelöltnek személyesen megmondom.
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {report.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`pixel-btn ${opt.ok ? "good" : ""}`}
              disabled={!opt.ok}
              onClick={() => lockRoute(opt.id as RouteId, told)}
            >
              <strong>{opt.label}</strong>
              <span style={{ display: "block", fontWeight: 400 }}>{opt.reason}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Ending() {
  const state = useGame((s) => s.state);
  const start = useGame((s) => s.start);
  const ending = evaluateEnding(state);
  const girl = ending.girls[0];
  const plate = girl
    ? illustrationFor(`${girl}_ending_${ending.id === "pair-true" ? "true" : ending.id}`, girl, state.route)
    : null;
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
      <div className="scene-bg" style={{ backgroundImage: `url(${LOCATION_BG[ending.location]})` }}>
        {plate ? <img className="scene-plate" src={plate} alt="" /> : null}
        {girl ? (
          <div className="portrait-frame">
            <img src={PORTRAIT[girl]} alt={GIRL_NAME[girl]} />
          </div>
        ) : null}
      </div>
      <div className="sheet scroll">
        <div className="nameplate">
          <span>{ending.title}</span>
        </div>
        <p className="serif">{ending.text}</p>
        <p style={{ color: "var(--color-muted)" }}>{state.name} · 16. hét</p>
        <button
          type="button"
          className="pixel-btn good"
          onClick={() => enterSemester(() => start(state.name))}
        >
          Új félév
        </button>
      </div>
    </div>
  );
}

function Dossier() {
  const state = useGame((s) => s.state);
  const back = useGame((s) => s.backToPlanner);
  const id = state.dossier;
  if (!id) return null;
  const girl = state.girls[id];
  const cast = CAST[id];
  return (
    <>
      <Hud />
      <div className="scroll" style={{ padding: "0.8rem 1rem 1.2rem" }}>
        <img src={FULL_BODY[id]} alt={GIRL_NAME[id]} style={{ width: "100%", maxHeight: "18rem", objectFit: "contain", background: "#1a1614", border: "2px solid #000" }} />
        <h2 className="serif" style={{ marginBottom: 0 }}>
          {GIRL_NAME[id]}
        </h2>
        <p style={{ color: "var(--color-muted)", marginTop: "0.2rem" }}>
          {cast.age} éves · {cast.year}
        </p>
        <p className="serif">{cast.blurb}</p>
        <p>{cast.haunt}</p>
        <p>
          Közelség {girl.closeness} · bizalom {girl.trust} · harag {girl.anger}
        </p>
        <p>Fázis: {PHASE_LABEL[girlPhase(state, id)]}</p>
        <Hearts value={girl.trust} />
        <div style={{ marginTop: "0.8rem" }}>
          <button type="button" className="pixel-btn" onClick={back}>
            Vissza a hétre
          </button>
        </div>
      </div>
    </>
  );
}

