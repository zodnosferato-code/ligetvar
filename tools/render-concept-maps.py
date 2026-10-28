"""Render reproducible stylized maps from the canonical estate geometry (stdlib only)."""
import json, math, random
from pathlib import Path
from xml.sax.saxutils import escape
ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'docs/design/maps/estate-plan.json').read_text())
OUT=ROOT/'assets/generated/geography-concepts-2026-10-28/maps'
OUT.mkdir(parents=True,exist_ok=True)
def start(w,h,title,sub):
 return [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">',f'<rect width="{w}" height="{h}" fill="#f2e7cc"/>',f'<rect x="18" y="18" width="{w-36}" height="{h-36}" rx="10" fill="none" stroke="#76644b" stroke-width="3"/>','<style>text{font-family:serif;fill:#3e4438}.title{font-size:40px;font-weight:bold}.sub{font-size:20px}.label{font-size:20px;paint-order:stroke;stroke:#f2e7cc;stroke-width:5;stroke-linejoin:round}.small{font-size:17px}</style>',f'<text x="50" y="70" class="title">{escape(title)}</text>',f'<text x="50" y="105" class="sub">{escape(sub)}</text>']
def points(poly,transform):return ' '.join(f'{x:.2f},{y:.2f}' for x,y in map(transform,poly))
def polygon(s,poly,t,fill,stroke='#6e6651',width=2):s.append(f'<polygon points="{points(poly,t)}" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>')
def line(s,poly,t,color,width=2,dash=''):s.append(f'<polyline points="{points(poly,t)}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="{dash}"/>')
def text(s,x,y,label,cl='label'):s.append(f'<text x="{x}" y="{y}" class="{cl}">{escape(label)}</text>')
def inside(p,poly):
 x,y=p;hit=False
 for (a,b),(c,d) in zip(poly,poly[1:]+poly[:1]):
  if (b>y)!=(d>y) and x<(c-a)*(y-b)/(d-b)+a:hit=not hit
 return hit
s=start(1900,1600,'Ligetvár · The wooded estate','North up · Measured geometry with illustrative vegetation · Early October')
t=lambda p:(80+(p[0]+800)*.66,160+(1300-p[1])*.66)
polygon(s,DATA['estateBoundary'],t,'#b8bd8b')
polygon(s,DATA['vegetationZones'][0]['polygon'],t,'#ded7a3')
for c in DATA['terrainContours']:line(s,c['line'],t,'#a2a074',1.5)
rng=random.Random(28)
for _ in range(900):
 p=(rng.uniform(-690,990),rng.uniform(-390,1190))
 if inside(p,DATA['vegetationZones'][0]['polygon']) or inside(p,DATA['lake']['shoreline']):continue
 if any(inside(p,b['polygon']) for b in DATA['buildings']):continue
 if math.dist(p,(-650,1000))<22:continue
 x,y=t(p);r=rng.uniform(4,10);fill=rng.choice(['#78855b','#89905a','#9c985d','#b09b58','#b49150'])
 s.append(f'<path d="M{x} {y+5}v8" stroke="#756044"/><circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="#67724e" stroke-width=".7"/>')
for seq in DATA['brook'].values():line(s,seq,t,'#6a9da4',3)
polygon(s,DATA['lake']['shoreline'],t,'#93bcc1','#507f84',2)
for p in DATA['paths']:
 if p['toPlace']=='village':continue
 line(s,p['centreline'],t,'#91785b',5);line(s,p['centreline'],t,'#e8cca0',2.5)
for b in DATA['buildings']:polygon(s,b['polygon'],t,'#777b83','#484f56',1.5)
polygon(s,DATA['courtyard'],t,'#d2b792')
labels=[('hill','Ridge lookout · 325 m',-15,-25),('forest','Forest path',15,-12),('bekas','Békás Lake',20,-25),('courtyard','Castle',-70,-25),('workshop','Riding hall',-100,25),('holdkor','Granary',15,-15),('residences','Residences',20,15),('gate','South gate',20,25)]
for key,label,dx,dy in labels:
 p=DATA['places'][key];x,y=t((p['east'],p['north']));text(s,x+dx,y+dy,label)
text(s,1390,190,'Walks from the courtyard','sub')
for i,label in enumerate(['Lake · 850 m / 12 min','Lake from suite · 1,015 m / 17 min','Holdkör · 180 m / 4 min','Workshop · 240 m / 4 min','Forest · 720 m / 12 min','Ridge · 1,770 m / 34 min','Village · 3,530 m / 53 min']):text(s,1390,235+i*38,label,'small')
text(s,1390,570,'Regional inset','sub')
rt=lambda p:(1430+(p[0]+800)*.13,620+(1300-p[1])*.13)
for path in DATA['paths']:line(s,path['centreline'],rt,'#977c54',2)
for key,label in [('courtyard','Campus'),('village','Village')]:
 p=DATA['places'][key];x,y=rt((p['east'],p['north']));s.append(f'<circle cx="{x}" cy="{y}" r="5" fill="#7c4f3c"/>');text(s,x+12,y+5,label,'small')
text(s,1390,1290,'The village is outside this estate frame.','small')
text(s,1390,1320,'Forest continues beyond the boundary.','small')
text(s,1390,1350,'Tree symbols are illustrative, not surveyed.','small')
s+=['<path d="M1800 500v-75m0 0-10 18m10-18 10 18" stroke="#4a5441" stroke-width="3" fill="none"/><text x="1792" y="410" class="sub">N</text>','<path d="M80 1460h132m-132-7v14m132-14v14" stroke="#4a5441" stroke-width="3"/><text x="80" y="1500" class="sub">200 m</text>','<text x="370" y="1500" class="small">Exact building / path geometry · Hand-drawn-style symbols · Not a generated aerial view</text>','</svg>']
(OUT/'estate-stylized.svg').write_text('\n'.join(s)+'\n')
s=start(1900,1750,'Ligetvár · Castle and cellar locations','Separate north-up floor layers · Identical scale in every panel · Unassigned space remains unassigned')
room_numbers={'hallway':1,'classroom':2,'library':3,'department':4,'apartment':5,'chamber':6,'holdkor':7}
for floor,title,ox,oy in [(0,'Ground floor · 220 m',50,160),(1,'First floor · 225 m',1000,160),(2,'Second floor · 230 m',50,900),(-1,'Cellars · local floor heights',1000,900)]:
 s.append(f'<rect x="{ox}" y="{oy}" width="850" height="680" rx="8" fill="#e9ddc0" stroke="#b5a487"/>');text(s,ox+20,oy+35,title,'sub')
 ft=lambda p,ox=ox,oy=oy:(ox+35+(p[0]+65)*3,oy+65+(145-p[1])*2.6)
 # Equal x/y scale: 2.6 for both axes.
 ft=lambda p,ox=ox,oy=oy:(ox+55+(p[0]+65)*2.6,oy+65+(145-p[1])*2.6)
 for b in DATA['buildings']:
  if b['id'] not in ['west_wing','east_wing','north_range','entrance_link','clock_tower','service_annex','granary']:continue
  if floor in b['floors']:polygon(s,b['polygon'],ft,'#c9bea2','#73634e',2)
 if floor>=0:polygon(s,DATA['innerGarden'],ft,'#b8be91')
 if floor==0:polygon(s,DATA['courtyard'],ft,'#dac6a4')
 if floor==1:
  lib=next(r for r in DATA['rooms'] if r['id']=='library');polygon(s,lib['polygon'],ft,'#ebe8da','#948a73',1);x,y=ft((30,65));text(s,x,y,'VOID','small')
 for room in DATA['rooms']:
  if room['floor']!=floor:continue
  polygon(s,room['polygon'],ft,'#cba77b','#614b39',2)
  place=DATA['places'][room['id']];x,y=ft((place['east'],place['north']));s.append(f'<circle cx="{x}" cy="{y}" r="15" fill="#f5e9cf" stroke="#735a42"/>');s.append(f'<text x="{x}" y="{y+6}" text-anchor="middle" class="small">{room_numbers[room["id"]]}</text>')
  x,y=ft(room['door']);s.append(f'<circle cx="{x}" cy="{y}" r="4" fill="#376960"/>')
 if floor>=0:
  for bounds in [[[-23,25],[-16,25],[-16,39],[-23,39]],[[-23,85],[-16,85],[-16,99],[-23,99]]]:
   polygon(s,bounds,ft,'#e1d7bd','#897459',1)
   x0,y0=ft(bounds[0]);x1,y1=ft(bounds[2])
   for j in range(1,7):line(s,[[-23,bounds[0][1]+j*2],[-16,bounds[0][1]+j*2]],ft,'#897459',1)
 text(s,ox+20,oy+630,'N ↑','small');s.append(f'<path d="M{ox+110} {oy+625}h52m-52-4v8m52-8v8" stroke="#4a5441" stroke-width="2"/>');text(s,ox+175,oy+630,'20 m','small')
 text(s,ox+20,oy+660,'Dots: specified doors · Shading: assigned scene envelopes','small')
for i,label in enumerate(['1 Entrance gallery','2 Classroom','3 Library','4 Department office','5 Márton’s suite','6 Service chamber · floor 216 m','7 Holdkör · floor 211 m']):text(s,55+(i%4)*455,1635+(i//4)*36,label,'small')
text(s,55,1720,'Location map, not a construction drawing. Circulation and unassigned rooms remain subject to detailed design.','small');s.append('</svg>')
(OUT/'castle-floors-stylized.svg').write_text('\n'.join(s)+'\n')
print(OUT)
