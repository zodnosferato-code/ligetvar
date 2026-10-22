import type {ActorId,Expression,LocationId} from './types.ts';
export interface ArtAsset{file:string|null;status:'reviewed'|'transitional'|'placeholder';note:string}
const bg=(file:string,note:string):ArtAsset=>({file:'backgrounds/'+file,status:'transitional',note});
export const BACKGROUNDS:Record<LocationId,ArtAsset>={
 classroom:{file:'backgrounds/classroom-anime-v1.webp',status:'reviewed',note:'Átnézett anime tanterem; külön esti változat még készül.'},library:{file:'backgrounds/library-anime-v1.webp',status:'reviewed',note:'ChatGPT segítségével javított üres anime könyvtár, ülő játékosnézet és szabad társszék.'},department:bg('department.jpg','Korábbi tanszéki iroda; hangulata megőrzendő.'),
 holdkor:bg('holdkor-night.jpg','Korábbi Holdkör-pince; hangulata megőrzendő.'),courtyard:{file:'backgrounds/courtyard-anime-v1.webp',status:'reviewed',note:'Átnézett, üres nappali anime kastélyudvar; ülő játékosnézet, szabad pad.'},apartment:bg('apartment.jpg','Korábbi lakosztály; hangulata megőrzendő.'),bekas:{file:'backgrounds/bekas-anime-v1.webp',status:'reviewed',note:'Átnézett üres nappali anime tópart, ülő játékosnézet és szabad pad.'},
 chamber:{file:null,status:'placeholder',note:'Képhelyőrző: gépészeti kamra, kőfal, régi vezetékek és szerelőakna.'}
};
export const ACTOR_NAME:Record<ActorId,string>={rebeka:'Rebeka Dorn',boglarka:'Boglárka Fazekas',greta:'Gréta Váradi',marton:'Márton',soma:'Végh Soma',denes:'Dr. Farkas Dénes',julia:'Dr. Sárközi Júlia',aron:'Dr. Kerekes Áron',lilla:'Lilla',narrator:'Elbeszélés'};
export const SHORT:Record<ActorId,string>={rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',marton:'Márton',soma:'Soma',denes:'Dénes',julia:'Júlia',aron:'Áron',lilla:'Lilla',narrator:'Elbeszélés'};
export const LOCATIONS:Record<LocationId,string>={classroom:'Tanterem',library:'Könyvtár',department:'Tanszéki iroda',holdkor:'Holdkör pincéje',courtyard:'Kastélyudvar',apartment:'Márton lakosztálya',bekas:'Békás-tó',chamber:'Gépészeti kamra'};
// Only visually reviewed exports belong here; generation candidates stay private to tooling.
export const PORTRAITS:Partial<Record<ActorId,Partial<Record<Expression,ArtAsset>>>>={
 rebeka:{neutral:{file:'characters/rebeka/neutral-v1.webp',status:'reviewed',note:'Átnézett semleges portré; további kifejezésváltozatok készülnek.'},amused:{file:'characters/rebeka/amused-v1.webp',status:'reviewed',note:'Átnézett visszafogott, ironikus mosoly; a tisztított semleges mesterből.'}},
 boglarka:{neutral:{file:'characters/boglarka/neutral-v1.webp',status:'reviewed',note:'Átnézett semleges portré; kifejezésváltozatok készülnek.'}},
 greta:{neutral:{file:'characters/greta/neutral-v1.webp',status:'reviewed',note:'Átnézett semleges portré; kifejezésváltozatok készülnek.'}}
};
export function portraitFor(actor:ActorId,expression:Expression):ArtAsset{
 if(actor==='marton'||actor==='narrator')return {file:null,status:'placeholder',note:''};
 const portraits=PORTRAITS[actor];
 return portraits?.[expression]??portraits?.neutral??{file:null,status:'placeholder',note:'Új portré készül: '+ACTOR_NAME[actor]};
}
export function assetUrl(file:string){const env=(import.meta as ImportMeta&{env?:{BASE_URL?:string}}).env;return (env?.BASE_URL??'/')+file;}

