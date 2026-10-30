import {storedMessage,message} from './scene-localization.ts';
import type {Scene} from './types.ts';
import {say,option,shared} from './authoring.ts';
export const spine:Scene[]=[
 shared(1,message('scene.opening.title'),'classroom',['marton','rebeka','boglarka','greta','soma'],[
  say('narrator',message('scene.opening.arrival')),
  say('greta',message('scene.opening.gretaIntroduction')),
  say('rebeka',message('scene.opening.rebekaIntroduction'),'amused'),
  say('boglarka',message('scene.opening.boglarkaIntroduction')),
  say('marton',message('scene.opening.exerciseInstructions'),'neutral',[
   option('demonstrate',message('scene.opening.choice.demonstrate'),storedMessage('scene.opening.reaction.demonstrate')),
   option('observe',message('scene.opening.choice.observe'),storedMessage('scene.opening.reaction.observe'))]),
  say('narrator',message('scene.opening.exerciseResult')),
  say('soma',message('scene.opening.somaIntroduction'),'neutral'),
  say('marton',message('scene.opening.martonReply')),
  say('narrator',message('scene.opening.departure'))
 ],['grounding'],storedMessage('scene.opening.journal')),
 shared(2,message('scene.missing.title'),'department',['marton','greta','rebeka','boglarka','denes'],[
  say('narrator',message('scene.missing.inventory')),
  say('narrator',message('scene.missing.somaSuccess')),
  say('rebeka',message('scene.missing.lillaReturn')),
  say('denes',message('scene.missing.examination')),
  say('boglarka',message('scene.missing.assumptions')),
  say('marton',message('scene.missing.askPermission'),'neutral',[
   option('ask',message('scene.missing.choice.ask'),storedMessage('scene.missing.reaction.ask')),
   option('space',message('scene.missing.choice.space'),storedMessage('scene.missing.reaction.space'))]),
  say('narrator',message('scene.missing.separateFacts'))
 ],['returned_lilla'],storedMessage('scene.missing.journal')),
 shared(3,message('scene.interview.title'),'library',['marton','lilla','rebeka','boglarka','greta'],[
  say('lilla',message('scene.interview.limits')),
  say('rebeka',message('scene.interview.camera')),
  say('marton',message('scene.interview.stop'),'neutral',[
   option('listen',message('scene.interview.choice.listen'),storedMessage('scene.interview.reaction.listen')),
   option('timeline',message('scene.interview.choice.timeline'),storedMessage('scene.interview.reaction.timeline'))]),
  say('lilla',message('scene.interview.invitation')),
  say('boglarka',message('scene.interview.unknownSpeaker')),
  say('narrator',message('scene.interview.accessLog')),
  say('lilla',message('scene.interview.initial')),
  say('narrator',message('scene.interview.close'))
 ],['phrase','time_gap'],storedMessage('scene.interview.journal'),{evidence:['grounding','returned_lilla']}),
 shared(4,message('scene.timeline.title'),'library',['marton','rebeka','boglarka','greta','julia'],[
  say('narrator',message('scene.timeline.arrival')),
  say('rebeka',message('scene.timeline.camera'),'amused'),
  say('greta',message('scene.timeline.log')),
  say('narrator',message('scene.timeline.edge')),
  say('julia',message('scene.timeline.julia')),
  say('narrator',message('scene.timeline.question'),'neutral',[
   option('separate',message('scene.timeline.separate.choice'),storedMessage('scene.timeline.separate.reaction')),
   option('check',message('scene.timeline.check.choice'),storedMessage('scene.timeline.check.reaction'))]),
  say('narrator',message('scene.timeline.departure'))
 ],['timeline'],storedMessage('scene.timeline.journal'),{evidence:['phrase','time_gap']}),
 shared(5,message('scene.same.title'),'holdkor',['marton','rebeka','boglarka','greta','aron'],[
  say('narrator',message('scene.same.arrival')),
  say('greta',message('scene.same.ordinary')),
  say('narrator',message('scene.same.voice')),
  say('rebeka',message('scene.same.rebeka'),'displeased'),
  say('narrator',message('scene.same.boglarkaAsk')),
  say('narrator',message('scene.same.repeat')),
  say('marton',message('scene.same.instruction'),'neutral',[
   option('ground',message('scene.same.choice.ground'),storedMessage('scene.same.ground.reaction')),
   option('withdraw',message('scene.same.choice.withdraw'),storedMessage('scene.same.withdraw.reaction'))]),
  say('boglarka',message('scene.same.boglarka')),
  say('greta',message('scene.same.greta')),
  say('narrator',message('scene.same.third')),
  say('aron',message('scene.same.aron')),
  say('narrator',message('scene.same.departure'))
 ],['borrowed_voice'],storedMessage('scene.same.journal'),{evidence:['grounding','phrase','timeline']}),
 shared(6,message('scene.offer.title'),'courtyard',['marton','soma','denes','rebeka','boglarka','greta'],[
  say('narrator',message('scene.offer.arrival')),
  say('soma',message('scene.offer.soma'),'amused'),
  say('greta',message('scene.offer.greta')),
  say('denes',message('scene.offer.denes')),
  say('boglarka',message('scene.offer.boglarka')),
  say('rebeka',message('scene.offer.rebeka')),
  say('marton',message('scene.offer.instruction'),'neutral',[
   option('protect',message('scene.offer.choice.protect'),storedMessage('scene.offer.protect.reaction')),
   option('consent',message('scene.offer.choice.consent'),storedMessage('scene.offer.consent.reaction'))]),
  say('narrator',message('scene.offer.pattern')),
  say('narrator',message('scene.offer.company')),
  say('narrator',message('scene.offer.departure'))
 ],['pattern'],storedMessage('scene.offer.journal'),{evidence:['borrowed_voice']}),
shared(7,message('scene.fragment.title'),'library',['marton','rebeka','boglarka','greta','julia','aron'],[
  say('narrator',message('scene.fragment.arrival')),
  say('aron',message('scene.fragment.aron')),
  say('greta',message('scene.fragment.greta')),
  say('julia',message('scene.fragment.julia')),
  say('boglarka',message('scene.fragment.boglarka')),
  say('rebeka',message('scene.fragment.rebeka')),
  say('marton',message('scene.fragment.instruction'),'neutral',[
   option('copy',message('scene.fragment.choice.copy'),storedMessage('scene.fragment.copy.reaction')),
   option('index',message('scene.fragment.choice.index'),storedMessage('scene.fragment.index.reaction'))]),
  say('narrator',message('scene.fragment.exhaustion')),
  say('narrator',message('scene.fragment.plan')),
  say('narrator',message('scene.fragment.departure'))
 ],['ritual_fragment','archive_access'],storedMessage('scene.fragment.journal'),{evidence:['pattern']}),
shared(8,message('scene.disclosure.title'),'classroom',['marton','rebeka','boglarka','greta','denes','julia'],[
  say('narrator',message('scene.disclosure.arrival')),
  say('greta',message('scene.disclosure.greta')),
  say('rebeka',message('scene.disclosure.rebeka')),
  say('boglarka',message('scene.disclosure.boglarka')),
  say('denes',message('scene.disclosure.denes')),
  say('julia',message('scene.disclosure.julia')),
  say('marton',message('scene.disclosure.instruction'),'neutral',[
   option('public',message('scene.disclosure.choice.public'),storedMessage('scene.disclosure.public.reaction'),{disclosure:'public'}),
   option('limited',message('scene.disclosure.choice.limited'),storedMessage('scene.disclosure.limited.reaction'),{disclosure:'limited'}),
   option('private',message('scene.disclosure.choice.private'),storedMessage('scene.disclosure.private.reaction'),{disclosure:'private'})]),
  say('rebeka',message('scene.disclosure.rebeka.after')),
  say('boglarka',message('scene.disclosure.boglarka.after')),
  say('narrator',message('scene.disclosure.narrator.direction')),
  say('narrator',message('scene.disclosure.departure'))
 ],['investigation_plan'],storedMessage('scene.disclosure.journal'),{evidence:['archive_access','ritual_fragment']}),
 shared(9,message('scene.corroboration.title'),'department',['marton','greta','rebeka','boglarka','aron','denes'],[
  say('narrator',message('scene.corroboration.arrival')),
  say('aron',message('scene.corroboration.aron')),
  say('greta',message('scene.corroboration.greta')),
  say('rebeka',message('scene.corroboration.rebeka')),
  say('boglarka',message('scene.corroboration.boglarka')),
  say('denes',message('scene.corroboration.denes')),
  say('marton',message('scene.corroboration.instruction'),'neutral',[
   option('document',message('scene.corroboration.choice.document'),storedMessage('scene.corroboration.document.reaction')),
   option('review',message('scene.corroboration.choice.review'),storedMessage('scene.corroboration.review.reaction'))]),
  say('narrator',message('scene.corroboration.narrator.identity')),
  say('narrator',message('scene.corroboration.departure'))
 ],['identity'],storedMessage('scene.corroboration.journal'),{evidence:['investigation_plan','timeline']}),
 shared(10,'A könnyű siker','department',['marton','soma'],[
  say('narrator','Soma új plakátot hoz. A vendégelőadáson az ő neve áll az első sorban.'),
  say('soma','Ha nem bolygatod az archívumot, a műhelyed megkapja a pénzt és a termet. Végre azt csinálhatod, amihez értesz.'),
  say('marton','Mit tettél a leírással?'),
  say('soma','Végigcsináltam. Magamtól, tudatosan. Elegem volt abból, hogy mindenki tehetségesebbnek és kívánatosabbnak látszik nálam. Most észrevesznek. Már csak be kell fejeznem.','displeased'),
  say('marton','Az elismerés nem indok arra, hogy mások erejét elvedd.','neutral',[
   option('refuse','A műhely jövőjét nem cserélem hallgatásra.','Soma leteszi a plakátot. Az ajánlatot nem fogadod el.'),
   option('question','Ez nem válasz arra, mi történt az eltűnt emberekkel.','Soma elhárítja a kérdést. Megállapodást nem ígérsz.')]),
  say('soma','Nem tudok bármit akaratni velük. Aki semmit nem akar tőlem, azt egy szép mondattal nem tartom ott. De mindig van valami, amire az ember vágyik.'),
  say('narrator','Távozása után Márton leírja a beszélgetést. A tudatos átalakulás beismerés; a hatalom korlátait még ellenőrizni kell.')
 ],['deliberate_transformation'],'Soma beismerte a tudatos átalakulást. Sikerért és figyelemért tette, a befejezésre készül.',{evidence:['identity','ritual_fragment']}),
 shared(11,'A nemet nem írja felül','courtyard',['marton','soma','julia','denes','greta'],[
  say('narrator','Júlia és Dénes felügyeli a találkozót; a kijáratok szabadok. Soma az archívumi másolatokat akarja vissza.'),
  say('soma','Gréta, nálam nem maradnál mások táblázatai mögött. Hozd ide az iratokat, és beszéljünk a te nevedről is.'),
  say('greta','Szeretném, hogy elismerjék a munkámat. Attól még nem adom oda, ami nem csak az enyém. Nem megyek veled.'),
  say('narrator','Soma figyelme magára vonja a tekintetet. Gréta a lélegzetét számolja, és a kijáratnál marad. A nemet nem váltja igenre a hatás.'),
  say('marton','Gréta döntését nem tárgyaljuk újra.','neutral',[
   option('support','Lezárom a beszélgetést, és együtt megyünk vissza.','Dénes ellenőrzi Gréta állapotát. Az ajánlat vonzó része és az elutasítás egyszerre volt valós.'),
   option('witness','Júlia rögzítse pontosan az elutasítást.','A felerősített figyelem nem írta át az akaratot.')]),
  say('julia','A rajongás és az ambíció erősítése veszélyes, de nem szeretet teremtése. Ezt most már nem csak a leírásból tudjuk.')
 ],['fascination_limit'],'Felügyelet mellett láttuk: a figyelem és ambíció erősítése ellenére hatásos marad az elutasítás. A vámpír nem teremthet szerelmet.',{evidence:['deliberate_transformation','grounding']}),
 shared(12,'A kitépett lap másolata','library',['marton','boglarka','rebeka','greta','julia','aron'],[
  say('aron','A régi karbantartási mellékletnél volt egy másodpéldány. Megvan a hiányzó lap, nem Soma hozta vissza.'),
  say('boglarka','A kölcsönzött életerőt helyhez kötött horgony tartja össze. A nyitott rítus horgonyának megszakítása végzetes összeomlást okoz az átalakultnak.'),
  say('julia','Ez ennek az instabil átalakulásnak a feltétele, nem általános vámpírellenes fegyver. A pontos helyet és időt is tudnunk kell.'),
  say('greta','Soma a ötvenegyedik hétre kért éjszakai hozzáférést. Van határidőnk.'),
  say('rebeka','A rajzon három padlóba süllyesztett rögzítés van. Az archív fotókon keresem meg, melyik helyiségben volt ilyen.'),
  say('marton','A következményt nem hallgatjuk el.','neutral',[
   option('explain','Mindenki értse, hogy Soma belehalhat a rítus megszakításába.','Senki nem kap hamis ígéretet veszélytelen megoldásról.'),
   option('help','Dénest és Áront is bevonjuk a kivonulás tervébe.','A szakmai segítség románctól függetlenül jár.')]),
  say('narrator','Külön helyeken őrzik a teljes másolatot. A végső gyengeség és az időpont még a konfrontáció előtt ismertté vált.')
 ],['anchor_rule','completion_date'],'Megvan a teljes leírás: a nyitott horgony megszakítása halálos összeomlást okoz. Soma a 51. hétre készül.',{evidence:['ritual_fragment','fascination_limit']}),
 shared(13,'A régi gépészeti kamra','chamber',['marton','rebeka','boglarka','greta','aron'],[
  say('narrator','Áron nappal nyitja ki a kamrát. Régi vezetékek futnak a falon, a szerelőakna körül három rögzítés látszik.'),
  say('rebeka','Ugyanaz a repedés, mint az archív fotón. Nem szép kép kell: a méretarány és a három pont legyen rajta.'),
  say('boglarka','A kör kötés, nem ajtó vagy puszta jelkép. A három rögzítést együtt kell megszakítani, amíg a folyamat nyitott.'),
  say('greta','Ez a kijárat a szolgálati lépcsőre vezet. Soma nem zárhatja le külön. A másik irány zsákutca.'),
  say('aron','A rítus idején itt leszek. A kijárat akkor sem marad őrizetlen, ha ti nem bírjátok.'),
  say('marton','Most ellenőrizzük a helyet; idő előtt nem bolygatjuk a horgonyt.','neutral',[
   option('map','Felrajzolom a távolságot és a kijáratot.','A visszavonulási út mindenkinek ismert.'),
   option('record','A képek mellé közösen írunk pontos leírást.','A helyszín rögzítése nem függ a személyes iránytól.')]),
  say('narrator','A kamra a kastély valós alaprajzának része lett. Mindenki megkeresi a kijáratot, mielőtt visszazárják az ajtót.')
 ],['chamber_location'],'Azonosítottuk a kamrát, a három rögzítést és a szolgálati kijáratot.',{evidence:['anchor_rule','completion_date']}),
 shared(14,'A terv, aminek ára van','classroom',['marton','rebeka','boglarka','greta','denes','julia','aron'],[
  say('narrator','Krétával jelölik a kamra méreteit. A visszatérő tanúk biztonságos helyen maradnak.'),
  say('denes','A külön próba és a segítői beosztás javít az esélyeken. Ha kimaradnak, akkor is közbelépünk, csak nagyobb lehet a veszteség.'),
  say('julia','A nyitott állapotot a három rögzítés egyszerre változó fénye jelzi. A leírást a kamra megfigyelése is alátámasztja.'),
  say('aron','Soma tudja, hogy lent jártunk. Visszakérte a kulcsokat, de a felügyeletet nem mondtam le.'),
  say('marton','Aki nem vállalja a veszélyt, más feladatot kap. A felkészülés nem szerelmi bizonyíték.','neutral',[
   option('share','Megosztom a feladatokat, és elfogadom a segítséget.','A szerepek világosak; a szabad sávokban még lehet külön gyakorolni.'),
   option('protect','Én a horgonyhoz megyek, a többiek a saját határukról döntenek.','Dénes nem ígér sérthetetlenséget. Az ellátás közös ügy.')]),
  say('greta','A magánéleti ígéreteinket se a riadalom vigye helyettünk tovább.'),
  say('narrator','Ez az utolsó hét a konfrontáció előtti személyes alkalmak pótlására. A két szabad sávban felkészülés, találkozó vagy pihenés választható.')
 ],['intervention_plan'],'Megbeszéltük a nyitott rítus jelét, a feladatokat és a kijárat védelmét. A segítség nem személyes kapcsolatért jár.',{evidence:['chamber_location','anchor_rule']}),
 shared(15,'A megszakított befejezés','chamber',['marton','soma','denes','julia','aron','rebeka','boglarka','greta'],[
  say('narrator','A három rögzítés egyszerre világosodik ki. Soma a kör közepén áll. A kijáratnál Áron vár, Dénes mellette. A tanúk nem kerültek ide.'),
  say('soma','Végre nem könyörgök azért, hogy figyeljenek rám. Hagyd befejezni. Holnapra mindenki a sikerem kezdeteként emlékszik erre.'),
  say('marton','Az elveszett esték és az elvett erő nem a te sikered. A leírást ismerjük. A kötés most nyitott.'),
  say('narrator','Soma hallott hangon hívja a csoportot a lépcső felé. Ugyanaz a mondat ismétlődik. Márton a földelésre emlékeztet, Dénes a megingó emberekhez lép. A hang nem dönthet helyettük.'),
  say('marton','Most kell megszakítani a három kötést.','neutral',[
   option('signal','Jelzek a segítőknek, együtt oldjuk a rögzítéseket.','Áron a kijáratot biztosítja, Júlia a nyitott állapotot ellenőrzi.'),
   option('anchor','A horgonyhoz lépek, és fedezetet kérek.','Dénes átveszi, aki nem bírja tovább. A három rögzítés megszakad.')]),
  say('narrator','A kör fénye megszűnik. Soma saját hangján próbál megszólalni, aztán a kölcsönzött életerő széthullik. A teste mozdulatlanná válik. Dénes ellenőrzi, majd kimondja: meghalt.'),
  say('julia','Most kifelé. Az iratok csak akkor jönnek velünk, ha értük menni nem veszélyeztet senkit.'),
  say('narrator','A külön felkészülés határozza meg, mennyi erő és bizonyíték marad náluk. A vámpír meghalt. A felépülés és a felelősség kérdése előttük áll.')
 ],['vampire_dead'],'Megszakítottuk a horgonyt. Soma instabil átalakulása összeomlott, a vámpír meghalt. A segítők mindenkit kivezettek.',{evidence:['intervention_plan','borrowed_voice','fascination_limit']}),
 shared(16,'A megmaradt idő','department',['marton','rebeka','boglarka','greta','denes','julia','aron'],[
  say('denes','Lilla jobban van, de még hamar elfárad. A hiányzó emlékeket nem erőltetjük vissza. Mindenki más ütemben épül fel.'),
  say('julia','A bizonytalan és sérült részleteket annak jelöltem. Nem készítünk szebb történetet a tények helyére.'),
  say('aron','A vezetés várja a jelentést. A korábbi tájékoztatási döntést most megerősíthetitek vagy módosíthatjátok.'),
  say('marton','A tanúk magánadatait egyik változat sem adja oda.','neutral',[
   option('public','Az ellenőrzött, engedélyezett bizonyítékok alapján nyilvános elismerést kérek.','A bizonyítékok megőrzése számít abban, mennyit ismer el a főiskola.',{disclosure:'public'}),
   option('limited','Korlátozott jelentést adunk, saját példányt is megőrizve.','Áron átvételi igazolást kér. A főiskola részleges magyarázatot adhat.',{disclosure:'limited'}),
   option('private','A személyes védelmet választom, nyilvános ügy nélkül.','Az ellátás folytatódik. Az intézmény könnyebben hallgathat a lényegéről.',{disclosure:'private'})]),
  say('rebeka','Nem a kamra képével akarom lezárni a sorozatot. Kell egy délután, amikor nem bizonyítékot keresünk.'),
  say('boglarka','A nevemet írom a kész szövegre. Hogy kinek mutatom meg először, már nem a nyomozás feladata.'),
  say('greta','Két szabad sávunk még van. A jelentés nem zárja be helyettünk a évet.'),
  say('narrator','Az intézményi választ rögzítik. A személyes utóbeszélgetésekre és a baráti találkozóra még a végső epilógus előtt sor kerülhet.')
 ],['aftermath'],'Rendeztük a bizonyítékokat és a jelentést. A személyes utóbeszélgetésekre még két szabad sáv van.',{evidence:['vampire_dead']})
];
spine[14].resolution='confrontation';spine[15].resolution='institution';

