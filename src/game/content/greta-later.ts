/** Connected disagreement and commitment; no engine-specific story rules. */
import {message,storedMessage} from './scene-localization.ts';
import type {gretaLaterEn} from './locales/greta-later.en.ts';
import type {ActorId,Choice,Line,Scene} from './types.ts';
type Key=keyof typeof gretaLaterEn;
const key=(id:string)=>('greta.later.'+id) as Key;
type Row=readonly [string,ActorId,string|null];
const graphs:Record<'conflict'|'commit',readonly Row[]>={
  "conflict": [
    [
      "line_0",
      "narrator",
      "line_1"
    ],
    [
      "line_1",
      "greta",
      "line_2"
    ],
    [
      "line_2",
      "marton",
      "line_3"
    ],
    [
      "line_3",
      "greta",
      "line_4"
    ],
    [
      "line_4",
      "greta",
      null
    ],
    [
      "romance_repair",
      "marton",
      null
    ],
    [
      "ask_0",
      "marton",
      "ask_1"
    ],
    [
      "ask_1",
      "greta",
      "ask_2"
    ],
    [
      "ask_2",
      "marton",
      "ask_3"
    ],
    [
      "ask_3",
      "greta",
      "settle_0"
    ],
    [
      "own_0",
      "marton",
      "own_1"
    ],
    [
      "own_1",
      "greta",
      "own_2"
    ],
    [
      "own_2",
      "marton",
      "own_3"
    ],
    [
      "own_3",
      "greta",
      "settle_0"
    ],
    [
      "settle_0",
      "narrator",
      "settle_1"
    ],
    [
      "settle_1",
      "greta",
      "settle_2"
    ],
    [
      "settle_2",
      "marton",
      "settle_3"
    ],
    [
      "settle_3",
      "narrator",
      "settle_4"
    ],
    [
      "settle_4",
      "greta",
      null
    ],
    [
      "withdraw_0",
      "marton",
      "withdraw_1"
    ],
    [
      "withdraw_1",
      "greta",
      "withdraw_2"
    ],
    [
      "withdraw_2",
      "narrator",
      null
    ]
  ],
  "commit": [
    [
      "line_0",
      "narrator",
      "food"
    ],
    [
      "food",
      "greta",
      "answer"
    ],
    [
      "answer",
      "marton",
      "line_1"
    ],
    [
      "line_1",
      "greta",
      "line_2"
    ],
    [
      "line_2",
      "marton",
      "line_3"
    ],
    [
      "line_3",
      "greta",
      "line_4"
    ],
    [
      "line_4",
      "greta",
      null
    ],
    [
      "romance_future",
      "greta",
      null
    ],
    [
      "ritual_0",
      "marton",
      "ritual_1"
    ],
    [
      "ritual_1",
      "greta",
      "ritual_2"
    ],
    [
      "ritual_2",
      "marton",
      "end_0"
    ],
    [
      "open_0",
      "marton",
      "open_1"
    ],
    [
      "open_1",
      "greta",
      "open_2"
    ],
    [
      "open_2",
      "marton",
      "end_0"
    ],
    [
      "end_0",
      "greta",
      "end_1"
    ],
    [
      "end_1",
      "narrator",
      "end_2"
    ],
    [
      "end_2",
      "greta",
      null
    ],
    [
      "withdraw_0",
      "greta",
      "withdraw_1"
    ],
    [
      "withdraw_1",
      "narrator",
      null
    ]
  ]
};
const menus:Record<string,Record<string,readonly (readonly [string,string])[]>>={
  "conflict": {
    "line_4": [
      [
        "repair",
        "romance_repair"
      ],
      [
        "withdraw",
        "withdraw_0"
      ]
    ],
    "romance_repair": [
      [
        "ask",
        "ask_0"
      ],
      [
        "own",
        "own_0"
      ]
    ]
  },
  "commit": {
    "line_4": [
      [
        "commit",
        "romance_future"
      ],
      [
        "withdraw",
        "withdraw_0"
      ]
    ],
    "romance_future": [
      [
        "ritual",
        "ritual_0"
      ],
      [
        "open",
        "open_0"
      ]
    ]
  }
};
export function rewriteGretaLater(original:Scene):Scene {
 if(!['greta_4','greta_5'].includes(original.id))return original;
 const s=structuredClone(original),prefix=s.id==='greta_4'?'conflict':'commit';
 const title=message(key(prefix+'.title'));s.title=title.text;s.titleKey=title.textKey;
 s.journal=storedMessage(key(prefix+'.journal'));
 const location='courtyard' as const;
 s.stages={meeting:{label:storedMessage(key('stage.'+location)),location,background:location,participants:['marton','greta'],proximity:'apart'}};
 s.lines=graphs[prefix].map(([id,speaker,next]):Line=>({id,speaker,stage:'meeting',...message(key(prefix+'.'+id)),expression:speaker==='greta'&&(id==='line_3'||id==='line_4'||id==='withdraw_0')?'vulnerable':'neutral',...(next?{next}:{})}));
 for(const [id,choices] of Object.entries(menus[prefix]))s.lines.find(l=>l.id===id)!.choices=choices.map(([cid,next]):Choice=>{
  const c:Choice={id:cid,...message(key(prefix+'.'+id+'.'+cid)),reaction:'',next};
  if(id==='line_4'){
   c.effect=original.lines.find(l=>l.id===id)!.choices!.find(c=>c.id===cid)!.effect;
   c.reaction=storedMessage(key(prefix+'.'+cid));
  }
  if(id==='romance_future')c.effect={decisions:[cid==='ritual'?'greta_future_ordinary':'greta_future_ask']};
  return c;
 });
 for(const id of ['ask_3','own_3','settle_4','food','ritual_1','open_1','end_2']){
  const l=s.lines.find(l=>l.id===id);if(l)l.expression='amused';
 }
 return s;
}
