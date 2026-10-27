# Localization contract

> Status: Partial translation with live browser/CLI switching, 27 October 2026. Unextracted content remains Hungarian.

## Shared API

Browser and CLI presentation code may call `translate(key, params, locale)` from
`src/game/content/localization.ts`. Locale is explicit (`hu` or `en`), defaults
to Hungarian, and is not global mutable state. Save feedback accepts the same
optional locale: `saveMessage(result, 'en')`. Existing callers retain Hungarian.

Hungarian is the source catalog. Use stable semantic keys such as
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
| Currency and numeric formatting | content/format.ts | Pending; currently hu-HU |
| Puzzle/economy/gift text | content/puzzles.ts, gifting.ts, outings.ts | Pending |
| Journals, recaps and knowledge | content/knowledge.ts, rules.ts, runtime.ts; engine state | Pending persisted-text audit |
| Scene titles, lines, choices and reactions | content scene modules and authoring.ts | Pending |
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

Next: extract content-owned labels (locations/routes), item/asset descriptions and runtime feedback; audit persisted text, then extract scene
text with stable IDs. Preserve the partial-translation indicators in browser and CLI. English save messages alone do not constitute English
gameplay. Plural messages must use locale-aware rules when needed; no plural API
or full translation coverage is claimed in this step.

## Interface extraction checkpoint — 27 October 2026

All seven `ui/*.tsx` components resolve their own labels through the shared API, including accessibility names, numeric feedback and deadlines. Brand/character proper names remain unchanged. Complete templates let translators reorder values without translating stored data. Puzzle card names and collectible names are extracted; their numeric IDs, symbols and gameplay remain unchanged.

English catalog entries are now available through the live language selector. Hungarian remains the default when no preference is set. Route names, locations, scene titles/prose, gift descriptions/notes/reactions, epilogues, animation descriptions and runtime notices still need extraction. Save notices now retain their result data and are formatted in the active locale. Journal prose is still persisted as before. No compatibility epoch change is needed for this label-only extraction.

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
