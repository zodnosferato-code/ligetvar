/** Browser orchestration; reducers and CLI retain explicit, inspectable scene actions. */
import {SCENES} from './catalog.ts';
import {availableScenes,openScene} from './runtime.ts';
import type {GameState} from './types.ts';
export function enterMandatoryScene(state:GameState):GameState{
 if(state.phase!=='planner'||state.slot!==0)return state;
 const required=availableScenes(state,SCENES).find(scene=>scene.kind==='shared');
 return required?openScene(state,required.id,SCENES):state;
}
