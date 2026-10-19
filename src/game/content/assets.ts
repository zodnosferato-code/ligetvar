import type {ActorId,Expression,LocationId} from './types.ts';
export interface ArtAsset{file:string|null;status:'transitional'|'placeholder';note:string}
const bg=(file:string,note:string):ArtAsset=>({file:'backgrounds/'+file,status:'transitional',note});
export const BACKGROUNDS:Record<LocationId,ArtAsset>={
 classroom:bg('classroom.jpg','Korábbi tanterem; hangulata megőrzendő, végleges illusztráció később.'),library:bg('library.jpg','Korábbi könyvtár; hangulata megőrzendő.'),department:bg('department.jpg','Korábbi tanszéki iroda; hangulata megőrzendő.'),
 holdkor:bg('holdkor-night.jpg','Korábbi Holdkör-pince; hangulata megőrzendő.'),courtyard:bg('courtyard.jpg','Korábbi kastélyudvar; hangulata megőrzendő.'),apartment:bg('apartment.jpg','Korábbi lakosztály; hangulata megőrzendő.'),bekas:bg('bekas-to.jpg','Korábbi tópart; hangulata megőrzendő.'),
 chamber:{file:null,status:'placeholder',note:'Képhelyőrző: gépészeti kamra, kőfal, régi vezetékek és szerelőakna.'}
};
export const ACTOR_NAME:Record<ActorId,string>={rebeka:'Rebeka Dorn',boglarka:'Boglárka Fazekas',greta:'Gréta Váradi',marton:'Márton',soma:'Végh Soma',denes:'Dr. Farkas Dénes',julia:'Dr. Sárközi Júlia',aron:'Dr. Kerekes Áron',lilla:'Lilla',narrator:'Ligetvár'};
export const SHORT:Record<ActorId,string>={rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',marton:'Márton',soma:'Soma',denes:'Dénes',julia:'Júlia',aron:'Áron',lilla:'Lilla',narrator:'Ligetvár'};
export const LOCATIONS:Record<LocationId,string>={classroom:'Tanterem',library:'Könyvtár',department:'Tanszéki iroda',holdkor:'Holdkör pincéje',courtyard:'Kastélyudvar',apartment:'Márton lakosztálya',bekas:'Békás-tó',chamber:'Gépészeti kamra'};
export function portraitFor(actor:ActorId,_expression:Expression):ArtAsset{return {file:null,status:'placeholder',note:'Új portré készül: '+ACTOR_NAME[actor]};}
export function assetUrl(file:string){const env=(import.meta as ImportMeta&{env?:{BASE_URL?:string}}).env;return (env?.BASE_URL??'/')+file;}
