/** Authored Boglárka scenes; all progression remains campaign content. */
import {message,storedMessage} from './scene-localization.ts';
import type {boglarkaPersonalEn} from './locales/boglarka-personal.en.ts';
import type {ActorId,Choice,Line,Scene,SceneStage} from './types.ts';
type Key=keyof typeof boglarkaPersonalEn;
const key=(id:string)=>('boglarka.personal.'+id) as Key;
type Row=readonly [string,ActorId,string,string|null];
const graphs:Record<'date'|'after',readonly Row[]>={
  "date": [
    ["line_0","narrator","courtyard","line_1"],
    ["line_1","boglarka","courtyard","line_2"],
    ["line_2","marton","courtyard","line_3"],
    ["line_3","boglarka","courtyard","date_alibi"],
    ["date_alibi","boglarka","courtyard","date_reply"],
    ["date_reply","marton","courtyard","line_4"],
    ["line_4","narrator","courtyard",null],
    ["romance_date_topic","narrator","courtyard",null],
    ["romance_date_topic_callback_0","boglarka","courtyard","romance_date_topic_callback_1"],
    ["romance_date_topic_callback_1","marton","courtyard","romance_date_topic_callback_2"],
    ["romance_date_topic_callback_2","boglarka","courtyard","music_offer"],
    ["romance_date_topic_music_0","boglarka","courtyard","romance_date_topic_music_1"],
    ["romance_date_topic_music_1","marton","courtyard","romance_date_topic_music_2"],
    ["romance_date_topic_music_2","boglarka","courtyard","music_offer"],
    ["romance_date_topic_self_0","boglarka","courtyard","romance_date_topic_self_1"],
    ["romance_date_topic_self_1","marton","courtyard","romance_date_topic_self_2"],
    ["romance_date_topic_self_2","boglarka","courtyard","music_offer"],
    ["music_offer","boglarka","courtyard","music_listen"],
    ["music_listen","narrator","courtyard","music_answer"],
    ["music_answer","narrator","courtyard",null],
    ["music_like","boglarka","courtyard","romance_closeness"],
    ["music_differ","boglarka","courtyard","music_differ_reply"],
    ["music_differ_reply","marton","courtyard","romance_closeness"],
    ["romance_closeness","boglarka","courtyard",null],
    ["romance_closeness_kiss_0","narrator","beside","romance_closeness_kiss_1"],
    ["romance_closeness_kiss_1","boglarka","beside","date_destination"],
    ["romance_closeness_slow_touch_0","boglarka","courtyard","romance_closeness_slow_touch_1"],
    ["romance_closeness_slow_touch_1","marton","courtyard","date_destination"],
    ["date_destination","boglarka","courtyard",null],
    ["date_remembered_0","boglarka","beside","date_together_0"],
    ["date_together_0","narrator","library","date_together_1"],
    ["date_together_1","boglarka","library","date_private_choice"],
    ["date_private_choice","narrator","library",null],
    ["date_kiss_0","boglarka","library_close","date_kiss_1"],
    ["date_kiss_1","narrator","library_close","date_kiss_2"],
    ["date_kiss_2","boglarka","library_close","date_return_0"],
    ["date_quiet_0","boglarka","library","date_quiet_1"],
    ["date_quiet_1","narrator","library","date_return_0"],
    ["date_return_0","narrator","courtyard","date_goodbye_0"],
    ["date_goodbye_0","boglarka","courtyard","date_goodbye_1"],
    ["date_goodbye_1","marton","courtyard","date_goodbye_2"],
    ["date_goodbye_2","narrator","courtyard",null],
    ["date_declined_0","boglarka","courtyard","date_declined_1"],
    ["date_declined_1","narrator","courtyard",null]
  ],
  "after": [
    ["line_0","narrator","courtyard","receipt"],
    ["receipt","boglarka","courtyard","reply"],
    ["reply","marton","courtyard","line_1"],
    ["line_1","boglarka","courtyard","line_2"],
    ["line_2","marton","courtyard","line_3"],
    ["line_3","boglarka","courtyard","after_want"],
    ["after_want","boglarka","courtyard","line_4"],
    ["line_4","narrator","courtyard",null],
    ["romance_after_topic","narrator","beside",null],
    ["after_music","boglarka","beside","after_invite"],
    ["after_concert","boglarka","beside","after_invite"],
    ["after_coffee","boglarka","beside","after_invite"],
    ["after_rest","boglarka","beside","rest_reply"],
    ["rest_reply","marton","beside","after_invite"],
    ["after_invite","boglarka","beside",null],
    ["outside_0","narrator","beside","outside_1"],
    ["outside_1","boglarka","beside","goodbye"],
    ["room_0","narrator","room","room_detail"],
    ["room_detail","boglarka","room","room_choice"],
    ["room_choice","narrator","room",null],
    ["kiss_0","boglarka","room","kiss_1"],
    ["kiss_1","narrator","close","intimacy_choice"],
    ["intimacy_choice","boglarka","close",null],
    ["fade_0","marton","close","fade_1"],
    ["fade_1","narrator","close","after_fade"],
    ["after_fade","narrator","room","after_fade_reply"],
    ["after_fade_reply","boglarka","room","room_leave"],
    ["stop_0","boglarka","room","quiet_0"],
    ["talk_0","boglarka","room","quiet_0"],
    ["quiet_0","marton","room","quiet_1"],
    ["quiet_1","narrator","room","quiet_2"],
    ["quiet_2","boglarka","room","room_leave"],
    ["room_depart","marton","room","room_leave"],
    ["room_leave","narrator","room","homeward"],
    ["homeward","narrator","homeward",null],
    ["goodbye","narrator","courtyard",null],
    ["withdraw_0","boglarka","courtyard","withdraw_1"],
    ["withdraw_1","narrator","courtyard","withdraw_2"],
    ["withdraw_2","boglarka","courtyard","withdraw_end"],
    ["withdraw_end","narrator","courtyard_alone",null]
  ]
};
const menus:Record<string,Record<string,readonly (readonly [string,string])[]>>={
  "date": {
    "line_4": [
      [
        "yes",
        "romance_date_topic"
      ],
      [
        "slow",
        "date_declined_0"
      ]
    ],
    "romance_date_topic": [
      [
        "callback",
        "romance_date_topic_callback_0"
      ],
      [
        "music",
        "romance_date_topic_music_0"
      ],
      [
        "self",
        "romance_date_topic_self_0"
      ]
    ],
    "music_answer": [
      [
        "like",
        "music_like"
      ],
      [
        "differ",
        "music_differ"
      ]
    ],
    "romance_closeness": [
      [
        "kiss",
        "romance_closeness_kiss_0"
      ],
      [
        "slow_touch",
        "romance_closeness_slow_touch_0"
      ]
    ],
    "date_destination": [
      [
        "quiet_place",
        "date_together_0"
      ],
      [
        "together",
        "date_remembered_0"
      ],
      [
        "stay_outside",
        "date_goodbye_0"
      ],
      [
        "head_home",
        "date_goodbye_0"
      ]
    ],
    "date_private_choice": [
      [
        "kiss",
        "date_kiss_0"
      ],
      [
        "stay_close",
        "date_quiet_0"
      ],
      [
        "head_home",
        "date_return_0"
      ]
    ]
  },
  "after": {
    "line_4": [
      [
        "continue_together",
        "romance_after_topic"
      ],
      [
        "withdraw",
        "withdraw_0"
      ]
    ],
    "romance_after_topic": [
      [
        "music",
        "after_music"
      ],
      [
        "concert",
        "after_concert"
      ],
      [
        "coffee",
        "after_coffee"
      ],
      [
        "rest",
        "after_rest"
      ]
    ],
    "after_invite": [
      [
        "room",
        "room_0"
      ],
      [
        "outside",
        "outside_0"
      ],
      [
        "leave",
        "goodbye"
      ]
    ],
    "room_choice": [
      [
        "kiss",
        "kiss_0"
      ],
      [
        "talk",
        "talk_0"
      ],
      [
        "leave",
        "room_depart"
      ]
    ],
    "intimacy_choice": [
      [
        "intimate",
        "fade_0"
      ],
      [
        "stop",
        "stop_0"
      ],
      [
        "leave",
        "room_depart"
      ]
    ]
  }
};
function stage(id:string,location:SceneStage['location'],proximity:SceneStage['proximity']='apart',participants:ActorId[]=['marton','boglarka']):SceneStage {
 return {label:storedMessage(key('stage.'+id)),location,background:location,participants,proximity};
}
export function rewriteBoglarkaPersonal(original:Scene):Scene {
 if(original.id!=='boglarka_3'&&original.id!=='boglarka_6')return original;
 const s=structuredClone(original),prefix=s.id==='boglarka_3'?'date':'after';
 const title=message(key(prefix+'.title'));s.title=title.text;s.titleKey=title.textKey;s.journal=storedMessage(key(prefix+'.journal'));
 const decisions=original.lines.find(l=>l.id==='line_4')!.choices!;
 s.lines=graphs[prefix].map(([id,speaker,stage,next]):Line=>({id,speaker,stage,...message(key(prefix+'.'+id)),expression:speaker==='boglarka'?'affectionate':'neutral',...(next?{next}:{})}));
 s.stages={courtyard:stage('courtyard','courtyard'),beside:stage('beside','courtyard','beside'),library:stage('library','library','beside'),library_close:stage('library_close','library','close'),room:stage('room','apartment'),close:stage('close','apartment','close'),homeward:stage('homeward','apartment','apart',['marton']),courtyard_alone:stage('homeward','courtyard','apart',['marton'])};
 const usedStages=new Set(s.lines.map(l=>l.stage));
 s.stages=Object.fromEntries(Object.entries(s.stages).filter(([id])=>usedStages.has(id)));
 for(const [id,choices] of Object.entries(menus[prefix])){
  s.lines.find(l=>l.id===id)!.choices=choices.map(([cid,next]):Choice=>{
   const c:Choice={id:cid,...message(key(prefix+'.'+id+'.'+cid)),reaction:'',next};
   if(id==='line_4'){
    c.effect=decisions.find(d=>d.id===cid)!.effect;
    c.reaction=storedMessage(key('reaction.'+prefix+'.'+cid));
   }
   if(prefix==='date'){
    if(cid==='callback')c.requires={decisions:['boglarka_quiet']};
    if(id==='romance_closeness')c.effect={decisions:[cid==='kiss'?'boglarka_date_kiss':'boglarka_date_slow']};
    if(cid==='together'||id==='date_private_choice'&&cid==='kiss')c.localRequires=['boglarka_date_kiss'];
    if(id==='date_private_choice'&&cid==='kiss')c.effect={decisions:['boglarka_date_romantic_kiss']};
   }else if(id==='romance_after_topic'){
    const required={music:{decisions:['boglarka_future_music']},concert:{decisions:['boglarka_future_invite']},coffee:{scenes:['coffee_boglarka_late']}};
    c.requires=required[cid as keyof typeof required];
   }
   return c;
  });
 }
 for(const line of s.lines){
  if(line.speaker!=='boglarka')continue;
  if(line.id.startsWith('withdraw_')||line.id==='line_3'&&prefix==='after')line.expression='vulnerable';
  else if(['date_alibi','music_differ','music_like','receipt','room_detail','outside_1','quiet_2'].includes(line.id))line.expression='amused';
 }
 return s;
}
