# Ligetvár

> **Status:** Playable Hungarian game; redesign and final acceptance remain in progress. | **Purpose:** Project overview, current design entry point and local setup.

Ligetvár is a gothic romance visual novel set over a sixteen-week semester at a castle college. Relationships drive the experience while disappearances, lost memories and a vampire investigation shape the shared story. Play individual romances, the Rebeka–Boglárka–Márton relationship, friendship and withdrawal paths.

## Design and development

Start with the [current design documentation](docs/design/README.md). The [redesign and feature tracker](docs/design/TRACKER.md) distinguishes implemented changes, partial work, approved future plans and unapproved proposals. The folder also owns [game design](docs/design/GAME-DESIGN.md), [character visuals](docs/design/CHARACTER-VISUALS.md) and [character voices](docs/design/CHARACTER-VOICES.md).

Contributors must read [AGENT.md](AGENT.md) and the relevant tracker row before working. Update the design and tracker in the same commit as a design change. Older plans retain detailed acceptance criteria and history; current status and authority live in `docs/design/`.

Use the [documentation index](docs/README.md) for technical contracts and production records, [ENGINE.md](ENGINE.md) for runtime behavior, and the [art register](docs/ART-REGISTER.md) for current file coverage. Do not treat a historical plan or production log as proof that a feature or reference asset is available.

## Run locally

Node 22.6 or newer is required.

```bash
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

Open http://localhost:5173/ligetvar/. Vite uses `/ligetvar/` as its base path and builds into `dist/`. Tests and GitHub Pages deployment run through Actions after a push to main.

## Play

Each week has a guaranteed shared-story activity, one discretionary daytime activity and one nighttime activity, followed by a recap. Dialogue continuation and movement inside a scene do not consume extra slots. The office and bedroom offer labelled clickable objects for planning; the door opens destinations and the phone arranges meetings and optional outings.

Relaxed move-limited job puzzles earn money and spendable program points. Gifts and optional outings add personal interactions, but do not replace witnessed relationship decisions. See the [economy contract](docs/LEISURE-ECONOMY.md) for exact costs and rewards.

The game and saves are versioned. Incompatible schema/content updates explain that a new semester is required; no historical save migration is supported. See [versioning](docs/VERSIONING.md).

## Play from the command line

```bash
npm run play:cli -- --save /tmp/ligetvar-player.json
# Agent mode: one JSON request per line, without the npm banner
npm run --silent play:cli -- --json --save /tmp/ligetvar-agent.json
```

Start with `new YourName`, select numbered actions and use `help`. Progress saves after each action. The [CLI guide](docs/CLI.md) documents commands, visual descriptions, transcripts, author inspection and route examples.

Hungarian and partial English are selectable at any time in the browser and CLI (`--locale en`, then `locale hu` / `locale en`). UI labels, save feedback, location names and relationship directions have English translations; the first workshop conversation also has English dialogue and choices. Later conversations, reaction notices, journals and remaining content still appear in Hungarian. See the [localization contract](docs/LOCALIZATION.md) and [tracker](docs/design/TRACKER.md) for extraction boundaries and remaining work.

## Art and developer tooling

Runtime art is selected by the [image manifest](src/game/content/assets.ts) and [animation manifest](src/game/content/animations.ts). Production candidates remain separate from reviewed exports. Follow the [asset workflow](docs/ASSET-AGENT-WORKFLOW.md), preserving identity and keeping image payloads out of agent context.

Venice production is paused under the existing user direction; current art work uses built-in ChatGPT image generation. Historical tooling and credential-handling rules are documented in [AGENT.md](AGENT.md). No provider request is needed to run the game.

