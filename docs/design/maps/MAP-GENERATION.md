# Measured map production specification

This extends [the setting authority](../CASTLE-GEOGRAPHY.md). Geometry is in [estate-plan.json](estate-plan.json); [estate-plan.svg](estate-plan.svg) is a deterministic north-up overview. Coordinates are fictional design measurements, not surveyed facts. Polygon vertices are in metres, east then north; close the final vertex back to the first. Decimal coordinates in path bends are calculated to preserve the original walking distances. Display dimensions to 0.1 m; do not imply survey precision in narration.

## Drawing contract and extents

Use three separate drawings, never compress them into a single inconsistent perspective:

| Drawing | Bounds in local metres | Suggested output | Scale |
| --- | --- | --- | --- |
| Estate overview | east −800…1100; north −500…1300 | 3800 × 3600 px | 2 px/m, or 1:5000 on paper |
| Campus plan | east −260…340; north −340…180 | 2400 × 2080 px | 4 px/m, or 1:1000 |
| Castle floor plates | east −65…100; north −30…145 | 1980 × 2100 px per floor | 12 px/m, or 1:200 |

A regional inset uses east −1000…1500 / north −3400…1600 and shows the entire village road. Do not pull the village into the estate frame. Preserve north-up orientation and equal x/y scale. Pixel conversion: `pixelX=(east−westBound)*pixelsPerMetre`, `pixelY=(northBound−north)*pixelsPerMetre`. Print scale assumes deliberate physical output sizing; pixels alone do not establish paper scale. Include north arrow, metric scale bar, legend, drawing title and revision. Add labels as vector text after image generation, preserving Hungarian accents; use numbered markers if text is too dense.

## Estate geometry and terrain

Estate boundary: rectangle east −700…1000, north −400…1200, approximately 272 ha. The managed-park polygon in JSON is smaller and irregular; forest occupies the remaining land, continuing beyond all estate edges except cleared village/building areas. The village square is (300,−3100), outside the boundary. The gate stands on the south approach at (0,−300); the boundary crossing is farther south. Campus buildings do not imply the entire woodland estate is cultivated garden.

The lake's explicit irregular shoreline is approximately 320 × 180 m, east 640…960 / north 330…510. Southwest landing centre is (650,350), 8 × 8 m. Water level 195 m; bank at 196 m. Maximum designed depth 4.5 m, with shallow planted margins. The boathouse footprint is east 675…687 / north 315…323, south of the lake; a short timber launch apron extends to the nearby waterline. Reeds occupy the eastern bay, east 895…945 / north 390…445, clipped to water/shore. Do not fill the open southwestern view with reeds. Do not place an island or bridge across the lake: neither is part of this plan.

Brook inlet vertices: (760,1200) → (740,900) → (780,700) → (825,510); outlet: (925,370) → (1030,250) → (1100,100). Inlet channel falls from about 238 m at the northern boundary to 195 m at the lake; outlet falls toward 188 m beyond the east boundary. Typical visible channel width 1.5–2 m, with wet-season variation. The inlet enters the north shore and outlet leaves southeast. Contours in JSON are open schematic guide lines at 200/220/240/280/320 m; they are not a complete interpolated terrain mesh. Exact spot heights govern named places. Add minor contours only by a terrain interpolation that honours those heights and drainage; do not invent a 220 m contour running through 195 m water.

For forest structure use irregular canopy masses, not identical tree stamps on a grid. The lime avenue follows the courtyard–lake route, with trees roughly 10 m apart and 4 m away from the centreline where terrain permits. Keep clear 3 m around pedestrian doors and 6 m around service vehicle access. General old-tree canopy diameters 10–18 m; woodland mixed heights 15–25 m. These are drawing parameters rather than claims that every tree has been individually surveyed. Do not invent exact trunk locations that later block a specified doorway.

## Campus building schedule

All rectangles are given as west/east, south/north bounds. Heights are above local surrounding ground; the JSON supplies eaves and roof-ridge heights. Typical load-bearing outer walls 0.6 m in the castle, 0.45 m in estate buildings; internal partitions 0.15–0.25 m. These are design defaults and must be subtracted when deriving clear internal sizes from outer footprints.

| Building | Bounds: east; north | Outer size | Use |
| --- | --- | --- | --- |
| West wing | −55…−15; 20…100 | 40 × 80 m | Staff office level1, suites level2, support rooms level0 |
| East wing | 15…55; 20…100 | 40 × 80 m | Library, reading rooms, associated services |
| North range | −55…55; 100…135 | 110 × 35 m | Teaching rooms and common rooms |
| Entrance link | −15…15; 20…45 | 30 × 25 m | Ground-level entrance gallery, low roof; north side opens into inner garden |
| Clock tower | 45…59; 20…34 | 14 × 14 m | Southeast corner silhouette; 36 m roof peak |
| Service annex | 55…90; 0…30 | 35 × 30 m | Service stairs and cellar chamber; low working facade |
| Granary | 120…160; −70…−30 | 40 × 40 m | Holdkör in cellar, university film/media rooms above |
| Stable residences | 170…250; −220…−180 | 80 × 40 m | Two-storey student lodging |
| Steward residence | 270…310; −250…−220 | 40 × 30 m | Additional student lodging |
| Riding hall | −210…−150; −118…−82 | 60 × 36 m | Mystical gymnastics, uninterrupted central exercise floor |
| Gatehouse | −25…−7; −310…−290 | 18 × 20 m | Gate staff and arrival control, western side of approach |
| Boathouse | 675…687; 315…323 | 12 × 8 m | Boat storage; no student dormitory |

The principal main-house ranges span 110 × 115 m; the tower and service annex extend east beyond that core. This refines the preceding approximate 110 × 85 m description so all existing room anchors fit within actual footprints. A 30 × 55 m inner garden lies east −15…15 / north45…100, between the wings behind the low entrance link. It is separate from the 55 × 40 m story courtyard at the origin, south of the house. The public courtyard's southern arcade is a 3 m deep open walkway along north −20…−17, interrupted by a centred 6 m opening. Its east/west sides use low planting beds, not enclosing fortress walls. Linden trunk at (−14,5), approximate canopy radius 8 m; sheltered bench at (−20,−8), facing east; central entry axis x=0 remains clear. Future art must distinguish courtyard, inner garden and open park.

## Castle floor plates and door schedule

The room polygons in JSON give scene-room envelopes inside their parent buildings. Unassigned areas remain circulation, support rooms and future design space; do not randomly allocate named character bedrooms. Library void overrides ordinary first-floor subdivisions in its footprint. Floors above the low entrance link are roof space, not an invisible bridge between east and west suites; upper-level cross-wing movement uses the north range.

| Scene room | Floor / envelope | Public or room door | Interior and fixed view |
| --- | --- | --- | --- |
| Entrance gallery | 0; east −12…12 / north22…42 | Main exterior door (0,20), clear width2.4 m | 5.5 m ceiling; ground circulation west/east; principal stair in west wing |
| Department | 1; east −37…−23 / north39…51 | (−23,45), width1.2 m | 14 × 12 m envelope; 4 m ceiling; staff corridor east of door |
| Suite | 2; east −51…−19 / north60…82 | (−19,70), width1.0 m | 32 × 22 m envelope incl sitting room, bedroom, bath and circulation; 3.8 m ceiling |
| Library | 0; east26…54 / north35…85 | (26,55), width1.8 m | 28 × 50 m envelope; 9 m high; narrow internal first-floor gallery; no ordinary floor slabs through reading room |
| Classroom | 0; east20…50 / north101…125 | (20,110), width1.5 m | 30 × 24 m envelope; 5.5 m ceiling; north windows |
| Holdkör | −1; east125…155 / north−65…−35 | Cellar room door (125,−50), width1.5 m | 30 × 30 m envelope; 3.2 m ceiling; screening wall east, companion seats west of screen |
| Chamber | −1; east65…85 / north5…25 | Service exit stair begins at (85,15), width1.2 m | 20 × 20 m envelope; 3 m ceiling; beneath service annex adjoining east wing |

The chamber was previously described loosely as beneath the east wing although its anchor is east of that wing. Its precise location is now beneath the attached service annex. This is a geometry clarification, not a new scene relocation.

Principal west stair envelope east−23…−16 / north25…39; flights connect gallery to first and second floors. Floor elevations at west wing: 220,225,230 m. Use two flights per storey, about 30 risers × 0.167 m; 1.8 m clear stair width, 0.28 m tread depth and intermediate landings. Emergency stair at west-wing north end east−23…−16 / north85…99. East library/service stair sits in east15…25 / north35…49. Granary exterior entrance (120,−50) leads to vestibule and internal stair before the cellar room door. Its local ground is216 m and cellar floor211 m. Service-annex ground220 m, chamber floor216 m. Do not put cellar and outside paving on the same elevation.

Suite subdivision envelopes: sitting area east−35…−19 / north60…82; bedroom east−51…−35 / north68…82; bath east−51…−41 / north60…68; connecting passage east−41…−35 / north60…68. Internal bedroom door at(−35,72), bath door at(−41,64). Bedroom west-facing windows must be on the exterior west-wing wall at x=−55, so use a 4 m deep window/alcove zone between room envelope x=−51 and facade x=−55; do not treat a room-envelope edge as the facade. Future detailed construction drawings must resolve thicknesses/alcoves explicitly. Bed against the north internal wall; sitting-room companion chair near the table; keep the entrance route clear. Lake is northeast and never appears in these west-facing windows.

## Paths, widths and exact distances

Use JSON `paths[].centreline` coordinates for outdoor route drawing; each polyline's summed Euclidean segment lengths equals its canonical route distance within 0.01 m. Curves may be fitted only if their arc length is kept equal, otherwise regenerate the distance/travel table deliberately. Interior routes are governed by floor/stair diagrams and `geography.ts`; do not draw an outside shortcut between their room centres. Route-centre anchors sometimes stand for a small arrival zone rather than a building threshold: castle courtyard and granary approach drawings need a final entrance inset.

Widths: main south approach6 m; residence approach4 m; riding-hall path3 m; lime/lake walk2.5 m; eastern granary/lake path2 m; north forest path2 m; ridge trail1.5 m; southern forest road5 m. Width does not imply vehicle permission on every path. The forest-to-ridge path is steep and winding,1050 m/22 min, not a straight climb. The village road is3200 m from gate, including bends; village travel is53 min from courtyard. Lighting: court and building approaches use warm lamps; lake walk has sparse low lighting near its upper section, woodland/ridge trails unlit. A nighttime journey needs a credible lamp/phone light or sufficient moonlight, never artificial daylight.

## Generation prompts

Geometry should be rendered first from JSON/SVG, then treated as a locked reference for decorative image generation. Text-only generation cannot guarantee metric accuracy. Use output as an illustration until an overlay check verifies the positions, scale, shoreline and route lengths. Negative prompts reduce drift but cannot enforce coordinates. If the provider offers no separate negative field, append the exclusions to the prompt; do not invent unsupported numerical weight syntax.

**Positive prompt — estate map**

> Create an elegant north-up orthographic illustrated estate map of fictional Ligetvár university in the wooded Transdanubian foothills of Hungary. Follow the attached measured reference exactly; preserve every building footprint, lake shoreline, path junction and relative distance. Nádasdy Castle at Nádasdladány is the single architectural inspiration: ivory plaster, pale limestone, dark slate, asymmetrical Tudor Gothic wings, southeast square clock tower. The castle stands on a terrace, the secluded lake northeast and25 m lower, dense deciduous forest beyond the irregular managed park, wooded ridge northwest, gate and distant village road south. Draw converted granary, stable residences, steward house, riding hall and small boathouse at their measured positions. Crisp cartographic lines, restrained botanical detail, pale parchment, readable hierarchy, top-down projection, metric scale bar, separate legend area. Keep building and water geometry locked to the reference. Leave numbered-label spaces for later vector lettering. Use early October vegetation without snow.

**Negative prompt — estate map**

> perspective view, isometric projection, tilted camera, fisheye, nonuniform scale, stretched distances, rotated north, mirrored plan, moved buildings, moved lake, lake at courtyard steps, oversized castle, duplicated castle, duplicate clock tower, medieval fortress, enormous battlements, moat, drawbridge, invented lake bridge, island, waterfalls uphill, road through water, paths through buildings, tunnels to lake, forest replaced by city, village inside campus, tropical plants, palm trees, uniform conifer forest, identical tree grid, summer blossom with winter snow, fantasy mountains behind every building, French palace domes, unrelated architectural styles, extra named locations, ruins not specified, people, portrait characters, cars covering geometry, illegible labels, misspelled Hungarian names, fake coordinates, conflicting scale bars, ornamental border covering map, excessive fog, heavy shadows hiding paths, photorealistic aerial perspective

**Positive prompt — castle floor plan**

> Draw one strictly orthographic architectural floor plate at a time from the measured polygons and door schedule. North up, metric scale, restrained ivory-and-charcoal technical linework with pale room fills. Preserve outer footprint, assigned room envelopes, west stairs, library double-height void, low entrance link roof and service annex. Show walls, doors with swing arcs, windows, stairs with up/down arrows, room numbers, floor elevation and separate scale bar. Ground, first, second and cellar are separate sheets. Represent unassigned space without inventing new story rooms. No perspective architecture or characters. Apply Tudor Gothic details only where they do not change geometry.

**Negative prompt — floor plans**

> stacked overlapping floors, merged cellar and ground floor, stairs ending in walls, stairs outside footprint, doors into void, doorway blocked by furniture, first-floor room inside library void, upstairs bridge over low entrance roof, corridor through private bedroom, bedroom window facing lake, windows on internal walls, omitted emergency exit, exaggerated wall thickness, inconsistent scale, arbitrary room enlargement, mislabeled floor elevation, invented secret tunnel, decorative furniture obscuring circulation, isometric cutaway, 3D perspective, extra towers, extra room names, reversed compass

**Machine-readable prompt settings** are in `map-prompts.json`. Suggested image parameters are recommendations, not claims about any provider's accepted API. For seasonal variants lock geometry and camera; change only foliage, ground, water/ice appearance and lighting. Do not create a safe lake-ice route by drawing one.

## Acceptance overlay

Check four corners of each building against geometry, all room anchors inside parent polygons, water on its correct bank/elevation, north arrow, equal-axis scale, doorway access, exterior paths clear of footprints, exact line lengths and the suite→lake17-minute route. Render labels after geometry; use Hungarian names exactly. Reject any image whose attractive composition moves the lake closer to the castle. The SVG is a measured overview, not an approved final game asset or full construction plan. Narrative travel corrections and future art remain tracked separately.
