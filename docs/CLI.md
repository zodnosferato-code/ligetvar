# Command-line gameplay and proofreading

> **Status:** Implemented in 0.3.0; CLI protocol 1. | **Purpose:** Play without a graphical UI, automate agent playthroughs, and produce reproducible editorial findings.

## Quickstart

Use Node 22.6+ and `npm ci` from the repository root. No browser, network service, API key, image decoding or audio device is needed.

```bash
npm run play:cli -- --save /tmp/ligetvar-miki.json
```

At the prompt:

```text
new Miki
1
1
look
journal
save
quit
```

The numbered options are the current view's available actions. They change with the scene; read the new list before selecting again. You can instead use stable IDs, such as `scene shared_1` or `choice demonstrate`. `continue` is valid only when the current line has no choice. `help` lists commands. The game text and visual descriptions are Hungarian; English story/localisation is the next roadmap phase, not part of this release.

Re-run the same command with the same save path to resume. Every successful gameplay action is saved before its result is reported, including the first revealed memory card. You do not need to type `save` between moves. An existing incompatible save produces the same compatibility reason as the browser. Use `new Miki --replace` only when you intend to overwrite the chosen file.

## Commands

| Text command | JSON `cmd` / additional fields | Behavior |
| --- | --- | --- |
| `new <name> [--replace]` | `new`, `name`, `replace` | Start a game; replacement must be explicit |
| `look`, `actions`, `journal`, `replies`, `shop`, `ending` | Same name | Read current player-visible information; no time cost |
| Number or `choose <number>` | `act`, `action` copied from `view.actions` | Execute the corresponding current action |
| `scene <id>` | `act`, `{type:"scene",id}` | Start an available scene/outgoing meeting; paid scenes charge once |
| `choice <id>`, `continue` | `act`, `{type:"choice",id}` (`continue` for non-choice lines) | Advance dialogue |
| `direction <id>` | `act`, `{type:"direction",id}` | Select an eligible relationship direction |
| `rest`, `job recycling`, `job archive` | `act`, `{type:"activity",kind}` | Rest or start a full-slot daytime job |
| `tile <index>` | `act`, `{type:"tile",index}` | Select a zero-based board cell |
| `next-pair`, `claim`, `cancel-job` | `act`, `{type:<command>}` | Acknowledge two cards, claim a completed shift, or cancel before play |
| `buy <gift-id>` | `act`, `{type:"buy",id}` | Buy a listed gift with money |
| `gift <girl> <gift-id> <note> <delivery>` | `act`, `{type:"gift",girl,id,note,delivery}` | Give an owned gift; notes: `noticed`, `thanks`, `company`; delivery: `remote`, `inPerson` |
| `read-replies` | `act`, `{type:"read-replies"}` | Mark received gift replies read |
| `advance` | `act`, `{type:"advance"}` | Finish recap and advance week, or enter the final ending |
| `save`, `load` | Same name | Write current state or reload the selected file |
| `import <path> [--replace]` | `import`, `path`, `replace` | Validate a current envelope and copy it into this session/save |
| `export <new-path>` | `export`, `path` | Write the current save envelope without overwriting a destination |
| `transcript <new-path>` | `transcript`, `path` | Export this session's successful gameplay/load commands and before/after observations |
| `note <category> <suggestion>` | `note`, `category`, `suggestion`, optional `sceneId`, `lineId`, `choiceId` | Add an editorial finding, without changing canonical text |
| `findings <new-path>` | `findings`, `path` | Export findings with stable references, source text and suggestions |
| `coverage` | `coverage` | Separate played lines/choices from inspected scenes |
| `catalog`, `inspect <scene-id>` | `catalog` / `inspect`, `sceneId` | Full content inspection; requires `--author` |
| `help`, `quit` | Same name | Command help or clean exit |

Double-quote text/path arguments containing spaces. The text interface defaults an omitted gift note to `noticed` and delivery to `inPerson`. JSON requests specify all gift fields. Scene/choice/asset IDs are not translated. Invalid or unavailable actions return an error with the current observation and spend nothing. The current view lists eligible scenes rather than revealing future locked-scene text. Shop entries show prices and availability; item ownership and weekly gift recipients are visible in `view.gifts`.

Recycling: select two orthogonally adjacent tiles to swap; valid matches clear automatically with cascades. Archive Pairs: reveal two cards, then use `next-pair`. Only selected/matched cards are revealed; hidden cells are `null`/`?`. Tile indices are zero-based; numbered menu options are one-based. There are no cheat, reward-injection or forced-scene commands.

## Agent JSON protocol

Use the silent npm form so npm's own banner does not pollute stdout, or invoke Node directly:

```bash
npm run --silent play:cli -- --json --save /tmp/ligetvar-agent.json
# Equivalent:
node --experimental-strip-types src/game/cli/main.ts --json --save /tmp/ligetvar-agent.json
```

Read the initial `id:"ready"` response first. A fresh file has revision 0 and no game; an existing valid file is loaded automatically. Send one JSON object per line, for example on a **fresh** file:

```json
{"id":"start","cmd":"new","name":"Agent","expectedRevision":0}
{"id":"open","cmd":"act","action":{"type":"scene","id":"shared_1"},"expectedRevision":1}
{"id":"observe","cmd":"look"}
```

Always use the most recent response's `revision` for `new`, `act`, `load` and `import`. A stale/missing revision rejects the request without mutation. A successful state change/load increases the revision; queries do not. Revision is session-local and resets on process restart; it is not a save compatibility version.

Each response includes `id`, `protocolVersion`, game/schema/content `release`, diagnostic `buildId` when available, `revision`, `mode`, `locale`, `ok`, and `view`. Failure adds `{error:{code,message,details?}}`. Errors include `BAD_REQUEST`, `BAD_INPUT`, `BAD_ACTION`, `STALE_REVISION`, `NO_GAME`, `ACTION_UNAVAILABLE`, `REPLACE_REQUIRED`, `SAVE_UNSUPPORTED`, `SAVE_INVALID`, `SAVE_MISSING`, `AUTHOR_ONLY`, `NOT_OBSERVED`, `IO_OR_STATE_ERROR`, and `COMMAND_LIMIT`. Raw game state, unrevealed cards and unearned evidence are never included in ordinary observations. Exporting a save is an explicit file operation, not a gameplay observation.

The machine stream is JSON only: diagnostics/startup failures go to stderr, with no terminal prompts or ANSI sequences. `--help` and `--version` are standalone human-readable invocations. Default budget: 10,000 non-empty input lines; change with `--max-commands N`. Inputs over 1 MB are rejected. EOF ends cleanly at the latest committed state. Exit status: 0 for a completed command stream, 2 for startup/options/lock failures, 3 for exhausted budget, 130 for SIGINT/SIGTERM. Individual rejected requests use `ok:false` rather than terminating the stream.

## Saves, ownership and interchange

`--save PATH` is required. Use separate files per agent. The CLI acquires an exclusive `PATH.lock`, writes a temporary file in the same directory, flushes it and atomically renames it over the save. Normal exit, EOF, SIGINT and SIGTERM release the lock. A hard kill can leave a lock; inspect its PID and remove it manually only after verifying no process owns the save. The CLI never steals locks. Save paths cannot be directories or symlinks. Startup errors never silently create a fresh game over an existing one.

Both browser and CLI use the exact envelope described in [VERSIONING.md](VERSIONING.md). For browser/CLI interchange, export the value of browser localStorage key `ligetvar-save` to a UTF-8 JSON file, then `import` that file in the CLI. To return, use CLI `export`, place those exact bytes at the browser's `ligetvar-save` key, reload, and Continue. There is no graphical import/export button yet; this is an explicit developer/tester workflow. Never edit the payload or bypass validation. Current 0.6.1 requires schema 4/content epoch 4. The earlier 0.2.0 compatibility statement applied only to release 0.3.0; epoch-1/2/3 saves now require a new game. Use current metadata from VERSIONING.md and release.ts.

Output exports refuse to overwrite existing files. Parent directories for export/report paths must already exist. On a persistence failure, the CLI retains its prior in-memory state and revision; the failed action is not reported as committed.

## Proofreading and visual context

Normal transcripts include IDs, speaker, text, visible expressions/assets, offered choices, actions and observed outcomes, plus release/build metadata and state digests. Same initial state, build and actions reproduce the same result. To replay a resumed session, retain its original input save separately: the live save path changes as you play. Transcripts are observations and commands, not replacement save files. Coverage and findings are scoped to the running process; export them before quitting. Inspection alone does not count as a played branch.

```bash
npm run play:cli -- --author --save /tmp/ligetvar-proofreader.json
```

```text
catalog
inspect rebeka_2
note wording "Check whether this phrasing fits Rebeka's voice."
findings /tmp/ligetvar-findings.json
```

Author mode is explicitly omniscient: `inspect` includes every line/branch and its visual context, without granting any progress. In normal play, notes must refer to observed lines or selected choices; author notes can refer to a scene explicitly inspected in that session. Findings record the observed wording, suggested correction, category, scene/line/choice IDs and whether the source was played or inspected. They never edit story files automatically.

The asset-description catalog is `src/game/content/asset-descriptions.ts`, separate from production notes. The original 33-file description batch was inspected as contact sheets when written. That is historical review coverage, not the current asset count; see [ART-REGISTER.md](ART-REGISTER.md) for current files. The view uses the browser's background, lighting and portrait resolvers; it reports requested expressions and neutral fallback honestly. Player/narrator lines have no portrait. Descriptions contain visible features, not unseen plot facts. During this review, Gréta's affectionate image was found to be a zero-byte file already in main; the broken entry/file was removed and the established neutral fallback is now used. A replacement affectionate image remains art work to do.

## Reproducible gameplay example and verification

The example agent speaks only the public JSON protocol, reading each response before sending its next command:

```bash
node tools/cli-playthrough.mjs --route friendship --save /tmp/friendship-new.json
node tools/cli-playthrough.mjs --route triad --save /tmp/triad-new.json --transcript /tmp/triad-transcript.json
```

Supported scenario names: `friendship`, `rebeka`, `boglarka`, `greta`, `triad`, `withdraw`. Use fresh paths. The example covers complete routes and their expected endings, not every dialogue branch. `withdraw` tests late withdrawal on Rebeka's route. CI runs these actual subprocess playthroughs, along with memory/recycling, gift/outing, current save interchange, stale-command, locking, EOF/SIGINT and proofreading tests.

```bash
npm test
npm run typecheck
npm run build
```

`npm run test:cli` runs CLI-specific tests. `npm run test:headless` remains the engine/content test alias; it is not the play command. Browser layout checks remain separate. The browser store and CLI share `content/actions.ts`, and both use the same campaign runtime; no alternate engine or legacy loader was introduced.

## Live language switching

Use `--locale hu` (default) or `--locale en` at startup. During play, enter
`locale en` or `locale hu` in text mode, including during scenes and puzzles.
JSON mode accepts `{"cmd":"locale","locale":"en"}`.
The response contains the selected `locale` and `translationCoverage:"partial"`.
No expectedRevision is required; switching does not increment the revision,
consume a slot or write the save. Available action IDs and hidden cards remain
unchanged. Session locale is independent of saved game state and is selected
again when starting a CLI process.

Extracted interface/action/puzzle labels and save feedback follow the locale.
Unextracted story/content remains Hungarian; protocol names, help and some
diagnostics remain English. This is not complete English gameplay. See
[the localization contract](LOCALIZATION.md).
