import {EVIDENCE,SCENES} from '../content/catalog.ts';
import {useGame} from '../store.ts';
import {Icon} from './controls.tsx';
export function Journal({open=false}:{open?:boolean}){
 const s=useGame(x=>x.state);return <aside className="journal"><details open={open}><summary><Icon name="book"/>Napló és ismert nyomok · {Object.keys(s.evidence).length}</summary><div className="journal-grid"><section><h2>Amit már tudunk</h2>{Object.entries(s.evidence).map(([id,r])=><p key={id}>{EVIDENCE[id]?.text}<small>{r.week}. hét · {SCENES[r.scene]?.title}</small></p>)}{!Object.keys(s.evidence).length&&<p>Még nincs rögzített felfedezés.</p>}</section><section><h2>Kapcsolódások</h2><p>Márton–Rebeka: {s.bonds.marton_rebeka}<br/>Márton–Boglárka: {s.bonds.marton_boglarka}<br/>Rebeka–Boglárka: {s.bonds.rebeka_boglarka}<br/>Márton–Gréta: {s.bonds.marton_greta}</p><p>A számok nem helyettesítik az igent. Magánéleti kitettség: {s.exposure}/100.</p><h2>Megtörtént alkalmak</h2>{s.journal.map(j=><p key={j.scene}><small>{j.week}. hét</small>{j.text}</p>)}</section></div></details></aside>;
}
