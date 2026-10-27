# Localization contract

> Status: First incremental implementation, 27 October 2026. Hungarian remains the gameplay language.

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
save decoding. Locale selection will be a presentation preference outside game
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
text with stable IDs. Add locale selection to browser and CLI only with truthful
coverage indicators. English save messages alone do not constitute English
gameplay. Plural messages must use locale-aware rules when needed; no plural API
or full translation coverage is claimed in this step.

## Interface extraction checkpoint — 27 October 2026

All seven `ui/*.tsx` components resolve their own labels through the shared API, including accessibility names, numeric feedback and deadlines. Brand/character proper names remain unchanged. Complete templates let translators reorder values without translating stored data. Puzzle card names and collectible names are extracted; their numeric IDs, symbols and gameplay remain unchanged.

English catalog entries do not expose an English language selector yet. Components still use the Hungarian default. Route names, locations, scene titles/prose, gift descriptions/notes/reactions, epilogues, animation descriptions, runtime notices and save feedback stored in the store still need locale-aware presentation integration. Journal prose is still persisted as before. No compatibility epoch change is needed for this label-only extraction.
