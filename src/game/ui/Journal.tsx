import {presentText,sceneTitle} from '../content/scene-localization.ts';
import {useLocale,useTranslation} from './Locale.tsx';
import {EVIDENCE,SCENES} from '../content/catalog.ts';
import {useGame} from '../store.ts';
import {Icon} from './controls.tsx';
export function Journal({open=false}:{open?:boolean}){
 const t=useTranslation(),{locale}=useLocale();
 const s=useGame(x=>x.state);return <aside className="journal"><details open={open}><summary><Icon name="book"/>{t('ui.journal.heading',{count:Object.keys(s.evidence).length})}</summary><div className="journal-grid"><section><h2>{t('ui.journal.known')}</h2>{Object.entries(s.evidence).map(([id,r])=><p key={id}>{presentText(EVIDENCE[id]?.text??'',s.name,locale)}<small>{t('ui.week',{week:r.week})} · {sceneTitle(SCENES[r.scene],locale)}</small></p>)}{!Object.keys(s.evidence).length&&<p>{t('ui.journal.empty')}</p>}</section><section><h2>{t('ui.journal.bonds')}</h2><p>{s.name}–Rebeka: {s.bonds.marton_rebeka}<br/>{s.name}–Boglárka: {s.bonds.marton_boglarka}<br/>Rebeka–Boglárka: {s.bonds.rebeka_boglarka}<br/>{s.name}–Gréta: {s.bonds.marton_greta}</p><p>{t('ui.journal.exposure',{exposure:s.exposure})}</p><h2>{t('ui.journal.events')}</h2>{s.journal.map(j=><p key={j.scene}><small>{t('ui.week',{week:j.week})}</small>{presentText(j.text,s.name,locale)}</p>)}</section></div></details></aside>;
}
