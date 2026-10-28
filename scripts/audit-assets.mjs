import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);
const manifest=JSON.parse(readFileSync('assets/catalog.json','utf8'));
const files=walk('assets').filter(p=>/\.(webp|png|jpg|gif|svg|mp3)$/i.test(p)&&!p.startsWith('assets/generated/')&&!p.startsWith('assets/references/'));
const errors=[];
for(const file of files){const entry=manifest.assets.find(a=>a.file===file);if(!entry)errors.push('Uncatalogued: '+file);else if(!entry.prompt||!entry.negativePrompt||!entry.provenance)errors.push('Incomplete metadata: '+file);}
for(const a of manifest.assets)if(!existsSync(a.file))errors.push('Missing export: '+a.file);
for(const p of manifest.planned)if(!p.prompt||!p.negativePrompt||p.status!=='unproduced')errors.push('Invalid planned asset: '+p.file);
console.log(`${files.length} exports, ${manifest.planned.length} planned variants, ${errors.length} errors`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
