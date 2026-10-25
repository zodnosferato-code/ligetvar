import type {Scene} from './types.ts';
import {say,option,scene} from './authoring.ts';
export const triad:Scene[]=[
 scene('triad_1','T1 — Kinek a mondata?','relationship',4,14,'library',['marton','rebeka','boglarka'],[
  say('narrator','Rebeka képaláírása: „Boglárka a kastély régi hangját keresi.” Boglárka maga elé húzza a lapot.'),
  say('boglarka','Jól hangzik, de nem ezt csinálom. Nem vagyok a képedhez odatett misztikus lány. Azt kutatom, ki és mikor írta le a történetet.','displeased'),
  say('rebeka','A kép nem tud három bekezdést elmondani. Nem akartalak elvenni a munkádtól, de nem akarok puszta dolgozatmellékletet sem.','displeased'),
  say('marton','Mindkét munkának van saját nyelve. Nem döntöm el helyettetek, melyik számít.'),
  say('rebeka','A következő változatot ketten csináljuk meg. Ne Márton legyen a döntőbíró.'),
  say('boglarka','Előbb megmutatom, melyik szóval van bajom. Aztán meghallgatom, te mit akarsz megtartani.')
 ],{scenes:['shared_4','rebeka_1','boglarka_1']},[],'Rebeka és Boglárka vitája közös javítás tervével zárult.',{bonds:{rebeka_boglarka:5},decisions:['rb_dispute']}),
 scene('triad_2','T2 — Közös javítás','relationship',5,14,'library',['marton','rebeka','boglarka'],[
  say('narrator','Az új képaláírás mellett két név áll. A fotó nagyobb helyet kapott, a forrásjelölés olvashatóbb lett.'),
  say('rebeka','Boglárka mondata nélkül a kép elhitetné, hogy mindent értünk. Így maradt benne kérdés. Ez jobb.'),
  say('boglarka','Nélküled meg úgy írtam volna le a folyosót, mintha csak levéltári tétel lenne. Most látni, miért állt ott meg valaki.'),
  say('marton','A két szerző neve maradjon elöl. Én termet szerveztem.'),
  say('rebeka','Kedden nélküled is összeülünk. Nem titokból. Most mi ketten dolgozunk rajta.','amused'),
  say('boglarka','Hozok rendes teát. Az automata ezért a szövegért nem kap több pénzt.','amused')
 ],{scenes:['triad_1']},[],'A kép–szöveg párost közösen javították, önálló következő találkozót terveztek.',{bonds:{rebeka_boglarka:8},decisions:['rb_correction']}),
 scene('triad_3','T3 — Márton nélkül','relationship',7,14,'courtyard',['rebeka','boglarka'],[
  say('narrator','Ez a beszélgetés Márton nélkül zajlik. A két nő később maga dönti el, mit mesél el belőle. A másolatok leadása után ülnek az udvarra.'),
  say('rebeka','Azt hittem, utálsz a felirat miatt. Kiderült, csak nem hagyod, hogy egy szép mondatban elintézzelek.'),
  say('boglarka','Nem utáltalak. Idegesített, hogy úgy nézel, mintha már tudnád, melyik oldalam mutat jól.'),
  say('rebeka','Most nem tudom. Képet sem akarok rólad. Csak maradnék.','vulnerable'),
  say('boglarka','Én is. És jó, hogy ezt nem Mártonnak kell közvetítenie.'),
  say('narrator','Egy rossz kiállításról és egy befejezetlen könyvről beszélnek. Nem egy útvonal jutalma az együtt töltött idő: a saját kíváncsiságuk tartja ott őket.')
 ],{scenes:['triad_2','shared_7']},[],'Rebeka és Boglárka önálló beszélgetésben került közelebb egymáshoz.',{bonds:{rebeka_boglarka:10},decisions:['rb_private']}),
 scene('triad_4','T4 — Két külön igen','relationship',8,14,'courtyard',['rebeka','boglarka'],[
  say('narrator','A következő találkozón sincs ott Márton. Boglárka két poharat hoz, füzet nélkül.'),
  say('boglarka','Amikor téged várlak, nem csak az anyag miatt örülök. Vonzódom hozzád. Ezt nem Mártonról kérdezve mondom.','vulnerable'),
  say('rebeka','Én is hozzád akarok közel lenni. Nem cseréből vagy kiegészítésként. Gyere.','affectionate'),
  say('boglarka','Most.','affectionate'),
  say('rebeka','Igen.','affectionate'),
  say('narrator','A rövid csók után megbeszélik, hogy a közös lehetőségről csak akkor beszélnek Mártonnal, ha mindketten akarják. Az egymásnak mondott igenük független az ő válaszától.')
 ],{scenes:['triad_3','shared_8']},[],'Rebeka és Boglárka kölcsönösen kimondta önálló romantikus vonzalmát.',{bonds:{rebeka_boglarka:15},decisions:['rb_rebeka_yes','rb_boglarka_yes']}),
 scene('triad_5','T5 — Külön is elmondjuk','relationship',11,14,'classroom',['marton','rebeka','boglarka'],[
  say('narrator','Két egymást követő beszélgetés, ugyanazon az alkalmon. Először Rebeka marad, aztán elmegy, és Boglárka érkezik. Egyikük sem szóvivő.'),
  say('rebeka','Boglárkával közel kerültünk egymáshoz. Veled is szeretnék kapcsolatot, titkos verseny nélkül arról, kinek jut több idő rád.'),
  say('marton','Nem kérek kizárólagosságot, miközben közös lehetőségről beszélünk.'),
  say('narrator','Később Boglárka ugyanoda ül, de saját mondataival kezdi.'),
  say('boglarka','Szeretem, ahogy Rebeka figyel rám. Téged is szeretnélek tovább megismerni. Nem leszek egy párhoz utólag hozzárakott ember.'),
  say('marton','Külön is elmondhassuk a feltételeinket.','neutral',[
   option('discuss','Szeretném a közös beszélgetést. Mások helyett nem ígérek választ.','Mindketten saját nevükben vállalják a beszélgetést. Ez még nem végleges igen.',{decisions:['triad_separate_talks']}),
   option('decline','Nem szeretnék közös kapcsolatot. Egyéni irányról vagy barátságról tudok beszélni.','Ez nem teszi semmissé a nők egymásnak tett választását.',{decisions:['triad_declined'],direction:'friendship'})])
 ],{scenes:['triad_4','shared_11','rebeka_4','boglarka_4'],decisions:['rb_rebeka_yes','rb_boglarka_yes','rebeka_repair','boglarka_repair'],directions:['triad']},[],'Külön beszélgetésben hallgattuk meg a két nő igényeit; a közös kapcsolat nem automatikus.'),
 scene('triad_6','T6 — Hárman, egy asztalnál','relationship',12,14,'apartment',['marton','rebeka','boglarka'],[
  say('narrator','Az asztalon nincsenek nyomozási iratok. Nem az kap szót, aki több bizonyítékot hozott.'),
  say('rebeka','Szeretném ezt a kapcsolatot kettőtökkel. Külön estéket is akarok mindkettőtökkel. Szóljunk a féltékenységről; a képeim nyilvánosságáról továbbra is én döntök.','affectionate'),
  say('boglarka','Én is szeretném, mindkettőtökkel. Az egyeztetett idő ne mindig az enyémből rövidüljön. Ha változtatunk, beszéljünk, ne találgassunk.','affectionate'),
  say('marton','Az intézményi következményekből rám több jut. Nem használom a helyzetemet csend vagy közelség kérésére. A külön és közös időt egyeztetjük.'),
  say('rebeka','Mi elmondtuk a saját igenünket. A te válaszod is legyen valódi, akkor is, ha nem az.'),
  say('marton','A saját nevemben döntök.','neutral',[
   option('yes','Én is szeretném, ezekkel az újra megbeszélhető határokkal.','Mindhárom résztvevő saját igenje elhangzott. Az egyéni jóvátétel és vállalás ettől külön is fontos.',{decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes'],bonds:{marton_rebeka:5,marton_boglarka:5,rebeka_boglarka:5}}),
   option('decline','Nem tudom vállalni. Barátságot vagy külön megbeszélt egyéni irányt szeretnék.','Hiányzó igenből nem lesz közös kapcsolat. A tervezőben újragondolható a személyes irány.',{decisions:['triad_declined'],direction:'friendship'})])
 ],{scenes:['triad_5','shared_12'],decisions:['triad_separate_talks'],notDecisions:['triad_declined'],directions:['triad']},[],'Hármas beszélgetésben időről, féltékenységről, magánszféráról és visszalépésről beszéltünk.'),
 scene('triad_7','T7 — Egy rendes este','relationship',14,14,'apartment',['marton','rebeka','boglarka'],[
  say('narrator','A tészta túlfőtt. Rebeka túl sok paprikát tett a szószba; Boglárka ezt nem engedi művészi döntésnek nevezni.'),
  say('boglarka','Az első rendes házirend: az erős paprika nem a bátorság próbája.','amused'),
  say('rebeka','Legközelebb te főzöl. Én nem írok képaláírást a vacsorához.','amused'),
  say('marton','Több kenyeret veszek. A keddet pedig valóban üresen hagytam, nem csak átcímkéztem a munkát.'),
  say('rebeka','Jó, hogy ma nem a veszély bizonyítja, hogy együtt vagyunk.'),
  say('boglarka','Az iratokat holnap visszavesszük. Most maradjunk még egy teára.','affectionate')
 ],{scenes:['triad_6','rebeka_5','boglarka_5','shared_14'],decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes','rebeka_commit','boglarka_commit'],notDecisions:['rebeka_withdraw','boglarka_withdraw'],directions:['triad']},[],'Egy közönséges közös estén a vacsora után a három együtt folytatta, nem a veszély tartotta össze őket.',{bonds:{marton_rebeka:5,marton_boglarka:5,rebeka_boglarka:8},decisions:['triad_evening']},['night']),
 scene('triad_8','T8 — A következő rendes este','relationship',16,16,'apartment',['marton','rebeka','boglarka'],[
  say('narrator','A kamra után ugyanahhoz az asztalhoz ülnek. Van rendes kenyér. Senki nem tesz úgy, mintha az elmúlt hétnek nem volna súlya.'),
  say('rebeka','A sorozatomat lezárom, a kapcsolatot nem szeretném. Boglárkával külön is tervezek időt, és veled is, Márton. A közös estékről közösen döntsünk.','affectionate'),
  say('boglarka','Én is folytatni szeretném veletek. Elkészült a szövegem, de a következő találkozó nem jutalom érte. Magamnak választom.','affectionate'),
  say('marton','A vállalást a rendes napokon kell betartani.'),
  say('rebeka','Ma az is belefér, hogy fáradtak vagyunk. Ez nem újabb próba.'),
  say('marton','A félév utáni időre is válaszolok.','neutral',[
   option('continue_together','Szeretnék veletek maradni, külön és közösen is időt vállalva.','Mindhárman megerősítettétek a folytatást. Az egyetlen alkalom mindkét személyes utóbeszélgetést is rendezi.',{decisions:['triad_aftermath','rebeka_aftermath','boglarka_aftermath'],bonds:{marton_rebeka:6,marton_boglarka:6,rebeka_boglarka:6}}),
   option('withdraw','Nem szeretném folytatni a közös kapcsolatot.','Egy korábbi ígéret nem tartja életben a közös kapcsolatot.',{decisions:['rebeka_withdraw','boglarka_withdraw'],direction:'friendship'})])
 ],{scenes:['shared_16','triad_7'],decisions:['rebeka_commit','boglarka_commit','triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes'],directions:['triad']},[],'A közös utóbeszélgetésben mindhárom résztvevő megszólalt, egyetlen sávban rendezték a folytatást.',undefined,['night'])
];
