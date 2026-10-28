import {useState} from 'react';
import {calendarFor,YEAR_DATES,HOLIDAYS} from '../content/calendar.ts';
import {useLocale,useTranslation} from './Locale.tsx';
const SYMBOL={autumn:'🍂',winter:'❄',spring:'🌸',summer:'☀',clear:'☀',rain:'☂',snow:'❄'};
export function Calendar({week}:{week:number}){
 const t=useTranslation(),{locale}=useLocale(),[open,setOpen]=useState(false),c=calendarFor(week);
 const date=(iso:string)=>new Intl.DateTimeFormat(locale,{month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
 return <section className="castle-calendar"><button className="calendar-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={locale==='hu'?'Éves naptár':'Year calendar'}><span aria-hidden="true">▦</span><strong>{date(c.iso)}</strong><span title={c.season}>{SYMBOL[c.season]}</span><span title={c.weather}>{SYMBOL[c.weather]}</span>{c.event&&<span title={t(`calendar.event.${c.event}`)}>{HOLIDAYS[c.event].symbol}</span>}</button>{open&&<ol className="calendar-year">{YEAR_DATES.map((iso,i)=>{const day=calendarFor(i+1);return <li key={iso} aria-current={week===i+1?'date':undefined} className={i+1<week?'past':''}><span aria-hidden="true">{SYMBOL[day.season]}</span><time dateTime={iso}>{date(iso)}</time><small>{locale==='hu'?'Hét':'Week'} {i+1}{day.event?' · '+t(`calendar.event.${day.event}`)+' '+HOLIDAYS[day.event].symbol:''}</small></li>;})}</ol>}</section>;
}
