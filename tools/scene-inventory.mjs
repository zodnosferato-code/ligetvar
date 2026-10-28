import {writeFileSync} from 'node:fs';
import {SCENES,EVIDENCE} from '../src/game/content/catalog.ts';
const scenes=Object.values(SCENES),lines=scenes.flatMap(s=>s.lines),branches=lines.flatMap(l=>l.choices??[]).filter(c=>c.next).length;
let md=`# Active scene inventory

> **Status:** Generated snapshot. | **Purpose:** Active metadata from the typed runtime registry.

Regenerate with \`node --experimental-strip-types tools/scene-inventory.mjs\`. Source: \`src/game/content/catalog.ts\`, assembled from the story modules. ${scenes.length} authored scenes, ${lines.length} text nodes across all branches, ${branches} choices with explicit next-node targets. Node counts include mutually exclusive branches and are not playthrough lengths. “Authored” means text is present; it is not a narrative quality/completion gate.

| Scene ID | Kind | Week window | Location | Scene/decision/evidence prerequisites | Nodes |
| --- | --- | --- | --- | --- | --- |
`;
for(const s of scenes){const r=s.requires;md+=`| \`${s.id}\` | ${s.kind} | ${s.week}–${s.deadline} | ${s.location} | ${[...(r.scenes??[]),...(r.decisions??[]),...(r.evidence??[]),...(r.directions??[]),...(r.calendar?.events??[]).map(id=>'event:'+id),...(r.calendar?.seasons??[]).map(id=>'season:'+id),...(r.anyOf?.length?['alternative requirements']:[])].join(', ')} | ${s.lines.length} |\n`;}
md+='\n## Evidence\n\n| ID | Witnessed source |\n| --- | --- |\n';for(const e of Object.values(EVIDENCE))md+=`| \`${e.id}\` | \`${e.scene}\` |\n`;
md+='\nHistorical dialogue trees and localization are preserved under `docs/archive/legacy-narrative/`, with zero active runtime imports. Contextual coffee conversations never grant romance milestones; callback choices require a witnessed earlier topic.\n';
writeFileSync(new URL('../docs/SCENE-INVENTORY.md',import.meta.url),md);
