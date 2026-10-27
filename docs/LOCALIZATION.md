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
| UI labels and accessibility text | ui/*.tsx, audio.ts | Pending |
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

Next: extract shared interface labels, audit persisted text, then extract scene
text with stable IDs. Add locale selection to browser and CLI only with truthful
coverage indicators. English save messages alone do not constitute English
gameplay. Plural messages must use locale-aware rules when needed; no plural API
or full translation coverage is claimed in this step.
