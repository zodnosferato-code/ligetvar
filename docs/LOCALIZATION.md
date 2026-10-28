# Localization contract

> Status: Partial translation with live browser/CLI switching, 27 October 2026. Unextracted content remains Hungarian.

## English-first direction — 28 October 2026

**User-approved target:** English is the canonical writing/source language and the default player language. Hungarian is a translation of the English version. This supersedes earlier Hungarian-source/Hungarian-default authoring policy. The implementation checkpoints below describe historical/current behavior, not the desired final direction.

Write and revise each scene in natural English against the master plot, scene brief and character profiles; then translate that approved scene into natural Hungarian, preserving voice, meaning, choices and knowledge. Do not merely translate old Hungarian lines into English and treat their defects as fixed. Revisions to English require a corresponding Hungarian translation review.

Runtime migration is still outstanding: the current default and MessageKey type derive from Hungarian, most narrative remains Hungarian, and saves persist prose. Changing policy in this document does not switch the running game or make it fully English.

Implementation sequence:
1. Establish English source catalogs/key authority and English scene authoring, preserving stable semantic IDs and placeholder parity. Parameterize the chosen player name throughout both languages.
2. Rewrite scenes in English according to the narrative workflow; translate them into Hungarian scene by scene. Audit UI, reactions, journals, gifts, evidence, descriptions and epilogues as well as dialogue.
3. Convert persisted prose to event/message references as required by the save policy. Apply compatibility epochs to actual persisted/content changes; do not bump for documentation.
4. Make English the no-preference default in browser, CLI and shared presentation APIs; retain explicit Hungarian choice, existing user preferences and live switching. Incomplete-language indicators must reflect actual per-language coverage, not assume English is always the translation.
5. Verify complete English and Hungarian routes, save/resume, literal chosen-name interpolation, placeholder/key parity and browser/mobile presentation. No locale-dependent mechanics or save-state mutations.

Track this migration in L1–L6 of the single design tracker. Do not maintain two competing source versions or describe the runtime migration as complete before implementation.

## Shared API

Browser and CLI presentation code may call `translate(key, params, locale)` from
`src/game/content/localization.ts`. Locale is explicit (`hu` or `en`), defaults
to Hungarian, and is not global mutable state. Save feedback accepts the same
optional locale: `saveMessage(result, 'en')`. Existing callers retain Hungarian.

**Current implementation, pending English-first migration:** Hungarian is the source catalog. Use stable semantic keys such as
`save.incompatible`, never source sentences or array positions. English must
contain exactly the same keys and named placeholders. Translate complete
sentences, with named `{parameter}` slots; do not assemble translated sentence
fragments. The optional save-format parenthesis is a complete reusable fragment.
Values are inserted literally, without recursive interpolation or HTML.
Missing required parameters throw an error. Render messages as plain text.

## Save and locale policy

This first extraction changes presentation only, so schema/content epochs remain
unchanged. The locale must not change scene IDs, choices, evidence, outcomes or
save decoding. Locale selection is a presentation preference outside game
state. Current saves still contain authored/persisted text; they are **not yet
locale neutral**. Before extracting journals, recaps or gift replies, replace
persisted display prose with stable message/event references and parameters,
then increment the affected compatibility epoch under VERSIONING.md. No migration
or automatic translation of historical text is planned.

## Incremental inventory

| Surface | Source | Current extraction |
| --- | --- | --- |
| Save/load feedback | content/saves.ts | Complete; Hungarian and English catalogs |
| UI labels and accessibility text | ui/*.tsx | Extracted in all seven components: title/status, dialogue controls, journal headings, room planner, gifts, puzzles and animation controls. Hungarian defaults preserved; English catalog supplied. Dynamic content imported from other modules remains pending. |
| CLI observations, commands and errors | cli/*.ts, content/view.ts, actions.ts | Pending |
| Currency and numeric formatting | content/format.ts | `formatFt(value, locale)` formats browser money and CLI scene prices as Hungarian Ft or English HUF; numeric protocol fields remain numbers. |
| Puzzle/economy/gift text | content/puzzles.ts, gifting.ts, outings.ts | Pending |
| Journals, recaps and knowledge | content/knowledge.ts, rules.ts, runtime.ts; engine state | Pending persisted-text audit |
| Scene titles, lines, choices and reactions | content scene modules and authoring.ts | First conversation (`shared_1`): title, all 28 dialogue/narration lines and both choice labels extracted and translated. Reactions and remaining scenes pending. |
| Endings and visual descriptions | content/epilogues.ts, asset-descriptions.ts, assets.ts, animations.ts | Pending |

Do not bulk rewrite dialogue during extraction. Keep authored IDs and gameplay
effects unchanged, work module by module, and record key coverage. Character names
remain proper names (Márton, Rebeka, Boglárka, Gréta, Virág, Soma); retain accents.
Use “semester” for félév and “save” for mentés in English. Extend the glossary
alongside later translation work.

## Verification and remaining gates

`localization.test.ts` checks key/placeholder parity, literal interpolation,
missing parameters and save-message locale independence. Existing save tests
protect Hungarian feedback and decoding. The test script already includes these
content tests.

Next: extract item/asset descriptions and runtime feedback; audit persisted text, then extract scene
text with stable IDs. Preserve the partial-translation indicators in browser and CLI. English save messages alone do not constitute English
gameplay. Plural messages must use locale-aware rules when needed; no plural API
or full translation coverage is claimed in this step.

## Interface extraction checkpoint — 27 October 2026

All seven `ui/*.tsx` components resolve their own labels through the shared API, including accessibility names, numeric feedback and deadlines. Brand/character proper names remain unchanged. Complete templates let translators reorder values without translating stored data. Puzzle card names and collectible names are extracted; their numeric IDs, symbols and gameplay remain unchanged.

English catalog entries are now available through the live language selector. Hungarian remains the default when no preference is set. Scene titles/prose, gift descriptions/notes/reactions, epilogues, animation descriptions and runtime notices still need extraction. Save notices now retain their result data and are formatted in the active locale. Journal prose is still persisted as before. No compatibility epoch change is needed for this label-only extraction.

## Live switching — user direction, 27 October 2026

Language must be switchable at any point in play, including the CLI, without
restart, scene advancement, resource use or save changes. This supersedes waiting
for full extraction before exposing language selection.

- Browser: the header offers Magyar / English on the title screen and throughout
  play. React context rerenders existing components, without remounting the game
  or resetting open menus, puzzle selections, animation pause, scroll or text size.
  The preference uses the separate `ligetvar-locale` key; unavailable storage
  leaves an in-memory preference. The document language follows the selection.
- UI components use `useTranslation()`, not the default translator directly.
  Resolve label tables during rendering, not at module import. Keep transient
  feedback as message references/data, not already translated strings.
- CLI: `--locale hu|en` selects the initial locale. Text mode accepts
  `locale en` / `locale hu`; JSON accepts
  `{"cmd":"locale","locale":"en"}`. No expectedRevision is needed for this
  presentation command; revision and save bytes remain unchanged.
- Locale belongs to each Session. `gameView(state, locale)` and
  `translator(locale)` use explicit locale arguments; no global locale can leak
  between sessions. CLI locale lasts for the process; choose it again on restart.
  Responses report `locale` and `translationCoverage:"partial"`.
- The browser English notice and CLI coverage metadata explicitly identify the
  incomplete translation. Story/content not extracted remains Hungarian. CLI
  command names, protocol enums, help and some diagnostic messages retain their
  existing English form. Switching does not promise a full English game yet.
- Browser save notices are structured results resolved at render time. Save
  schema/content epochs remain unchanged: locale is never written into GameState.

Validation: dedicated CLI tests switch across every phase through a sixteen-week
campaign, preserve half-revealed memory cards and replay the switching transcript.
Process tests cover text/JSON commands, startup selection and invalid locales.
Catalog/save tests, TypeScript and build checks remain required. Component SSR
was checked in both locales including room label tables; this is not a full
interactive browser/mobile layout review.


## Location and route translation checkpoint — 27 October 2026

Nine location names, five relationship directions and the CLI narration label now
use semantic catalog keys (`location.*`, `route.*`, `actor.narrator`). Browser
destinations, scene metadata and route controls resolve them at render time; CLI
observations resolve them with the session locale. Proper names keep their accents;
Békás-tó is Békás Lake in English, and Holdkör remains a proper name. Existing
`LOCATIONS` and `ROUTES` constants remain Hungarian source/ID tables for content
and validation; do not render their values directly in newly localized surfaces.

Browser money and CLI scene prices use explicit-locale formatting. Currency stays
Hungarian forints: `12,345 HUF` in English, Hungarian grouping and `Ft` in Hungarian.
Engine-authored persisted feedback still uses the existing source text and awaits
the event-reference audit. No schema/content epoch changes in this batch.

Validation: catalog parity, complete location/route ID coverage and Hungarian
label preservation; scene observations switch both ways without mutating state or
action IDs; English money formatting. TypeScript and CLI checks run locally.
The source-only local checkout omits artwork: four asset-existence tests fail for
that reason; 68 engine/content tests pass. Vite builds, with a missing local atlas
warning. Full repository validation is delegated to this commit's Actions. No
interactive browser/mobile or English narrative proofreading is claimed.

## First conversation translation — 27 October 2026

`shared_1` (The First Workshop) is the first dialogue batch: 31 semantic keys
cover its title, all 28 lines (including both alternative branches) and two
choices. Source and English text live in `locales/opening.hu.ts` and
`locales/opening.en.ts`, merged into the shared catalogs. Hungarian wording and
the full scene graph match the source before extraction exactly. Translation
preserves information, character humour, names and voluntary participation; it
does not implement the later Soma story rewrite.

Authoring accepts `message('scene.opening.arrival')` wherever a line, choice
label or scene title is authored. It supplies the Hungarian `text` plus a typed
`textKey` (`titleKey` for a scene). Use semantic names, never array positions.
Expansion helpers must propagate references rather than copying only `.text`.
`currentLine(state, registry, locale)` resolves line/choice references after
availability filtering, and `sceneTitle(scene, locale)` resolves titles in
browser dialogue/planning and CLI observations. References remain content
metadata; the engine uses unchanged IDs, effects and source strings. Do not
translate the authoritative registry in place or put the locale in game state.
Unextracted content falls back to its authored Hungarian string.

This batch deliberately leaves choice reaction notices, journals, evidence and
recaps in Hungarian. They persist source prose, so extracting them still needs
the event-reference conversion and compatibility policy above. No save schema or
content epoch change is needed for dialogue/title/choice display: no new field
is stored in a save and no branch or outcome changes. Existing in-scene saves
can resume and display these translations immediately. Gift callbacks in later
scenes are also still Hungarian.

Validation: catalog key/placeholder parity; exact 31-key opening coverage; both
branches switch languages and save/resume at every line with identical action
IDs and outcomes; untouched scenes retain source text; registry immutability;
full-semester CLI switching. TypeScript and Vite build pass locally (the
source-only checkout still lacks the recycling atlas). Engine/content tests
pass except four artwork-existence checks caused by omitted local assets. The
CLI suite passes 25/26 checks; its only failure is the same omitted-artwork check.
English browser/mobile layout and a separate editorial proofread remain open.

Next conversation batch: the first
individual meetings. Continue in small scene-sized commits and update L4 in the
current design tracker; never describe this first scene as a fully English game.

## Weeks 2–3 translation — 27 October 2026

`shared_2` (A Missing Evening) and `shared_3` (Ten Minutes, No Recording)
now resolve their titles, all 55 dialogue/narration lines and four choices through
61 semantic keys in `locales/investigation.hu.ts` and
`locales/investigation.en.ts`. Both alternative branches are included.
Hungarian source wording, scene/line/choice IDs, effects and information order
are preserved. This is translation of the current story, not the planned Soma
rewrite. Reaction notices, journal entries and recaps remain Hungarian.

Validation: key/placeholder parity and exact scene coverage; all four branches
switch locale and save/resume at every line with identical actions and outcomes.
TypeScript and Vite build pass. Source-only local engine/content tests: 77 pass,
four fail because artwork was intentionally omitted. CLI: 25 pass, one omitted-artwork
failure. The local build reports the same omitted recycling atlas. No interactive
browser/mobile review or independent editorial acceptance is claimed.
Save epochs are unchanged because only presentation references were added.

Next: first individual meetings in scene-sized batches. Full English gameplay,
persisted-text extraction and route proofreading remain outstanding.

## English-first shared_1 pilot — 28 October 2026

This supersedes the first-conversation checkpoint **for shared_1 only**. The English opening catalog is the canonical source and key authority for this pilot; the Hungarian opening catalog is typed against it and translated afterward. The global catalog/default migration remains partial: runtime still defaults to Hungarian and explicit preferences are preserved. No later scene was rewritten.

The assembled opening has 28 lines, two choices and 35 semantic keys (the original 31 retained, plus two reactions, journal and grounding knowledge). Both source and expansion references resolve the revised text; expansion nodes contain no stale overriding prose. Soma's ordinary assistant visit replaces the grievance, grant refusal, cellar aphorism and archive exit. No new clues or magical rules were added.

`playerText(template, name)` uses a replacement callback for literal, single-pass `{playerName}` interpolation. `currentLine` supplies saved `state.name`; author inspection may retain the template variable. Browser and CLI headings retain stable `marton` IDs and display the chosen name. Shared journal bond labels now use that name too. This does not repair later authored hardcoded names.

`storedMessage(key)` serializes a stable `@message:<semantic-key>` reference in the existing string field. The pilot's choice reactions (`lastNote`) and journal (`journal[].text`) store references rather than translated prose. `presentText` resolves them using the active locale and saved player name; browser reactions, journal, recap and CLI views use it. Grounding's description uses the same reference resolver without adding persisted knowledge prose. Locale stays outside GameState, and switching never writes or advances a save. Other scenes still store their existing prose; this is an incremental persisted-text conversion, not a locale-neutral whole game.

Release 0.6.1 keeps schema 4 (same envelope/state shape) and increases content epoch to 4 because stored-text semantics changed. Epoch-3 saves are rejected with the existing fresh-semester explanation; no migration. See [versioning](VERSIONING.md) and [pilot evidence](design/PLAYTHROUGH-FINDINGS.md#shared_1-pilot-validation--28-october-2026).
