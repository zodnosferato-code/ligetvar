import type {Scene} from './types.ts';
import {say,scene} from './authoring.ts';
export const optional:Scene[]=[
 scene('prepare_backup','Segítők és másolatok','preparation',12,14,'department',['marton','denes','julia','aron'],[
  say('narrator','Nem új nyomot keresnek: az ismert adatokból készül használható beosztás.'),
  say('denes','Megbeszéljük, kit hol várok. Az alapsegítség így is jár; a beosztás gyorsabbá teszi.'),
  say('julia','Két hiteles másolatot őrzök külön. A bizonyíték nem egyetlen példányon múlik.'),
  say('aron','A kulcs és a kijárat ellenőrzését aláírtam. A visszajelzés nem Soma asztalán marad.'),
  say('marton','Egy délután most kisebb ár, mint utólag összerakni, kinek kellett volna szólnunk.')
 ],{scenes:['shared_12']},[],'Előkészítettük a segítői beosztást és a külön bizonyítékmásolatokat.',{preparation:['backup']}),
 scene('prepare_signals','A jelzés próbája','preparation',13,14,'classroom',['marton','rebeka','boglarka','greta','denes'],[
  say('narrator','A három rögzítés helyét jelölik a teremben. Varázslat helyett a mozdulat és a visszavonulás jele számít.'),
  say('greta','Ha nem halljuk egymást, ezt követjük. Aki elvéti, azzal újrakezdjük.'),
  say('boglarka','A földelést ismerjük. Most azt próbáljuk, hogyan emlékeztessük rá egymást nyomás alatt.'),
  say('rebeka','Egyszer szándékosan rossz helyre nézek. Lássuk, észreveszitek-e.'),
  say('denes','Észrevettük. Még egyszer, lassabban. A segítség nem a hibátlanság jutalma.')
 ],{scenes:['shared_13']},[],'Begyakoroltuk a jelzéseket és a visszavonulást.',{preparation:['signals']}),
 scene('friendship_after','Nem kell többnek nevezni','relationship',16,16,'courtyard',['marton','rebeka','boglarka','greta'],[
  say('narrator','A padra most nem tanúvallomások kerülnek. Gréta péksüteményt, Boglárka termoszt, Rebeka képet hoz az üres műhelyről.'),
  say('rebeka','Ez a kép csak nekünk van. Nem kell bizonyítania, hogy hősök voltunk.'),
  say('boglarka','A közös történet attól még történet, hogy nem lesz mindenkiből szerelmes.'),
  say('greta','A szerdát szabadon hagytam. Egy kávé is számít.'),
  say('marton','Szeretném megtartani ezt a barátságot. Köszönöm, hogy a saját dolgotokat is belehoztátok.'),
  say('narrator','A következő alkalomnak nincs nyomozási feladata. A barátság a félév után is folytatódhat.')
 ],{scenes:['shared_16'],directions:['friendship']},[],'Barátként terveztünk új találkozót; a nyomozás nem követelt szerelmet.',{decisions:['friendship_aftermath']})
];
