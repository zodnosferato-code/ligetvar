/** One-off adult side-character quick encounters exploring age-gap and niche adult desires. All participants are adults. */
import {scene} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {sideQuickiesEn} from './locales/side-quickies.en.ts';
import type {Choice,Scene,SceneStage} from './types.ts';
type Key=keyof typeof sideQuickiesEn;
const key=(id:string)=>('side.'+id) as Key;

function lillaQuickie():Scene {
 const s=scene('lilla_quickie',message(key('lilla.title')),'conversation',10,40,'department',['marton','lilla'],[],{},[],storedMessage(key('lilla.journal')));
 s.entry='arrival';
 s.periods=['day'];
 s.lines=[
  {id:'arrival',speaker:'narrator',stage:'office',...message(key('lilla.arrival')),expression:'neutral',next:'offer'},
  {id:'offer',speaker:'lilla',stage:'office',...message(key('lilla.offer')),expression:'amused',next:undefined}
 ];
 const choice=(id:string,next:string,decs:string[]):Choice=>({id,...message(key('lilla.offer.'+id)),next,reaction:'',effect:{decisions:decs}});
 s.lines.find(l=>l.id==='offer')!.choices=[
  choice('yes','yes',['lilla_quickie_yes']),
  choice('no','no',['lilla_quickie_no'])
 ];
 s.lines.push(
  {id:'yes',speaker:'narrator',stage:'close',...message(key('lilla.yes')),expression:'neutral',next:'after'},
  {id:'after',speaker:'lilla',stage:'office',...message(key('lilla.after')),expression:'amused',next:'end'},
  {id:'no',speaker:'narrator',stage:'office',...message(key('lilla.no')),expression:'neutral',next:'end'},
  {id:'end',speaker:'narrator',stage:'office',...message(key('lilla.end')),expression:'neutral'}
 );
 const stageFn=(id:string,loc:string,prox:SceneStage['proximity']='apart'):SceneStage=>({label:storedMessage(key('stage.'+id)),location:loc as any,background:loc as any,participants:['marton','lilla'],proximity:prox});
 s.stages={office:stageFn('office','department'),close:stageFn('close','department','close')};
 return s;
}

function juliaQuickie():Scene {
 const s=scene('julia_quickie',message(key('julia.title')),'conversation',15,45,'department',['marton','julia'],[],{},[],storedMessage(key('julia.journal')));
 s.entry='arrival';
 s.periods=['night'];
 s.lines=[
  {id:'arrival',speaker:'narrator',stage:'office',...message(key('julia.arrival')),expression:'neutral',next:'offer'},
  {id:'offer',speaker:'julia',stage:'office',...message(key('julia.offer')),expression:'neutral',next:undefined}
 ];
 const choice=(id:string,next:string,decs:string[]):Choice=>({id,...message(key('julia.offer.'+id)),next,reaction:'',effect:{decisions:decs}});
 s.lines.find(l=>l.id==='offer')!.choices=[
  choice('yes','yes',['julia_quickie_yes']),
  choice('no','no',['julia_quickie_no'])
 ];
 s.lines.push(
  {id:'yes',speaker:'narrator',stage:'close',...message(key('julia.yes')),expression:'neutral',next:'after'},
  {id:'after',speaker:'julia',stage:'office',...message(key('julia.after')),expression:'neutral',next:'end'},
  {id:'no',speaker:'narrator',stage:'office',...message(key('julia.no')),expression:'neutral',next:'end'},
  {id:'end',speaker:'narrator',stage:'office',...message(key('julia.end')),expression:'neutral'}
 );
 const stageFn=(id:string,loc:string,prox:SceneStage['proximity']='apart'):SceneStage=>({label:storedMessage(key('stage.'+id)),location:loc as any,background:loc as any,participants:['marton','julia'],proximity:prox});
 s.stages={office:stageFn('office','department'),close:stageFn('close','department','close')};
 return s;
}

export const sideQuickies:Scene[]=[lillaQuickie(),juliaQuickie()];
