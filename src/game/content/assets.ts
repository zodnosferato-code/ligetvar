import type {ActorId,Expression,LocationId} from '../engine/types.ts';
export interface ArtAsset{file:string|null;status:'transitional'|'placeholder';note:string}
const bg=(file:string,note:string):ArtAsset=>({file:'backgrounds/'+file,status:'transitional',note});
export const BACKGROUNDS:Record<LocationId,ArtAsset>={
 classroom:bg('classroom.jpg','Korábbi tanterem; nem végleges manga háttér.'),library:bg('library.jpg','Korábbi könyvtár.'),department:bg('department.jpg','Korábbi tanszéki iroda.'),
 holdkor:bg('holdkor-night.jpg','Korábbi Holdkör-pince.'),courtyard:bg('courtyard.jpg','Korábbi kastélyudvar.'),apartment:bg('apartment.jpg','Korábbi lakosztály.'),bekas:bg('bekas-to.jpg','Korábbi tópart.'),
 chamber:{file:null,status:'placeholder',note:'Képhelyőrző: gépészeti kamra, kőfal, régi vezetékek és szerelőakna.'}
};
export const ACTOR_NAME:Record<ActorId,string>={rebeka:'Rebeka Dorn',boglarka:'Boglárka Fazekas',greta:'Gréta Váradi',marton:'Márton',soma:'Végh Soma',denes:'Dr. Farkas Dénes',julia:'Dr. Sárközi Júlia',aron:'Dr. Kerekes Áron',lilla:'Lilla',narrator:'Ligetvár'};
export const SHORT:Record<ActorId,string>={rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',marton:'Márton',soma:'Soma',denes:'Dénes',julia:'Júlia',aron:'Áron',lilla:'Lilla',narrator:'Ligetvár'};
export const LOCATIONS:Record<LocationId,string>={classroom:'Tanterem',library:'Könyvtár',department:'Tanszéki iroda',holdkor:'Holdkör pincéje',courtyard:'Kastélyudvar',apartment:'Márton lakosztálya',bekas:'Békás-tó',chamber:'Gépészeti kamra'};
const neutral:Partial<Record<ActorId,string>>={rebeka:'characters/rebeka/rebeka-face-front.jpg',boglarka:'characters/boglarka/boglarka-face-front.jpg',greta:'characters/greta/greta-full-front-clothed.jpg'};
const expressions:Partial<Record<ActorId,Partial<Record<Expression,string>>>>={rebeka:{amused:'characters/rebeka/rebeka-emotion-halfsmile.jpg',displeased:'characters/rebeka/rebeka-emotion-anger.jpg',vulnerable:'characters/rebeka/rebeka-emotion-vulnerable.jpg'},boglarka:{amused:'characters/boglarka/boglarka-emotion-smile.jpg'}};
export function portraitFor(actor:ActorId,expression:Expression):ArtAsset{const file=expressions[actor]?.[expression]??neutral[actor]??null;return {file,status:file?'transitional':'placeholder',note:file?'Átmeneti ruhás portré; a kifejezéskészlet nem végleges.':'Portréhelyőrző: '+ACTOR_NAME[actor]};}
export function assetUrl(file:string){const env=(import.meta as ImportMeta&{env?:{BASE_URL?:string}}).env;return (env?.BASE_URL??'/')+file;}
