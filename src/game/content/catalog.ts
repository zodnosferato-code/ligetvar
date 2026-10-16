import type {
  ActionDef,
  Choice,
  DialogueNode,
  Effect,
  GiftDef,
  GirlId,
  LocationId,
  Quality,
  StoryEvent,
} from "../engine/types.ts";
import { mergePart1 } from "./part1.ts";
import { mergeLater } from "./later.ts";

function pub(file: string) {
  const env = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env;
  const base = env?.BASE_URL ?? "/";
  return `${base}${file}`;
}

export const PORTRAIT: Record<GirlId, string> = {
  rebeka: pub("characters/rebeka/rebeka-face-front.jpg"),
  boglarka: pub("characters/boglarka/boglarka-face-front.jpg"),
  greta: pub("characters/greta/greta-emotion-smile.jpg"),
};

const MOOD: Record<GirlId, Record<string, string>> = {
  rebeka: {
    anger: pub("characters/rebeka/rebeka-emotion-anger.jpg"),
    smile: pub("characters/rebeka/rebeka-emotion-halfsmile.jpg"),
    soft: pub("characters/rebeka/rebeka-emotion-vulnerable.jpg"),
    yield: pub("characters/rebeka/rebeka-emotion-yielding.jpg"),
  },
  boglarka: {
    blush: pub("characters/boglarka/boglarka-emotion-blush.jpg"),
    smile: pub("characters/boglarka/boglarka-emotion-smile.jpg"),
    trust: pub("characters/boglarka/boglarka-emotion-trust.jpg"),
  },
  greta: {
    fluster: pub("characters/greta/greta-emotion-flustered.jpg"),
    smile: pub("characters/greta/greta-emotion-smile.jpg"),
    yield: pub("characters/greta/greta-emotion-yielding.jpg"),
  },
};

const REACTION: Record<string, "anger" | "soft" | "yield" | "smile" | "blush" | "trust" | "neutral"> = {
  nyugalom: "smile",
  semleges: "neutral",
  hideg: "anger",
  elpirulas: "blush",
  szegyenos: "blush",
  elrejtozik: "soft",
  gongy: "anger",
  megbantott: "soft",
  enyhe_mosoly: "smile",
  kis_elegedett: "smile",
  yielding: "yield",
  "koncentrált": "neutral",
  fegyelmezett_duh: "anger",
  osszevont: "anger",
  duhos_csend: "anger",
  sebezheto: "soft",
  elpirulas_mosoly: "blush",
  "lágy_mosoly": "smile",
  szomorkas: "soft",
  nyugalom_intense: "smile",
  duh: "anger",
  zavar_elpirul: "blush",
  kis_mosoly: "smile",
  "lágy_bizalom": "trust",
  duhos: "anger",
  elpirul_es_elrejtozik: "blush",
  szaraz_mosoly: "smile",
  kis_elegedett_mosoly: "smile",
  osszevont_szemoldok: "anger",
  fegyelmezett: "neutral",
  engedelmes: "yield",
  zavar: "blush",
  elegedett_felmosoly: "smile",
  hideg_tekintet: "anger",
  felmosoly: "smile",
  unalom: "anger",
};

function moodFace(girl: GirlId, mood: (typeof REACTION)[string]): string {
  const face = MOOD[girl];
  if (mood === "blush" || mood === "soft") return face.blush ?? face.soft ?? face.fluster ?? PORTRAIT[girl];
  if (mood === "yield") return face.yield ?? face.trust ?? face.soft ?? PORTRAIT[girl];
  if (mood === "smile") return face.smile ?? PORTRAIT[girl];
  if (mood === "trust") return face.trust ?? face.smile ?? PORTRAIT[girl];
  if (mood === "anger") return face.anger ?? face.fluster ?? face.blush ?? PORTRAIT[girl];
  return PORTRAIT[girl];
}

export function portraitFor(girl: GirlId, expression = ""): string {
  const mark = expression.toLowerCase().replaceAll(" ", "_");
  const mood = REACTION[mark];
  if (!mood || mood === "neutral") return PORTRAIT[girl];
  return moodFace(girl, mood);
}

export const FULL_BODY: Record<GirlId, string> = {
  rebeka: pub("characters/rebeka/rebeka-full-front-clothed.jpg"),
  boglarka: pub("characters/boglarka/boglarka-full-front-clothed.jpg"),
  greta: pub("characters/greta/greta-full-front-clothed.jpg"),
};

const PLATE: Record<string, string> = {
  rebeka_nappali_feny: "rebeka-light-classroom-keyhole.jpg",
  rebeka_foto_kerdes: "rebeka-light-classroom-v2.jpg",
  rebeka_lakas_szimbolika: "rebeka-medium-pulled-dress-v2.jpg",
  rebeka_intimate_private: "rebeka-medium-apartment-bed.jpg",
  rebeka_yield_control: "rebeka-soft-rope.jpg",
  rebeka_part2_intro: "rebeka-medium-apartment-bed.jpg",
  rebeka_bekas_private: "rebeka-rain-balcony.jpg",
  rebeka_yield_full: "rebeka-hardcore-yield-kneeling.jpg",
  rebeka_desire_fulfill: "rebeka-nude-reclining.jpg",
  rebeka_ending_true: "rebeka-nude-sitting-bed.jpg",
  rebeka_ending_quiet: "rebeka-window-sill.jpg",
  boglarka_lakas_kutatas: "boglarka-light-library-cardigan.jpg",
  boglarka_slow_explore: "boglarka-medium-lingerie-sitting.jpg",
  boglarka_body_praise: "boglarka-medium-lingerie-bed.jpg",
  boglarka_part2_intro: "boglarka-medium-lingerie-v2.jpg",
  boglarka_slow_full: "boglarka-nude-sitting-bed.jpg",
  boglarka_body_full: "boglarka-spread-recline.jpg",
  boglarka_desire_fulfill: "boglarka-nude-reclining.jpg",
  boglarka_ending_true: "boglarka-nude-sitting-bed.jpg",
  boglarka_ending_quiet: "boglarka-light-library-v2.jpg",
  greta_lakas_irat: "greta-light-office-open-shirt.jpg",
  greta_rule_break: "greta-medium-desk-lingerie.jpg",
  greta_yield: "greta-soft-rope.jpg",
  greta_part2_intro: "greta-medium-desk-v2.jpg",
  greta_rule_full: "greta-hardcore-bound-v2.jpg",
  greta_yield_full: "greta-hardcore-bound-yield.jpg",
  greta_desire_fulfill: "greta-nude-reclining.jpg",
  greta_ending_true: "greta-nude-sitting-desk.jpg",
  greta_ending_quiet: "greta-window-sill.jpg",
};

// Short dialogue node IDs (from part1 JSON) map to the canonical illustration keys.
const ILLUSTRATION_ALIAS: Record<string, string> = {
  rebeka_intimate: "rebeka_intimate_private",
  rebeka_yield: "rebeka_yield_control",
  boglarka_explore: "boglarka_slow_explore",
  boglarka_praise: "boglarka_body_praise",
  greta_rule: "greta_rule_break",
};

export function illustrationFor(nodeId: string, girl: GirlId, route: string): string | null {
  const cleaned = nodeId.replace(/_(?:vg|good|bad|vb)?_react$/, "").replace(/_react$/, "");
  const stem = ILLUSTRATION_ALIAS[cleaned] ?? cleaned;
  if (route === "boglarka_greta" && /desire|ending_true|kiss/.test(stem)) {
    return pub("references/intim/boglarka-greta-kiss-bed.jpg");
  }
  if (route === "rebeka_greta" && /desire|ending_true|kiss/.test(stem)) {
    return pub("references/intim/rebeka-greta-kiss-soft.jpg");
  }
  const file = PLATE[stem];
  if (!file || !file.startsWith(girl)) return null;
  return pub(`references/intim/${file}`);
}

export const GIRL_NAME: Record<GirlId, string> = {
  rebeka: "Rebeka Dorn",
  boglarka: "Boglárka Fazekas",
  greta: "Gréta Váradi",
};

export const CAST: Record<
  GirlId,
  { age: number; year: string; blurb: string; haunt: string }
> = {
  rebeka: {
    age: 20,
    year: "másodéves, média",
    blurb:
      "Gőgös és pontos. A Holdkör a páncélja. Nem akar történet lenni, és nem tűri a közönséget.",
    haunt: "Este a Holdkör alagsorában",
  },
  boglarka: {
    age: 19,
    year: "elsőéves, irodalom",
    blurb:
      "Félénk, amíg a mondata végét meg nem várják. A kardigán és a könyv páncél. Utána szárazabb a humora, mint hinnéd.",
    haunt: "Délután a könyvtárteremben",
  },
  greta: {
    age: 21,
    year: "harmadéves demonstrátor",
    blurb:
      "A lista a biztonsága. A kivétel gyanús neki. Nem a beosztásod miatt marad, ha marad.",
    haunt: "Délelőtt a tanszéki szárnyban",
  },
};

export const LOCATION_BG: Record<LocationId, string> = {
  apartment: pub("backgrounds/apartment.jpg"),
  classroom: pub("backgrounds/classroom.jpg"),
  courtyard: pub("backgrounds/courtyard.jpg"),
  department: pub("backgrounds/department.jpg"),
  holdkor: pub("backgrounds/holdkor-night.jpg"),
  library: pub("backgrounds/library.jpg"),
  bekas: pub("backgrounds/bekas-to.jpg"),
  bookshop: pub("backgrounds/library.jpg"),
  cinema: pub("backgrounds/hallway.jpg"),
  peron: pub("backgrounds/hallway.jpg"),
  construction: pub("backgrounds/courtyard.jpg"),
  mohu: pub("backgrounds/courtyard.jpg"),
};

export const LOCATION_LABEL: Record<LocationId, string> = {
  apartment: "Lakosztály",
  classroom: "Kastélyterem",
  courtyard: "Belső udvar",
  department: "Tanszéki szárny",
  holdkor: "Holdkör, alagsor",
  library: "Könyvtárterem",
  bekas: "Békás-tó",
  bookshop: "Könyvesbolt",
  cinema: "Kis mozi",
  peron: "Éjszakai peron",
  construction: "Építkezés",
  mohu: "A liget széle",
};

const I = {
  talk: pub("icons/icon_door.png"),
  call: pub("icons/icon_phone.png"),
  gift: pub("icons/icon_shelf.png"),
  gym: pub("icons/icon_bottles.png"),
  rest: pub("icons/icon_chair.png"),
  study: pub("icons/icon_book.png"),
  task: pub("icons/icon_book.png"),
  apartment: pub("icons/icon_door.png"),
  classroom: pub("icons/icon_chair.png"),
  courtyard: pub("icons/icon_door.png"),
  holdkor: pub("icons/icon_door.png"),
  library: pub("icons/icon_book.png"),
  money: pub("icons/icon_stat_money.png"),
  calm: pub("icons/icon_stat_calm.png"),
  insight: pub("icons/icon_stat_insight.png"),
  presence: pub("icons/icon_stat_presence.png"),
  energy: pub("icons/icon_stat_energy.png"),
};

export const STAT_ICON = {
  presence: I.presence,
  insight: I.insight,
  calm: I.calm,
  money: I.money,
  energy: I.energy,
};

export const HEART_FULL = pub("icons/ui_heart_full.png");
export const HEART_EMPTY = pub("icons/ui_heart_empty.png");

export const HUB_ICON = {
  door: pub("icons/icon_door.png"),
  book: pub("icons/icon_book.png"),
  rest: pub("icons/icon_chair.png"),
  phone: pub("icons/icon_phone.png"),
  shelf: pub("icons/icon_shelf.png"),
  bag: pub("icons/icon_bottles.png"),
};

function c(
  id: string,
  text: string,
  quality: Quality,
  effect: Effect,
  reaction: string,
  requires?: Choice["requires"],
): Choice {
  return { id, text, quality, effect, reaction, requires };
}

function node(
  id: string,
  speaker: DialogueNode["speaker"],
  text: string,
  kind: DialogueNode["kind"],
  choices: Choice[],
  journal?: string,
  cost?: number,
  speakerLabel?: string,
  artCaption?: string,
): DialogueNode {
  return { id, speaker, text, kind, choices, journal, cost, speakerLabel, artCaption };
}

const NODES: Record<string, DialogueNode> = {};

function add(n: DialogueNode) {
  if (n.choices.length < 1 || n.choices.length > 4) {
    throw new Error(`A(z) ${n.id} csomópontnak 1–4 választása lehet.`);
  }
  NODES[n.id] = n;
}

const onward = c("continue", "Tovább", "good", {}, "tovább");

add(
  node(
    "brief_open",
    "narrator",
    "{{name}} vagy, harmincnégy éves tanulmányi vezető a Ligetvári Főiskolán. A főiskola egy tizenkilencedik századi kastély. Az irodád és a lakosztályod is a szárnyában van: kőfal, íves ablak, modern asztal a régi gerendák alatt.\n\nTizenhat hét, hetente három sáv. Délelőtt, délután, este. Hétfőn a fizetés magától jön. A hét végén gyógytorna van, és ott dől el, kivel maradsz óra után.\n\nGréta Váradi délelőtt a tanszéken van. Pontos, és a lista a biztonsága. Boglárka Fazekas délután a könyvtárban ül. Halk, amíg a mondata végét meg nem várják. Rebeka Dorn este a Holdkör alagsorában. Nem akar történet lenni, és nem tűri a közönséget.\n\nA bizalom új jelenetből nő, ismétlésből alig. Négy kemény sáv után pihenned kell. Ha felhívsz valakit, este külön gomb enged be. A nyolcadik hét végén zársz: egy lányt, egy összeillő párt, vagy senkit.",
    "ambient",
    [onward],
    "A félév a kastélyban kezdődik.",
  ),
);

add(
  node(
    "brief_act2",
    "narrator",
    "Véget ért a közös szakasz. Nyolc hétig mindhárman a saját helyükön voltak: Gréta a tanszéken, Boglárka a könyvtárban, Rebeka a Holdkörben.\n\nMostantól egy útvonal van. Aki rajta van, vele mélyül a félév. Aki nincs, hidegen marad a folyosón. Randi és a tó innentől nyílhat, ha a bizalom és a közelség megvan. A pletyka és a kockázat még mindig számít.",
    "ambient",
    [onward],
    "A közös szakasz lezárult.",
  ),
);

add(
  node(
    "brief_act3",
    "narrator",
    "A zárt szakasz vége. Ez az utolsó hét, utána nincs új sáv.\n\nAmi a bizalomból, a határból és a kockázatból összegyűlt, a záráson dől el. Lehet csendes vég, igaz vég, vagy törés. Aki az útvonalon van, nála dől el. Aki nincs, már nem lép be.",
    "ambient",
    [onward],
    "Az utolsó hét kezdődik.",
  ),
);

add(
  node(
    "rebeka_intro",
    "rebeka",
    "A Holdkör ma este ül össze. Te is jössz, tanár úr? A kulcs nálam van. A tanszéké nem.",
    "story",
    [
      c(
        "very_good",
        "Csak ha te rendezed a kört, és nem veszed el a kulcsot.",
        "very_good",
        { closeness: 6, trust: 1, flags: ["rebeka_kor"] },
        "elégedett félmosoly",
      ),
      c("good", "Ha van hely, megnézem. Nem szólok bele.", "good", { closeness: 2 }, "semleges"),
      c(
        "bad",
        "A tanárok nem szoktak ilyen helyekre járni.",
        "bad",
        { closeness: -2, anger: 1 },
        "hideg tekintet",
      ),
      c(
        "very_bad",
        "Majd elmesélem a tanszéken, milyen érdekes körötök van.",
        "very_bad",
        { closeness: -5, anger: 2, risk: 10 },
        "dühös csend",
      ),
    ],
    "Rebeka megmutatta a Holdkör kulcsát.",
  ),
);

add(
  node(
    "rebeka_feny",
    "rebeka",
    "Nappal minden átlagosnak tűnik. A kör nélkül… érdektelen. Mintha a fény levonná rólam a szerepet.",
    "story",
    [
      c(
        "very_good",
        "A nappali fény nem hazudik. Csak másra világít. Nem kell, hogy különleges legyél.",
        "very_good",
        { closeness: 5, trust: 1, flags: ["rebeka_feny"] },
        "nyugalom",
      ),
      c(
        "good",
        "A kör az éjszakáé. A nappal attól még a tiéd.",
        "good",
        { closeness: 3 },
        "semleges",
      ),
      c(
        "bad",
        "Különleges vagy a sötétben. Ez elég.",
        "bad",
        { closeness: -2, anger: 1 },
        "gőg",
      ),
      c(
        "very_bad",
        "A tanárok is csak a történetet keresik. Te is ezt várod tőlem, ugye?",
        "very_bad",
        { closeness: -4, anger: 2 },
        "hideg",
      ),
    ],
    "Rebeka nappal is szóba állt veled.",
  ),
);

add(
  node(
    "rebeka_foto",
    "rebeka",
    "A lakásodban nyugodtabb átbeszélni a fotók szimbolikáját. Nincs közönség. Nem kérek véleményt a tanszékről.",
    "story",
    [
      c(
        "very_good",
        "A sötét részek őszintébbek, mint a nappali fény. Nem kell átírni.",
        "very_good",
        { closeness: 5, trust: 1, flags: ["rebeka_foto"] },
        "nyugalom",
      ),
      c("good", "Rendben, nézzük meg. Nem viszem ki a folyosóra.", "good", { closeness: 2 }, "semleges"),
      c(
        "bad",
        "A tanár lakása furcsa hely erre.",
        "bad",
        { closeness: -2 },
        "gőg",
      ),
      c(
        "very_bad",
        "Majd később elmesélem valakinek, hogy itt voltál.",
        "very_bad",
        { closeness: -4, risk: 8, anger: 1 },
        "düh",
      ),
    ],
    "A fotók a lakásban maradtak.",
  ),
);

add(
  node(
    "rebeka_hatar",
    "rebeka",
    "Ha a kör miatt vagy itt, mondd ki. Ha a beosztásod miatt, azt is. Nem szeretek tartozni.",
    "story",
    [
      c(
        "very_good",
        "A műhely nem tartozás. A beosztásom sem. Ha maradsz, azért maradsz, mert akarod.",
        "very_good",
        { closeness: 4, trust: 1, flags: ["hatar"] },
        "a gőg egy pillanatra leül",
        { calm: 3 },
      ),
      c(
        "good",
        "Nem kérek semmit a műhelyért. A többit majd később.",
        "good",
        { closeness: 2 },
        "óvatos",
      ),
      c(
        "bad",
        "A jelenléted a körön már elég köszönet.",
        "bad",
        { closeness: -2, anger: 1 },
        "sértés",
      ),
      c(
        "very_bad",
        "Egy tanulmányi vezetőnek illik tudnia, ki mivel tartozik.",
        "very_bad",
        { closeness: -5, anger: 2, risk: 6 },
        "tartozásnak hallja",
      ),
    ],
    "Kimondtad Rebekának: a műhely nem tartozás.",
  ),
);

add(
  node(
    "rebeka_het8",
    "rebeka",
    "A nyolcadik hét vége közel. A kör is, a döntés is. Nem kérdezem kétszer.",
    "story",
    [
      c(
        "very_good",
        "A nappali fény nem tesz érdektelenné. Ha maradsz, maradsz. Nem történet.",
        "very_good",
        { closeness: 6, flags: ["rebeka_route_ready"] },
        "nyugalom",
      ),
      c("good", "A fotók készen vannak. A kör is. Én még itt vagyok.", "good", { closeness: 3 }, "semleges"),
      c(
        "bad",
        "A tanárnak is döntenie kell, kivel foglalkozik. Majd meglátjuk.",
        "bad",
        { closeness: -2, anger: 1 },
        "gőg",
      ),
      c(
        "very_bad",
        "Majd a tanszéken elmesélem, ki kivel volt.",
        "very_bad",
        { closeness: -5, anger: 2, risk: 10 },
        "dühös csend",
      ),
    ],
    "Rebeka megkérdezte, maradsz-e a félév után is a körben.",
  ),
);

add(
  node(
    "rebeka_route",
    "rebeka",
    "A lezárt szárny első bejárása után Rebeka külön mappába rendezi az eredeti felvételeket. „A legélesebb képet tenném ki, de ha túl korán következtetünk, Lilla vallomását is hitelteleníthetik. Segítesz eldönteni, mikor mutassuk meg a nyomokat?”",
    "story",
    [
      c(
        "very_good",
        "Előbb független ellenőrzést kérünk, aztán együtt döntünk arról, mi hozható nyilvánosságra.",
        "very_good",
        { closeness: 4, trust: 1, flags: ["rebeka_route_active"] },
        "a válla leereszt",
      ),
      c("good", "Az eredetit elmentjük; a nyilvánossággal várjunk.", "good", { closeness: 2, trust: 1 }, "megfontolja"),
      c(
        "bad",
        "Ez már nem a te dolgod. Add át a képeket, és kész.",
        "bad",
        { closeness: -2, anger: 1 },
        "sértés",
      ),
      c(
        "very_bad",
        "Tedd ki névvel együtt az egészet. A felhajtás majd reakcióra kényszeríti őket.",
        "very_bad",
        { closeness: -4, anger: 1, risk: 12, flags: ["rebeka_kozonseg"] },
        "közönségnek teszi ki",
      ),
    ],
    "Rebeka az eredeti felvételeket és a tanúvédelmet választotta a sietség helyett.",
  ),
);

add(
  node(
    "rebeka_kiss",
    "rebeka",
    "A folyosó üres. Megáll, és nem néz körbe. „Ha most nem, akkor sehol. Röviden.”",
    "story",
    [
      c(
        "very_good",
        "Itt. Röviden. Senkinek nem mesélem el.",
        "very_good",
        { closeness: 8, trust: 1, flags: ["flag_rebeka_kiss_light"] },
        "egy rövid csók, aztán egy lépés távolság",
      ),
      c("good", "Nem a folyosón. A lakásban, ha még akarod.", "good", { closeness: 2 }, "vállalja a halasztást"),
      c("bad", "Ez túl gyors. Menjünk vissza a terembe.", "bad", { closeness: -1 }, "visszalép"),
      c(
        "very_bad",
        "Holnap a tanszéken is ezt akarom, hogy lássák.",
        "very_bad",
        { closeness: -3, anger: 1, risk: 12, flags: ["rebeka_kozonseg"] },
        "ez hencegés",
      ),
    ],
    "Rebeka egy üres folyosón megállt.",
  ),
);

add(
  node(
    "rebeka_peron",
    "rebeka",
    "Az éjszakai peronon nincs Holdkör és nincs névsor. A vonat késik. Ő nem magyarázkodik.",
    "story",
    [
      c(
        "very_good",
        "Nem kell veszélyesebbnek lenned, mint a menetrend. Itt vagyok, és ennyi.",
        "very_good",
        { closeness: 10, trust: 1 },
        "a gőg kifárad",
        { presence: 4 },
      ),
      c("good", "Megvárom veled a vonatot. Nem kérdezek a sebről.", "good", { closeness: 5 }, "csend"),
      c("bad", "Unalmas hely. A kör érdekesebb volt.", "bad", { closeness: -2, anger: 1 }, "unalom"),
      c(
        "very_bad",
        "Lefotózom, és megmutatom a tanszéken, milyen vagy közönség nélkül.",
        "very_bad",
        { closeness: -6, anger: 2, risk: 8 },
        "elárulás",
      ),
    ],
    "Az éjszakai peronon nem volt közönség.",
  ),
);

add(
  node(
    "rebeka_repeat_0",
    "rebeka",
    "A kör ma rövidebb. A fényt te hozod, vagy én? Ne díszítsd a választ.",
    "repeat",
    [
      c("very_good", "A kulcs a köré. Nem kérem el, és nem mesélem el.", "very_good", { closeness: 4 }, "félmosoly"),
      c("good", "Majd a kör után beszélünk. Van időd.", "good", { closeness: 2 }, "semleges"),
      c("bad", "Egy tanárnak ez nem hely. Menjünk be a terembe.", "bad", { closeness: -1, anger: 1 }, "hideg"),
      c(
        "very_bad",
        "Holnap a titkárságon szóba hozom a kört.",
        "very_bad",
        { closeness: -4, anger: 2, risk: 8 },
        "fenyegetés",
      ),
    ],
  ),
);

add(
  node(
    "rebeka_repeat_1",
    "rebeka",
    "Nappal a folyosó mindent átlagossá tesz. Te is átlagosnak látszol, amíg nem szólsz.",
    "repeat",
    [
      c(
        "very_good",
        "Akkor szólok itt, ahol nincs közönség. Nem a történeted érdekel.",
        "very_good",
        { closeness: 4 },
        "a tekintete megáll",
        { insight: 3 },
      ),
      c("good", "Az átlagos nap is nap. Nem kell hozzá kulcs.", "good", { closeness: 2 }, "semleges"),
      c("bad", "Sötétben jobban áll neked a szöveg. Maradj annál.", "bad", { closeness: -2, anger: 1 }, "gőg"),
      c("very_bad", "Majd megírom helyetted, ki vagy a kör nélkül.", "very_bad", { closeness: -4, anger: 2 }, "sértés"),
    ],
  ),
);

add(
  node(
    "boglarka_intro",
    "boglarka",
    "Elnézést… a könyvtár mélyén ülök. Nem zavarok? A margóra írtam, de még nem fejeztem be a mondatot.",
    "story",
    [
      c(
        "very_good",
        "Megvárom, amíg befejezed a mondatot. Mit írtál a margóra?",
        "very_good",
        { closeness: 6, trust: 1, flags: ["boglarka_margo"] },
        "a könyv lejjebb csúszik, a szeme feljebb",
      ),
      c("good", "Nem zavarok. Olvashatok itt?", "good", { closeness: 2 }, "bólint"),
      c("bad", "Gyorsan, miről szól a könyv?", "bad", { closeness: -2, anger: 1 }, "visszahúzódik"),
      c(
        "very_bad",
        "Bogi, ugye? Cuki név. Majd rövidre fogod.",
        "very_bad",
        { closeness: -5, anger: 2 },
        "a becenév fáj",
      ),
    ],
    "Boglárka hagyta, hogy a margóig eljuss.",
  ),
);

add(
  node(
    "boglarka_nev",
    "boglarka",
    "A jegyzeteim… ha van időd. Nem kell dicsérni. Csak ne vágd el a mondatot a közepén.",
    "story",
    [
      c(
        "very_good",
        "Boglárka. Megvárom a végét. A margón pontosan az van, ami kell.",
        "very_good",
        { closeness: 5, trust: 1, flags: ["boglarka_nev"] },
        "kimondod a nevét, nem a becenevet",
      ),
      c("good", "Rendben, nézzük. Nem siettetlek.", "good", { closeness: 2 }, "olvas"),
      c("bad", "Röviden, mi a lényeg? Öt percem van.", "bad", { closeness: -2, anger: 1 }, "siet"),
      c(
        "very_bad",
        "A folklór helyett beszélj magadról, az érdekesebb.",
        "very_bad",
        { closeness: -4, anger: 2 },
        "bezár",
      ),
    ],
    "A nevén szólítottad, és kivártad a mondatot.",
  ),
);

add(
  node(
    "boglarka_udvar",
    "boglarka",
    "Az udvaron többen vannak, mint a polcok között. A könyvet két kézzel fogja. „Ha… ha kijövök, nem muszáj integetni.”",
    "story",
    [
      c(
        "very_good",
        "Nem integetek. Melletted megyek, ameddig te akarod. A könyv maradhat.",
        "very_good",
        { closeness: 6, trust: 1, flags: ["boglarka_udvar"] },
        "kijön a polcok közül",
      ),
      c("good", "A padnál megállunk. Nem kell tovább.", "good", { closeness: 2 }, "óvatos"),
      c("bad", "Senki nem néz rád. Nyugodj meg.", "bad", { closeness: -2, anger: 1 }, "lekicsinylés"),
      c(
        "very_bad",
        "Hadd lássák, kivel sétálok. Ez a lényeg.",
        "very_bad",
        { closeness: -5, anger: 2, risk: 8 },
        "közönség",
      ),
    ],
    "Boglárka kijött veled az udvarra.",
  ),
);

add(
  node(
    "boglarka_hatar",
    "boglarka",
    "A beosztásod… gyanús. Ha a jegy miatt vagy kedves, azt inkább most mondd. Nem az én szakom a tiéd, de akkor is.",
    "story",
    [
      c(
        "very_good",
        "A műhely nem tartozás. Nem osztályozlak. Ha maradsz, az nem szívesség a tanszéknek.",
        "very_good",
        { closeness: 4, trust: 1, flags: ["hatar"] },
        "a gyanú leül",
        { calm: 3 },
      ),
      c("good", "A jegyet más írja. Én csak a műhelyt tartom.", "good", { closeness: 2 }, "tény"),
      c("bad", "Egy kis figyelem nem árthat a félévnek.", "bad", { closeness: -2, anger: 1 }, "rossz alku"),
      c(
        "very_bad",
        "Ha segítek a kutatásban, illik hálásnak lenni.",
        "very_bad",
        { closeness: -5, anger: 2 },
        "tartozásnak hallja",
      ),
    ],
    "Boglárkának is kimondtad a határt.",
  ),
);

add(
  node(
    "boglarka_het8",
    "boglarka",
    "A nyolcadik hét… a könyvtárban is csendesebb lesz. Ha elmész, nem kérdezem meg még egyszer.",
    "story",
    [
      c(
        "very_good",
        "Várok a mondat végére. Ha maradsz, nem siettetsz, és nem a sarokba zárlak.",
        "very_good",
        { closeness: 6 },
        "a copf a vállára esik",
      ),
      c("good", "A jegyzetek készen vannak. Én is itt vagyok.", "good", { closeness: 3 }, "semleges"),
      c("bad", "A tanárnak döntenie kell. Ne nehezítsd meg.", "bad", { closeness: -2, anger: 1 }, "siet"),
      c("very_bad", "Majd Boginak hívlak a folyosón, hogy megszokd.", "very_bad", { closeness: -5, anger: 2 }, "becenév"),
    ],
    "Boglárka megkérdezte, maradsz-e a csendben is.",
  ),
);

add(
  node(
    "boglarka_route",
    "boglarka",
    "Boglárka a gondnok jegyzeteit és a három mondaváltozatot teszi egymás mellé. „Az egyik szöveg szerint a harang elűzi a köpenyes árnyalakot, a másik csak azt állítja, hogy megszakítja a hangutánzást. Ha rosszul választunk, valakit veszélybe küldhetünk. Segítesz úgy megfogalmazni a tervet, hogy a bizonytalanság is benne maradjon?”",
    "story",
    [
      c(
        "very_good",
        "A tényt, a következtetést és a sejtést külön jelöljük. A terv csak azt ígérheti, amit a nyomok alátámasztanak.",
        "very_good",
        { closeness: 4, trust: 1, flags: ["boglarka_route_active"] },
        "nagy levegő",
      ),
      c("good", "Keressünk még egy forrást, és addig ne próbáljuk ki a harangot.", "good", { closeness: 2, trust: 1 }, "türelem"),
      c("bad", "A legenda bizonyíték; nincs szükség további ellenőrzésre.", "bad", { closeness: -2, anger: 1 }, "visszalép"),
      c(
        "very_bad",
        "A folklór csak babona. Hagyd abba a kutatást.",
        "very_bad",
        { closeness: -4, anger: 2 },
        "türelmetlen",
      ),
    ],
    "Boglárka a forráskritikát választotta a kész válasz helyett.",
  ),
);

add(
  node(
    "boglarka_kiss",
    "boglarka",
    "A lakásban a könyvet az asztalra teszi, mindkét keze szabadon marad. „Ha… ha nem zavar. Lassan.”",
    "story",
    [
      c(
        "very_good",
        "Lassan. Megállok, ha kéred.",
        "very_good",
        { closeness: 8, trust: 1, flags: ["flag_boglarka_kiss_light"] },
        "rövid, óvatos csók",
      ),
      c("good", "Előbb a jegyzet vége. A többi ráér.", "good", { closeness: 2 }, "megvárja"),
      c("bad", "Nem most. Fura a lakás.", "bad", { closeness: -1 }, "visszalép"),
      c("very_bad", "Ne bújj a könyv mögé, amikor hozzám szólsz.", "very_bad", { closeness: -3, anger: 1 }, "szégyen"),
    ],
    "Boglárka letette a könyvet.",
  ),
);

add(
  node(
    "boglarka_bolt",
    "boglarka",
    "A használt könyvesboltban a polc magasabb nála. Nem nyúl fel. Várja, hogy te sem kapod le helyette a kötetet.",
    "story",
    [
      c(
        "very_good",
        "Szólj, melyiket nézed. Nem veszem le helyetted, amíg kéred.",
        "very_good",
        { closeness: 10, trust: 1 },
        "ő nyúl fel, amikor kész",
      ),
      c("good", "Ezt a margót üresen hagyták. Illik hozzád.", "good", { closeness: 4 }, "a könyv a kezébe kerül"),
      c("bad", "Veszek egyet, majd elolvasod. Siessünk.", "bad", { closeness: -1, anger: 1 }, "döntesz helyette"),
      c("very_bad", "A borító szebb, mint a szöveg. Az a lényeg.", "very_bad", { closeness: -4, anger: 1 }, "felszín"),
    ],
    "A könyvesboltban nem vetted ki a kezéből a választást.",
  ),
);

add(
  node(
    "boglarka_repeat_0",
    "boglarka",
    "A könyvtárban csend van. A margók… ha van időd. Ha nincs, azt is kibírom.",
    "repeat",
    [
      c("very_good", "Van időm a mondat végéig. Olvasd fel azt a sort.", "very_good", { closeness: 4 }, "olvas"),
      c("good", "Olvasok itt, ha nem zavar. Nem kell beszélni.", "good", { closeness: 2 }, "csend"),
      c("bad", "Gyorsan, mert más dolgom van.", "bad", { closeness: -1, anger: 1 }, "siet"),
      c("very_bad", "Bogi, ne bújj a copfod mögé.", "very_bad", { closeness: -4, anger: 2 }, "becenév"),
    ],
  ),
);

add(
  node(
    "boglarka_repeat_1",
    "boglarka",
    "Gréta nézi a jelenléti ívet a terem előtt. Én inkább itt maradok, amíg a névsor véget ér.",
    "repeat",
    [
      c(
        "very_good",
        "Maradj. A névsor nélküled is megvan. A margó nem.",
        "very_good",
        { closeness: 4 },
        "marad",
      ),
      c("good", "Ha kész vagy, együtt megyünk ki. Nem előtted.", "good", { closeness: 2 }, "melletted"),
      c("bad", "A jelenlét kötelező. Gyere.", "bad", { closeness: -1, anger: 1 }, "parancs"),
      c("very_bad", "Ne tartsd fel a listát a félénkségeddel.", "very_bad", { closeness: -4, anger: 2 }, "szégyen"),
    ],
  ),
);

add(
  node(
    "greta_intro",
    "greta",
    "A jelenléti íven hiba van. Segíthetsz pontosan javítani, tanár úr? A ceruza nálam, a felelősség is.",
    "story",
    [
      c(
        "very_good",
        "Konkrétan: te írod alá, én csak nézem. Nem fedem el a hibádat.",
        "very_good",
        { closeness: 6, trust: 1, flags: ["greta_lista"] },
        "a ceruza megáll a kezében",
      ),
      c("good", "Rendben, nézzük meg. Soronként.", "good", { closeness: 2 }, "dolgozik"),
      c("bad", "Majd később, most nincs időm.", "bad", { closeness: -1, anger: 1 }, "halasztás"),
      c(
        "very_bad",
        "A demonstrátori helyed miatt kötelességed ezt megcsinálni.",
        "very_bad",
        { closeness: -5, anger: 2, flags: ["greta_eszkoz"] },
        "eszköznek hallja",
      ),
    ],
    "Gréta lista-hibáját nem takartad el.",
  ),
);

add(
  node(
    "greta_hiba",
    "greta",
    "Az adminisztráción egy sor az enyém. Elrontottam a dátumot. Ha elrejted, gyorsabb. Ha nem, pontos.",
    "story",
    [
      c(
        "very_good",
        "A hiba a tiéd, a javítás is. Én nem írom át a neved helyett.",
        "very_good",
        { closeness: 5, trust: 1, flags: ["greta_hiba"] },
        "kijavítja, és nem omlik össze",
      ),
      c("good", "Javítsuk ki együtt. A dátum a lapszélen marad.", "good", { closeness: 2 }, "közös"),
      c("bad", "Majd én átírom, ne lássa a tanszék.", "bad", { closeness: -2, anger: 1 }, "eltakarod"),
      c(
        "very_bad",
        "Egy demonstrátor nem hibázhat. Ezt jegyezd meg.",
        "very_bad",
        { closeness: -5, anger: 2 },
        "vizsgának veszi",
      ),
    ],
    "Gréta hibáját nem takartad a tanszék elől.",
  ),
);

add(
  node(
    "greta_hatar",
    "greta",
    "Nyitott ajtónál kérdezem, mert így szabályos. Ha a kedvesség kivétel, azt ki kell mondani. Különben gyanús.",
    "story",
    [
      c(
        "very_good",
        "A műhely nem tartozás, és nem kivétel a szabály alól. A beosztásom nem fizetség.",
        "very_good",
        { closeness: 4, trust: 1, flags: ["hatar"] },
        "leírja magának, aztán bólint",
        { calm: 3 },
      ),
      c("good", "A jelenléti ív a munka. Ami ezen kívül van, az nem kötelező.", "good", { closeness: 2 }, "határ"),
      c("bad", "Egy demonstrátornak illik rugalmasnak lenni.", "bad", { closeness: -2, anger: 1 }, "kivétel"),
      c(
        "very_bad",
        "A helyed miatt itt maradsz, amíg azt mondom.",
        "very_bad",
        { closeness: -5, anger: 2, flags: ["greta_eszkoz"] },
        "bezár",
      ),
    ],
    "Grétának is kimondtad: ez nem kivétel és nem tartozás.",
  ),
);

add(
  node(
    "greta_het8",
    "greta",
    "A nyolcadik hét vége. A lista is lezárul. Ha utána is beszélsz velem, az már nem adminisztráció.",
    "story",
    [
      c(
        "very_good",
        "Konkrétan: ha maradsz, a szabály nem kivétel. Nem titkoljuk, és nem vizsga.",
        "very_good",
        { closeness: 6, flags: ["greta_nem_vizsga"] },
        "a ceruza a hajában marad",
      ),
      c("good", "A dokumentumok készen vannak. A többi nem lista.", "good", { closeness: 3 }, "pontos"),
      c("bad", "A tanárnak döntenie kell. Te csak a névsort írod.", "bad", { closeness: -2, anger: 1 }, "lekicsinylés"),
      c(
        "very_bad",
        "A demonstrátori helyed miatt kötelességed maradni.",
        "very_bad",
        { closeness: -5, anger: 2, flags: ["greta_eszkoz"] },
        "eszköz",
      ),
    ],
    "Gréta megkérdezte, a lista után mi marad.",
  ),
);

add(
  node(
    "greta_route",
    "greta",
    "Gréta három dokumentum közös jegyzékét rakja eléd: egy hallgatói vallomást, a gondnok régi jelentését és az akták módosítási naplóját. „Még nem tudjuk, ki írta át a dátumokat. De a bizonyítékok együtt már elég erősek ahhoz, hogy független vizsgálatot kérjünk. Ez nem vizsga; itt az a fontos, hogy pontosan jelezzük, mi ismert és mi nem.”",
    "story",
    [
      c(
        "very_good",
        "Nem kell mindent egyedül megoldanod. Készítsük el a dokumentált átadást, a hiányzó adatokat is feltüntetve.",
        "very_good",
        { closeness: 4, trust: 1, flags: ["greta_nem_vizsga"] },
        "egyet pislog, és javít",
      ),
      c("good", "Mutasd a jegyzéket. Ellenőrizzük végig az oldalszámokat és a dátumokat.", "good", { closeness: 2, trust: 1 }, "dolgozik"),
      c("bad", "A vizsgálat csak újabb problémát hoz. Inkább zárjuk le.", "bad", { closeness: -2, anger: 1 }, "szigor"),
      c(
        "very_bad",
        "A beosztásoddal elérhetem, hogy ne férj hozzá több irathoz. Döntsd el, kinek dolgozol.",
        "very_bad",
        { closeness: -5, anger: 2, flags: ["greta_eszkoz"], risk: 8 },
        "zsarolás",
      ),
    ],
    "Gréta a dokumentált együttműködést választotta a vak engedelmesség helyett.",
  ),
);

add(
  node(
    "greta_kiss",
    "greta",
    "Az ajtó csukva. Levette a szemüvegét, aztán visszaveszi. „Nincs szabály, ami ezt tiltja. Ez gyanús. És mégis.”",
    "story",
    [
      c(
        "very_good",
        "Nincs lista. Ha kéred, megállunk. Ha nem, itt maradok.",
        "very_good",
        { closeness: 8, trust: 1, flags: ["flag_greta_kiss_light"] },
        "rövid csók, aztán visszatolja a szemüveget",
      ),
      c("good", "A szabály az, hogy te mondod, mikor. Várhatunk.", "good", { closeness: 2 }, "a tempó az övé"),
      c("bad", "Ez szabálytalan. Felejtsük el.", "bad", { closeness: -1 }, "visszalép"),
      c(
        "very_bad",
        "A demonstrátori kulcsoddal zártad az ajtót. Ez a dolgod.",
        "very_bad",
        { closeness: -4, anger: 2, flags: ["greta_eszkoz"] },
        "eszköz",
      ),
    ],
    "Zárt ajtónál Gréta letette a listát.",
  ),
);

add(
  node(
    "greta_mozi",
    "greta",
    "A jegyeken rajta van az időpont és a cím. Ellenőrizte kétszer. „Ha nem ezt egyeztettük, hazamegyek.”",
    "story",
    [
      c(
        "very_good",
        "Ezt egyeztettük. A hátsó sor nem kell. A film címe stimmel.",
        "very_good",
        { closeness: 10, trust: 1 },
        "a jegy a tárcájába kerül",
        { insight: 4 },
      ),
      c("good", "Ha a cím stimmel, bemegyünk. Ha nem, visszaadom a jegyet.", "good", { closeness: 4 }, "pontos"),
      c("bad", "Mindegy, mi megy. Üljünk le.", "bad", { closeness: -2, anger: 1 }, "rendezetlen"),
      c("very_bad", "A demonstrátori kedvezményedből vettem. Illik maradni.", "very_bad", { closeness: -5, anger: 2, flags: ["greta_eszkoz"] }, "eszköz"),
    ],
    "A mozi időpontja stimmelt.",
  ),
);

add(
  node(
    "greta_repeat_0",
    "greta",
    "A lista pontos. Ha van eltérés, javítom. Ha nincs, akkor is megnézem még egyszer.",
    "repeat",
    [
      c(
        "very_good",
        "A szabály mindenkire vonatkozik. A kivétel gyanús. Ebben igazad van.",
        "very_good",
        { closeness: 4 },
        "egyetért",
      ),
      c("good", "Nézzük a listát. Nem siettetlek a végén sem.", "good", { closeness: 2 }, "dolgozik"),
      c("bad", "Majd később, most nincs idő.", "bad", { closeness: -1, anger: 1 }, "halasztás"),
      c(
        "very_bad",
        "A demonstrátori helyed miatt itt vagy. Ez a szabály.",
        "very_bad",
        { closeness: -4, anger: 2, flags: ["greta_eszkoz"] },
        "eszköz",
      ),
    ],
  ),
);

add(
  node(
    "greta_repeat_1",
    "greta",
    "A folyosón nyitva az irodaajtó. Idekint nem beszélek olyat, ami nem kerülhet jegyzőkönyvbe.",
    "repeat",
    [
      c(
        "very_good",
        "Akkor csak annyit, ami nyitott ajtónál is igaz. A többi várhat.",
        "very_good",
        { closeness: 4 },
        "tisztelet",
        { calm: 2 },
      ),
      c("good", "Holnap, zárt ajtónál, ha te kéred.", "good", { closeness: 2 }, "határidő"),
      c("bad", "Ne légy ennyire merev. Senki nem jegyzetel.", "bad", { closeness: -2, anger: 1 }, "lekicsinylés"),
      c("very_bad", "Húzd be az ajtót. Most. A helyed miatt megteheted.", "very_bad", { closeness: -4, anger: 2, risk: 6, flags: ["greta_eszkoz"] }, "parancs"),
    ],
  ),
);

function cold(id: GirlId, text: string): DialogueNode {
  return node(
    `${id}_cold`,
    id,
    text,
    "cold",
    [c("ok", "Értem. Nem erőltetem.", "good", {}, "távolság")],
    undefined,
    0,
  );
}

add(cold("rebeka", "A kör nélkül is van napirended. Az enyém már nem fér bele. Ne állj az ajtóba."));
add(cold("boglarka", "A margó tele van. Másnak írom. Bocsánat, hogy nem nézek fel."));
add(cold("greta", "A lista lezárult. Ami utána van, az nem az én feladatom. Viszontlátásra, tanár úr."));

function refuse(id: GirlId, text: string): DialogueNode {
  return node(
    `${id}_refuse`,
    id,
    text,
    "refuse",
    [c("ok", "Elmegyek.", "bad", {}, "elutasít")],
    undefined,
    0,
  );
}

add(refuse("rebeka", "Ne gyere a kör közelébe. Amit elmondtál rólam, az elég volt."));
add(refuse("boglarka", "Kérlek, maradj a folyosón. Most nem tudok beszélni."));
add(refuse("greta", "A beszélgetésnek nincs értelme, amíg a hangnem ilyen. Lezárom."));

add(
  node(
    "bekas",
    "narrator",
    "A Békás-tó sötét. A város innen egy vonal. Aki veled jött, külön jött: nem a kampusz előtt, és nem a karodon.",
    "ambient",
    [
      c(
        "very_good",
        "Nem kell közönség. Elmondom, amit a tanszéken nem lehet.",
        "very_good",
        { closeness: 8 },
        "a víz elviszi a mondatot",
      ),
      c("good", "Csak sétálunk. A tó nem kér jegyzőkönyvet.", "good", { closeness: 4 }, "csend"),
      c("bad", "Unalmas. Menjünk vissza, amíg látnak.", "bad", { closeness: -2, risk: 4 }, "siet"),
      c("very_bad", "Holnap elmesélem, kivel voltam kint.", "very_bad", { closeness: -4, anger: 1, risk: 10 }, "pletyka"),
    ],
  ),
);

add(
  node("study", "narrator", "A tanszéki folyóiratot a lámpa alá húzod. Amit nem mondanak ki, a lapszélen szokott lenni.", "ambient", [
    c("ok", "Elolvasod a lapszélt is.", "good", { insight: 1, energy: -12 }, "éleslátás"),
  ], undefined, 0),
);
add(
  node("rest", "narrator", "Este a lakás csendes. Nem tervezel mondatot, és nem nyitsz levelet.", "ambient", [
    c("ok", "Korán oltod a lámpát.", "good", { calm: 1, energy: 36, soothe: true }, "nyugalom"),
  ], undefined, 0),
);
add(
  node("gym", "narrator", "Az udvar végében van egy rozsdás húzódzkodó. Nem közönségnek csinálod.", "ambient", [
    c("ok", "Megcsinálod a sorozatot.", "good", { presence: 1, energy: -16 }, "jelenlét"),
  ], undefined, 0),
);
add(
  node("paper", "narrator", "A titkárság iratai egy dobozban várnak. Lány nincs a szobában. A pecsét viszont igen.", "ambient", [
    c("ok", "Rendezed az iratokat.", "good", { money: 12000, energy: -14 }, "iratok"),
  ], undefined, 0),
);
add(
  node("lecture", "narrator", "A művelődési házban egy óra a misztikus gyógytornáról. A közönség idegen, a mondat a tiéd.", "ambient", [
    c("ok", "Végigmondod, és nem hencegsz a tanszékkel.", "good", { money: 18000, presence: 1, energy: -16 }, "előadás"),
  ], undefined, 0),
);
add(
  node(
    "proof",
    "narrator",
    "Esti korrektúra. A margó tele idegen hibával. A pénz pontos, az idő nem.",
    "ambient",
    [c("ok", "Leadod hajnal előtt.", "good", { money: 22000, energy: -18 }, "korrektúra")],
    undefined,
    0,
  ),
);
add(
  node("walk", "narrator", "Az udvar este kiürül. A kockázat egy része a fák alatt marad, ha nem keresel közönséget.", "ambient", [
    c("ok", "Egy kört mész, és nem hívsz senkit.", "good", { calm: 1, energy: -6, soothe: true }, "séta"),
  ], undefined, 0),
);
add(
  node("prep", "narrator", "A tantermet előkészíted a gyógytornára. A szőnyegek a helyükön, a névsor még üres.", "ambient", [
    c("ok", "Kinyitod az ablakot.", "good", { presence: 1, energy: -8 }, "terem"),
  ], undefined, 0),
);
add(
  node(
    "empty",
    "narrator",
    "A hely üres. Aki ide jár, most máshol van, vagy nem akar ajtót nyitni.",
    "ambient",
    [c("ok", "Visszamész.", "good", { energy: -4 }, "üres")],
    undefined,
    0,
  ),
);

export function physioNode(names: { id: GirlId; label: string }[]): DialogueNode {
  const choices: Choice[] = names.slice(0, 3).map((g) => ({
    id: g.id,
    text: `${g.label.split(" ")[0]} mellett maradok óra után.`,
    quality: "good" as const,
    effect: { energy: -4 },
    reaction: "az óra után",
    follow: g.id,
  }));
  choices.push({
    id: "even",
    text: "Egyformán zárom az órát, és nem hívok ki senkit.",
    quality: "good",
    effect: { presence: 1, energy: -5 },
    reaction: "a műhely rendben lement",
  });
  return {
    id: "physio",
    speaker: "narrator",
    text: "A fakultatív gyógytorna lezajlik. A három név a lapon van, a jegy nem a tiéd. Óra után egy perc még a tiéd.",
    kind: "ambient",
    cost: 0,
    choices: choices.slice(0, 4),
    journal: "A heti gyógytorna megvolt.",
  };
}

export function jobNode(text: string): DialogueNode {
  return {
    id: "job-result",
    speaker: "narrator",
    text,
    kind: "ambient",
    cost: 0,
    choices: [c("ok", "Tovább", "good", {}, "kész")],
  };
}

export function rumorNode(): DialogueNode {
  return node(
    "rumor",
    "narrator",
    "A titkárságon valaki összeilleszt két nevet. Nem tudják biztosan. Elég, ha kíváncsiak.",
    "story",
    [
      c("calm", "Nem magyarázkodsz. A csend kevesebbet ad a pletykának.", "good", { risk: 5, world: ["pletyka"] }, "pletyka", { calm: 3 }),
      c("bad", "Viccel még teszel rá. A vicc terjed.", "bad", { risk: 10, world: ["pletyka"] }, "pletyka"),
    ],
    "A tanszéken összeér két név.",
  );
}

type HorrorEvent = { minWeek: number; maxWeek: number; location: LocationId; node: DialogueNode };

const HORROR_EVENTS: HorrorEvent[] = [
  {
    minWeek: 2, maxWeek: 8, location: "department",
    node: node("horror_lilla_report", "narrator",
      "A tanszéki hirdetőtáblán egy rövid, hivatalos közlemény áll: Varga Lilla, tizenkilenc éves biológushallgató negyvenhárom percre eltűnt a parkban, majd a nyugati kapunál került elő. Nem sérült meg, de a történtek egy részére nem emlékszik. A jelentés szerint „valószínű tájékozódási zavar”. A lap szélén valaki ceruzával odaírta: Lilla azt állította, hogy a szobatársa hívta, aki aznap este végig a kollégiumban volt.",
      "story", [
        c("record", "Kérjünk beleegyezésével részletes tanúvallomást, és őrizzük meg az eredeti jelentést.", "very_good", { insight: 1, calm: 1, world: ["case_lilla_documented"] }, "óvatos dokumentálás"),
        c("wait", "Előbb ellenőrizzük, ki írta a közleményt; Lillát ne tegyük ki újabb nyomásnak.", "good", { insight: 1 }, "ellenőrzés"),
        c("dismiss", "Ha nincs sérülés és nincs szemtanú, nincs mit vizsgálni.", "bad", { risk: 5, world: ["case_lilla_dismissed"] }, "elhallgatás")
      ], "Esetjelentés — Varga Lilla eltűnésének és emlékezetkiesésének dokumentuma előkerült.")
  },
  {
    minWeek: 2, maxWeek: 8, location: "classroom",
    node: node("horror_voice_witness", "narrator",
      "A rövid, négyszemközti vallomásban Lilla egy apró részletre emlékszik: a hang a szobatársa becenevén szólította, majd megismételte a mondat utolsó szótagját, mintha egy pillanattal később érne utol a visszhang. Lilla nem látott biztosan semmit. Azt kéri, hogy a nevét ne írják ki a folyosói hirdetőtáblára.",
      "story", [
        c("protect", "A nevét zártan kezeljük, a részleteket pedig különválasztjuk a következtetéseinktől.", "very_good", { calm: 1, insight: 1, world: ["case_witness_protected"] }, "tanúvédelem"),
        c("verify", "Kérdezzünk rá a hangra egy második, független beszélgetésben.", "good", { insight: 1 }, "ellenőrzés"),
        c("publish", "A teljes történet kell a nyilvánosságnak, névvel együtt.", "bad", { risk: 8, world: ["case_witness_exposed"] }, "adatvédelmi kockázat")
      ], "Esetjelentés — Lilla a hangutánzás késleltetett visszhangjáról számolt be.")
  },
  {
    minWeek: 3, maxWeek: 8, location: "holdkor",
    node: node("horror_shadow_frame", "narrator",
      "A fotóműhely monitorán egy korábban észre sem vett részlet jelenik meg. A fák között magas, sötét köpenyes alak áll, kapucnija alatt nem látszik arc; a pocsolya csak a fákat tükrözi, őt nem. A kép önmagában lehet expozíciós hiba. A fájl metaadatai viszont nem egyeznek azzal az idővel, amikor a gép órája szerint a felvétel készült.",
      "story", [
        c("preserve", "Készítsünk ellenőrzőösszeget, másolatot és jegyzőkönyvet; az eredetit ne módosítsuk.", "very_good", { insight: 2, world: ["evidence_photo_preserved"] }, "bizonyítékmegőrzés"),
        c("compare", "Hasonlítsuk össze a másik két képpel, mielőtt következtetést vonunk le.", "good", { insight: 1 }, "összevetés"),
        c("post", "Tegyük közzé. Hadd döntse el a közönség, hogy szörny-e.", "bad", { risk: 7, world: ["evidence_photo_published"] }, "nyilvánosság")
      ], "Esetjelentés — Egy fénykép tükröződése és időbélyege nem egyezik.", undefined, undefined,
      "A kapucni mélyén csak egyetlen izzó vörös szem látszik; az arc és a test részletei teljesen rejtve maradnak · illusztráció hiányzik")
  },
  {
    minWeek: 4, maxWeek: 10, location: "department",
    node: node("horror_old_case", "narrator",
      "Egy régi iktatókönyvben ugyanaz a mintázat ismétlődik: Tóth Júlia hallgató huszonegy percig nem volt elérhető a park közelében, majd segítséget kért a portán. Az ügyet „éjszakai pánikreakcióként” zárták le. A digitális másolat szerint a bejegyzés ideje délutánra került át, és egy korábbi melléklet hiányzik.",
      "story", [
        c("audit", "Rögzítsük az eredeti és a módosított időpontot is; az eltérést még ne nevezzük szándékos hamisításnak.", "very_good", { insight: 2, world: ["case_old_audited"] }, "iratellenőrzés"),
        c("copy", "Kérjünk egy másik példányt a levéltárból.", "good", { insight: 1 }, "másolatkérés"),
        c("accuse", "Azonnal nevezzük meg nyilvánosan a felelőst.", "bad", { risk: 8 }, "elhamarkodott vád")
      ], "Esetjelentés — Tóth Júlia régi bejegyzésének időpontját utólag módosították.")
  },
  {
    minWeek: 5, maxWeek: 12, location: "library",
    node: node("horror_survivor_statement", "narrator",
      "Egy volt hallgató, Németh Eszter, csak akkor hajlandó beszélni, ha a neve nem kerül a jegyzőkönyv nyilvános változatába. Évekkel korábban őt is egy ismerős hang csalta a fák közé. Nem látott tiszta alakot; azt hallotta, hogy a saját hangja szólítja a keresőcsapatot a rossz irányból. Amikor megpróbált felelni, a hang egy ütemmel később ismételte a szavait.",
      "story", [
        c("protect", "A nevét külön, korlátozott hozzáférésű mellékletben tartjuk, és csak a jóváhagyásával idézzük.", "very_good", { calm: 1, insight: 1, world: ["case_eszter_protected"] }, "tanúvédelem"),
        c("clarify", "Kérdezzük meg, mely részletekre emlékszik biztosan, és melyekre csak következtet.", "good", { insight: 1 }, "pontosítás"),
        c("press", "Addig kérdezzük, amíg pontosan le nem írja a lényt.", "bad", { risk: 5 }, "nyomásgyakorlás")
      ], "Esetjelentés — Németh Eszter túlélővallomása megerősítette a késleltetett hangutánzás motívumát.")
  },
  {
    minWeek: 7, maxWeek: 12, location: "courtyard",
    node: node("horror_sealed_door", "narrator",
      "A lezárt szervizajtó előtt friss, páros nyomok indulnak a fal felé, aztán megszakadnak a kövön. A zár sértetlen. A porban keskeny karcolások húzódnak, mintha valami a túloldalról próbálta volna kitapogatni a kilincset. A közeli diákok semmit sem hallottak — kivéve az egyikük, aki a saját nevét hallotta a fal mögül.",
      "story", [
        c("document", "Fényképezzük le a helyet mércével, és a lezárt ajtót ne nyissuk ki egyedül.", "very_good", { insight: 1, calm: 1, world: ["tunnel_marks_documented"] }, "helyszíni dokumentálás"),
        c("secure", "Értesítsük a gondnokságot, és kérjünk két tanút a helyszín biztosításához.", "good", { calm: 1 }, "biztosítás"),
        c("enter", "Nyissuk ki most, mielőtt eltűnnek a nyomok.", "bad", { risk: 10 }, "veszélyes behatolás")
      ], "Esetjelentés — Friss nyomok jelentek meg a lezárt szervizajtónál.")
  },
  {
    minWeek: 8, maxWeek: 13, location: "library",
    node: node("horror_bell_clapper", "narrator",
      "A régi leltár szerint a főiskola harangját egy baleset után leszerelték. A harangtest megvan, de a nyelve hiányzik; a kivétel dátuma egybeesik az egyik régi eltűnés hetével. A régi feljegyzések nem egyeznek abban, hogy a harang elűzi-e a köpenyes árnyalakot. Eszter vallomása alapján egyelőre csak annyi állítható: a tiszta, ismétlődő hang megszakíthatja az utánzást.",
      "story", [
        c("compare", "A leltárt vessük össze a gondnok jegyzeteivel; a harangot ne próbáljuk ki ember mellett.", "very_good", { insight: 2, calm: 1, world: ["bell_clapper_traced"] }, "források összevetése"),
        c("plan", "Készítsünk biztonságos próbát távol a park ösvényeitől.", "good", { insight: 1 }, "óvatos kísérlet"),
        c("test", "Menjünk ki éjjel és csengessünk, hátha előjön.", "bad", { risk: 10 }, "kockázatos próba")
      ], "Esetjelentés — A harang hiányzó nyelve az egyik régi incidens idején került le.")
  },
  {
    minWeek: 10, maxWeek: 15, location: "classroom",
    node: node("horror_mimic_call", "narrator",
      "A délutáni folyosón a főhős hangja hallatszik a lezárt lépcsőházból: valaki azt mondja, hogy az egyik hallgató azonnal jöjjön le. Ugyanabban a pillanatban a főhős a terem másik végében áll. A hang nem ismétel, csak vár. A diák már elindulna, de a csoportos jelzésre megáll.",
      "story", [
        c("stay_together", "Senki nem válik le a csoportról; ellenőrizzük egymást látásból és kézjellel.", "very_good", { calm: 2, world: ["mimic_safety_protocol"] }, "biztonsági jelzés"),
        c("call_backup", "Kérjünk gondnoki segítséget, és zárjuk le a folyosót.", "good", { calm: 1 }, "segítségkérés"),
        c("follow_voice", "Menjünk a hang után, amíg még halljuk.", "bad", { risk: 12 }, "veszélyes követés")
      ], "Esetjelentés — A lény a főhős hangját utánozta egy lezárt lépcsőházból.")
  },
  {
    minWeek: 11, maxWeek: 15, location: "holdkor",
    node: node("horror_full_sighting", "narrator",
      "A Holdkör hátsó ablakán át egy pillanatra teljes alak látszik a fák között: magas, sötét köpenyt visel, arca a kapucni mélyén eltűnik. A szél megmozdítja a fákat, de a köpenye mozdulatlan; az árnyéka egy ütemmel a teste előtt fordul el. A nedves kövön nincs felismerhető tükörképe. A felvétel homályos, ezért önmagában nem bizonyít semmit, de három különböző irányból ugyanazt a hangtalan jelenlétet jelentik.",
      "story", [
        c("withdraw", "Rögzítsük az időt és a távolságot, majd vonuljunk vissza a kivilágított épületbe.", "very_good", { calm: 2, insight: 1, world: ["monster_sighting_verified"] }, "biztonságos visszavonulás"),
        c("compare", "Vessük össze a látottakat a korábbi képekkel, és ne állítsunk többet, mint amit a felvétel mutat.", "good", { insight: 1 }, "bizonyíték-összevetés"),
        c("approach", "Közelítsünk, hogy végre éles képet készíthessünk.", "bad", { risk: 12 }, "veszélyes közelítés")
      ], "Esetjelentés — Három tanú ugyanarról a köpenyes alakról számolt be.", undefined, undefined,
      "Csak egyetlen izzó vörös szem látszik a kapucni sötétjében; sem az arc, sem a haj, sem a testalkat nem fedhető fel még · illusztráció hiányzik")
  },
  {
    minWeek: 12, maxWeek: 15, location: "department",
    node: node("horror_reports_bundle", "narrator",
      "A három jelentés egymás mellé téve már nem elszigetelt furcsaság: az eltűnések időpontjai a harang leltári változása után sűrűsödnek, a tanúvallomásokat pedig minden alkalommal rövidítették. A dékáni titkárság neve a továbbítási sorban szerepel, de a közvetlen szándék még nem bizonyított. A legfontosabb kérdés most az, hogy miként védjétek a tanúkat és az eredeti iratokat.",
      "story", [
        c("chain", "Készítsünk dokumentált bizonyítékláncot, és adjuk át független vizsgálónak.", "very_good", { insight: 2, calm: 1, world: ["evidence_chain_complete"] }, "bizonyítéklánc"),
        c("copy", "Őrizzünk külön biztonsági másolatot, mielőtt bárkit megvádolunk.", "good", { insight: 1 }, "biztonsági másolat"),
        c("accuse", "Nyilvánosan nevezzük meg a dékánt a bizonyítékok teljes ellenőrzése előtt.", "bad", { risk: 10 }, "bizonyítatlan vád")
      ], "Esetjelentés — A régi és új ügyek ugyanabba az intézményi mintába illeszkednek.")
  },
  {
    minWeek: 13, maxWeek: 15, location: "courtyard",
    node: node("horror_last_trace", "narrator",
      "Az eső után friss nyomok vezetnek a lezárt szárnyhoz, de egyik sem tart visszafelé. A gondnok régi jegyzete szerint a köpenyes alak akkor veszti el a tájékozódását, ha az utánzott hang nem kap választ, és tiszta, ismétlődő hang szólal meg a közelében. Ez még nem győzelmi terv. Csak az első olyan feltevés, amelyet a fényképek, az iratok és a vallomások egyszerre támasztanak alá.",
      "story", [
        c("rehearse", "Próbáljuk el a visszavonulást és a jelzéseket nappal; a harang hangját csak a kijelölt ponton használjuk.", "very_good", { insight: 1, calm: 2, world: ["final_plan_rehearsed"] }, "finálé előtti próba"),
        c("delegate", "Osszuk ki a feladatokat, és mindenkinek legyen kijelölt társa.", "good", { calm: 1 }, "feladatmegosztás"),
        c("rush", "Nincs idő próbára, induljunk azonnal a föld alá.", "bad", { risk: 12 }, "kapkodás")
      ], "Esetjelentés — A finálé előtt összeállt a hangutánzás elleni biztonsági terv.")
  },

  {
    minWeek: 3, maxWeek: 10, location: "courtyard",
    node: node(
      "horror_cloaked_attack_courtyard",
      "narrator",
      "A nyugati udvaron a portás hangján szólít valaki két hallgatót. Amikor egyikük válaszolna, egy magas, köpenyes árnyalak válik le a gesztenyefák közti sötétségről, és elvágja a kapu felé vezető utat. A kapucni alatt nincs kivehető arc; az alak a csoportból leszakadó hallgatót figyeli, majd a hang felé fordul, mintha a válasz irányából tájékozódna. Dr. Farkas Dénes, a biológiaoktató az ablakból látja a támadást, és a személyzeti vészcsengőhöz irányítja őket.",
      "story",
      [
        c("stay_together", "Tartsd együtt a két hallgatót, és a kivilágított porta felé hátráljatok.", "very_good", { risk: -8, calm: 1, world: ["shadow_attack_team_escape"] }, "együtt maradás"),
        c("signal", "Használd a vészcsengőt, és jelentsétek be a helyszínt a portán.", "good", { presence: 1, risk: -4, world: ["shadow_attack_signal_used"] }, "vészjelzés"),
        c("chase", "Válaszolj a hangnak, és indulj egyedül az alak után.", "bad", { risk: 12, world: ["shadow_attack_isolated"] }, "elszigetelődés")
      ],
      "Esetjelentés — Tanúvallomás készült az udvari támadásról, amelyben egy köpenyes árnyalak zárta el a menekülőutat.",
      0,
      "Dr. Farkas Dénes · biológiaoktató",
      "Sötét köpenyes sziluett; a kapucni alatt kizárólag egyetlen izzó vörös szem látható, minden más részlet rejtve marad · illusztráció hiányzik"
    ),
  },
  {
    minWeek: 4, maxWeek: 12, location: "library",
    node: node(
      "horror_teacher_folklore",
      "narrator",
      "Dr. Sárközi Júlia, a néprajzkutató vendégoktató két, egymástól független régi feljegyzést tesz az asztalra. Mindkettő magas, köpenyes éji alakról beszél, amely ismerős hangon hívja félre az embereket. Az egyik margóján az ember és a vérivó közötti származás lehetősége is szerepel, de Júlia hangsúlyozza: ez folklór, nem bizonyíték. A mostani vallomásokkal a hangutánzás, a tükörkép hiánya és az egyedül maradók célba vétele mutat közös mintát.",
      "story",
      [
        c("compare", "Készítsünk forrásjegyzéket, és különítsük el a tanúvallomást a folklórtól.", "very_good", { insight: 2, calm: 1, world: ["shadow_figure_lore_documented"] }, "forráskritika"),
        c("protect", "A korábbi tanú nevét hagyjuk ki; csak az ellenőrizhető részleteket használjuk.", "good", { calm: 1, world: ["teacher_witness_protected"] }, "tanúvédelem"),
        c("dismiss", "A népmesék nem érnek semmit. Zárjuk le a kutatást.", "bad", { risk: 5, world: ["shadow_figure_lore_dismissed"] }, "elutasítás")
      ],
      "Esetjelentés — Egy vendégoktató segített összevetni a folklórt és a tanúvallomásokat.",
      0,
      "Dr. Sárközi Júlia · néprajzkutató",
      "Dr. Sárközi Júlia · portrékép hiányzik"
    ),
  },
  {
    minWeek: 8, maxWeek: 15, location: "peron",
    node: node(
      "horror_cloaked_attack_peron",
      "narrator",
      "Az esti peron végéről a tanszéki ügyeletes hangja hív a sínek felé. Dr. Kerekes Áron rákiált a csoportodra, hogy ne induljatok a hang után, de a sötét köpenyes alak már előlép a ködből. A kapucni alatt nincs arc, a lámpafény pedig mintha elnyelné a ruháján. A menekülőút a szolgálati ajtó felé vezet; az alak minden válaszra a hang irányába fordul.",
      "story",
      [
        c("service_door", "Ne feleljetek a hívásra; együtt menjetek be a szolgálati helyiségbe.", "very_good", { calm: 2, risk: -8, world: ["shadow_attack_peron_escape"] }, "együtt menekülés"),
        c("alarm", "Riaszd a peron személyzetét, és maradjatok a fényben.", "good", { presence: 1, risk: -4, world: ["shadow_attack_peron_alarm"] }, "riasztás"),
        c("answer", "Válaszolj a saját neveddel, hátha kiderül, honnan jön a hang.", "very_bad", { risk: 15, world: ["shadow_attack_peron_lured"] }, "a hang követése")
      ],
      "Esetjelentés — Újabb támadást jelentettek az esti peronról.",
      0,
      "Dr. Kerekes Áron · ügyeletes oktató",
      "Ködfátyolos, sötét köpenyes sziluett; a kapucni alatt egyetlen izzó vörös szem látszik, az arc nem vehető ki · illusztráció hiányzik"
    ),
  },
  {
    minWeek: 9, maxWeek: 15, location: "department",
    node: node(
      "horror_teacher_archive",
      "narrator",
      "Dr. Kerekes Áron nem hajlandó szóbeszédként elintézni az ügyet. Megmutat egy iratmásolatot: az egyik korábbi jelentés időbélyegét kétszer írták át, és a módosítás nem szerepel a naplóban. Kerekes szerint a dékáni iroda nem ad ki újabb dokumentumot hivatalos kérelem nélkül. A döntés most az, hogyan marad ellenőrizhető a bizonyíték, és hogyan kerülhető el egy bizonyítatlan személyes vád.",
      "story",
      [
        c("audit", "Kérj hivatalos másolatot, őrizd meg az eredeti fájlt és a módosítási naplót.", "very_good", { insight: 2, calm: 1, world: ["teacher_records_preserved"] }, "bizonyítéklánc"),
        c("copy", "Készíts külön, dátumozott biztonsági másolatot.", "good", { insight: 1, world: ["teacher_records_copied"] }, "biztonsági másolat"),
        c("accuse", "Ne várj papírra; nevezd meg nyilvánosan a felelőst.", "bad", { risk: 10, world: ["teacher_records_accused"] }, "elhamarkodott vád")
      ],
      "Esetjelentés — Egy másik oktató segített feltárni az iratkezelési eltérést.",
      0,
      "Dr. Kerekes Áron · ügyeletes oktató",
      "Dr. Kerekes Áron · portrékép hiányzik"
    ),
  },
  {
    minWeek: 14, maxWeek: 16, location: "department",
    node: node(
      "horror_half_vampire_reveal",
      "narrator",
      "Dr. Kerekes Áron bezárja a tanszéki irattár ajtaját, aztán egy régi, pecsétes jegyzőkönyvet tesz eléd. A tanúk leírása, a tükröződés nélküli felvételek és a vérrel kapcsolatos régi kórlap ugyanarra mutatnak: a köpenyes alak nem egyszerűen ember vagy teljes vámpír, hanem félvér vámpír — emberi és vámpírvérből született. Amikor a kapucni végre lecsúszik, nem elegáns vagy csábító alakot láttok: rövid fekete haj, ritkás bajusz, kissé túlsúlyos testalkat és durva, kevéssé megnyerő arcvonások. A külső esetlensége semmit sem vesz el a veszélyéből. Nappal is járhat, de a gyorsasága és az éhsége nem emberi. A hangutánzást arra használja, hogy elszigetelje a kiszemelt hallgatót. A tanúk vallomásaiból az is kiderül, hogy beteges vággyal fixálódik felnőtt nőkre, de vágyát nem kölcsönösségként, hanem birtoklásként és kényszerként éli meg; a visszautasítás sem állítaná meg. Nem pusztán vérre szomjazik, hanem a félelem és a másik fölötti uralom érzésére is. Ez nem csábítás és nem romantika, hanem fenyegetés. Első a lehetséges áldozatok biztonsága.",
      "story",
      [
        c("protect", "Biztosítsuk a tanúkat, alakítsunk ki páros kíséretet és vészjelzést; senki ne maradjon vele egyedül.", "very_good", { insight: 2, calm: 2, risk: -8, world: ["half_vampire_reveal_documented", "survivors_protected"] }, "tanúvédelem és biztonsági terv"),
        c("copy", "Készítsünk ellenőrzött másolatot a jegyzőkönyvről, és adjuk át független vizsgálónak.", "good", { insight: 1, risk: -3, world: ["half_vampire_records_copied"] }, "bizonyítékmegőrzés"),
        c("bait", "Csaljuk egyedül a szolgálati folyosóra; majd ott kiderül, mire készül.", "bad", { risk: 15, world: ["half_vampire_bait_attempted"] }, "veszélyes elszigetelődés")
      ],
      "Esetjelentés — A köpenyes alak félvér vámpír, akinek ragadozó, kényszerítő szándékát dokumentálták.",
      0,
      "Dr. Kerekes Áron · ügyeletes oktató",
      "A leleplezett félvér vámpír: sötét köpeny, rövid fekete haj, ritkás bajusz, kissé túlsúlyos testalkat, durva és kevéssé megnyerő arc · illusztráció hiányzik"
    ),
  }
];

export function horrorNode(week: number, seen: string[], seed: number): { node: DialogueNode; location: LocationId } | null {
  // Keep missed events as catch-up candidates after their intended window. Otherwise a
  // low roll count could permanently skip important cases and the late cloaked-figure attacks.
  const unseen = HORROR_EVENTS.filter(
    (event) => week >= event.minWeek && !seen.includes(event.node.id)
  );
  if (!unseen.length) return null;

  const overdue = unseen
    .filter((event) => week > event.maxWeek)
    .sort((a, b) => a.maxWeek - b.maxWeek);
  const earliestMissedDeadline = overdue[0]?.maxWeek;
  const available = earliestMissedDeadline === undefined
    ? unseen.filter((event) => week <= event.maxWeek)
    : overdue.filter((event) => event.maxWeek === earliestMissedDeadline);
  if (!available.length) return null;

  const index = Math.abs(seed) % available.length;
  const selected = available[index]!;
  return { node: selected.node, location: selected.location };
}

export function weeklyHorrorSummary(week: number): { title: string; text: string } {
  const beats: Array<{ title: string; text: string }> = [
    { title: "Egy hiányzó negyvenhárom perc", text: "Varga Lilla, tizenkilenc éves biológushallgató a parkban tűnt el rövid időre, majd úgy került elő, hogy az út egy részére nem emlékezett. A hivatalos jelentés tájékozódási zavart említ; a hang, amely őt az ösvényre csalta, a szobatársa hangja volt." },
    { title: "A hang, amelynek nem lett volna szabad ott lennie", text: "Lilla szobatársa igazolja, hogy nem hagyta el a kollégiumot. A vallomás ezért nem magyarázza meg az esetet — csak azt bizonyítja, hogy valami ismerős hangon szólíthatta a hallgatót." },
    { title: "Az első ellentmondó felvétel", text: "Rebeka fényképén egy köpenyes alak áll a fák között, de a pocsolya csak a fákat tükrözi. Lehet optikai vagy technikai hiba; az eredeti fájl és a metaadatok megőrzése fontosabb a gyors következtetésnél." },
    { title: "Egy második tanú", text: "Egy újabb hallgató ugyanazt a hangutánzó jelenséget írja le. A tanúvallomást csak engedéllyel lehet felhasználni; a főiskolán közben továbbra is rémhírként kezelik az ügyet." },
    { title: "A régi akták", text: "Tóth Júlia korábbi esete azonos mintát mutat: rövid eltűnés, hiányos emlékezet, majd a jelentés átminősítése. Az időbélyeg módosítása arra utal, hogy az intézményi nyilvántartás nem megbízható." },
    { title: "Aki már egyszer hallotta", text: "Németh Eszter, volt hallgató, évekkel korábbi találkozásról beszél. Nem tudja leírni a lényt, de emlékszik a saját hangjára a fák között és a válasz késleltetett visszhangjára." },
    { title: "A hiányzó részlet", text: "A lezárt szárny rajzai és a régi térkép nem fedik egymást. Az épület nyugati fala mögött olyan átjáró húzódhat, amelyet a jelenlegi tervrajzok már nem jelölnek." },
    { title: "A harang leltári nyoma", text: "A harangtest megvan, a nyelve hiányzik. A leszerelés dátuma egybeesik egy régi hallgatói incidenssel. A feljegyzések nem bizonyítják, hogy a harang árt az alaknak, de tiszta hangja megszakíthatja a hangutánzást." },
    { title: "A zárt útvonal", text: "A nyomozás immár egy lezárt szervizalagút felé tart. A köpenyes árnyalak akkor a legveszélyesebb, amikor valakit leválaszt a többiekről; a biztonsági szabályokat ezért még a belépés előtt rögzíteni kell." },
    { title: "A főhős hangja a rossz helyről", text: "Egy folyosói megszólítás a főhős hangját utánozza, miközben ő látható helyen áll. A csapat megtanulja: ismerős hang nem jelent megbízható hívást, és senki nem indulhat el egyedül." },
    { title: "Nyomok a fal túloldalán", text: "A lezárt ajtónál friss, mély karcolások és fekete, hamuszerű por jelenik meg. Nincs bizonyíték arra, hogy az ajtót kívülről kinyitották volna; az épület alaprajzát és a fal mögötti üreget újra kell vizsgálni." },
    { title: "Egy pillanatnyi teljes alak", text: "Három tanú ugyanabban az órában látja a magas, köpenyes alakot. Mindhárman említik, hogy a kapucni alatt nem volt kivehető arc, és az árnyék más ütemben mozdult, mint a test. Rebeka felvétele, Boglárka forrásai és Gréta iratai együtt teszik ellenőrizhetővé a mintát." },
    { title: "A jelentések közös mintája", text: "A régi és új ügyekben ugyanaz a szerkesztési nyom szerepel. Ez az eltussolást valószínűsíti, de önmagában nem bizonyítja, ki és milyen szándékkal módosította az iratokat." },
    { title: "A hangutánzás szabálya", text: "A vallomások és a régi feljegyzések egy irányba mutatnak: a köpenyes alak ismerős hanggal próbálja elszigetelni a célpontját. A hívás elutasítása, a társas jelzés és a harang tiszta hangja együtt növelheti a túlélés esélyét." },
    { title: "A finálé előtti utolsó nyom", text: "A régi iratok már egy ember és vámpír közötti félvér származását említik, a felvételek pedig a tükörkép nélküli, köpenyes alakot mutatják. Ez erős nyom, de a bizonyítékokat még össze kell vetni; a csapat biztonsága nem függhet egyetlen feltevéstől." },
    { title: "A történet végén", text: "A tanúvallomások és a régi iratok alapján a köpenyes alak félvér vámpír: hangutánzással szigeteli el a kiszemelt hallgatókat, vérre szomjazik, és ragadozó, kényszerítő szexuális vágyát a másik fölötti uralommal kapcsolja össze. Ez nem romantikus vonzalom, hanem fenyegetés. A finálé kimenetele attól függ, mennyire őriztétek meg a bizonyítékokat, a túlélők biztonságát és a csapat bizalmát." }
  ];
  return beats[Math.max(0, Math.min(beats.length - 1, Math.floor(week) - 1))]!;
}

export { NODES };

export const STORY: StoryEvent[] = [
  { id: "rebeka_intro", node: "rebeka_intro", girl: "rebeka", locations: ["holdkor", "classroom"], part: 1, priority: 10, minWeek: 1 },
  { id: "rebeka_feny", node: "rebeka_feny", girl: "rebeka", locations: ["holdkor", "courtyard", "classroom"], part: 1, priority: 30, minWeek: 2 },
  { id: "rebeka_foto", node: "rebeka_foto", girl: "rebeka", locations: ["apartment"], part: 1, priority: 35, minWeek: 3, minTrust: 2 },
  { id: "rebeka_hatar", node: "rebeka_hatar", girl: "rebeka", locations: ["holdkor", "apartment", "classroom"], part: 1, priority: 40, minWeek: 5, minTrust: 2 },
  { id: "rebeka_het8", node: "rebeka_het8", girl: "rebeka", locations: ["holdkor", "classroom"], part: 1, priority: 80, minWeek: 7, maxWeek: 8 },
  { id: "rebeka_route", node: "rebeka_route", girl: "rebeka", locations: ["holdkor", "apartment", "classroom"], part: 2, priority: 82, minWeek: 10, minTrust: 3 },
  { id: "rebeka_kiss", node: "rebeka_kiss", girl: "rebeka", locations: ["apartment"], part: 2, priority: 95, minWeek: 15, minTrust: 4, minClose: 60 },

  { id: "boglarka_intro", node: "boglarka_intro", girl: "boglarka", locations: ["library", "classroom"], part: 1, priority: 10, minWeek: 1 },
  { id: "boglarka_nev", node: "boglarka_nev", girl: "boglarka", locations: ["library", "classroom"], part: 1, priority: 20, minWeek: 2 },
  { id: "boglarka_udvar", node: "boglarka_udvar", girl: "boglarka", locations: ["courtyard"], part: 1, priority: 35, minWeek: 4, minTrust: 2 },
  { id: "boglarka_hatar", node: "boglarka_hatar", girl: "boglarka", locations: ["library", "apartment", "classroom"], part: 1, priority: 40, minWeek: 5, minTrust: 2 },
  { id: "boglarka_het8", node: "boglarka_het8", girl: "boglarka", locations: ["library", "classroom"], part: 1, priority: 80, minWeek: 7, maxWeek: 8 },
  { id: "boglarka_route", node: "boglarka_route", girl: "boglarka", locations: ["library", "apartment", "classroom"], part: 2, priority: 82, minWeek: 10, minTrust: 3 },
  { id: "boglarka_kiss", node: "boglarka_kiss", girl: "boglarka", locations: ["apartment"], part: 2, priority: 95, minWeek: 15, minTrust: 4, minClose: 60 },

  { id: "greta_intro", node: "greta_intro", girl: "greta", locations: ["department", "classroom"], part: 1, priority: 10, minWeek: 1 },
  { id: "greta_hiba", node: "greta_hiba", girl: "greta", locations: ["department", "classroom"], part: 1, priority: 30, minWeek: 3 },
  { id: "greta_hatar", node: "greta_hatar", girl: "greta", locations: ["department", "apartment", "classroom"], part: 1, priority: 40, minWeek: 5, minTrust: 2 },
  { id: "greta_het8", node: "greta_het8", girl: "greta", locations: ["department", "classroom"], part: 1, priority: 80, minWeek: 7, maxWeek: 8 },
  { id: "greta_route", node: "greta_route", girl: "greta", locations: ["department", "apartment", "classroom"], part: 2, priority: 82, minWeek: 10, minTrust: 3 },
  { id: "greta_kiss", node: "greta_kiss", girl: "greta", locations: ["apartment"], part: 2, priority: 95, minWeek: 15, minTrust: 4, minClose: 60 },
];

export const REQUIRED_FLAGS: Record<GirlId, string[]> = {
  rebeka: ["rebeka_kor", "rebeka_feny", "rebeka_foto"],
  boglarka: ["boglarka_margo", "boglarka_nev", "boglarka_udvar"],
  greta: ["greta_lista", "greta_hiba", "greta_nem_vizsga"],
};

export const GIFTS: GiftDef[] = [
  { id: "pen", name: "Fekete töltőtoll", price: 9000, blurb: "Nehéz, matt. Egy vonal, nem egy csokor." },
  { id: "photo", name: "Üres fotófüzet", price: 4000, blurb: "Nincs benne kép. A szimbolika az övé." },
  { id: "flowers", name: "Csokor virág", price: 6000, blurb: "Szép, és majdnem mindig lusta." },
  { id: "novel", name: "Regény, üres margó", price: 5000, blurb: "Puha borító. A margó szándékosan tiszta." },
  { id: "tea", name: "Tea és könyvjelző", price: 3000, blurb: "Nem kér semmit a mondat helyett." },
  { id: "notes", name: "Sűrű lapú notesz", price: 4500, blurb: "Belefér egy jelenléti ív és egy hiba." },
  { id: "article", name: "Ceruzabél és egy cikk", price: 2000, blurb: "A cikk pontosan idézve, nem nagyjából." },
  { id: "card", name: "Képeslap", price: 3500, blurb: "Egy szív a sarkában. Korán ez sok." },
];

export const ACTIONS: ActionDef[] = [
  { id: "department", label: "Tanszék", detail: "Gréta délelőtt", slots: ["morning"], icon: I.task, kind: "visit", location: "department", girl: "greta" },
  { id: "paper", label: "Iratok", detail: "+12 000 Ft", slots: ["morning"], icon: I.task, kind: "job", location: "department", node: "paper" },
  { id: "study", label: "Olvasás", detail: "Éleslátás", slots: ["morning"], icon: I.study, kind: "stat", location: "library", node: "study" },
  { id: "rest-m", label: "Pihenés", detail: "Nyugalom, energia", slots: ["morning"], icon: I.rest, kind: "stat", location: "apartment", node: "rest" },
  { id: "mohu-m", label: "MOHU", detail: "Palackok az udvar szélén", slots: ["morning"], icon: I.money, kind: "minigame", location: "mohu" },

  { id: "library", label: "Könyvtár", detail: "Boglárka délután", slots: ["afternoon"], icon: I.library, kind: "visit", location: "library", girl: "boglarka" },
  { id: "prep", label: "Tanterem", detail: "Jelenlét", slots: ["afternoon"], icon: I.classroom, kind: "stat", location: "classroom", node: "prep" },
  { id: "lecture", label: "Előadás", detail: "+18 000 Ft", slots: ["afternoon"], icon: I.presence, kind: "job", location: "courtyard", node: "lecture" },
  { id: "gym", label: "Edzés", detail: "Jelenlét", slots: ["afternoon"], icon: I.gym, kind: "stat", location: "courtyard", node: "gym" },
  { id: "brick", label: "Kérdőív", detail: "Tanári javítás", slots: ["afternoon", "evening"], icon: I.study, kind: "minigame", location: "department" },
  { id: "mohu-a", label: "MOHU", detail: "Palackok az udvar szélén", slots: ["afternoon"], icon: I.money, kind: "minigame", location: "mohu" },

  { id: "holdkor", label: "Holdkör", detail: "Rebeka este", slots: ["evening"], icon: I.holdkor, kind: "visit", location: "holdkor", girl: "rebeka" },
  { id: "apartment", label: "Lakosztály", detail: "Meghívott vendég", slots: ["evening"], icon: I.apartment, kind: "visit", location: "apartment" },
  { id: "walk", label: "Udvar", detail: "Nyugalom", slots: ["evening"], icon: I.courtyard, kind: "stat", location: "courtyard", node: "walk" },
  { id: "proof", label: "Korrektúra", detail: "+22 000 Ft", slots: ["evening"], icon: I.study, kind: "job", location: "apartment", node: "proof" },
  { id: "rest-e", label: "Pihenés", detail: "Nyugalom, energia", slots: ["evening"], icon: I.rest, kind: "stat", location: "apartment", node: "rest" },
  { id: "bekas", label: "Békás-tó", detail: "Kockázat, zárás után", slots: ["evening"], icon: I.courtyard, kind: "date", location: "bekas", node: "bekas", risk: 10 },
  { id: "date-peron", label: "Éjszakai peron", detail: "2 000 Ft · Rebeka", slots: ["evening"], icon: I.holdkor, kind: "date", location: "peron", node: "rebeka_peron", girl: "rebeka", cost: 2000, risk: 14, once: true },
  { id: "date-book", label: "Könyvesbolt", detail: "4 000 Ft · Boglárka", slots: ["evening"], icon: I.library, kind: "date", location: "bookshop", node: "boglarka_bolt", girl: "boglarka", cost: 4000, risk: 6, once: true },
  { id: "date-cinema", label: "Kis mozi", detail: "9 000 Ft · Gréta", slots: ["evening"], icon: I.task, kind: "date", location: "cinema", node: "greta_mozi", girl: "greta", cost: 9000, risk: 12, once: true },
];

export const SLOT_LABEL = ["Délelőtt", "Délután", "Este"] as const;

export function chapterName(week: number): string {
  if (week <= 8) return "Közös szakasz";
  if (week <= 15) return "Zárt útvonal";
  return "Utolsó hét";
}

export function actNote(week: number): string {
  if (week <= 8) return "Mindhárom nő a saját helyén van. A zárás a nyolcadik hét végén jön: egy lány, egy összeillő pár, vagy senki.";
  if (week <= 15) return "Csak a zárt útvonal mélyül. Aki nincs rajta, hidegen marad. A mély jelenet a saját helyén vagy a lakosztályban nyílik.";
  return "Ez az utolsó hét. Ami a bizalomból és a kockázatból összegyűlt, a záráson dől el.";
}

mergePart1(NODES, STORY);
mergeLater(NODES, STORY);

export function assertCatalog() {
  for (const n of Object.values(NODES)) {
    if (n.choices.length < 1 || n.choices.length > 4) throw new Error(n.id);
  }
  for (const e of STORY) {
    if (!NODES[e.node]) throw new Error(e.id);
  }
}
