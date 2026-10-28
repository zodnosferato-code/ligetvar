/** Optional, paid side stories. Never prerequisites for the investigation or commitments. */
import {chapterScene as scene,say,option} from './authoring.ts';
import type {Scene,GirlId} from './types.ts';
function outing(s:Scene,money:number,points:number):Scene{return {...s,cost:{money,points}};}
export const outings:Scene[]=[
 outing(scene('outing_rebeka_1','Rebeka · A vállalhatatlan képek estéje','conversation',2,14,'holdkor',['marton','rebeka'],[
  say('narrator','A kis vetítéshez te foglaltál helyet. Rebeka egy borítékot csúsztat eléd: három saját fotó, amiket még senkinek sem mutatott meg.'),
  say('rebeka','Ma nincs szép válasz. Válassz egy rossz képet, és mondd meg, miért tartanád meg.'),
  say('marton','Mielőtt kiválasztom: te melyiket akartad kidobni?'),
  say('rebeka','A bemozdultat. Túl sok minden látszik rajta abból, hogy jól éreztem magam. Szakmai hiba, ugye?','vulnerable',[
   option('blur','A bemozdultat választom. Valaki nevetett közben.','Rebeka a kép sarkát nézi. „Én. Csak nem akartam ennyire nyilvánvalóan.”',{decisions:['outing_rebeka_blur']}),
   option('shadow','Az árnyékosat. A többit hozzá kell képzelni.','„Végre valaki, aki hajlandó dolgozni a nézésért.” A képet közelebb tolja.')]),
  say('rebeka','Egy szívesség jár a vállalt kritikáért. Csinálok neked egy rendes nagyítást. Te döntöd el, kirakod-e.'),
  say('marton','Akkor olyan példányt kérek, amit te is szívesen adnál.'),
  say('rebeka','Pimasz feltétel. Jó. A következő alkalomra kész lesz.','amused'),
  say('narrator','A vetítés alatt egyre rövidebbek a csípős megjegyzések. A végén már elég egymásra néznetek.')
 ],{scenes:['rebeka_1']},[],'Rebeka megmutatta a félretett képeit, és személyes nagyítást ajánlott fel.',{bonds:{marton_rebeka:3},decisions:['favor_rebeka_print']}),4000,4),
 outing(scene('outing_rebeka_2','Rebeka · Egy kép, csak neked','conversation',3,14,'courtyard',['marton','rebeka'],[
  say('narrator','Rebeka kemény kartonok között hozza a nagyítást. Ezúttal nincs körülöttetek közönség.'),
  say('rebeka','Elkészült. A hátoldalt csak akkor nézd meg, ha egyedül vagy.'),
  say('marton','Ez fenyegetésnek is egészen jó.'),
  say('rebeka','Az aláírásom van rajta. Meg két szó. Nehéz volt kettőre rövidíteni.','vulnerable',[
   option('keep','Megőrzöm magamnak.','„Az jó.” Most nem told hozzá semmi ironikusat.',{decisions:['outing_rebeka_private']}),
   option('ask','Megmutathatom valakinek, ha megkérdezlek előtte?','„Így igen. Köszönöm, hogy nem a kép helyett döntöttél.”')]),
  say('marton','Köszönöm, hogy a saját munkádból adtál valamit.'),
  say('rebeka','Ne szokj hozzá a meghatottsághoz. Legközelebb megint elviselhetetlen leszek.','amused'),
  say('narrator','A papír hátulján ez áll: „Te észrevetted.” Rebeka a kapunál megvár, pedig már elköszöntetek.')
 ],{scenes:['outing_rebeka_1']},[],'Megkaptam Rebeka nekem készített nagyítását; a hátoldalán személyes üzenet van.',{bonds:{marton_rebeka:3},decisions:['keepsake_rebeka']}),6000,6),
 outing(scene('outing_boglarka_1','Boglárka · A kihagyott fejezet','conversation',2,14,'library',['marton','boglarka'],[
  say('narrator','Az olvasóest után két tea marad az asztalon. Boglárka a saját könyvét hozta, tele keskeny papírcsíkokkal.'),
  say('boglarka','Van benne egy mellékszereplő, akit a szerző láthatóan elfelejtett. Én viszont nem.'),
  say('marton','Mit szeretnél tudni róla?'),
  say('boglarka','Hogy hová ment, miután becsukta az ajtót. Mindenki a bent maradókról beszél.','amused',[
   option('outside','Találjunk ki neki egy életet az ajtón túl.','Boglárka új lapot húz elő. „Akkor először adjunk neki egy kedvenc helyet.”',{decisions:['outing_boglarka_outside']}),
   option('listen','Meséld el, te hogyan folytatnád.','„Van egy ötletem. Kicsit hosszú.” Aztán már nem kér elnézést a történetért.')]),
  say('boglarka','Kölcsönadnám neked. A margón lévő megjegyzéseket is olvashatod. Csak azokat ne vedd tudományos állításnak.'),
  say('marton','A megjegyzések miatt érdekel igazán.'),
  say('boglarka','Akkor választok neked még egy könyvet. Kíváncsi vagyok, ugyanott állunk-e meg benne.','affectionate'),
  say('narrator','A könyvjelzőnél egy üres lap marad neked. Boglárka megkéri, hogy oda írd a saját folytatásodat.')
 ],{scenes:['boglarka_1']},[],'Boglárka kölcsönadta a személyes jegyzeteivel teli könyvét, és közös folytatást kezdtünk.',{bonds:{marton_boglarka:3},decisions:['favor_boglarka_book']}),4000,4),
 outing(scene('outing_boglarka_2','Boglárka · A margón hagyott válasz','conversation',3,14,'library',['marton','boglarka'],[
  say('narrator','A visszahozott könyvben már kétféle kézírás van. Boglárka azonnal a közösen elkezdett oldalhoz lapoz.'),
  say('boglarka','Nem gondoltam, hogy tényleg végigírod. Ezt most nem gúnyosan mondom.'),
  say('marton','A végén nehezebb volt elengedni a szereplőt, mint hittem.'),
  say('boglarka','Ezért szoktam újraolvasni. Nem a meglepetés miatt.','vulnerable',[
   option('continue','Hagyjunk helyet a következő fejezetnek.','„Akkor ezt nem adom vissza a polcnak.” Külön könyvjelzőt tesz bele.',{decisions:['outing_boglarka_continue']}),
   option('finish','Ez a befejezés nekem most elég.','„Nekem is. Attól még beszélhetünk róla máskor.”')]),
  say('boglarka','Hoztam neked egy másikat. Az első oldalon leírtam, miért pont ezt. Elég személyes ajánlás lett.'),
  say('marton','Annál jobb.'),
  say('narrator','Boglárka nem pakol össze, amikor a tea elfogy. Még meg akarja mutatni a kedvenc mondatát.')
 ],{scenes:['outing_boglarka_1']},[],'Boglárka személyes könyvajánlást írt nekem, és elolvasta a közös történetünkhöz adott részemet.',{bonds:{marton_boglarka:3},decisions:['keepsake_boglarka']}),6000,6),
 outing(scene('outing_greta_1','Gréta · A be nem tervezett kitérő','conversation',2,14,'bekas',['marton','greta'],[
  say('narrator','Te hoztad az uzsonnát, Gréta a térképet. A tóhoz vezető út elágazásánál ezúttal nem indul el rögtön.'),
  say('greta','Most válassz te. Megígértem magamnak, hogy nem szervezem végig a délutánt.'),
  say('marton','Mennyire nehéz betartani?'),
  say('greta','Eddig háromszor akartam megmondani, merre menjünk. Még el sem indultunk.','amused',[
   option('shore','Menjünk a víz mellett, aztán keresünk egy padot.','„Jó. A padnál ne adj új feladatot. Le akarok ülni.”',{decisions:['outing_greta_shore']}),
   option('detour','Nézzük meg a kis kerülőt. Nem sietünk.','Gréta összecsukja a térképet. „Ezt jó hallani valaki mástól.”')]),
  say('greta','Legközelebb mutatok egy helyet, ahová egyedül szoktam kijárni. Nem titok, csak eddig az enyém volt.'),
  say('marton','Szívesen megnézném veled.'),
  say('greta','Akkor ezt felajánlom. És most nem foglalok hozzá naptárat, amíg meg nem ettük az uzsonnát.','affectionate'),
  say('narrator','A térkép a táska alján marad. Gréta egyszer sem nézi meg, mennyi időt nyertetek a rövidebb úttal.')
 ],{scenes:['greta_1']},[],'Gréta velem tartott egy feladat nélküli kitérőn, és felajánlotta, hogy megmutatja a saját csendes helyét.',{bonds:{marton_greta:3},decisions:['favor_greta_place']}),4000,4),
 outing(scene('outing_greta_2','Gréta · A saját padja','conversation',3,14,'bekas',['marton','greta'],[
  say('narrator','Gréta egy félreeső padnál áll meg. A csomagban most ő hozott két bögrét és valami meleg ennivalót.'),
  say('greta','Ide akkor jövök, amikor elegem van abból, hogy mindenre tudnom kell a választ.'),
  say('marton','Ma nincs kérdéssorom.'),
  say('greta','Pedig felkészültem egy rossz válasszal: nem tudom.','vulnerable',[
   option('quiet','Üljünk itt egy darabig.','Gréta a támlának dől. „Ez jó program. Meglepően jó.”',{decisions:['outing_greta_quiet']}),
   option('ordinary','Meséljek valami teljesen hétköznapit?','„Igen. Olyat, amit nem kell megoldanom.” A bögréjét a tiéd mellé teszi.')]),
  say('greta','Rajzoltam neked egy kis térképet. Hogy nélkülem is megtaláld. De örülnék, ha néha szólnál.'),
  say('marton','Szólni fogok. Nem csak akkor, ha segítség kell.'),
  say('narrator','A rajzon a pad mellett egy apró csillag áll. Gréta elteszi a telefonját, és visszaül melléd.')
 ],{scenes:['outing_greta_1']},[],'Gréta megmutatta a saját pihenőhelyét, és kézzel rajzolt térképet adott hozzá.',{bonds:{marton_greta:3},decisions:['keepsake_greta']}),6000,6)
];
// Close each paid outing in the fiction before handing control back to the planner.
const farewells:Record<string,string>={
 outing_rebeka_1:'A vetítés végén összeszeditek a poharakat. Rebeka elteszi a fotókat, a kijáratnál még egyszer visszafordul, és jó utat kíván. Külön indultok haza.',
 outing_rebeka_2:'A kapunál még váltotok néhány szót. Aztán Rebeka integet, és elindul; te a képet óvatosan a táskádba teszed, mielőtt hazamész.',
 outing_boglarka_1:'Végül elöblítitek a csészéket, és elteszed a kölcsönkapott könyvet. Boglárka az ajtóig kísér, ott elköszöntök. A közös történetet legközelebb folytatjátok.',
 outing_boglarka_2:'Meghallgatod a kedvenc mondatát, aztán lassan összepakoltok. Az ajtónál Boglárka megköszöni, hogy elhoztad a folytatást. Elköszöntök, és külön indultok tovább.',
 outing_greta_1:'Az uzsonna után visszacsomagoljátok a maradékot, és együtt sétáltok az elágazásig. Gréta megköszöni a közös kitérőt. Ott elköszöntök egymástól.',
 outing_greta_2:'Még maradtok egy kicsit, aztán Gréta elteszi a bögréket. Visszasétáltok a fő sétányig; a térképet magaddal viszed, amikor elköszöntök és külön indultok haza.'
};
for(const outing of outings){
 const last=outing.lines.at(-1)!;last.next='outing_goodbye';
 outing.lines.push({id:'outing_goodbye',speaker:'narrator',expression:'neutral',text:farewells[outing.id]});
}
export function outingGirl(scene:Scene):GirlId|undefined{return scene.cost?scene.participants.find((p):p is GirlId=>p==='rebeka'||p==='boglarka'||p==='greta'):undefined;}
