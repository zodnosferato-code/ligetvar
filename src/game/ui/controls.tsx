import {useTranslation} from './Locale.tsx';
import {assetUrl} from '../content/assets.ts';
const ICONS={book:'icon_book',heart:'ui_heart_full',energy:'icon_stat_energy',money:'icon_stat_money',rest:'icon_chair',bottles:'icon_bottles',door:'icon_door',insight:'icon_stat_insight',gift:'icon_shelf',phone:'icon_phone'} as const;
export function Icon({name}:{name:keyof typeof ICONS|'sound'|'coffee'}){if(name==='coffee')return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h2a3 3 0 0 1 0 6h-2M2 22h19M8 2v3m5-3v3"/></svg>;if(name==='sound')return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>;return <img className="ui-icon" src={assetUrl('icons/'+ICONS[name]+'.png')} alt="" aria-hidden="true"/>;}
type ActivityKind='shared'|'relationship'|'preparation'|'conversation'|'rest'|'recycling'|'paperwork';

export function ActivityCard({kind,title,description,detail,onClick}:{kind:ActivityKind;title:string;description:string;detail:string;onClick:()=>void}){
 const t=useTranslation();
const ACTIVITY_STYLE:Record<ActivityKind,{label:string;icon:keyof typeof ICONS|'coffee'}>={
 shared:{label:t('ui.activity.shared'),icon:'book'},relationship:{label:t('ui.activity.relationship'),icon:'heart'},preparation:{label:t('ui.activity.preparation'),icon:'insight'},conversation:{label:t('ui.activity.conversation'),icon:'coffee'},rest:{label:t('ui.activity.rest'),icon:'rest'},recycling:{label:t('ui.activity.recycling'),icon:'bottles'},paperwork:{label:t('ui.activity.paperwork'),icon:'book'}
};
 const style=ACTIVITY_STYLE[kind];
 return <button className={'scene-card activity-card activity-'+kind} aria-label={title} onClick={onClick}><span className="activity-top"><span className="activity-emblem"><Icon name={style.icon}/></span><span className="activity-category">{style.label}</span></span><strong>{title}</strong><span className="activity-description">{description}</span><small>{detail}</small></button>;
}
