/** Sixteen story chapters across one academic year; chapter IDs remain stable. */
export type Season='autumn'|'winter'|'spring'|'summer';
export type Weather='clear'|'rain'|'snow';
export type Outfit='everyday'|'winter'|'summer'|'christmas';
const DATES=['2026-09-01','2026-09-25','2026-10-19','2026-11-12','2026-12-06','2026-12-24','2027-01-23','2027-02-16','2027-03-12','2027-04-05','2027-04-29','2027-05-23','2027-06-16','2027-07-10','2027-08-03','2027-08-31'];
export function calendarFor(week:number){
 const chapter=Math.max(1,Math.min(16,Math.trunc(week)||1)),iso=DATES[chapter-1],month=Number(iso.slice(5,7));
 const season:Season=month>=9&&month<=11?'autumn':month===12||month<=2?'winter':month<=5?'spring':'summer';
 const event=chapter===6?'christmas':null;
 const weather:Weather=season==='winter'?'snow':chapter%3===0?'rain':'clear';
 const outfit:Outfit=event==='christmas'?'christmas':season==='winter'?'winter':season==='summer'?'summer':'everyday';
 return {chapter,iso,season,weather,event,outfit};
}
export const YEAR_DATES=DATES;
