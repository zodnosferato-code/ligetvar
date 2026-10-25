# Ligetvár — útmutató fejlesztőknek

> **Status:** Active. | **Purpose:** Contributor rules and authoritative project guidance.

A teljes [dokumentációs index](docs/README.md) felsorolja az aktív és archivált forrásokat. A [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md), különösen a 10. fejezet az irányadó. A számozott korábbi dokumentumok a [docs/archive/legacy-design/](docs/archive/legacy-design/) mappába kerültek; történeti források, ellentmondás esetén nem írják felül az új tervet. A jelenlegi motor működését az [ENGINE.md](ENGINE.md), a tényleges ellenőrzéseket és hátralévő munkát a [haladási napló](docs/REDESIGN-PROGRESS.md) írja le.

## Aktív rendszer

- React, Zustand, Vite; változatlan technológiai keret, UI nélkül tesztelhető reducer logika a `src/game/engine/` alatt, befecskendezett kampányszabályokkal.
- Egyetlen aktív történetregiszter: `src/game/content/catalog.ts`, a `shared.ts`, `relationships.ts`, `triad.ts`, `optional.ts`, `opening.ts` és `conversations.ts` tartalommodulokból összeállítva. Ne tölts vissza dialógust az archív JSON/lokalizációs állományokból.
- A motor (`src/game/engine/`) nem ismerhet konkrét szereplőt, jelenetazonosítót, történeti mérföldkövet vagy befejezést. A kampány szabályai a `content/rules.ts`, típusai a `content/types.ts`, epilógusai a `content/epilogues.ts` alatt vannak. A `content/runtime.ts` köti össze őket az általános motorral.
- A felhasználó dönt a további implementációs irányokról. A 2026-10-19-én jóváhagyott TypeScript tartalommodulok és habitusok szerint dolgozz; új architektúrát vagy új karakterirányt ne nyilváníts jóváhagyottnak. A [karakterhangok](docs/CHARACTER-VOICES.md) rögzítik az irányt és a még ki nem bontott részeket.
- 16 hét; hetente egy garantált közös történeti sáv, majd egy nappali és egy éjszakai szabad sáv (a felhasználó 2026-10-21-i választása). A jelenet folytatása ingyenes, a befejezése egy sávot használ. Nincs extra automatikus műhely.
- Tervező (2026-10-20): két tervező: nappali iroda és éjszakai hálószoba. A hálószobában a telefon, napló, pihenés és ajándékok érhetők el; műhely és munka az irodában. Az ajtó úti célokat és az ott elérhető jeleneteket kínál, nem egyszerű szobaváltó. A 2026-10-21-i tevékenységfelülvizsgálat óta a sávok rögzített sorrendje közös → nappal → éjszaka → összegzés; a központot a mentett sáv határozza meg, nem szabad szobaválasztás. Munka és felkészülés csak nappal; T7/T8 csak éjszaka; más személyes és kávés alkalom mindkét sávban. A rugalmas jelenetek megvilágítása a sávhoz igazodik. A két felkészülés külön hétre fér el. A részletes szabályok az ENGINE.md-ben vannak. A háttér tárgyai kattinthatók; minden interaktív terület körvonala és címkéje mindig látható. Ha nincs megfelelő tárgy a képen, jól látható, címkézett ikongomb szükséges (2026-10-21-i felhasználói módosítás). A telefon csak meglévő személyes találkozót/kávét egyeztet, nem indít külön telefonbeszélgetést. Úti cél és tárgymenü megnyitása nem használ sávot; a heti közös alkalom továbbra sem hagyható ki.
- Képernyő-kompozíció (2026-10-20): a beszélgetőpartner portréja a helyszínháttérre rétegzett, átlátszó kép; nem a szövegdobozban van. Mobilon is a háttérterületre kerül, a szöveg és választások alatta maradnak. Márton/játékos és az elbeszélés nem kap képet vagy portréhelyőrzőt. A hiányzó NPC-kép kis, jelölt helyőrző, nem teljes hátteret fedő panel.
- Minden jelenetnek explicit résztvevői, beszélője, helyszíne, háttere, kifejezése, előfeltételei és határideje van. Legfeljebb négy kontextuális választás; kötelező jó/rossz ranglétra nincs.
- A tudás és az igenek tanúsított jelenetbefejezésből származnak. Ismételt beszélgetés, pénz vagy ajándék nem ad elköteleződést.
- A Márton–Rebeka, Márton–Boglárka, Rebeka–Boglárka és Márton–Gréta kapcsolódások külön mezők. A hármas kapcsolat mindhárom résztvevő igenjét igényli.
- Kötelező sorrend: 15. heti konfrontáció és a vámpír halála → 16. heti intézményi utóélet → két szabad sávban személyes utóbeszélgetések → lezárás és epilógus.
- A nyomozás románc nélkül és gyenge felkészüléssel is végigjátszható.

## Mentés és képek

A felhasználó 2026-10-25-i döntése szerint visszafelé kompatibilitás nem követelmény. Csak a jelenlegi, verziózott mentésborítékot támogatjuk (`ligetvar-save`); ne tarts fenn régi azonosítókat, migrációkat, névimportot vagy alternatív játékszabályokat korábbi mentések miatt.

A képek kanonikus forrása az `assets/` a repóban. Az aktív manifest a `src/game/content/assets.ts`. A korábbi karakterképek és képzési instrukciók az archívumba kerültek; Rebeka, Boglárka és Gréta átnézett semleges runtime portréja az `assets/characters/` alatt van; a többi szereplő helyőrző. A hiányzó kifejezések az adott szereplő semleges képére esnek vissza. A teljes képi készlet végső felhasználói jóváhagyása még nyitott. Az [art register](docs/ART-REGISTER.md) külön sorolja a hiányzó készletet. Ne generálj explicit szexuális vagy meztelen képet; a hiánya nem lehet motor- vagy történeti kapu. A történeti, nem aktív képek az `assets/archive/` alatt vannak. A játék csak a manifestben felsorolt eszközöket használja; az archívum nem kerül publikált assetútvonalakra.

## Ellenőrzés és munkafolyamat

```bash
npm ci
npm test
npm run typecheck
npm run build
```

A tesztek jelenetgráfot, előfeltételeket, tudássorrendet, mentéseket, döntéseket, időbeosztást, teljes útvonalakat és végsorrendet ellenőriznek. Új szabályhoz érdemi esetet adj. Ne állíts sikeres tesztet vagy vizuális ellenőrzést tényleges futtatás nélkül. A régi 27 teszt korábbi viselkedést vizsgált; az új készlet lecseréli az ellentmondó elvárásokat.

A felhasználó kérése szerint közvetlenül `main`-re commitolj, külön ág és PR nélkül, és ellenőrizd az Actions eredményét. Más munkáját őrizd meg, ne force-pusholj. A naplóban rögzítsd a futtatott parancsokat és az art/kiadási kapuk valós állapotát.

## Venice API (server-side tooling)

- Use the OpenAI-compatible Venice endpoint `https://api.venice.ai/api/v1` with chat model `zai-org-glm-5-2`.
- Read credentials exclusively from `process.env.VENICE_API_KEY`; never commit credentials, log tokens, or expose them through `VITE_*` or client-side code. This is a public Vite application.
- Store the credential as the GitHub Actions repository secret `VENICE_API_KEY` when automation needs it. Never print or interpolate secrets into logs.
- Validate chat connectivity with `npm run venice:smoke` in a trusted Node 22+ environment where the secret is available. The script sends a minimal non-sensitive `/chat/completions` request and reports HTTP failure without printing response bodies.
- Chat completion configuration is not an image-generation integration; select and validate an image-capable endpoint/model separately for any permitted image workflows.

## Venice art production

A felhasználó 2026-10-19-én kérte a szükséges képek módszeres generálását a Venice-integrációval. A [gyártási leltár](docs/VENICE-PRODUCTION.md) 32 runtime képet és öt referencialapot sorol fel. A képi promptok és referenciafüggőségek a `scripts/venice/catalog.mjs` alatt vannak; az `art-jobs/venice/request.json` változása indítja az Actions-munkafolyamatot. A pilot Rebeka semleges portréja és a tanterem; ezeket együtt ellenőrizd a készlet bővítése előtt.

Az `IMAGE_GENERATOR_KEY` kizárólag Actions secretként kerül a Node futtatókörnyezetbe. Kész képet és eredményt csak ténylegesen létrejött fájl alapján jelents. A `assets/generated/venice/` jelölt képeit prompt-, referencia- és fájlhash, méret, alpha és státusz kíséri. A generálás nem automatikus végső jóváhagyás; a runtime manifestbe vizuális ellenőrzés után kerülhet kép. A régi karakterképeket ne állítsd vissza.

Jóváhagyott képmodellpáros (2026-10-19): `wai-Illustrious` + `firered-image-edit`. Portré-alpha: Venice `/image/background-remove`. A korábbi GPT-modellazonosítók a tényleges kulccsal nem érhetők el; ne állítsd őket vissza ellenőrzés nélkül. A modellképességekhez igazított paramétereket a `scripts/venice/profile.mjs` állítja össze.


## Reviewed runtime art — 21 October 2026

The first playable art batch contains three neutral women portraits and the classroom. Use the cleaned masters in `assets/generated/portrait-cutouts/` as identity references for subsequent expressions, not the older opaque Venice candidates. Their manifest records both source and export hashes. WAI/FireRed sources were cleaned into transparent cutouts with the built-in imagegen tool; do not claim Venice produced alpha. Only the 640×800 WebP exports enter `assets/characters/`; generation masters, prompts and rejected candidates stay outside public paths. The reviewed classroom is `backgrounds/classroom-anime-v1.webp`; existing office/bedroom hotspot backgrounds stay unchanged. `reviewed` means assistant visual/runtime review, not final user approval of the entire art set. Produce and inspect one dependent image at a time.

## ChatGPT art production — 22 October 2026

The user reports Venice credits are exhausted and requests ChatGPT generation. Use the built-in imagegen tool, one image at a time; do not launch Venice requests or paid retries. Current production and review checkpoint: [CHATGPT-PRODUCTION.md](docs/CHATGPT-PRODUCTION.md). Keep the cleaned neutral portraits as identity masters. Record full prompts, source/output hashes and honest assistant review status under `assets/generated/chatgpt/`; only reviewed WebP exports enter runtime. Preserve office/bedroom hotspot backgrounds until a replacement and its hotspot alignment have both been checked. Final user acceptance remains open.

### User workflow update — 22 October 2026

The user now asks to generate as quickly as possible and inspect afterward. Independent edits may be generated concurrently from the existing cleaned neutral masters, followed by batch visual/alpha/runtime review before promotion. Do not chain unreviewed outputs as identity references. This supersedes the earlier one-image-at-a-time production instruction for independent jobs. Continue using built-in imagegen, no Venice calls.

## Approved leisure direction — 25 October 2026

The user selected relaxed move-limited puzzles, money plus spendable activity points, and full-slot jobs with substantial rewards. [LEISURE-ECONOMY.md](docs/LEISURE-ECONOMY.md) is authoritative for the implemented economy. Jobs remain daytime-only. The phone now includes persistent gift replies and six optional paid outings, extending the earlier meetings-only rule. Save every puzzle move; never accept arbitrary UI reward amounts or permit reward duplication. Do not maintain backward compatibility. Require the complete current save schema; old saves require a fresh game. Personalized gifts never substitute for commitment or required-story evidence.

## Ordered implementation objectives — 25 October 2026

Follow [IMPLEMENTATION-ROADMAP.md](docs/IMPLEMENTATION-ROADMAP.md): first game/save versioning and clear breaking-save messages, then a fully playable agent/proofreader CLI with concise visual asset descriptions, then localisation and complete English text. Detection of incompatible saves is required; migration and backward-compatible gameplay are not. Update its task checkboxes, evidence and handoff log as work progresses. Planned APIs are proposals until implemented; do not describe them as existing commands.

Release/save policy: [VERSIONING.md](docs/VERSIONING.md). Runtime release comes from package.json; independent schema/content epochs decide save compatibility. Detect incompatible historical saves without loading/migrating them. Keep the stable save key so breaking updates remain explainable.

## CLI gameplay testing — 0.3.0

Use [CLI.md](docs/CLI.md) and `npm run play:cli -- --save PATH`; agents should use `npm run --silent play:cli -- --json --save PATH`. Browser and CLI share `content/actions.ts`. Normal observations hide unearned evidence and face-down cards; full catalog inspection requires explicit `--author`. Do not turn proofreader findings into story changes automatically. `npm test` now runs engine/content plus CLI process tests; `npm run test:headless` remains the engine-only alias. Keep each agent's save path separate. Localisation/English is the next roadmap phase.

## Staged scene direction — 25 October 2026

The user prioritized multi-location scenes, physical closeness/kissing, natural date endings, same-scene conversational memory and eventual adjustable campaign length. The first four have an initial implementation in 0.4.0; [SCENE-STAGING.md](docs/SCENE-STAGING.md) is the authoring contract and scope tracker. Use explicit `Line.stage` references and the shared `sceneStage` resolver; do not infer stage state from previously rendered lines. `localRequires` reads only pending decisions within the active scene and must not certify global evidence early. Moving to a quieter place is a separate choice from physical closeness. Current campaign duration remains 16 weeks; configurable milestone scheduling is still outstanding. This user-prioritized work supersedes localisation as the immediate task; retain the localisation backlog.

## Virág and limited animation — 0.5.0

User-approved addition: [VIRAG-STORY.md](docs/VIRAG-STORY.md), with `content/virag.ts` in the sole registry. Virág is a 19-year-old adult reporter, an optional side character, never a student assessed by Márton. She continues teasing/inviting after refusal; no professional-only route and no bad ending for her. Refused touch must not occur. All her corruption cases succeed independently of romance; no interactions with the other women or vampire-route gates. Keep main bond/direction systems unchanged. The fictional Szabad Hullám movement is her own perspective.

[ANIMATION-PLAN.md](docs/ANIMATION-PLAN.md) governs short GIF-like WebP/GIF loops from a few still frames. `Line.moment` and `MOMENT_CLIPS` provide optional rendering; reduced-motion and pause use a distinct static poster. Planned assets must remain null and labelled unproduced. Virág portraits, hallway art and three clips are still missing. No provider credentials or paid generation were added. Schema 4/content epoch 2 remain unchanged for these additive scenes.
