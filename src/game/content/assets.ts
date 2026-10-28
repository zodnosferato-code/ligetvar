import {calendarFor,type Outfit} from './calendar.ts';
import type {ActorId,Expression,LocationId} from './types.ts';
export interface ArtAsset{file:string|null;status:'reviewed'|'transitional'|'placeholder';note:string;lightingBaked?:boolean;missingVariant?:string}
export const BACKGROUNDS:Record<LocationId,ArtAsset>={
 hallway:{file:'backgrounds/hallway-day-v1.webp',status:'reviewed',lightingBaked:true,note:'Átnézett üres nappali egyetemi folyosó, pad és hirdetőtábla.'},
 classroom:{file:'backgrounds/classroom-anime-v1.webp',status:'reviewed',note:'Átnézett nappali anime tanterem; külön alkonyati változattal.'},library:{file:'backgrounds/library-anime-v1.webp',status:'reviewed',note:'ChatGPT segítségével javított üres anime könyvtár, ülő játékosnézet és szabad társszék.'},department:{file:'backgrounds/department-anime-v1.webp',status:'reviewed',note:'Átnézett nappali anime tervezőiroda; az ajtó, íróasztal, telefon, napló, fotel, polc és zsák hotspothelye ellenőrizve.'},
 holdkor:{file:'backgrounds/holdkor-anime-v1.webp',status:'reviewed',note:'Átnézett üres anime Holdkör-pince éjszaka; vetítővászon, szabad szék, ülő játékosnézet.'},courtyard:{file:'backgrounds/courtyard-anime-v1.webp',status:'reviewed',note:'Átnézett, üres nappali anime kastélyudvar; ülő játékosnézet, szabad pad.'},apartment:{file:'backgrounds/apartment-anime-v1.webp',status:'reviewed',note:'Átnézett anime hálószoba éjszakai központ; az ajtó, telefon, napló, fotel és polc hotspothelye ellenőrizve.'},bekas:{file:'backgrounds/bekas-anime-v1.webp',status:'reviewed',note:'Átnézett üres nappali anime tópart, ülő játékosnézet és szabad pad.'},
 chamber:{file:'backgrounds/chamber-anime-v1.webp',status:'reviewed',note:'Átnézett anime gépészeti kamra, szerelőakna, három rögzítés és nyitott szolgálati kijárat.'}
};
type Lighting='day'|'evening'|'night';
const lit=(file:string,note:string):ArtAsset=>({file:'backgrounds/'+file,status:'reviewed',lightingBaked:true,note});
const courtyardNight=lit('courtyard-night-anime-v1.webp','Átnézett éjszakai udvar, megőrzött építészet és ülőhely.');
export const BACKGROUND_VARIANTS:Partial<Record<LocationId,Partial<Record<Lighting,ArtAsset>>>>={
 classroom:{evening:lit('classroom-dusk-anime-v1.webp','Átnézett alkonyati tanterem, megőrzött berendezés.')},
 library:{evening:lit('library-evening-anime-v1.webp','Átnézett esti könyvtár, megőrzött berendezés.')},
 courtyard:{evening:courtyardNight,night:courtyardNight},
 bekas:{night:lit('bekas-night-anime-v1.webp','Holdfényes tópart, nappali égbolt nélkül.')},
 department:{night:lit('department-night-v1.webp','Éjszakai iroda; megőrzött bútorok és tárgykoordináták.')},
 apartment:{night:{...BACKGROUNDS.apartment,lightingBaked:true}},
 holdkor:{night:{...BACKGROUNDS.holdkor,lightingBaked:true}}
};
export const EVENT_BACKGROUNDS:Record<string,ArtAsset>={};
export const SEASONAL_BACKGROUNDS:Record<string,ArtAsset>={};
export function backgroundFor(location:LocationId,lighting:Lighting,week?:number):ArtAsset{
 if(week!==undefined){
  const c=calendarFor(week),key=`${location}/${c.season}/${c.weather}/${lighting}`,eventKey=c.event?`${location}/${c.event}/${lighting}`:null;
  const event=eventKey?EVENT_BACKGROUNDS[eventKey]:undefined;
  if(event?.file&&event.status==='reviewed')return event;
  const variant=[SEASONAL_BACKGROUNDS[key],SEASONAL_BACKGROUNDS[`${location}/${c.season}/${lighting}`]].find(a=>a?.file&&a.status==='reviewed');
  const fallback=variant?.file&&variant.status==='reviewed'?variant:backgroundFor(location,lighting);
  return {...fallback,missingVariant:eventKey??key};
 }
 const variants=BACKGROUND_VARIANTS[location];
 return variants?.[lighting]??(lighting==='night'?variants?.evening:lighting==='evening'?variants?.night:undefined)??BACKGROUNDS[location];
}
export const ACTOR_NAME:Record<ActorId,string>={virag:'Virág',rebeka:'Rebeka Dorn',boglarka:'Boglárka Fazekas',greta:'Gréta Váradi',marton:'Márton',soma:'Végh Soma',denes:'Dr. Farkas Dénes',julia:'Dr. Sárközi Júlia',aron:'Dr. Kerekes Áron',lilla:'Lilla',narrator:'Elbeszélés'};
export const SHORT:Record<ActorId,string>={virag:'Virág',rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',marton:'Márton',soma:'Soma',denes:'Dénes',julia:'Júlia',aron:'Áron',lilla:'Lilla',narrator:'Elbeszélés'};
export const LOCATIONS:Record<LocationId,string>={hallway:'Egyetemi folyosó',classroom:'Tanterem',library:'Könyvtár',department:'Tanszéki iroda',holdkor:'Holdkör pincéje',courtyard:'Kastélyudvar',apartment:'Márton lakosztálya',bekas:'Békás-tó',chamber:'Gépészeti kamra'};
// Only visually reviewed exports belong here; generation candidates stay private to tooling.
export const PORTRAITS:Partial<Record<ActorId,Partial<Record<Expression,ArtAsset>>>>={
 virag:{neutral:{file:'characters/virag/neutral-v1.webp',status:'reviewed',note:'ChatGPT portré; asszisztensi kép- és alphaellenőrzés; végső felhasználói jóváhagyás nyitott.'},amused:{file:'characters/virag/amused-v1.webp',status:'reviewed',note:'ChatGPT portré; asszisztensi kép- és alphaellenőrzés; végső felhasználói jóváhagyás nyitott.'},displeased:{file:'characters/virag/displeased-v1.webp',status:'reviewed',note:'ChatGPT portré; asszisztensi kép- és alphaellenőrzés; végső felhasználói jóváhagyás nyitott.'},vulnerable:{file:'characters/virag/vulnerable-v1.webp',status:'reviewed',note:'ChatGPT portré; asszisztensi kép- és alphaellenőrzés; végső felhasználói jóváhagyás nyitott.'},affectionate:{file:'characters/virag/affectionate-v1.webp',status:'reviewed',note:'ChatGPT portré; asszisztensi kép- és alphaellenőrzés; végső felhasználói jóváhagyás nyitott.'}},
 julia:{neutral:{file:'characters/julia/neutral-v1.webp',status:'reviewed',note:'ChatGPT portré; asszisztensi vizuális ellenőrzés, végső stílusjóváhagyás nyitott.'}},
 lilla:{neutral:{file:'characters/lilla/neutral-v1.webp',status:'reviewed',note:'Miki véglegesítette; érettebb, harmincas évei elején járó Lilla.'}},
 aron:{neutral:{file:'characters/aron/neutral-v1.webp',status:'reviewed',note:'Miki véglegesítette; idősebb, késő hatvanas éveiben járó Áron.'}},
 soma:{neutral:{file:'characters/soma/neutral-v1.webp',status:'reviewed',note:'Miki által véglegesített és jóváhagyott semleges portré.'}},
 denes:{neutral:{file:'characters/denes/neutral-v1.webp',status:'reviewed',note:'ChatGPT semleges portré; asszisztensi vizuális ellenőrzés, végső felhasználói jóváhagyás nyitott.'}},
 rebeka:{neutral:{file:'characters/rebeka/neutral-v1.webp',status:'reviewed',note:'Átnézett neutral portré, megőrzött karakterazonosság és átlátszóság.'},amused:{file:'characters/rebeka/amused-v1.webp',status:'reviewed',note:'Átnézett amused portré, megőrzött karakterazonosság és átlátszóság.'},displeased:{file:'characters/rebeka/displeased-v1.webp',status:'reviewed',note:'Átnézett displeased portré, megőrzött karakterazonosság és átlátszóság.'},vulnerable:{file:'characters/rebeka/vulnerable-v1.webp',status:'reviewed',note:'Átnézett vulnerable portré, megőrzött karakterazonosság és átlátszóság.'},affectionate:{file:'characters/rebeka/affectionate-v1.webp',status:'reviewed',note:'Átnézett affectionate portré, megőrzött karakterazonosság és átlátszóság.'}},
 boglarka:{neutral:{file:'characters/boglarka/neutral-v1.webp',status:'reviewed',note:'Átnézett neutral portré, megőrzött karakterazonosság és átlátszóság.'},amused:{file:'characters/boglarka/amused-v1.webp',status:'reviewed',note:'Átnézett amused portré, megőrzött karakterazonosság és átlátszóság.'},displeased:{file:'characters/boglarka/displeased-v1.webp',status:'reviewed',note:'Átnézett displeased portré, megőrzött karakterazonosság és átlátszóság.'},vulnerable:{file:'characters/boglarka/vulnerable-v1.webp',status:'reviewed',note:'Átnézett vulnerable portré, megőrzött karakterazonosság és átlátszóság.'},affectionate:{file:'characters/boglarka/affectionate-v1.webp',status:'reviewed',note:'Átnézett affectionate portré, megőrzött karakterazonosság és átlátszóság.'}},
 greta:{neutral:{file:'characters/greta/neutral-v1.webp',status:'reviewed',note:'Átnézett neutral portré, megőrzött karakterazonosság és átlátszóság.'},amused:{file:'characters/greta/amused-v1.webp',status:'reviewed',note:'Átnézett amused portré, megőrzött karakterazonosság és átlátszóság.'},displeased:{file:'characters/greta/displeased-v1.webp',status:'reviewed',note:'Átnézett displeased portré, megőrzött karakterazonosság és átlátszóság.'},vulnerable:{file:'characters/greta/vulnerable-v1.webp',status:'reviewed',note:'Átnézett vulnerable portré, megőrzött karakterazonosság és átlátszóság.'}},
};
const TRANSFORMED_PORTRAITS:Partial<Record<ActorId,Partial<Record<Expression,ArtAsset>>>>={
 soma:{neutral:{file:'characters/soma/transformed-v1.webp',status:'reviewed',note:'Miki által véglegesített vámpírportré; a 2. héttől aktív.'}}
};
export const OUTFIT_PORTRAITS:Partial<Record<ActorId,Partial<Record<Outfit,Partial<Record<Expression,ArtAsset>>>>>>={};
export function portraitFor(actor:ActorId,expression:Expression,week=1,outfit?:Outfit):ArtAsset{
 if(actor==='marton'||actor==='narrator')return {file:null,status:'placeholder',note:''};
 const c=calendarFor(week),clothing=outfit??c.outfit;
 const candidates=[...new Set(outfit?[outfit]:[clothing,c.seasonalOutfit])];
 for(const candidate of candidates){
  const variant=OUTFIT_PORTRAITS[actor]?.[candidate],exact=variant?.[expression],neutral=variant?.neutral;
  if(exact?.file&&exact.status==='reviewed')return candidate===clothing?exact:{...exact,missingVariant:actor+'/'+clothing+'/'+expression};
  if(neutral?.file&&neutral.status==='reviewed')return {...neutral,missingVariant:actor+'/'+clothing+'/'+expression};
 }
 const portraits=week>=2?(TRANSFORMED_PORTRAITS[actor]??PORTRAITS[actor]):PORTRAITS[actor];
 const base=portraits?.[expression]??portraits?.neutral??{file:null,status:'placeholder' as const,note:'Portrait pending: '+ACTOR_NAME[actor]};
 return clothing==='everyday'?base:{...base,missingVariant:actor+'/'+clothing+'/'+expression};
}
export function assetUrl(file:string){const env=(import.meta as ImportMeta&{env?:{BASE_URL?:string}}).env;return (env?.BASE_URL??'/')+file;}


/** One transparent 2×2 atlas: green glass, blue plastic, copper can, purple glass. */
export const RECYCLING_ART:ArtAsset={file:'minigames/recycling/collectibles.webp',status:'reviewed',note:'Four cel-shaded recyclable objects with distinct silhouettes; assistant reviewed, user style acceptance pending.'};
export const RECYCLING_ATLAS_URL=new URL('../../../assets/minigames/recycling/collectibles.webp',import.meta.url).href;
