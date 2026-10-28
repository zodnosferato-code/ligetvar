import pkg from '../../package.json' with {type:'json'};
/** Release labels do not decide whether a save is compatible. */
export const GAME_VERSION=pkg.version;
export const SAVE_SCHEMA_VERSION=4;
export const CONTENT_COMPATIBILITY_VERSION=6;
declare const __BUILD_ID__:string|null;
export const BUILD_ID=typeof __BUILD_ID__==='undefined'?null:__BUILD_ID__;
export const RELEASE={gameVersion:GAME_VERSION,saveSchemaVersion:SAVE_SCHEMA_VERSION,contentCompatibilityVersion:CONTENT_COMPATIBILITY_VERSION,...(BUILD_ID?{buildId:BUILD_ID}:{})};
