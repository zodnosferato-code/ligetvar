import {CALENDAR} from './calendar.ts';
import type {GameState,GirlId,Expression} from './types.ts';
export const GIFTS={
 photo:{name:'Fotófüzet',price:5000,person:'rebeka',girl:'rebeka',bonus:2,description:'Vastag, matt lapok saját képeknek és széljegyzeteknek.'},
 film:{name:'Kultfilmes képeslapcsomag',price:8000,person:'rebeka',girl:'rebeka',bonus:2,description:'Eltúlzott szörnyek és vállalhatatlan filmcímek. Közös nevetéshez.'},
 tea:{name:'Szálas tea',price:4000,person:'boglarka',girl:'boglarka',bonus:2,description:'Egy nyugodt olvasószünethez, nem egy újabb munkafeladathoz.'},
 bookmark:{name:'Préselt leveles könyvjelző',price:6500,person:'boglarka',girl:'boglarka',bonus:2,description:'Apró, kézzel készült tárgy; a mintája minden darabon eltér.'},
 notes:{name:'Zsebméretű jegyzetfüzet',price:4500,person:'greta',girl:'greta',bonus:2,description:'Elfér egy kabátzsebben. Útvonalaknak, ötleteknek, vagy üresen hagyott lapoknak.'},
 thermos:{name:'Kirándulós termosz',price:9000,person:'greta',girl:'greta',bonus:2,description:'Két pohárral; a következő kitérőn nem kell kávézót keresni.'}
} as const;
export type GiftId=keyof typeof GIFTS;
export const GIFT_NOTES={noticed:'Megláttam, és eszembe jutottál.',thanks:'Köszönöm a közös időt. Ezt neked választottam.',company:'Ha lenne kedved, egyszer együtt is kipróbálhatnánk.'} as const;
export type GiftNote=keyof typeof GIFT_NOTES;
export type Delivery='remote'|'inPerson';
export interface GiftReceipt {week:number;girl:GirlId;gift:GiftId;note:GiftNote;delivery:Delivery;reaction:string;expression:Expression;bonus:number;read:boolean}
const reactions:Record<GirlId,{favorite:Record<string,string>;neutral:string;repeat:string;invite:string;thanks:string}>={
 rebeka:{favorite:{photo:'Na végre, egy füzet, amiben nem nekem kell szépnek lennem. A képeknek még van esélyük. Az első oldalt azért neked mutatom meg.',film:'Ez a szörny katasztrofális. Kell. A harmadik képeslapot bekeretezem, hogy mindenki tudja: vannak elveim, csak rosszak.'},neutral:'Ez most egy merész tipp volt. Nem egészen az én világom, de látom, hogy választottál valamit. Legközelebb kérdezz rá arra a filmes polcra.',repeat:'Ebből már kaptam tőled. Gyűjteményt nyitunk? Inkább mesélj valamit magadról, abból még nincs két példányom.',invite:'Egy közös próba? Rendben, de a kommentárt én adom. Időpontot még egyeztessünk.',thanks:'Én is jól éreztem magam. Na, ezt most leírtam. Ne nagyítsd plakátra.'},
 boglarka:{favorite:{tea:'Pont most tettem le a könyvet. Jó, ez nem igaz, csak megfordítottam az asztalon. Most viszont tényleg főzök egy csészével. Köszönöm.',bookmark:'A levél erezete egészen különös. Van egy könyvem, amiben eddig egy bevásárlólista tartotta a helyet. Azt hiszem, előléptetem.'},neutral:'Köszönöm, hogy gondoltál rám. Ezt valószínűleg ritkábban használnám; az apró, olvasáshoz való dolgok közelebb állnak hozzám.',repeat:'Emlékszel, már hoztál ilyet. Az elsőt is őrzöm. Nem kell minden alkalomra egy új tárgy.',invite:'Szívesen. Egy csendes helyet választanék, ahol nem kell rögtön elindulnunk. Majd megbeszéljük, mikor.',thanks:'Nekem is számított az az idő. Jólesik, hogy neked sem csak egy szünet volt.'},
 greta:{favorite:{notes:'Pont zsebméret. Az első oldalra azt írom: nem minden szabad délutánra kell feladat. Ezt majd számon kérheted rajtam.',thermos:'Két pohár? Jó előrelátás. Van egy kerülőút a tó mellett, amit folyton kihagyok. Ezzel elfogyott az egyik kifogásom.'},neutral:'Köszönöm. Meglepő választás; én inkább olyasminek örülök, amit magammal vihetek. De legközelebb elég az is, ha velem tartasz.',repeat:'Már van tőled egy ilyen, használom is. A következő meglepetés legyen inkább egy közös program.',invite:'Benne vagyok. De most te is válassz útvonalat, ne csak én szervezzek. Az időpontot külön beszéljük meg.',thanks:'Jólesett veled kiszakadni. Ezt nem írom fel elvégzett feladatnak.'}
};
export function deliverGift(s:GameState,girl:GirlId,id:string,note:GiftNote='noticed',delivery:Delivery='inPerson'):GameState{
 if(!Object.hasOwn(GIFTS,id)||!Object.hasOwn(reactions,girl)||!Object.hasOwn(GIFT_NOTES,note)||!['remote','inPerson'].includes(delivery)||s.phase!=='planner'||s.slot<1||s.slot>2||!(s.inventory[id]>0)||s.giftsWeek.includes(girl))return s;
 const gift=id as GiftId,item=GIFTS[gift],history=s.giftHistory,repeat=history.some(h=>h.girl===girl&&h.gift===gift),favorite=item.person===girl,voice=reactions[girl];
 const bonus=repeat?0:favorite?2:0;
 const reaction=(repeat?voice.repeat:favorite?voice.favorite[gift]:voice.neutral)+(favorite&&!repeat?(note==='company'?' '+voice.invite:note==='thanks'?' '+voice.thanks:''):'');
 const receipt:GiftReceipt={week:s.week,girl,gift,note,delivery,reaction,expression:repeat||!favorite?'neutral':note==='thanks'?'affectionate':'amused',bonus,read:false};
 const bond=`marton_${girl}` as const;
 return {...s,inventory:{...s.inventory,[gift]:s.inventory[gift]-1},giftsWeek:[...s.giftsWeek,girl],bonds:{...s.bonds,[bond]:Math.min(100,s.bonds[bond]+bonus)},giftHistory:[...history,receipt],lastNote:delivery==='remote'?'Megérkezett az ajándék. Új válasz a telefonodon.':'Az átadás után személyes választ kaptál.'};
}
export function validGiftHistory(value:unknown,week:number):value is GiftReceipt[]{
 return Array.isArray(value)&&value.length<=CALENDAR.weeks*3&&value.every(h=>h&&typeof h==='object'&&Number.isInteger(h.week)&&h.week>=1&&h.week<=week&&Object.hasOwn(reactions,h.girl)&&Object.hasOwn(GIFTS,h.gift)&&Object.hasOwn(GIFT_NOTES,h.note)&&['remote','inPerson'].includes(h.delivery)&&typeof h.reaction==='string'&&h.reaction.length<=1500&&['neutral','amused','affectionate'].includes(h.expression)&&[0,2].includes(h.bonus)&&typeof h.read==='boolean')&&new Set(value.map(h=>h.week+':'+h.girl)).size===value.length;
}
