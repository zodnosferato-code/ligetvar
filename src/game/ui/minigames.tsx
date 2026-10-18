import { useEffect, useRef, useState } from "react";

// Infinite runner for MOHU bottle collection
export function MohuGame({ onDone, onCancel }: { onDone: (pay: number) => void; onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const over = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let playerY = 150;
    let vy = 0;
    let onGround = true;
    const gravity = 0.6;
    const jump = -12;
    let items: { x: number; y: number; v: number; type: "bottle" | "hazard" }[] = [];
    let spawnTimer = 0;
    let time = 40;
    let last = performance.now();
    let raf = 0;
    let running = true;

    const keys = new Set<string>();
    const onKey = (e: KeyboardEvent) => {
      if (["Space", "ArrowUp", "KeyW"].includes(e.code)) e.preventDefault();
      if (e.type === "keydown") keys.add(e.code);
      else keys.delete(e.code);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    const spawn = () => {
      const isHazard = Math.random() < 0.25;
      items.push({
        x: canvas.width + 20,
        y: isHazard ? 180 : 160 + Math.random() * 40,
        v: isHazard ? 0 : 80 + Math.floor(Math.random() * 60),
        type: isHazard ? "hazard" : "bottle",
      });
    };

    const finish = () => {
      if (over.current) return;
      over.current = true;
      running = false;
      cancelAnimationFrame(raf);
      onDoneRef.current(scoreRef.current);
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time -= dt;
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        spawn();
        spawnTimer = 1.2 + Math.random() * 0.8;
      }

      if ((keys.has("Space") || keys.has("ArrowUp") || keys.has("KeyW")) && onGround) {
        vy = jump;
        onGround = false;
      }
      vy += gravity;
      playerY += vy;
      if (playerY >= 150) {
        playerY = 150;
        vy = 0;
        onGround = true;
      }

      for (let i = items.length - 1; i >= 0; i--) {
        items[i]!.x -= 4;
        if (items[i]!.x < -30) items.splice(i, 1);
        const px = 80;
        const py = playerY;
        const ix = items[i]!.x;
        const iy = items[i]!.y;
        if (Math.abs(px - ix) < 30 && Math.abs(py - iy) < 30) {
          if (items[i]!.type === "bottle") {
            scoreRef.current += items[i]!.v;
            setScore(scoreRef.current);
          } else {
            scoreRef.current = Math.max(0, scoreRef.current - 40);
            setScore(scoreRef.current);
          }
          items.splice(i, 1);
        }
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#1c1614";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#2a2420";
      ctx.fillRect(0, 200, rect.width, rect.height - 200);
      ctx.fillStyle = "#f3e6d0";
      ctx.fillRect(60, playerY, 24, 40);
      for (const it of items) {
        ctx.fillStyle = it.type === "bottle" ? "#6d8a62" : "#7a4458";
        ctx.fillRect(it.x, it.y, 20, 28);
      }

      if (time <= 0) finish();
      else raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  return (
    <div className="scroll" style={{ padding: "0.8rem 1rem 1rem" }}>
      <div className="nameplate">
        <span>MOHU visszaváltás</span>
        <span>{score.toLocaleString("hu-HU")} Ft</span>
      </div>
      <p className="serif" style={{ marginTop: 0 }}>
        Ugorj a palackokért (Space / fel). A sötét alakok elkerülendők.
      </p>
      <canvas ref={canvasRef} style={{ width: "100%", height: "16rem", background: "#1c1614" }} />
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.7rem" }}>
        <button type="button" className="primary" onClick={() => onDone(scoreRef.current)}>
          Visszaváltom
        </button>
        <button type="button" className="button" onClick={onCancel}>
          Mégsem
        </button>
      </div>
    </div>
  );
}

const TRIVIA = [
  {
    q: "Melyik a helyes médiaelélet-fogalom a dokumentációhoz?",
    options: ["Rituális kommunikáció", "Csak szórakoztatás", "Kizárólag hír"],
    a: 0,
    pay: 1200,
  },
  {
    q: "A folklór kutatásban mi a terepmunka?",
    options: ["Könyvtári olvasás", "Helyszíni megfigyelés és beszélgetés", "Csak online forrás"],
    a: 1,
    pay: 1400,
  },
  {
    q: "Egy fakultatív kurzus jelenléti ívén mi a minimum a tanszéki szabály szerint?",
    options: ["50%", "70%", "Nincs minimum"],
    a: 1,
    pay: 1000,
  },
  {
    q: "Rebeka dokumentációjában a misztikus gyakorlatok szimbolikája inkább...",
    options: ["Nyilvános marketing", "Privát, közönség nélküli", "Vizsgaanyag"],
    a: 1,
    pay: 1300,
  },
  {
    q: "Boglárka folklór dolgozatához melyik forrás a legalkalmasabb elsődlegesnek?",
    options: ["Wikipedia összefoglaló", "Helyszíni jegyzet a kurzuson", "Csak tankönyv"],
    a: 1,
    pay: 1500,
  },
];

export function TriviaGame({ onDone, onCancel }: { onDone: (pay: number) => void; onCancel: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const current = TRIVIA[idx];

  const answer = (choice: number) => {
    if (done) return;
    if (choice === current.a) setScore((s) => s + current.pay);
    if (idx + 1 >= TRIVIA.length) {
      setDone(true);
      onDone(score + (choice === current.a ? current.pay : 0));
    } else {
      setIdx((i) => i + 1);
    }
  };

  if (done) return null;

  return (
    <div className="scroll" style={{ padding: "0.8rem 1rem 1rem" }}>
      <div className="nameplate">
        <span>Iratellenőrzés / kérdőív</span>
        <span>{score.toLocaleString("hu-HU")} Ft</span>
      </div>
      <p className="serif" style={{ marginTop: 0 }}>
        A tanszéki munkád része: javítsd ki a kérdőíveket. Helyes válasz pénzt hoz.
      </p>
      <p className="serif" style={{ fontWeight: 600 }}>
        {current.q}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {current.options.map((opt, i) => (
          <button key={i} type="button" className="button" onClick={() => answer(i)}>
            {opt}
          </button>
        ))}
      </div>
      <button type="button" className="button" style={{ marginTop: "0.7rem" }} onClick={onCancel}>
        Mégsem
      </button>
    </div>
  );
}

export function BrickGame(props: { onDone: (pay: number) => void; onCancel: () => void }) {
  return <TriviaGame {...props} />;
}
