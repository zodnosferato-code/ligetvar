import {useTranslation,useLocale} from './Locale.tsx';
import {useState,useRef,useEffect} from 'react';
import {useGame} from '../store.ts';
import {GIFTS,GIFT_NOTES,type GiftId,type GiftNote,type Delivery} from '../content/gifting.ts';
import {GIRLS,type GirlId} from '../content/types.ts';
import {ROUTES,formatFt} from '../content/runtime.ts';
import {portraitFor,assetUrl} from '../content/assets.ts';
export function GiftReplies({unreadOnly=false}:{unreadOnly?:boolean}){
 const t=useTranslation();
 const g=useGame(),all=g.state.giftHistory,history=unreadOnly?all.filter(h=>!h.read):all;
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(unreadOnly&&history.length){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'center'});}},[unreadOnly,history.length]);
 if(!history.length)return unreadOnly?null:<p className="muted">{t('gifts.empty')}</p>;
 return <section className="gift-replies" aria-label={t('gifts.replies')}><h3 ref={heading} tabIndex={-1}>{unreadOnly?t('gifts.newReply'):t('gifts.history')}</h3>{[...history].reverse().map(h=>{
  const portrait=portraitFor(h.girl,h.expression,h.week);
  return <article className="gift-reply" key={h.week+'-'+h.girl}>
   {portrait.file&&<img src={assetUrl(portrait.file)} alt={ROUTES[h.girl]}/>}
   <div><p className="eyebrow">{t('gifts.reply.meta',{name:ROUTES[h.girl],week:h.week,delivery:h.delivery==='remote'?t('gifts.remote'):t('gifts.personal'),unread:!h.read?t('gifts.unread'):''})}</p><strong>{GIFTS[h.gift].name}</strong><p className="muted">{t('gifts.message',{message:GIFT_NOTES[h.note]})}</p><blockquote>{h.reaction}</blockquote><small>{h.bonus?t('gifts.bonus',{bonus:h.bonus}):t('gifts.noBonus')}</small></div>
  </article>;
 })}{all.some(h=>!h.read)&&<button onClick={g.readGifts}>{t('gifts.read')}</button>}</section>;
}
export function GiftShop(){
 const t=useTranslation();const {locale}=useLocale();
 const g=useGame(),s=g.state,[girl,setGirl]=useState<GirlId>('rebeka'),[gift,setGift]=useState<GiftId>('photo'),[note,setNote]=useState<GiftNote>('noticed'),[delivery,setDelivery]=useState<Delivery>('remote');
 const item=GIFTS[gift],allowed=s.phase==='planner'&&s.slot>=1&&s.slot<=2;
 return <div className="gift-shop"><p>{t('gifts.help')}</p>
  <div className="gift-fields"><label>{t('gifts.recipient')}<select aria-label={t('gifts.recipient')} value={girl} onChange={e=>setGirl(e.target.value as GirlId)}>{GIRLS.map(id=><option key={id} value={id}>{ROUTES[id]}</option>)}</select></label>
  <label>{t('gifts.item')}<select aria-label={t('gifts.item')} value={gift} onChange={e=>setGift(e.target.value as GiftId)}>{Object.entries(GIFTS).map(([id,x])=><option key={id} value={id}>{x.name} · {formatFt(x.price,locale)}</option>)}</select></label></div>
  <p>{item.description}</p><p>{t('gifts.inventory',{count:s.inventory[gift]??0,money:formatFt(s.money,locale)})}</p>
  <button disabled={!allowed||s.money<item.price} onClick={()=>g.buy(gift)}>{t('gifts.buy',{money:formatFt(item.price,locale)})}</button>
  <div className="gift-fields"><label>{t('gifts.note')}<select aria-label={t('gifts.note')} value={note} onChange={e=>setNote(e.target.value as GiftNote)}>{Object.entries(GIFT_NOTES).map(([id,text])=><option key={id} value={id}>{text}</option>)}</select></label>
  <label>{t('gifts.delivery')}<select aria-label={t('gifts.delivery')} value={delivery} onChange={e=>setDelivery(e.target.value as Delivery)}><option value="remote">{t('gifts.send.option')}</option><option value="inPerson">{t('gifts.personal.option')}</option></select></label></div>
  <p>{t('gifts.message.preview',{message:GIFT_NOTES[note]})}</p><p className="muted">{delivery==='remote'?t('gifts.remote.help'):t('gifts.personal.help')}</p>
  <button className="primary" disabled={!allowed||!(s.inventory[gift]>0)||s.giftsWeek.includes(girl)} onClick={()=>g.gift(girl,gift,note,delivery)}>{t('gifts.deliver',{action:delivery==='remote'?t('gifts.send'):t('gifts.give'),name:ROUTES[girl]})}</button>
  {s.giftsWeek.includes(girl)&&<p role="status">{t('gifts.already')}</p>}
  <p className="muted">{t('gifts.boundaries')}</p>
 </div>;
}


