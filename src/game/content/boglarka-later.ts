/** Connected disagreement and commitment; no engine-specific story rules. */
import {message,storedMessage} from './scene-localization.ts';
import type {boglarkaLaterEn} from './locales/boglarka-later.en.ts';
import type {ActorId,Choice,Line,Scene} from './types.ts';
type Key=keyof typeof boglarkaLaterEn;
const key=(id:string)=>('boglarka.later.'+id) as Key;
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
      "boglarka",
      "line_2"
    ],
    [
      "line_2",
      "marton",
      "line_3"
    ],
    [
      "line_3",
      "boglarka",
      "line_4"
    ],
    [
      "line_4",
      "boglarka",
      null
    ],
    [
      "romance_repair",
      "marton",
      null
    ],
    [
      "signal_0",
      "marton",
      "signal_1"
    ],
    [
      "signal_1",
      "narrator",
      "signal_2"
    ],
    [
      "signal_2",
      "boglarka",
      "settle_0"
    ],
    [
      "own_it_0",
      "marton",
      "own_it_1"
    ],
    [
      "own_it_1",
      "boglarka",
      "own_it_2"
    ],
    [
      "own_it_2",
      "marton",
      "own_it_3"
    ],
    [
      "own_it_3",
      "narrator",
      "settle_0"
    ],
    [
      "settle_0",
      "boglarka",
      "settle_1"
    ],
    [
      "settle_1",
      "marton",
      "settle_2"
    ],
    [
      "settle_2",
      "boglarka",
      "settle_3"
    ],
    [
      "settle_3",
      "narrator",
      "settle_4"
    ],
    [
      "settle_4",
      "boglarka",
      null
    ],
    [
      "withdraw_0",
      "marton",
      "withdraw_1"
    ],
    [
      "withdraw_1",
      "boglarka",
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
      "draft"
    ],
    [
      "draft",
      "boglarka",
      "reply"
    ],
    [
      "reply",
      "marton",
      "line_1"
    ],
    [
      "line_1",
      "boglarka",
      "line_2"
    ],
    [
      "line_2",
      "marton",
      "line_3"
    ],
    [
      "line_3",
      "boglarka",
      "line_4"
    ],
    [
      "line_4",
      "boglarka",
      null
    ],
    [
      "romance_future",
      "boglarka",
      null
    ],
    [
      "ritual_0",
      "marton",
      "ritual_1"
    ],
    [
      "ritual_1",
      "boglarka",
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
      "boglarka",
      "open_2"
    ],
    [
      "open_2",
      "marton",
      "end_0"
    ],
    [
      "end_0",
      "boglarka",
      "end_1"
    ],
    [
      "end_1",
      "narrator",
      "end_2"
    ],
    [
      "end_2",
      "boglarka",
      null
    ],
    [
      "withdraw_0",
      "boglarka",
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
        "signal",
        "signal_0"
      ],
      [
        "own_it",
        "own_it_0"
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
export function rewriteBoglarkaLater(original:Scene):Scene {
 if(!['boglarka_4','boglarka_5'].includes(original.id))return original;
 const s=structuredClone(original),prefix=s.id==='boglarka_4'?'conflict':'commit';
 const title=message(key(prefix+'.title'));s.title=title.text;s.titleKey=title.textKey;
 s.journal=storedMessage(key(prefix+'.journal'));
 const location=prefix==='conflict'?'library':'courtyard';
 s.stages={meeting:{label:storedMessage(key('stage.'+location)),location,background:location,participants:['marton','boglarka'],proximity:'apart'}};
 s.lines=graphs[prefix].map(([id,speaker,next]):Line=>({id,speaker,stage:'meeting',...message(key(prefix+'.'+id)),expression:speaker==='boglarka'?'vulnerable':'neutral',...(next?{next}:{})}));
 for(const [id,choices] of Object.entries(menus[prefix]))s.lines.find(l=>l.id===id)!.choices=choices.map(([cid,next]):Choice=>{
  const c:Choice={id:cid,...message(key(prefix+'.'+id+'.'+cid)),reaction:'',next};
  if(id==='line_4'){
   c.effect=original.lines.find(l=>l.id===id)!.choices!.find(c=>c.id===cid)!.effect;
   c.reaction=storedMessage(key(prefix+'.'+cid));
  }
  if(id==='romance_future')c.effect={decisions:[cid==='ritual'?'boglarka_future_music':'boglarka_future_invite']};
  return c;
 });
 for(const id of ['signal_2','own_it_1','settle_2','ritual_1','open_1','end_2']){
  const l=s.lines.find(l=>l.id===id);if(l)l.expression='amused';
 }
 return s;
}
