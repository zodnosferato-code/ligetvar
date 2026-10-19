import {writeFileSync} from 'node:fs';
import {SCENES} from '../src/game/content/catalog.ts';
import {ASSETS,orderedAssets} from '../scripts/venice/catalog.mjs';
const all=Object.values(SCENES),actorScenes=actor=>all.filter(s=>s.lines.some(l=>l.speaker===actor)).map(s=>s.id);
orderedAssets(ASSETS.map(a=>a.id));
let md=`# Venice production inventory

> **Status:** Requested candidates; not final approved art. | **Purpose:** Trace every requested image to runtime or production-reference needs.

Generated with \`node --experimental-strip-types tools/art-inventory.mjs\`. Source: \`scripts/venice/catalog.mjs\` plus the active scene registry. ${ASSETS.filter(a=>a.kind!=='reference').length} runtime images and ${ASSETS.filter(a=>a.kind==='reference').length} reference sheets. Lilla's portrait is added to the plan's 31-image minimum because her direct interview dialogue is now present in the runtime. Márton remains the viewpoint character and needs no invented face.

The user requested Venice generation on 19 October 2026 and selected WAI Illustrious + FireRed. The initial WAI portrait uses 1024×1280; reference edits use FireRed. Portrait alpha is extracted through Venice, with raw billed outputs checkpointed before extraction. The first request generates Rebeka's neutral portrait and the classroom; these are inspected together before production is expanded. Each expression is edited from that woman's neutral master. Soma's transformed form is edited from his human master. Lighting edits retain the generated base architecture. Existing backgrounds provide location/mood references, not a pixel style target. Additional cast appearances are explicitly proposed designs awaiting final acceptance.

| Asset | Use | Output under assets/generated/venice | Source references |
| --- | --- | --- | --- |
`;
for(const a of ASSETS){let usage=a.kind==='reference'?'Non-runtime identity/material reference':a.kind==='portrait'?`Speaker ${a.actor}; ${a.expression}; ${actorScenes(a.actor).length} scenes`:`${a.location}; ${a.lighting}; ${all.filter(s=>s.location===a.location).length} scenes at base location`;md+=`| \`${a.id}\` | ${usage} | \`${a.file}\` | ${a.refs.join(', ')||'New written design'} |\n`;}
md+=`\n## Runtime and production boundaries

Candidates are saved to the repository and uploaded as an Actions artifact. They do not become runtime assets merely because the API returned a file. The provenance manifest records prompts, model IDs, source hashes, dimensions, alpha-channel presence, request ID and generation status. Keys and request/response bodies containing image data are never logged or persisted.

Final acceptance checks: adult character identity; correct left/right marks; no drift between expressions; same crop/eye line/outfit; usable alpha; no text or watermark; clear seated player viewpoint; an empty natural companion seat; recognizable locations; consistent daylight and evening variants; desktop/mobile readability. The assistant and supporting cast are design proposals until reviewed. The architecture sheet is a visual materials reference, not a measured plan.

The initial request has a two-new-image budget. A follow-up production request can reuse verified outputs and request the remaining dependency-ordered images. Interrupted runs preserve completed outputs and their hashes; a rerun never silently replaces a different prompt/reference signature.
`;
writeFileSync(new URL('../docs/VENICE-PRODUCTION.md',import.meta.url),md);
