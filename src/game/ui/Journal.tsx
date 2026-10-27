import {useTranslation} from './Locale.tsx';
import {EVIDENCE,SCENES} from '../content/catalog.ts';
import {useGame} from '../store.ts';
import {Icon} from './controls.tsx';
export function Journal({open=false}:{open?:boolean}){
 const t=useTranslation();
 const s=useGame(x=>x.state);return <aside className="journal"><details open={open}><summary><Icon name="book"/>{t('ui.journal.heading',{count:Object.keys(s.evidence).length})}</summary><div className="journal-grid"><section><h2>{t('ui.journal.known')}</h2>{Object.entries(s.evidence).map(([id,r])=><p key={id}>{EVIDENCE[id]?.text}<small>{t('ui.week',{week:r.week})} · {SCENES[r.scene]?.title}</small></p>)}{!Object.keys(s.evidence).length&&<p>{t('ui.journal.empty')}</p>}</section><section><h2>{t('ui.journal.bonds')}</h2><p>Márton–Rebeka: {s.bonds.marton_rebeka}<br/>Márton–Boglárka: {s.bonds.marton_boglarka}<br/>Rebeka–Boglárka: {s.bonds.rebeka_boglarka}<br/>Márton–Gréta: {s.bonds.marton_greta}</p><p>{t('ui.journal.exposure',{exposure:s.exposure})}</p><h2>{t('ui.journal.events')}</h2>{s.journal.map(j=><p key={j.scene}><small>{t('ui.week',{week:j.week})}</small>{j.text}</p>)}</section></div></details></aside>;
}
