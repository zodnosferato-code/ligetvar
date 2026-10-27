import {DEFAULT_LOCALE,type Locale} from './localization.ts';
/** Presentation only: the currency remains Hungarian forints in every language. */
export function formatFt(n:number,locale:Locale=DEFAULT_LOCALE){
 return n.toLocaleString(locale==='hu'?'hu-HU':'en-GB')+(locale==='hu'?' Ft':' HUF');
}
