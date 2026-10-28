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
export type Outfit='everyday'|'winter'|'summer'|'christmas';
export const YEAR_DATES=Array.from({length:CALENDAR.weeks},(_,i)=>new Date(Date.UTC(2026,9,1)+i*7*86400000).toISOString().slice(0,10));
export function calendarFor(value:number){
 const week=Math.max(1,Math.min(CALENDAR.weeks,Math.trunc(value)||1)),iso=YEAR_DATES[week-1],month=Number(iso.slice(5,7));
 const season:Season=month>=9&&month<=11?'autumn':month===12||month<=2?'winter':month<=5?'spring':'summer';
 const event=iso<='2026-12-25'&&new Date(iso+'T12:00:00Z').getTime()+7*86400000> Date.UTC(2026,11,25,12)?'christmas':null;
 const weather:Weather=season==='winter'?'snow':week%3===0?'rain':'clear';
 const outfit:Outfit=event==='christmas'?'christmas':season==='winter'?'winter':season==='summer'?'summer':'everyday';
 const chapter=STORY_WEEKS.filter(w=>w<=week).length;
 return {week,chapter,iso,season,weather,event,outfit};
}
