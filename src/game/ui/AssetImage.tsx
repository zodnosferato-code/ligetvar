import {useState,type ImgHTMLAttributes} from 'react';
import {assetUrl} from '../content/assets.ts';
/** Failed URLs and intentionally unproduced art always have visible, readable replacements. */
export function AssetImage({file,label,...props}:{file:string|null;label:string}&Omit<ImgHTMLAttributes<HTMLImageElement>,'src'|'alt'>){
 const [failed,setFailed]=useState<string|null>(null);
 return !file||failed===file?props['aria-hidden']?<span className={props.className} aria-hidden="true">◇</span>:<span className={'asset-missing '+(props.className??'')} role="img" aria-label={label+' · Missing artwork'} title={file??label}>◇ {label}<small>Missing artwork</small></span>:<img {...props} src={assetUrl(file)} alt={label} onError={()=>setFailed(file)}/>;
}
