import { useEffect, useRef, useState } from "react";

const MAZE = [
  "###############",
  "#P..b....e....#",
  "#.##.###.##.#.#",
  "#b...#...b....#",
  "#.##.#.#####.##",
  "#....R....b...#",
  "#.###.##.##.#.#",
  "#e...b....e...#",
  "###############",
];

type Dir = { x: number; y: number };

export function MohuGame({ onDone, onCancel }: { onDone: (pay: number) => void; onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(42);
  const scoreRef = useRef(0);
  const over = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rows = MAZE.length;
    const cols = MAZE[0]!.length;
    const walls = MAZE.map((row) => row.split(""));
    let px = 1;
    let py = 1;
    let rx = 5;
    let ry = 5;
    const items: { x: number; y: number; v: number }[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ch = walls[y]![x];
        if (ch === "P") {
          px = x;
          py = y;
          walls[y]![x] = ".";
        } else if (ch === "R") {
          rx = x;
          ry = y;
          walls[y]![x] = ".";
        } else if (ch === "b") {
          items.push({ x, y, v: 90 + ((x * 3 + y) % 5) * 10 });
          walls[y]![x] = ".";
        } else if (ch === "e") {
          items.push({ x, y, v: 160 + (y % 2) * 30 });
          walls[y]![x] = ".";
        }
      }
    }

    const keys = new Set<string>();
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
        e.preventDefault();
      }
      if (e.type === "keydown") keys.add(e.code);
      else keys.delete(e.code);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    let acc = 0;
    let racc = 0;
    let time = 42;
    let last = performance.now();
    let raf = 0;
    let stun = 0;

    const blocked = (x: number, y: number) => walls[y]?.[x] !== ".";
    const dirFromKeys = (): Dir => {
      // Screen-space: A / left decreases x. W decreases y (up the grid).
      if (keys.has("ArrowLeft") || keys.has("KeyA")) return { x: -1, y: 0 };
      if (keys.has("ArrowRight") || keys.has("KeyD")) return { x: 1, y: 0 };
      if (keys.has("ArrowUp") || keys.has("KeyW")) return { x: 0, y: -1 };
      if (keys.has("ArrowDown") || keys.has("KeyS")) return { x: 0, y: 1 };
      return { x: 0, y: 0 };
    };

    const steal = () => {
      const near = items.findIndex((it) => Math.abs(it.x - px) + Math.abs(it.y - py) <= 2);
      if (near >= 0) items.splice(near, 1);
      stun = 1.1;
    };

    const stepRival = () => {
      if (stun > 0) return;
      const target = items.slice().sort((a, b) => Math.abs(a.x - rx) + Math.abs(a.y - ry) - (Math.abs(b.x - rx) + Math.abs(b.y - ry)))[0];
      const options = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ].filter((d) => !blocked(rx + d.x, ry + d.y));
      if (!options.length) return;
      options.sort((a, b) => {
        const da = target ? Math.abs(rx + a.x - target.x) + Math.abs(ry + a.y - target.y) : 0;
        const db = target ? Math.abs(rx + b.x - target.x) + Math.abs(ry + b.y - target.y) : 0;
        return da - db;
      });
      const pick = options[0]!;
      rx += pick.x;
      ry += pick.y;
      const got = items.findIndex((it) => it.x === rx && it.y === ry);
      if (got >= 0) items.splice(got, 1);
      if (Math.abs(rx - px) + Math.abs(ry - py) <= 1) steal();
    };

    const finish = () => {
      if (over.current) return;
      over.current = true;
      cancelAnimationFrame(raf);
      onDoneRef.current(scoreRef.current);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      acc += dt;
      racc += dt;
      time -= dt;
      stun = Math.max(0, stun - dt);
      if (acc > 0.13) {
        acc = 0;
        const d = dirFromKeys();
        if ((d.x || d.y) && !blocked(px + d.x, py + d.y)) {
          px += d.x;
          py += d.y;
          const got = items.findIndex((it) => it.x === px && it.y === py);
          if (got >= 0) {
            scoreRef.current += items[got]!.v;
            items.splice(got, 1);
            setScore(scoreRef.current);
          }
        }
      }
      if (racc > 0.42) {
        racc = 0;
        stepRival();
      }
      setLeft(Math.max(0, Math.ceil(time)));

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const tw = rect.width / cols;
      const th = rect.height / rows;
      ctx.fillStyle = "#1c1614";
      ctx.fillRect(0, 0, rect.width, rect.height);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          ctx.fillStyle = walls[y]![x] === "#" ? "#3a2a33" : "#2a2420";
          ctx.fillRect(x * tw, y * th, tw - 1, th - 1);
        }
      }
      for (const it of items) {
        ctx.fillStyle = it.v > 150 ? "#c6a15a" : "#6d8a62";
        ctx.fillRect(it.x * tw + tw * 0.28, it.y * th + th * 0.2, tw * 0.4, th * 0.6);
      }
      ctx.fillStyle = "#7a4458";
      ctx.fillRect(rx * tw + 3, ry * th + 3, tw - 6, th - 6);
      ctx.fillStyle = "#f3e6d0";
      ctx.fillRect(px * tw + 3, py * th + 3, tw - 6, th - 6);
      if (time <= 0 || items.length === 0) finish();
      else raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const pad = {
      set(code: string, down: boolean) {
        if (down) keys.add(code);
        else keys.delete(code);
      },
    };
    (canvas as HTMLCanvasElement & { __pad?: typeof pad }).__pad = pad;
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  const pulse = (code: string, down: boolean) => {
    const canvas = canvasRef.current as (HTMLCanvasElement & { __pad?: { set: (c: string, d: boolean) => void } }) | null;
    canvas?.__pad?.set(code, down);
  };

  return (
    <div className="scroll" style={{ padding: "0.8rem 1rem 1rem" }}>
      <div className="nameplate">
        <span>MOHU</span>
        <span>
          {score.toLocaleString("hu-HU")} Ft · {left}s
        </span>
      </div>
      <p className="serif" style={{ marginTop: 0 }}>
        Szedd a palackot. A szilvás figura is gyűjt, és a közeledből elvehet egyet. A billentyű A balra, D jobbra.
      </p>
      <canvas ref={canvasRef} style={{ width: "100%", height: "16rem", touchAction: "none", background: "#1c1614" }} />
      <div className="action-grid" style={{ marginTop: "0.7rem" }}>
        <Pad label="Fel" code="ArrowUp" pulse={pulse} />
        <Pad label="Le" code="ArrowDown" pulse={pulse} />
        <Pad label="Bal" code="ArrowLeft" pulse={pulse} />
        <Pad label="Jobb" code="ArrowRight" pulse={pulse} />
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.7rem" }}>
        <button type="button" className="pixel-btn good" onClick={() => onDone(scoreRef.current)}>
          Visszaváltom
        </button>
        <button type="button" className="pixel-btn ghost" onClick={onCancel}>
          Mégsem
        </button>
      </div>
    </div>
  );
}

function Pad({
  label,
  code,
  pulse,
}: {
  label: string;
  code: string;
  pulse: (code: string, down: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="pixel-btn"
      onPointerDown={() => pulse(code, true)}
      onPointerUp={() => pulse(code, false)}
      onPointerLeave={() => pulse(code, false)}
    >
      {label}
    </button>
  );
}

export function BrickGame({ onDone, onCancel }: { onDone: (pay: number) => void; onCancel: () => void }) {
  const [beer, setBeer] = useState(false);
  const [hits, setHits] = useState(0);
  const [miss, setMiss] = useState(0);
  const [pos, setPos] = useState(0.5);
  const beerRef = useRef(false);
  const posRef = useRef(0.5);
  const hitsRef = useRef(0);
  const missRef = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    beerRef.current = beer;
  }, [beer]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt * (beerRef.current ? 2.4 : 1.35);
      const p = (Math.sin(t) + 1) / 2;
      posRef.current = p;
      setPos(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const zone = beer ? 0.1 : 0.22;
  const total = hits + miss;
  const pay = () => hitsRef.current * (beerRef.current ? 1800 : 1600);

  const lay = () => {
    if (done.current || total >= 10) return;
    const hit = Math.abs(posRef.current - 0.5) <= zone / 2;
    if (hit) {
      hitsRef.current += 1;
      setHits(hitsRef.current);
    } else {
      missRef.current += 1;
      setMiss(missRef.current);
    }
    if (hitsRef.current + missRef.current >= 10) {
      done.current = true;
      onDone(pay());
    }
  };

  return (
    <div className="scroll" style={{ padding: "0.8rem 1rem 1rem" }}>
      <div className="nameplate">
        <span>Építkezés</span>
        <span>
          {hits} jó / {miss} hibás
        </span>
      </div>
      <p className="serif" style={{ marginTop: 0 }}>
        Tíz tégla, időzítve. A sör gyorsít és szűkíti a jó sávot: több fér bele, ha eltalálod.
      </p>
      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", minHeight: "2.75rem" }}>
        <input
          type="checkbox"
          checked={beer}
          onChange={(e) => {
            if (total === 0) setBeer(e.target.checked);
          }}
        />
        Sör a műszak előtt
      </label>
      <div style={{ position: "relative", height: "2.5rem", background: "#2a2420", border: "2px solid #000", marginTop: "0.8rem" }}>
        <div
          style={{
            position: "absolute",
            left: `${(0.5 - zone / 2) * 100}%`,
            width: `${zone * 100}%`,
            top: 0,
            bottom: 0,
            background: "#6d8a62",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${pos * 100}%`,
            top: 0,
            bottom: 0,
            width: "0.35rem",
            background: "#f3e6d0",
          }}
        />
      </div>
      <button type="button" className="pixel-btn good" style={{ width: "100%", marginTop: "0.8rem" }} onClick={lay}>
        Tégla ({10 - total} maradt)
      </button>
      <button type="button" className="pixel-btn ghost" style={{ marginTop: "0.5rem" }} onClick={onCancel}>
        Mégsem
      </button>
    </div>
  );
}
