/** One authored year. Chapter IDs remain stable; their numbers are not calendar weeks. */
export const STORY_WEEKS = [1,2,3,6,10,16,28,32,40,43,44,46,48,50,51,52] as const;
export const CALENDAR = {
 weeks:52,
 storyWeeks:STORY_WEEKS,
 direction:STORY_WEEKS[7],
 lastPersonal:STORY_WEEKS[13],
 confrontation:STORY_WEEKS[14],
 aftermath:STORY_WEEKS[15],
} as const;
/** Existing scene briefs use chapter coordinates; the runtime always stores actual weeks. */
export function chapterWeek(chapter:number):number {
 const week=STORY_WEEKS[chapter-1];
 if(week===undefined)throw new Error('Unknown story chapter: '+chapter);
 return week;
}
export function storyIdAt(week:number):string|undefined {
 const chapter=STORY_WEEKS.findIndex(w=>w===week);
 return chapter<0?undefined:'shared_'+(chapter+1);
}

/** Deterministic presentation dates for each playable week, beginning at the October opening. */
export type Season='autumn'|'winter'|'spring'|'summer';
export type Weather='clear'|'rain'|'snow';
export const OUTFITS=['everyday','winter','summer','christmas','halloween'] as const;
export type Outfit=typeof OUTFITS[number];
export const YEAR_DATES=Array.from({length:CALENDAR.weeks},(_,i)=>new Date(Date.UTC(2026,9,1)+i*7*86400000).toISOString().slice(0,10));
export const HOLIDAYS={halloween:{date:'2026-10-31',symbol:'🎃',outfit:'halloween'},christmas:{date:'2026-12-25',symbol:'🎄',outfit:'christmas'}} as const;
export type HolidayId=keyof typeof HOLIDAYS;
export function holidayWeek(id:HolidayId){return YEAR_DATES.findIndex(iso=>iso<=HOLIDAYS[id].date&&Date.parse(iso+'T12:00:00Z')+7*86400000>Date.parse(HOLIDAYS[id].date+'T12:00:00Z'))+1;}
export function calendarFor(value:number){
 const week=Math.max(1,Math.min(CALENDAR.weeks,Math.trunc(value)||1)),iso=YEAR_DATES[week-1],month=Number(iso.slice(5,7));
 const season:Season=month>=9&&month<=11?'autumn':month===12||month<=2?'winter':month<=5?'spring':'summer';
 const events=(Object.keys(HOLIDAYS) as HolidayId[]).filter(id=>holidayWeek(id)===week),event=events[0]??null;
 const weather:Weather=season==='winter'?'snow':week%3===0?'rain':'clear';
 const seasonalOutfit:Outfit=season==='winter'?'winter':season==='summer'?'summer':'everyday';
 const outfit:Outfit=event?HOLIDAYS[event].outfit:seasonalOutfit;
 const chapter=STORY_WEEKS.filter(w=>w<=week).length;
 return {week,chapter,iso,season,weather,events,event,outfit,seasonalOutfit};
}
