import type {LocationId,Scene} from './types.ts';
import {say,option,chapterScene as scene} from './authoring.ts';
export const foundations:Scene[]=[
 scene('rebeka_1','Rebeka — A kép széle','relationship',1,14,'classroom',['marton','rebeka'],[
  say('narrator','Rebeka három képet tesz az üres tanterem asztalára: egy elmosódott kezet, a radiátor fölötti ablakot és a kör helyét a padlón.'),
  say('rebeka','A Holdkör szerint emberek nélkül nincs történet. Néha attól látszik valaki, amit nem mutatok meg róla. Melyiket hagynád bent?','amused'),
  say('marton','Mit szeretnél, hogy észrevegyek?','neutral',[
   option('interest','A kéz elmosódását. Benne van a mozdulat, mégsem mondja meg, kié.','Rebeka közelebb húzza a széket. „Végre valaki nem azt mondja, hogy élesítsek rajta.”',{bonds:{marton_rebeka:8},decisions:['rebeka_interest']}),
   option('ask','Az ablakot választanám. Te miért fényképezted le?','„Mert a fűtés zúgása közben mindenki kifelé nézett.” Megmutatja a következő képet is.',{bonds:{marton_rebeka:6},decisions:['rebeka_interest']}),
   option('leave','Most nem tudok igazán figyelni. Ezt inkább megmondom.','„Akkor ne játsszunk műkritikust.” A találkozó nem ígért közelséget.',{decisions:['rebeka_withdraw']})]),
  say('rebeka','A munkacím: Ami kívül marad. Nem kell rá bók. Szólj, ha a saját magyarázatom is túl kényelmes.','vulnerable'),
  say('marton','A műhelyt vezetem, de a képeidről nem én mondom ki az utolsó szót.'),
  say('narrator','Rebeka visszarendezi a fotókat. Egy negyediket is letesz: ugyanaz az ablak, egy elhagyott kávéscsészével. Nem feladatnak szánja.')
 ],{scenes:['shared_1']},[],'Rebeka megmutatta a fotóesszéjét. A kép és a magánélet határa az ő döntése maradt.'),
 scene('boglarka_1','Boglárka — A saját nevem','relationship',2,14,'library',['marton','boglarka'],[
  say('narrator','Boglárka három eltérő átiratot tesz az asztalra. Az egyikben a saját mondatai szerepelnek egy ismertebb kutató neve alatt.'),
  say('boglarka','Nem akarok rögtön botrányt. De attól, hogy csendben javítok, még nem azé, aki hangosabban mondja el.'),
  say('marton','Mit szeretnél kezdeni a gyűjtéssel?'),
  say('boglarka','Egy rövid tanulmányt. A nevemmel. Egyetlen olyan lábjegyzet nélkül, amit csak azért írok oda, hogy valaki ne sértődjön meg.','amused'),
  say('marton','Abban segítek, amire megkérsz.','neutral',[
   option('interest','Elolvasom a változatokat, aztán a saját érveidet kérem.','„A harmadik mondatnál ne bólogass olyan gyorsan.” A saját lapját teszi előre.',{bonds:{marton_boglarka:8},decisions:['boglarka_interest']}),
   option('ask','Melyik szóhoz ragaszkodsz leginkább?','Nem más tekintélyével indokolja a választ. Tovább marad a tervezettnél.',{bonds:{marton_boglarka:6},decisions:['boglarka_interest']}),
   option('leave','Ma csak a könyvért ugrottam be.','Boglárka elteszi a szöveget. A rövid találkozó nem ígért személyes folytatást.',{decisions:['boglarka_withdraw']})])
 ],{scenes:['shared_2']},[],'Boglárka a saját neve alatt szeretné kiadni a kutatását. A személyes figyelemről világos választ kapott.'),
 scene('greta_1','Gréta — A lista mögött','relationship',2,14,'department',['marton','greta'],[
  say('narrator','Gréta a teremfoglalást javítja. Az asztal szélén egy túraútvonal hever, ugyanolyan gondosan kiszínezve.'),
  say('greta','A „megbízható Gréta” lassan munkaköri leírás a nevem helyett. A rosszul jelzett ösvényeket jobban szeretem a táblázatoknál.'),
  say('marton','Melyik útra mennél most?'),
  say('greta','A tó körüli rövid körre. Nem teljesítmény. Csak kint vagyok.','amused'),
  say('marton','Az is érdekel, amit magadnak választasz.','neutral',[
   option('interest','Nézzük meg a térképet; az iratokat ma én zárom le.','Nem újabb feladatot ad. A kedvenc kerülőjét mutatja.',{bonds:{marton_greta:8},decisions:['greta_interest']}),
   option('ask','Hol szeretsz megállni a tónál?','„Ott, ahol nem kérdezik, hány lépést mentél.” Elmosolyodik.',{bonds:{marton_greta:6},decisions:['greta_interest']}),
   option('leave','Ma csak a teremkulcsért jöttem.','A kulcsot megkapod. A térképet Gréta magának tartja meg.',{decisions:['greta_withdraw']})])
 ],{scenes:['shared_2']},[],'Gréta a saját szabadidejéről beszélt. A személyes figyelmet nem az adminisztrációért kapta.')
];
const personal={
 rebeka:{
  name:'Rebeka',place:'holdkor' as LocationId,earliest:3,invite:6,
  attraction:['A vetítés után csak a ventilátor hallatszik. Rebeka a képernyő helyett most rád néz.','A képeimről könnyű veled beszélni. Ha flörtölök, azt hiszik, mindent elmondtam. Pedig tetszel, csak nem szeretném, ha ettől a műhelyben másnak lenne igaza.','Lassan szeretnék közelebb kerülni. Nem akarom egyszerre elmondani az egész történetet.'],
  invitation:['A tóparton Rebeka gép nélkül vár, két papírpohár kávéval.','Én hívtalak. Nem kép kell, és a Holdkörnek sem bizonyítunk semmit. Sétálnék veled. Most.','Jó itt veled. A következő kört nem kell senkinek megmutatnom.'],
  conflict:['A műhely bemutatójának vázlatában a tóparti beszélgetésetek egyik gondolata szerepel.','Azt hittem, ami ott elhangzott, nem lesz reklámszöveg. Nem írtad bele a nevemet, mégis tudom, melyik mondat az enyém.','Ne azt mondd, hogy nem úgy gondoltad. Azt mondd, mit csinálsz most másképp.'],
  repair:'Kiveszem a mondatot. A személyes részletek új felhasználásához külön kérdezek.',
  commitment:'A képeket eltehetem. Azt kérdezem, velem szeretnél-e lenni akkor is, ha nincs mit megmutatnom.',
  aftermath:'A kiállítás képét én választom. Utána viszont nem gratulálni szeretnélek látni, hanem hazasétálni veled.'
 },
 boglarka:{
  name:'Boglárka',place:'library' as LocationId,earliest:4,invite:7,
  attraction:['Boglárka két csészével érkezik. Az üres helyre most nem tesz füzetet.','A második teát neked hoztam. Nem azért, mert tanár vagy, és nem azért, hogy elolvasd a dolgozatomat.','Maradj tíz percig feladat nélkül. Azt hiszem, többet szeretnék a beszélgetéseinktől. Még nem tudom gyorsabban mondani.'],
  invitation:['Boglárka csukva teszi le a könyvet az udvari padra. Veled szemben ül le.','Egy vers miatt akartalak hívni. Aztán rájöttem, megint más mondata helyettem lenne bátor. Szeretnék randizni veled.','Gyere közelebb. Most. Nem a tanulmányról akarok beszélgetni, és nem megköszönni jöttem valamit.'],
  conflict:['Egy megbeszélésen Márton Boglárka helyett fejezett be egy magyarázatot. A könyvtárban Boglárka nem ül le rögtön.','Segíteni akartál, de mindenki megint téged hallott. Veled sem szeretnék lábjegyzet lenni.','A következő alkalommal várd ki a mondatomat. Akkor is, ha túl lassúnak tartasz.'],
  repair:'Jelzem a csoportnak, hogy az értelmezés a tied, és visszaadom a szót.',
  commitment:'A saját szavaimmal mondom: kapcsolatot szeretnék veled, nem meg nem nevezett mellékszálat valaki életében.',
  aftermath:'A tanulmányra felkerült a nevem. A következő szabad alkalmam mellé a tiédet szeretném, a saját szavaimmal.'
 },
 greta:{
  name:'Gréta',place:'courtyard' as LocationId,earliest:5,invite:7,
  attraction:['Az udvaron eláll az eső. Gréta egy üres naptármezőt mutat.','Ezt szándékosan hagytam üresen. Az irodában könnyű azt mondani, hogy szükséged van rám. Itt is maradnál, ha nincs mit megoldanom?','A saját nevemben kérdezem. Vonzódom hozzád; eddig minden mondatot egy elintézendő ügy mögé rejtettem.'],
  invitation:['A tóparton Gréta telefonja felvillan. Ő lenémítja.','A jelentést holnap is leadhatom. A saját estém is számít. Legyen ez randi, ne tegyünk úgy, mintha hibát javítanánk közben.','A tó felé kerülőt választanék. Nem kell megmagyaráznom, miért az a leghatékonyabb út.'],
  conflict:['Márton még egy javítandó iratot tesz a közös találkozó elé. Gréta nem nyitja ki a dossziét.','Ha minden találkozónk előtt van még egy apró feladat, honnan tudjam, hogy engem vársz? Ne attól legyek fontos, hogy elvégzem, ami másnak nem jutott eszébe.','Ma maradjon itt az irat. Nem megnyugtatást kérek, hanem egy szabad alkalmat.'],
  repair:'Másnak adom a határidős ügyet; a többit holnap végzem el. Veled megyek.',
  commitment:'Szeretnélek akkor is látni, amikor semmi hasznosat nem csinálok. Erre akarok időt vállalni, nem tökéletesnek lenni.',
  aftermath:'A jelentés elkészült. Van még egy javítanivaló, de holnap megvár. Ma a tóhoz szeretnék menni veled.'
 }
};
for(const girl of ['rebeka','boglarka','greta'] as const){
 const p=personal[girl],bond=('marton_'+girl) as 'marton_rebeka'|'marton_boglarka'|'marton_greta';
 foundations.push(scene(girl+'_2',p.name+' — A kimondott vonzalom','relationship',p.earliest,14,p.place,['marton',girl],[
  say('narrator',p.attraction[0]),say(girl,p.attraction[1],'vulnerable'),say('marton','Mit szeretnél, hogy most ne értsek félre?'),say(girl,p.attraction[2]),
  say('marton','A vonzalom nem ad előnyt, és nem vesz el jogot a nemet mondásra.','neutral',[
   option('yes','Én is keresem ezeket a találkozókat. Szeretnélek közelebbről megismerni.','A kölcsönös vonzalom kimondható, a tempóról továbbra is külön dönthettek.',{bonds:{[bond]:10},decisions:[girl+'_attraction','marton_'+girl+'_attraction_yes']}),
   option('friend','Jó veled lenni, de baráti kapcsolatot szeretnék.','A határt tiszteletben tartjátok. A közös munka folytatódik, a közeledés nem.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_1'],decisions:[girl+'_interest'],notDecisions:[girl+'_withdraw']},[],p.name+' és Márton beszéltek a vonzalomról és a személyes tempóról.'));
 foundations.push(scene(girl+'_3',p.name+' — A saját meghívás','relationship',p.invite,14,girl==='boglarka'?'courtyard':'bekas',['marton',girl],[
  say('narrator',p.invitation[0]),say(girl,p.invitation[1],'affectionate'),say('marton','Ezért jöttem. A kezdeményezésedet komolyan veszem.'),say(girl,p.invitation[2]),
  say('marton','A mostani meghívásra válaszolok.','neutral',[
   option('yes','Én is szeretném. A mai időt egymásnak választjuk.','A meghívásra saját igent mondasz. A beszélgetés nem a következő nyomról folytatódik.',{bonds:{[bond]:10},decisions:[girl+'_invitation']}),
   option('slow','A közeledést nem szeretném romantikus irányban folytatni.','A visszautasítást nem teszitek a műhely közös témájává.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_2'],decisions:[girl+'_attraction'],notDecisions:[girl+'_withdraw']},[],p.name+' saját személyes meghívására világos választ adtunk.'));
 foundations.push(scene(girl+'_4',p.name+' — A valódi nézeteltérés','relationship',girl==='rebeka'?9:10,14,p.place,['marton',girl],[
  say('narrator',p.conflict[0]),say(girl,p.conflict[1],'displeased'),say('marton','A közelség nem jogosít fel arra, hogy helyetted vagy a magánéletedből beszéljek.'),say(girl,p.conflict[2]),
  say('marton','A javításnak legyen látható következménye.','neutral',[
   option('repair',p.repair,'A jóvátételt végrehajtod; nem egy ajándékkal próbálod kiváltani.',{bonds:{[bond]:8},decisions:[girl+'_repair']}),
   option('withdraw','Nem tudom ezt vállalni. Inkább megállok a kapcsolatunkban.','A személyes folytatás véget ér. A nyomozásban továbbra is együttműködtök.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_3'],decisions:[girl+'_invitation'],notDecisions:[girl+'_withdraw']},[],p.name+' és Márton a saját konfliktusukról döntöttek; a jóvátételnek valódi következménye volt.'));
 foundations.push(scene(girl+'_5',p.name+' — Amit vállalunk','relationship',13,14,'courtyard',['marton',girl],[
  say('narrator','A csendes udvaron most nem a következő veszélyről beszéltek. A korábbi jóvátételnek azóta is érvényt kellett szerezni.'),
  say(girl,p.commitment,'vulnerable'),say('marton','Nem ígérek olyat, amit más helyett kellene eldöntenem.'),
  say(girl,'Én ezt választom. Külön időt, őszinteséget és újra megbeszélhető határokat szeretnék. Ha közös kapcsolatot választunk, nem teszünk titkos kizárólagossági ígéretet.','affectionate'),
  say('marton','A vállalásomhoz a saját időmből és a kényelmes titkolózásból is engednem kell.','neutral',[
   option('commit','Én is ezt a kapcsolatot szeretném, a közösen megbeszélt feltételekkel.','Mindketten saját igent mondtatok. A vállalt irányt a tervező többé nem írhatja át.',{decisions:[girl+'_commit',girl+'_yes','marton_'+girl+'_yes'],bonds:{[bond]:12},exposure:5}),
   option('withdraw','Nem akarok elköteleződést ígérni. Itt megállok.','A döntés fájhat, de nem kell hibássá tenni érte valakit.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_4'],decisions:[girl+'_repair',girl+'_invitation'],notDecisions:[girl+'_withdraw'],anyOf:girl==='greta'?[{directions:['greta']}]:[{directions:[girl]},{directions:['triad'],decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes']}]},[],p.name+' és Márton személyesen döntöttek arról, mit vállalnak.'));
 foundations.push(scene(girl+'_6',p.name+' — A következő találkozó','relationship',16,16,girl==='greta'?'bekas':'courtyard',['marton',girl],[
  say('narrator','A kamra után először találkoztok újabb ellenőrizendő nyom nélkül. A csendet nem siettetitek.'),
  say(girl,p.aftermath,'affectionate'),say('marton','Az együtt átélt veszély nem dönti el helyettünk, hogyan maradunk együtt.'),
  say(girl,'Én a kapcsolatunkat szeretném folytatni. A közös időt magamért is választom, nem azért, mert tartozom neked.'),
  say('marton','A éven túli választ is kimondom.','neutral',[
   option('continue_together','Szeretnék veled maradni, a rendes napokon is.','Megbeszélitek a következő találkozót, még a év lezárása előtt.',{decisions:[girl+'_aftermath'],bonds:{[bond]:6}}),
   option('withdraw','A történtek után sem szeretném folytatni a kapcsolatot.','A közös nyomozás nem lesz szerelmi tartozás.',{decisions:[girl+'_withdraw']})])
 ],{scenes:['shared_16',girl+'_5'],decisions:[girl+'_commit'],notDecisions:[girl+'_withdraw'],directions:[girl]},[],p.name+' és Márton a veszély után, a év lezárása előtt döntöttek a személyes folytatásról.'));
}
