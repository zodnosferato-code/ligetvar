import {openSync,closeSync,readFileSync,writeFileSync,fsyncSync,renameSync,unlinkSync,existsSync,mkdirSync,lstatSync,realpathSync} from 'node:fs';
import {dirname,basename,join,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
export interface SaveFile {read:()=>string|null;write:(raw:string)=>void}
/** One process owns a save path. Never steal a lock, even if it looks stale. */
export class LockedSave implements SaveFile {
 path:string;lock:string;closed=false;
 constructor(input:string){
  const absolute=resolve(input);mkdirSync(dirname(absolute),{recursive:true});
  this.path=join(realpathSync(dirname(absolute)),basename(absolute));this.lock=this.path+'.lock';
  if(existsSync(this.path)&&!lstatSync(this.path).isFile())throw new Error('Save path must be a regular file, not a symlink or directory.');
  const fd=openSync(this.lock,'wx',0o600);try{writeFileSync(fd,JSON.stringify({pid:process.pid,path:this.path}));}finally{closeSync(fd);}
 }
 read(){return existsSync(this.path)?readFileSync(this.path,'utf8'):null;}
 write(raw:string){
  if(this.closed)throw new Error('Save file is closed.');
  const temporary=this.path+'.'+randomUUID()+'.tmp';
  try{const fd=openSync(temporary,'wx',0o600);try{writeFileSync(fd,raw);fsyncSync(fd);}finally{closeSync(fd);}renameSync(temporary,this.path);}finally{if(existsSync(temporary))unlinkSync(temporary);}
 }
 close(){if(!this.closed){this.closed=true;unlinkSync(this.lock);}}
}
export function writeNewFile(path:string,data:string){const fd=openSync(resolve(path),'wx',0o600);try{writeFileSync(fd,data);fsyncSync(fd);}finally{closeSync(fd);}}
