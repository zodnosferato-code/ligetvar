import type { Evidence, Registry, Requirements, Scene } from './types.ts';
export function validateRegistry(registry:Registry,evidence:Record<string,Evidence>,backgrounds:ReadonlySet<string>):void{
 const scenes=Object.values(registry),producers=new Map<string,string[]>();
 const fail=(message:string):never=>{throw new Error(message);};
 const requirements=(r:Requirements):Requirements[]=>[r,...(r.anyOf??[]).flatMap(requirements)];
 for(const s of scenes)for(const e of [s.onComplete,...s.lines.flatMap(l=>(l.choices??[]).map(c=>c.effect))])
  for(const d of e?.decisions??[])producers.set(d,[...(producers.get(d)??[]),s.id]);
 for(const s of scenes){
  if(s.cost&&(s.kind==='shared'||![s.cost.money,s.cost.points].every(n=>Number.isSafeInteger(n)&&n>=0)))fail('Invalid optional scene cost: '+s.id);
  if(registry[s.id]!==s)fail('Scene ID/key mismatch: '+s.id);
  if(s.periods&&(!s.periods.length||new Set(s.periods).size!==s.periods.length||s.periods.some(p=>!['day','night'].includes(p))||s.kind==='shared'))fail('Invalid activity periods: '+s.id);
  if(!s.title.trim()||!s.journal.trim()||!s.participants.length)fail('Missing scene text: '+s.id);
  if(!Number.isInteger(s.week)||s.week<1||s.deadline>16||s.week>s.deadline)fail('Invalid window: '+s.id);
  if(!backgrounds.has(s.background)||s.background!==s.location)fail('Wrong background: '+s.id);
  for(const [id,stage] of Object.entries(s.stages??{})){
   if(!id||!stage.label.trim()||!backgrounds.has(stage.background)||stage.background!==stage.location||!['apart','beside','close'].includes(stage.proximity)||!stage.participants.length||new Set(stage.participants).size!==stage.participants.length||stage.participants.some(p=>!s.participants.includes(p))||(stage.lighting&&!['day','evening','night'].includes(stage.lighting)))fail('Invalid stage: '+s.id+'/'+id);
   if(!s.lines.some(l=>l.stage===id))fail('Unused stage: '+s.id+'/'+id);
  }
  const ids=new Set(s.lines.map(l=>l.id));if(ids.size!==s.lines.length||!ids.has(s.entry))fail('Duplicate/missing line: '+s.id);
  for(const l of s.lines){
   if(!l.text?.trim()||/text_key|act_flash|desire_yield_control/.test(l.text))fail('Unresolved text: '+s.id);
   if(l.stage&&!s.stages?.[l.stage])fail('Unknown stage: '+s.id+'/'+l.id);
   if(l.speaker!=='narrator'&&!(l.stage?s.stages![l.stage].participants:s.participants).includes(l.speaker))fail('Absent speaker: '+s.id);
   if(!['neutral','amused','displeased','vulnerable','affectionate'].includes(l.expression))fail('Invalid expression: '+s.id);
   if(l.choices&&(l.choices.length<1||l.choices.length>4||new Set(l.choices.map(c=>c.id)).size!==l.choices.length))fail('Maximum 4 unique choices: '+s.id);
   if(l.choices?.length&&!l.choices.some(c=>!c.requires&&!c.localRequires?.length))fail('Choice needs an unconditional fallback: '+s.id);
   for(const c of l.choices??[])for(const id of c.localRequires??[])if(!s.lines.some(n=>n.choices?.some(choice=>choice.effect?.decisions?.includes(id))))fail('Unknown local decision: '+s.id+'/'+id);
   for(const c of l.choices??[])if(!c.text.trim()||(!c.next&&!c.reaction.trim()))fail('Missing choice text: '+s.id);
   for(const target of [l.next,...(l.choices??[]).map(c=>c.next)].filter(Boolean))if(!ids.has(target!))fail('Unknown next: '+s.id);
  }
  const seen=new Set<string>(),stack=new Set<string>();
  function visit(id:string){
   if(stack.has(id))fail('Line cycle: '+s.id);if(seen.has(id))return;stack.add(id);seen.add(id);
   const l=s.lines.find(l=>l.id===id)!;
   for(const target of new Set([l.next,...(l.choices??[]).map(c=>c.next??l.next)].filter(Boolean)))visit(target!);
   stack.delete(id);
  }
  visit(s.entry);if(seen.size!==ids.size)fail('Unreachable line: '+s.id);
  for(const id of s.evidence)if(evidence[id]?.scene!==s.id)fail('Evidence source: '+id);
  for(const r of [s.requires,...s.lines.flatMap(l=>(l.choices??[]).flatMap(c=>c.requires?[c.requires]:[]))].flatMap(requirements)){
   for(const id of r.scenes??[])if(!registry[id])fail('Unknown prerequisite scene: '+id);
   for(const id of r.evidence??[])if(!evidence[id]||!registry[evidence[id].scene])fail('Unknown evidence: '+id);
   for(const id of r.decisions??[])if(!producers.has(id))fail('Unknown decision: '+id);
  }
 }
 for(const e of Object.values(evidence))if(!e.text?.trim()||!registry[e.scene]?.evidence.includes(e.id))fail('Unresolved evidence: '+e.id);
 const visited=new Set<string>(),stack=new Set<string>();
 function dependency(s:Scene){
  if(stack.has(s.id))fail('Prerequisite cycle: '+s.id);if(visited.has(s.id))return;stack.add(s.id);
  const deps=new Set(requirements(s.requires).flatMap(r=>[...(r.scenes??[]),...(r.evidence??[]).map(e=>evidence[e].scene),...(r.decisions??[]).flatMap(d=>producers.get(d)??[])]));
  for(const id of deps){if(registry[id].week>s.deadline)fail('Impossible deadline: '+s.id);dependency(registry[id]);}
  stack.delete(s.id);visited.add(s.id);
 }
 scenes.forEach(dependency);
 for(let week=1;week<=16;week++){
  const shared=scenes.filter(s=>s.kind==='shared'&&s.week===week);
  if(shared.length!==1||shared[0].deadline!==week)fail('One guaranteed shared scene required: '+week);
  const s=shared[0];
  if(s.requires.anyOf?.length||s.requires.decisions?.length||s.requires.notDecisions?.length||s.requires.directions?.length)fail('Choice blocks shared scene: '+s.id);
  for(const id of [...(s.requires.scenes??[]),...(s.requires.evidence??[]).map(e=>evidence[e].scene)])if(registry[id].kind!=='shared'||registry[id].week>=week)fail('Optional/future dependency blocks shared scene: '+s.id);
 }
 if(scenes.find(s=>s.resolution==='confrontation')?.week!==15||scenes.find(s=>s.resolution==='institution')?.week!==16)fail('Ending order metadata');
}
