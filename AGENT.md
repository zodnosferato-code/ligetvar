# Ligetvár — útmutató fejlesztőknek

A [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md), különösen a 10. fejezet az irányadó. A számozott korábbi dokumentumok a [docs/archive/legacy-design/](docs/archive/legacy-design/) mappába kerültek; történeti források, ellentmondás esetén nem írják felül az új tervet. A jelenlegi motor működését az [ENGINE.md](ENGINE.md), a tényleges ellenőrzéseket és hátralévő munkát a [haladási napló](docs/REDESIGN-PROGRESS.md) írja le.

## Aktív rendszer

- React, Zustand, Vite; változatlan technológiai keret, UI nélkül tesztelhető reducer logika a `src/game/engine/` alatt.
- Egyetlen aktív történetforrás: `src/game/content/catalog.ts`. Ne tölts vissza dialógust a régi JSON/lokalizációs állományokból.
- 16 hét; hetente egy garantált közös történeti sáv, két szabad sáv. A jelenet folytatása ingyenes, a befejezése egy sávot használ. Nincs extra automatikus műhely.
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
