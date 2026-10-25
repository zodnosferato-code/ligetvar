/** Visible-image descriptions, reviewed against the runtime exports on 25 October 2026.
 * Production notes remain in assets.ts; these strings are player-facing Hungarian. */
import type {ArtAsset} from './assets.ts';
export const ASSET_DESCRIPTIONS:Record<string,string>={
 'backgrounds/hallway-day-v1.webp':'Napsütéses, üres kőfolyosó csúcsíves ablakokkal, fa irodaajtókkal, hirdetőtáblával és üres paddal. A világos kőpadlóra ablakárnyékok vetülnek.',
 'backgrounds/apartment-anime-v1.webp':'Kőfalú hálószoba: ágy, vörös fotel, könyvespolc és kis asztal. A gótikus ablakon át éjszakai ég látszik; bent meleg lámpafény világít.',
 'backgrounds/bekas-anime-v1.webp':'Napos tópart, faasztal és üres pad az előtérben. A túlparton őszi fák között tornyos kastély emelkedik.',
 'backgrounds/bekas-night-anime-v1.webp':'Holdfényes tópart, sötét faasztal és üres pad. A vízen fénycsík húzódik, a távoli kastély néhány ablaka világít.',
 'backgrounds/chamber-anime-v1.webp':'Boltíves kőterem, középen nyitott padlóaknával. Az előtérben asztallap, oldalt üres szék és lámpa, hátul nyitott ajtó látszik.',
 'backgrounds/classroom-anime-v1.webp':'Magas, csúcsíves ablakú tanterem napsütésben. Fapadok, üres székek és asztali lámpák látszanak egy elöl álló asztal mögött.',
 'backgrounds/classroom-dusk-anime-v1.webp':'Ugyanaz a magas ablakú tanterem alkonyatkor. Az ég lilás-rózsaszín, az üres fapadokat és asztalokat meleg lámpák világítják meg.',
 'backgrounds/courtyard-anime-v1.webp':'Napos kastélyudvar kőárkádokkal, nagy fával és virágágyásokkal. Elöl kerek faasztal és üres pad áll.',
 'backgrounds/courtyard-night-anime-v1.webp':'Holdfényes kastélyudvar: kőárkádok, fa és virágágyások, előttük üres pad és asztal. A falakon meleg lámpák égnek.',
 'backgrounds/department-anime-v1.webp':'Napos, kőfalú iroda. Az íróasztalon nyitott könyv és tárcsás telefon, mögötte bőrfotel és könyvespolc; balra ajtó és táska.',
 'backgrounds/department-night-v1.webp':'Az iroda éjszakai változata: a nagy ablak mögött sötét ég, az íróasztalon könyv és telefon. Meleg fény esik a fotelre és a polcokra.',
 'backgrounds/holdkor-anime-v1.webp':'Sötét, boltíves pincehelyiség kékes ablakokkal. Egy üres szék és asztal előtt világos vetítővászon áll, a falakon lámpák égnek.',
 'backgrounds/library-anime-v1.webp':'Napos könyvtár magas kőboltozattal és könyvespolcokkal. Az olvasóasztalon nyitott könyv, vörös kötet és lámpa, mögötte üres székek.',
 'backgrounds/library-evening-anime-v1.webp':'Esti könyvtár, kékes-lilás ég az ablakok mögött. A polcokat és az üres olvasóasztalt lámpafény világítja meg; elöl két könyv látszik.',
 'characters/aron/neutral-v1.webp':'Ősz hajú, szemüveges férfi sötét öltönyben és bordó nyakkendőben. Arca komoly, tekintete egyenes.',
 'characters/denes/neutral-v1.webp':'Sötét, halántékán őszülő hajú, rövid szakállú férfi fehér köpenyben, sötét inggel. Enyhe mosollyal néz előre.',
 'characters/julia/neutral-v1.webp':'Rövid, göndör fekete hajú nő sötét blézerben és szürkészöld blúzban. Nyugodt, figyelő arckifejezése van.',
 'characters/lilla/neutral-v1.webp':'Vállig érő barna hajú nő kékeszöld kardigánban és világos galléros blúzban. Arca visszafogott, enyhén mosolygó.',
 'characters/soma/neutral-v1.webp':'Fekete hajú, bajuszos, testesebb férfi barna kötött mellényben és világos ingben. Komoly arccal áll szemben.',
 'characters/soma/transformed-v1.webp':'Fekete hajú, bajuszos férfi barna mellényben és világos ingben. Szeme vörösen fénylik, nyitott szája mellett hegyes szemfog látszik.',
};
const people={virag:'Rövid, kék pixie frizurás felnőtt nő, szürkéskék szemmel, nyitott gallérú fehér blúzban és bordó kardigánban; egyik keze a csípőjén.',rebeka:'Hosszú fekete hajú nő lila hajtinccsel, fekete felsőben és fémes nyakpánttal.',boglarka:'Barna hajú nő oldalt lelógó fonattal, zöld kardigánban és világos felsőben.',greta:'Vörös hajú, szemüveges nő lófarokkal, zöld mellényben és fehér galléros ingben.'};
const expressions={neutral:'Nyugodt, visszafogott arckifejezés.',amused:'Félmosoly, enyhén megemelt szemöldök.',displeased:'Összehúzott szemöldök, szigorú tekintet.',vulnerable:'Bizonytalan, kissé aggodalmas arc, résnyire nyitott száj.',affectionate:'Lágy mosoly és kipirult arc.'};
for(const [person,description] of Object.entries(people))for(const [expression,face] of Object.entries(expressions)){
 if(person==='greta'&&expression==='affectionate')continue;
 ASSET_DESCRIPTIONS[`characters/${person}/${expression}-v1.webp`]=`${description} ${face}`;
}
export function describeAsset(asset:ArtAsset){return asset.file?ASSET_DESCRIPTIONS[asset.file]??'Ehhez a képhez még nincs leírás.':asset.note||'Nem jelenik meg kép.';}
