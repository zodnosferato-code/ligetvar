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

export const PORTRAIT: Record<GirlId, string> = {
  rebeka: "/game/portraits/rebeka-face-neutral.png",
  boglarka: "/game/portraits/boglarka-face-neutral.png",
  greta: "/game/portraits/greta-face-neutral.png",
};

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
    haunt: "Este a Holdkörnél",
  },
  boglarka: {
    age: 19,
    year: "elsőéves, irodalom",
    blurb:
      "Félénk, amíg a mondata végét meg nem várják. A kardigán és a könyv páncél. Utána szárazabb a humora, mint hinnéd.",
    haunt: "Délután a könyvtárban",
  },
  greta: {
    age: 21,
    year: "harmadéves demonstrátor",
    blurb:
      "A lista a biztonsága. A kivétel gyanús neki. Nem a beosztásod miatt marad, ha marad.",
    haunt: "Délelőtt a tanszéken",
  },
};

export const LOCATION_BG: Record<LocationId, string> = {
  apartment: "/game/backgrounds/apartment.png",
  classroom: "/game/backgrounds/classroom.png",
  courtyard: "/game/backgrounds/courtyard.png",
  department: "/game/backgrounds/department.png",
  holdkor: "/game/backgrounds/holdkor.png",
  library: "/game/backgrounds/library.png",
  bekas: "/game/backgrounds/courtyard.png",
  bookshop: "/game/backgrounds/library.png",
  cinema: "/game/backgrounds/department.png",
  peron: "/game/backgrounds/holdkor.png",
  construction: "/game/backgrounds/courtyard.png",
  mohu: "/game/backgrounds/courtyard.png",
};

export const LOCATION_LABEL: Record<LocationId, string> = {
  apartment: "A lakás",
  classroom: "Tanterem",
  courtyard: "Udvar",
  department: "Tanszék",
  holdkor: "Holdkör",
  library: "Könyvtár",
  bekas: "Békás-tó",
  bookshop: "Könyvesbolt",
  cinema: "Kis mozi",
  peron: "Éjszakai peron",
  construction: "Építkezés",
  mohu: "Kampusz széle",
};

const I = {
  talk: "/game/icons/icon_talk.png",
  call: "/game/icons/icon_call.png",
  gift: "/game/icons/icon_gift.png",
  gym: "/game/icons/icon_gym.png",
  rest: "/game/icons/icon_rest.png",
  study: "/game/icons/icon_study.png",
  task: "/game/icons/icon_task.png",
  apartment: "/game/icons/icon_place_apartment.png",
  classroom: "/game/icons/icon_place_classroom.png",
  courtyard: "/game/icons/icon_place_courtyard.png",
  holdkor: "/game/icons/icon_place_holdkor.png",
  library: "/game/icons/icon_place_library.png",
  money: "/game/icons/icon_stat_money.png",
  calm: "/game/icons/icon_stat_calm.png",
  insight: "/game/icons/icon_stat_insight.png",
  presence: "/game/icons/icon_stat_presence.png",
  energy: "/game/icons/icon_stat_energy.png",
};

export const STAT_ICON = {
  presence: I.presence,
  insight: I.insight,
  calm: I.calm,
  money: I.money,
  energy: I.energy,
};

export const HEART_FULL = "/game/icons/ui_heart_full.png";
export const HEART_EMPTY = "/game/icons/ui_heart_empty.png";

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
): DialogueNode {
  return { id, speaker, text, kind, choices, journal, cost };
}

const NODES: Record<string, DialogueNode> = {};

function add(n: DialogueNode) {
  if (n.choices.length < 1 || n.choices.length > 4) {
    throw new Error(`A(z) ${n.id} csomópontnak 1–4 választása lehet.`);
  }
  NODES[n.id] = n;
}

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
    "A zárt hetekben a kör kisebb. Ha jössz, nem dísznek jössz. És nem viszed ki a folyosóra.",
    "story",
    [
      c(
        "very_good",
        "Nem viszlek közönség elé. A fény nappal is a tiéd, kulcs nélkül is.",
        "very_good",
        { closeness: 8, trust: 1 },
        "a válla leereszt",
      ),
      c("good", "A dokumentáció kész. A többi rád tartozik.", "good", { closeness: 3 }, "semleges"),
      c(
        "bad",
        "A Holdkör nélkül kevésbé vagy érdekes. Ezt tudnod kell.",
        "bad",
        { closeness: -3, anger: 1 },
        "sértés",
      ),
      c(
        "very_bad",
        "Holnap a tanszéken is így állunk majd egymás mellett.",
        "very_bad",
        { closeness: -4, anger: 1, risk: 12, flags: ["rebeka_kozonseg"] },
        "közönségnek érzi",
      ),
    ],
    "Rebeka a zárt útvonalon is nappali fényben maradt.",
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
    "Ha ezt komolyan gondolod, nem csak a lámpa alatt férsz hozzá. Én… én kibírom, ha valaki látja. De lassan.",
    "story",
    [
      c(
        "very_good",
        "Lassan. És nem te vagy a titkolt második. Ha látják, melletted állok, nem előtted.",
        "very_good",
        { closeness: 8, trust: 1 },
        "nagy levegő",
      ),
      c("good", "A könyvtár még jó. Az udvarra ráérünk.", "good", { closeness: 3 }, "türelem"),
      c("bad", "A sarok biztonságosabb. Maradjunk ott.", "bad", { closeness: -1 }, "visszalököd"),
      c(
        "very_bad",
        "Ne lassíts. A félév nem várja meg a mondatod végét.",
        "very_bad",
        { closeness: -4, anger: 2 },
        "türelmetlen",
      ),
    ],
    "Boglárka kimondta, hogy látva is kibírja.",
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
    "Zárt ajtónál könnyebb kimondani. Elrontottam egy mondatot a heti jelentésben. Ha ez vizsga, most vége.",
    "story",
    [
      c(
        "very_good",
        "Nem vizsga. A mondat javítható. Te attól még itt vagy.",
        "very_good",
        { closeness: 8, trust: 1, flags: ["greta_nem_vizsga"] },
        "egyet pislog, és javít",
      ),
      c("good", "Mutasd a mondatot. A többit nem pontozom.", "good", { closeness: 3 }, "dolgozik"),
      c("bad", "Egy demonstrátor ilyen hibát ne vigyen haza.", "bad", { closeness: -2, anger: 1 }, "szigor"),
      c(
        "very_bad",
        "Hozd ide a listát. A kapcsolatunk ettől függ.",
        "very_bad",
        { closeness: -5, anger: 2, flags: ["greta_eszkoz"] },
        "zsarolás",
      ),
    ],
    "Gréta elrontott egy mondatot, és nem lett vége.",
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

export { NODES };

export const STORY: StoryEvent[] = [
  { id: "rebeka_intro", node: "rebeka_intro", girl: "rebeka", locations: ["holdkor", "classroom"], part: 1, priority: 10, minWeek: 1 },
  { id: "rebeka_feny", node: "rebeka_feny", girl: "rebeka", locations: ["holdkor", "courtyard", "classroom"], part: 1, priority: 30, minWeek: 2 },
  { id: "rebeka_foto", node: "rebeka_foto", girl: "rebeka", locations: ["apartment"], part: 1, priority: 35, minWeek: 3, minTrust: 2 },
  { id: "rebeka_hatar", node: "rebeka_hatar", girl: "rebeka", locations: ["holdkor", "apartment", "classroom"], part: 1, priority: 40, minWeek: 5, minTrust: 2 },
  { id: "rebeka_het8", node: "rebeka_het8", girl: "rebeka", locations: ["holdkor", "classroom"], part: 1, priority: 80, minWeek: 7, maxWeek: 8 },
  { id: "rebeka_route", node: "rebeka_route", girl: "rebeka", locations: ["holdkor", "apartment", "classroom"], part: 2, priority: 60, minWeek: 10, minTrust: 3 },
  { id: "rebeka_kiss", node: "rebeka_kiss", girl: "rebeka", locations: ["apartment"], part: 2, priority: 70, minWeek: 11, minTrust: 4 },

  { id: "boglarka_intro", node: "boglarka_intro", girl: "boglarka", locations: ["library", "classroom"], part: 1, priority: 10, minWeek: 1 },
  { id: "boglarka_nev", node: "boglarka_nev", girl: "boglarka", locations: ["library", "classroom"], part: 1, priority: 20, minWeek: 2 },
  { id: "boglarka_udvar", node: "boglarka_udvar", girl: "boglarka", locations: ["courtyard"], part: 1, priority: 35, minWeek: 4, minTrust: 2 },
  { id: "boglarka_hatar", node: "boglarka_hatar", girl: "boglarka", locations: ["library", "apartment", "classroom"], part: 1, priority: 40, minWeek: 5, minTrust: 2 },
  { id: "boglarka_het8", node: "boglarka_het8", girl: "boglarka", locations: ["library", "classroom"], part: 1, priority: 80, minWeek: 7, maxWeek: 8 },
  { id: "boglarka_route", node: "boglarka_route", girl: "boglarka", locations: ["library", "apartment", "classroom"], part: 2, priority: 60, minWeek: 10, minTrust: 3 },
  { id: "boglarka_kiss", node: "boglarka_kiss", girl: "boglarka", locations: ["apartment"], part: 2, priority: 70, minWeek: 11, minTrust: 4 },

  { id: "greta_intro", node: "greta_intro", girl: "greta", locations: ["department", "classroom"], part: 1, priority: 10, minWeek: 1 },
  { id: "greta_hiba", node: "greta_hiba", girl: "greta", locations: ["department", "classroom"], part: 1, priority: 30, minWeek: 3 },
  { id: "greta_hatar", node: "greta_hatar", girl: "greta", locations: ["department", "apartment", "classroom"], part: 1, priority: 40, minWeek: 5, minTrust: 2 },
  { id: "greta_het8", node: "greta_het8", girl: "greta", locations: ["department", "classroom"], part: 1, priority: 80, minWeek: 7, maxWeek: 8 },
  { id: "greta_route", node: "greta_route", girl: "greta", locations: ["department", "apartment", "classroom"], part: 2, priority: 60, minWeek: 10, minTrust: 3 },
  { id: "greta_kiss", node: "greta_kiss", girl: "greta", locations: ["apartment"], part: 2, priority: 70, minWeek: 12, minTrust: 4 },
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
  { id: "brick", label: "Építkezés", detail: "Fal, időre", slots: ["afternoon", "evening"], icon: I.gym, kind: "minigame", location: "construction" },
  { id: "mohu-a", label: "MOHU", detail: "Palackok az udvar szélén", slots: ["afternoon"], icon: I.money, kind: "minigame", location: "mohu" },

  { id: "holdkor", label: "Holdkör", detail: "Rebeka este", slots: ["evening"], icon: I.holdkor, kind: "visit", location: "holdkor", girl: "rebeka" },
  { id: "apartment", label: "Lakás", detail: "Meghívott vendég", slots: ["evening"], icon: I.apartment, kind: "visit", location: "apartment" },
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
  return "Vég";
}

export function assertCatalog() {
  for (const n of Object.values(NODES)) {
    if (n.choices.length < 1 || n.choices.length > 4) throw new Error(n.id);
  }
  for (const e of STORY) {
    if (!NODES[e.node]) throw new Error(e.id);
  }
}
