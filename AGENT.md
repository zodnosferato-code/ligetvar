# Ligetvár — útmutató fejlesztőknek

> **Status:** Active. | **Purpose:** Contributor rules and authoritative project guidance.

A teljes [dokumentációs index](docs/README.md) felsorolja az aktív és archivált forrásokat. A [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md), különösen a 10. fejezet az irányadó. A számozott korábbi dokumentumok a [docs/archive/legacy-design/](docs/archive/legacy-design/) mappába kerültek; történeti források, ellentmondás esetén nem írják felül az új tervet. A jelenlegi motor működését az [ENGINE.md](ENGINE.md), a tényleges ellenőrzéseket és hátralévő munkát a [haladási napló](docs/REDESIGN-PROGRESS.md) írja le.

## Aktív rendszer

- React, Zustand, Vite; változatlan technológiai keret, UI nélkül tesztelhető reducer logika a `src/game/engine/` alatt, befecskendezett kampányszabályokkal.
- Egyetlen aktív történetregiszter: `src/game/content/catalog.ts`, a `shared.ts`, `relationships.ts`, `triad.ts`, `optional.ts`, `opening.ts` és `conversations.ts` tartalommodulokból összeállítva. Ne tölts vissza dialógust az archív JSON/lokalizációs állományokból.
- A motor (`src/game/engine/`) nem ismerhet konkrét szereplőt, jelenetazonosítót, történeti mérföldkövet vagy befejezést. A kampány szabályai a `content/rules.ts`, típusai a `content/types.ts`, epilógusai a `content/epilogues.ts` alatt vannak. A `content/runtime.ts` köti össze őket az általános motorral.
- A felhasználó dönt a további implementációs irányokról. A 2026-10-19-én jóváhagyott TypeScript tartalommodulok és habitusok szerint dolgozz; új architektúrát vagy új karakterirányt ne nyilváníts jóváhagyottnak. A [karakterhangok](docs/CHARACTER-VOICES.md) rögzítik az irányt és a még ki nem bontott részeket.
- 16 hét; hetente egy garantált közös történeti sáv, két szabad sáv. A jelenet folytatása ingyenes, a befejezése egy sávot használ. Nincs extra automatikus műhely.
- Tervező (2026-10-20): két tervező: nappali iroda és éjszakai hálószoba. A hálószobában a telefon, napló, pihenés és ajándékok érhetők el; műhely és munka az irodában. Az ajtó úti célokat és az ott elérhető jeleneteket kínál, nem egyszerű szobaváltó. Ez szobaszerep, nem új óra vagy kötelező nappal/éjjel sávszabály. A háttér tárgyai kattinthatók; minden interaktív terület körvonala és címkéje mindig látható. Ha nincs megfelelő tárgy a képen, jól látható, címkézett ikongomb szükséges (2026-10-21-i felhasználói módosítás). A telefon csak meglévő személyes találkozót/kávét egyeztet, nem indít külön telefonbeszélgetést. Szobaváltás és tárgymenü megnyitása nem használ sávot; a heti közös alkalom továbbra sem hagyható ki.
- Képernyő-kompozíció (2026-10-20): a beszélgetőpartner portréja a helyszínháttérre rétegzett, átlátszó kép; nem a szövegdobozban van. Mobilon is a háttérterületre kerül, a szöveg és választások alatta maradnak. Márton/játékos és az elbeszélés nem kap képet vagy portréhelyőrzőt. A hiányzó NPC-kép kis, jelölt helyőrző, nem teljes hátteret fedő panel.
- Minden jelenetnek explicit résztvevői, beszélője, helyszíne, háttere, kifejezése, előfeltételei és határideje van. Legfeljebb négy kontextuális választás; kötelező jó/rossz ranglétra nincs.
- A tudás és az igenek tanúsított jelenetbefejezésből származnak. Ismételt beszélgetés, pénz vagy ajándék nem ad elköteleződést.
- A Márton–Rebeka, Márton–Boglárka, Rebeka–Boglárka és Márton–Gréta kapcsolódások külön mezők. A hármas kapcsolat mindhárom résztvevő igenjét igényli.
- Kötelező sorrend: 15. heti konfrontáció és a vámpír halála → 16. heti intézményi utóélet → két szabad sávban személyes utóbeszélgetések → lezárás és epilógus.
- A nyomozás románc nélkül és gyenge felkészüléssel is végigjátszható.

## Mentés és képek

A v2 külön kulcsot használ; a régi v1 változatlanul megmarad, történetét újra kell kezdeni. Csak a játékosnév vehető át külön kérésre. Régi páros útvonalat vagy flaget ne fordíts új vállalássá.

A képek kanonikus forrása az `assets/` a repóban. Az aktív manifest a `src/game/content/assets.ts`. A korábbi karakterképek és képzési instrukciók az archívumba kerültek; a runtime karakterportrék jelenleg helyőrzők. Új vizuális karakter-lock még nincs jóváhagyva. Az [art register](docs/ART-REGISTER.md) külön sorolja a hiányzó készletet. Ne generálj explicit szexuális vagy meztelen képet; a hiánya nem lehet motor- vagy történeti kapu. A történeti, nem aktív képek az `assets/archive/` alatt vannak. A játék csak a manifestben felsorolt eszközöket használja; az archívum nem kerül publikált assetútvonalakra.

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
