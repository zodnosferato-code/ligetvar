"""Verify candidate provenance and make internal contact sheets for visual review."""
import argparse, hashlib, json, math
from pathlib import Path
from PIL import Image, ImageDraw
parser=argparse.ArgumentParser();parser.add_argument('--root',default='assets/generated/venice');parser.add_argument('--output',default='artifacts/venice-review');args=parser.parse_args()
root=Path(args.root);output=Path(args.output);output.mkdir(parents=True,exist_ok=True)
manifest=json.loads((root/'manifest.json').read_text());report=[]
groups={'portraits':[],'backgrounds':[],'references':[]}
for key,record in manifest['assets'].items():
 path=root/record['file'];data=path.read_bytes()
 if hashlib.sha256(data).hexdigest()!=record['sha256']:raise ValueError('Hash mismatch: '+key)
 with Image.open(path) as image:
  if image.size!=(record['width'],record['height']):raise ValueError('Dimensions mismatch: '+key)
  alpha=image.getchannel('A').getextrema() if 'A' in image.getbands() else None
  report.append({'id':key,'dimensions':list(image.size),'hasUsefulAlpha':bool(alpha and alpha[0]<255 and alpha[1]>0),'status':record['status']})
 groups[record['file'].split('/')[0]].append((key,path,record))
for name,entries in groups.items():
 if not entries:continue
 cols,w,h=(5,220,300) if name=='portraits' else (3,360,225) if name=='backgrounds' else (2,450,330)
 sheet=Image.new('RGB',(cols*w,math.ceil(len(entries)/cols)*h),'#ece8df');draw=ImageDraw.Draw(sheet)
 for i,(key,path,record) in enumerate(entries):
  x=(i%cols)*w;y=(i//cols)*h
  with Image.open(path) as image:
   image=image.convert('RGBA');image.thumbnail((w-12,h-42));sheet.paste(image,(x+(w-image.width)//2,y+4),image)
  draw.text((x+6,y+h-34),key,fill='#172528')
  draw.text((x+6,y+h-19),'alpha pending' if 'needs-alpha' in record['status'] else 'candidate',fill='#6a4c20')
 sheet.save(output/(name+'.jpg'),quality=92)
(output/'checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'checked':len(report),'usefulAlpha':sum(r['hasUsefulAlpha'] for r in report),'sheets':[p.name for p in output.glob('*.jpg')]},indent=2))
