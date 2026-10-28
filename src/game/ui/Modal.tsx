import {useEffect,useId,useRef,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {useTranslation} from './Locale.tsx';

/** Native modal semantics keep focus and background interaction inside the current task. */
export function Modal({title,children,onClose,dismissible=true,className=''}:{title:string;children:ReactNode;onClose:()=>void;dismissible?:boolean;className?:string}){
 const t=useTranslation(),id=useId(),dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const element=dialog.current!,previous=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  element.showModal();document.body.style.overflow='hidden';
  return ()=>{element.close();document.body.style.overflow=overflow;if(previous?.isConnected)previous.focus({preventScroll:true});};
 },[]);
 return createPortal(<dialog ref={dialog} className={'game-modal '+className} aria-labelledby={id} onCancel={e=>{e.preventDefault();if(dismissible)onClose();}} onClick={e=>{if(dismissible&&e.target===e.currentTarget){const box=e.currentTarget.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)onClose();}}}>
  <div className="modal-heading"><h2 id={id}>{title}</h2>{dismissible&&<button onClick={onClose} aria-label={t('hub.close.label')}>{t('hub.close')}</button>}</div>
  <div className="modal-body">{children}</div>
 </dialog>,document.querySelector('.game')??document.body);
}
