# Ligetvár

Magyar, tizenhat hetes gótikus romantikus történetjáték egy kastélyban működő főiskolán. A fakultatív műhely résztvevői eltűnések és hiányzó emlékek nyomát követik. Három egyéni románc, Rebeka–Boglárka–Márton közös kapcsolat, barátság, visszalépés és gyenge felkészülésű történeti kimenetel játszható.

Az átdolgozott motor és a 45 magyar jelenet implementálva van. A végleges manga képkészlet még nincs kész: jelenleg ruhás átmeneti portrék, meglévő hátterek és kifejezetten jelölt helyőrzők láthatók. Ez még nem a redesign valamennyi kiadási kapujának teljesítése.

```bash
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

A Vite alapútvonala `/ligetvar/`, a helyi cím `http://localhost:5173/ligetvar/`. A build a `dist/` könyvtárba kerül. GitHub Pages telepítés és tesztelés a `main` push után Actionsben fut.

Hetente egy garantált közös történeti alkalom és két szabad sáv van. A nyomozásnak nem feltétele románc, pénzkereső műszak vagy magas energia. A személyes kapcsolatokhoz tanúsított beszélgetés és igen szükséges; a pontszám és ajándék nem pótolja. A 15. heti konfrontáció után a 16. heti intézményi és személyes utóélet még a félév lezárása előtt megtörténik.

A v2 külön mentést használ. A v1 megmarad, de az új történetet újra kell kezdeni. A címoldalon csak a régi játékosnév vehető át külön kérésre; régi páros útvonalat vagy mérföldkövet nem alakítunk át automatikusan.

Fejlesztéshez először [AGENT.md](AGENT.md), [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md), [ENGINE.md](ENGINE.md). Az aktuális ellenőrzések és hátralévő munka a [haladási naplóban](docs/REDESIGN-PROGRESS.md), a vizuális hiányok az [art registerben](docs/ART-REGISTER.md) találhatók. A számozott régi tervek és a régi dialógus/lokalizációs állományok történeti források, nem aktív tartalom.

## Venice AI API (developer tooling)

The repository includes a Node 22+ server-side smoke test for Venice's OpenAI-compatible chat API. Base URL: `https://api.venice.ai/api/v1`; model: `zai-org-glm-5-2`. The example does **not** run in the Vite browser application.

1. Rotate any credential previously shared in chat, and create a new Venice API key.
2. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**, name it `VENICE_API_KEY`, and paste the replacement key there. GitHub Actions secrets are not automatically available to local terminals or arbitrary agents.
3. For a trusted local terminal, set `VENICE_API_KEY` in its environment without saving it in tracked files, then run `npm run venice:smoke`. Alternatively, explicitly map `secrets.VENICE_API_KEY` into the environment of a trusted GitHub Actions job that runs this command.

The script calls `POST /chat/completions` with a short test message. It does not expose the key to the browser, and non-2xx responses fail without dumping potentially sensitive response bodies. Local `.env` files are ignored by Git, but this script reads the process environment directly; Node does not automatically load `.env` files here. This is a chat connectivity test, not an image-generation test.

Venice documentation: https://docs.venice.ai
