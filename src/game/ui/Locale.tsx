import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import {DEFAULT_LOCALE,isLocale,translator,type Locale} from '../content/localization.ts';
const STORAGE_KEY='ligetvar-locale';
const LocaleContext=createContext({locale:DEFAULT_LOCALE,setLocale:(_locale:Locale)=>{}});
export function LocaleProvider({children}:{children:ReactNode}){
 const [locale,setLocale]=useState<Locale>(()=>{
  try{const saved=localStorage.getItem(STORAGE_KEY);return isLocale(saved)?saved:DEFAULT_LOCALE;}catch{return DEFAULT_LOCALE;}
 });
 useEffect(()=>{document.documentElement.lang=locale;try{localStorage.setItem(STORAGE_KEY,locale);}catch{/* The preference can remain in memory. */}},[locale]);
 return <LocaleContext.Provider value={{locale,setLocale}}>{children}</LocaleContext.Provider>;
}
export const useLocale=()=>useContext(LocaleContext);
export function useTranslation(){const {locale}=useLocale();return useMemo(()=>translator(locale),[locale]);}
