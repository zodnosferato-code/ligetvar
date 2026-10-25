import {useState,useRef,useEffect} from 'react';
import {useGame} from '../store.ts';
import {GIFTS,GIFT_NOTES,type GiftId,type GiftNote,type Delivery} from '../content/gifting.ts';
import {GIRLS,type GirlId} from '../content/types.ts';
import {ROUTES,formatFt} from '../content/runtime.ts';
import {portraitFor,assetUrl} from '../content/assets.ts';
export function GiftReplies({unreadOnly=false}:{unreadOnly?:boolean}){
 const g=useGame(),all=g.state.giftHistory??[],history=unreadOnly?all.filter(h=>!h.read):all;
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(unreadOnly&&history.length){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'center'});}},[unreadOnly,history.length]);
 if(!history.length)return unreadOnly?null:<p className="muted">Itt maradnak az ajándékaidra kapott személyes válaszok.</p>;
 return <section className="gift-replies" aria-label="Ajándékokra kapott válaszok"><h3 ref={heading} tabIndex={-1}>{unreadOnly?'Új személyes válasz':'Ajándékok és válaszok'}</h3>{[...history].reverse().map(h=>{
  const portrait=portraitFor(h.girl,h.expression,h.week);
  return <article className="gift-reply" key={h.week+'-'+h.girl}>
   {portrait.file&&<img src={assetUrl(portrait.file)} alt={ROUTES[h.girl]}/>}
   <div><p className="eyebrow">{ROUTES[h.girl]} · {h.week}. hét · {h.delivery==='remote'?'Kézbesítve · telefonos válasz':'Személyesen átadva'}{!h.read?' · új':''}</p><strong>{GIFTS[h.gift].name}</strong><p className="muted">Üzeneted: „{GIFT_NOTES[h.note]}”</p><blockquote>{h.reaction}</blockquote><small>{h.bonus?`Kapcsolódás +${h.bonus}`:'Az ajándék nem növelte a kapcsolódást.'}</small></div>
  </article>;
 })}{all.some(h=>!h.read)&&<button onClick={g.readGifts}>Elolvastam a válaszokat</button>}</section>;
}
export function GiftShop(){
 const g=useGame(),s=g.state,[girl,setGirl]=useState<GirlId>('rebeka'),[gift,setGift]=useState<GiftId>('photo'),[note,setNote]=useState<GiftNote>('noticed'),[delivery,setDelivery]=useState<Delivery>('remote');
 const item=GIFTS[gift],allowed=s.phase==='planner'&&s.slot>=1&&s.slot<=2;
 return <div className="gift-shop"><p>Hetente személyenként egy ajándékot adhatsz. A vásárlás, kézbesítés és rövid átadás nem foglal sávot. A figyelmes választás +2 kapcsolódást adhat; az ismételt ajándék nem ad új bónuszt.</p>
  <div className="gift-fields"><label>Kinek választasz?<select aria-label="Kinek választasz?" value={girl} onChange={e=>setGirl(e.target.value as GirlId)}>{GIRLS.map(id=><option key={id} value={id}>{ROUTES[id]}</option>)}</select></label>
  <label>Ajándék<select aria-label="Ajándék" value={gift} onChange={e=>setGift(e.target.value as GiftId)}>{Object.entries(GIFTS).map(([id,x])=><option key={id} value={id}>{x.name} · {formatFt(x.price)}</option>)}</select></label></div>
  <p>{item.description}</p><p>Nálad: {s.inventory[gift]??0} · Elkölthető: {formatFt(s.money)}</p>
  <button disabled={!allowed||s.money<item.price} onClick={()=>g.buy(gift)}>Megveszem · {formatFt(item.price)}</button>
  <div className="gift-fields"><label>Személyes üzenet<select aria-label="Személyes üzenet" value={note} onChange={e=>setNote(e.target.value as GiftNote)}>{Object.entries(GIFT_NOTES).map(([id,text])=><option key={id} value={id}>{text}</option>)}</select></label>
  <label>Átadás<select aria-label="Átadás" value={delivery} onChange={e=>setDelivery(e.target.value as Delivery)}><option value="remote">Elküldöm · válasz a telefonra</option><option value="inPerson">Rövid személyes átadás</option></select></label></div>
  <p>Az üzeneted: „{GIFT_NOTES[note]}”</p><p className="muted">{delivery==='remote'?'A kézbesítés után rögtön láthatod a válaszát, és később a telefonon is elolvashatod.':'Egy rövid szünetben találkoztok az átadáshoz. A reakcióját itt látod; a hosszabb program külön alkalom.'}</p>
  <button className="primary" disabled={!allowed||!(s.inventory[gift]>0)||s.giftsWeek.includes(girl)} onClick={()=>g.gift(girl,gift,note,delivery)}>{delivery==='remote'?'Elküldöm':'Átadom'} · {ROUTES[girl]}</button>
  {s.giftsWeek.includes(girl)&&<p role="status">Ezen a héten már kapott tőled ajándékot. A válasz a telefonon is megmarad.</p>}
  <p className="muted">Az ajándék nem helyettesít személyes döntést vagy jóvátételt.</p>
 </div>;
}
