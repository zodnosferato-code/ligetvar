# Ligetvár estate geography

Spatial authority, 28 October 2026. The user confirmed a secluded estate lake 15–20 minutes from Márton’s upstairs suite, a larger campus using several historic estate buildings, and deep forest with the village farther away. These supersede any contrary proximity implied by older prose or map icons. Architecture, exact measurements and ecology below are the implemented authoring baseline selected for this task; further user refinements remain welcome. Existing images have not been regenerated or certified against this plan.

## Architectural identity

Use the Nádasdy Castle at Nádasdladány as the single principal architectural reference: nineteenth-century Hungarian historicist Tudor Gothic, not a medieval defensive fortress. The real building's 1873–1876 construction, asymmetrical composition, library and landscape garden ground the choice. Sources: [heritage programme history](https://oroksegnapok.gov.hu/helyszin/1061), [Nádasdy Foundation](https://nadasdyalapitvany.hu/orokseg/nadasdy-kastely/), [castle and lake park](https://oroksegnapok.gov.hu/helyszin/2370). Ligetvár's footprint, terrain, room assignments and distances are fictional, not claims about Nádasdladány.

Keep warm ivory plaster, pale limestone dressings, dark slate roofs, stepped gables, Tudor arches, tall mullioned windows, clustered chimneys and one dominant square clock tower at the southeast corner. The main house forms a broad U open south around the court; a low southern arcade frames the entrance without making a fortress wall. West wing: staff offices and suites. East wing: library and service spaces. North range: teaching rooms. The main range is approximately 110 m east–west and 115 m north–south, with ground, first and second floors plus local cellar spaces. The library occupies two storeys; no bedroom sits immediately over its gallery. Wood panelling, parquet, plaster vaults and restrained heraldry recur indoors. Modern heating, electricity, fire exits and institutional fittings are discreet but real. The style survives conversion; do not add unrelated French palace domes or fantasy spires between views.

The estate supports a residential specialist university campus, not a mass city university squeezed into one house. Converted granary, stables, steward's house and riding hall share the same plaster, stone and roof palette with simpler working facades. Teaching, lodging and social life require outdoor walks between buildings.

## Orientation, terrain and scale

North is always up. Coordinates in `src/game/content/geography.ts` are metres east/north from the courtyard centre; elevation is metres above a fictional sea datum. Indoor coordinates identify room centres, not surveyed wall boundaries. Floors are counted Hungarian-style: ground = 0, first = 1, second = 2. Path lengths include bends and stairs; vertical movement takes time even where a plan looks close.

The castle terrace is at 220 m; Békás Lake water is approximately 195 m. Ground descends northeast toward the lake; the ridge rises northwest to 325 m. A small spring-fed brook enters the lake from the north and drains southeast through a controlled outlet. No waterfall climbs toward the castle. The managed estate extends roughly 1.4 km east–west by 1.6 km north–south, grading into a much larger forest; this is not the real reference castle's park acreage.

| Place | Position / physical identity | Scene use and continuity |
| --- | --- | --- |
| Courtyard | Origin; sheltered court south of main house, roughly 55 × 40 m | Linden off centre, paving, beds, arcade bench. Outdoor scene; library through entrance gallery, never through a magic adjoining doorway. |
| Entrance gallery / hallway | 35 m north; ground floor | Main doors, stair, noticeboard; central indoor distribution point. |
| Department office | West wing, first floor | Márton's daytime hub. Suite reached up another flight and along staff corridor. |
| Márton's suite | West wing, second floor | Bedroom window faces west into trees; it cannot overlook the northeastern lake. Private sitting area and bedroom belong to the same staff suite. |
| Library | East wing, ground floor with internal gallery | Lake-facing high windows, dark wood shelves; east-side trees partly obstruct distant water. Library closing time still applies. |
| Classroom | North teaching range, ground floor | Former ballroom adapted into seminar/workshop teaching rooms; large north windows. |
| Holdkör | Converted granary east-southeast of courtyard; cellar | External door, vestibule and descending stair. High cellar windows show ground-level light, never panoramic lake views. Screening exit must be kept accessible. |
| Service chamber | Beneath attached east service annex | Access via library-side service stair; independent eastern service exit. Local cellar connections do not extend under the park or to the lake. |
| Residences | Southeast, in stable/steward ranges | Student homes are distinct from Márton's staff suite; these are planned scene settings, not new registered backgrounds. |
| Mystical gymnastics workshop | Southwest former riding hall | Tall roof, sprung floor and clear exercise space; four minutes from court. Ordinary classroom art is not proof of this hall's appearance. |
| Gatehouse | 300 m south of courtyard | Arrival court, delivery access and road out. No direct village street visible behind the main castle. |
| Békás Lake | Landing at (+650,+350), 196 m bank elevation | Irregular water about 320 × 180 m, extending east/north from the southwest landing. Main scenes use landing bench; reed bay, boathouse and far shore are different positions. |
| Forest boundary | 600 m north, uphill | Stile and woodland path beyond managed lawns; mature forest surrounds the estate and southern road too. |
| Ridge lookout | Northwest, about 1 km beyond forest boundary by trail | Small clearing amid mature trees, broken view toward castle; no uninterrupted view from every point. |
| Village | More than 3 km south along bending forest road | Not a five-minute errand; settlement is separated from campus by woodland. |

## Canonical routes and elapsed time

`walkingRoute()` calculates the fastest ordinary pedestrian route over measured path edges. These are dry-weather conversational walking estimates, including door/stair allowances, not running records. Add approximately 25–50% for snow, mud, darkness without good lighting, or a slower companion; stopping to talk adds actual time. Distances are usable route lengths, never straight-line distances. The calculator does not model locks, mobility constraints or temporary closures; authors must account for these explicitly.

| Route | Distance | Normal walk |
| --- | ---: | ---: |
| Suite → department office | 55 m, one floor down | 2 min |
| Suite → courtyard | 165 m through office-side corridor, gallery and stair | 5 min |
| Courtyard → library | 105 m via gallery | 2 min |
| Courtyard → classroom | 140 m via gallery | 3 min |
| Courtyard → Holdkör | 180 m including cellar approach | 4 min |
| Courtyard → workshop | 240 m | 4 min |
| Courtyard → residences | 590 m via arrival court | 9 min |
| Courtyard → lake landing | 850 m on winding lime walk | 12 min |
| Suite → lake landing | 1,015 m | 17 min; use 15–20 min in natural narration |
| Lake landing → Holdkör | 780 m via eastern granary path | 12 min |
| Courtyard → forest boundary | 720 m | 12 min |
| Courtyard → ridge lookout | 1,770 m | 34 min |
| Courtyard → village square | 3,530 m | 53 min |

The suite→courtyard route passes the department corridor, not through Márton's office itself. The lake path starts at the courtyard's east passage, bends through the lime avenue, passes the eastern-path junction and descends to the landing. Its 850 m length is longer than the roughly 738 m straight-line displacement. Holdkör joins this route via a separate eastern path. A full lake→Holdkör→lake date adds about 24 minutes of walking before the time spent indoors. Gréta's lake→courtyard→lake-side goodbye likewise needs an extended walk; the path junction can be a farewell destination without claiming the full lake has been reached.

## Landscape, flora and fauna

The fictional estate sits in Transdanubian wooded foothills. Managed court beds and clipped yew frame a large small-leaved linden; the approach uses lime trees, with occasional planted horse chestnuts and plane trees near buildings. Old specimen trees belong to the cultivated park, not a tropical forest. Open grass gives way to oak and hornbeam; beech favours cooler north-facing slopes. Hazel, hawthorn, dog rose and blackthorn form edges. Bracken, ferns, moss and leaf litter occur in shady damp patches; summer grass should not glow lush green through prolonged dry weather.

Lake margins carry reeds, sedges, willow and alder. Keep the landing open enough for two people to sit and see water; reed beds dominate the secluded eastern bay. Frogs are heard mainly on warmer spring and summer evenings, dragonflies appear in warm months, and ducks, moorhens and occasional herons use the water. No chorus of active frogs on a freezing December night. Lake swimming and winter ice safety are not assumed; there is no approved all-season shortcut across ice.

Woodland wildlife includes roe deer, wild boar signs, foxes, squirrels, hedgehogs, woodpeckers, tawny owls and small insect-eating bats. These are plausible setting choices, not a species survey of the real castle. Deer usually keep distance; boar are not routine friendly courtyard pets. Bats emerge around dusk in warmer seasons and do not swarm every winter exterior. Owl calls, falling acorns and movement in reeds can support ambiguity without every animal becoming supernatural evidence.

October: yellow lime leaves, russet oak, damp paths and chestnuts beneath appropriate trees. Winter: bare deciduous branches, dark yew, intermittent frost/snow and early darkness. Spring: buds, woodland flowers before canopy closure, warmer-evening frog calls. Summer: dense shade, reeds, insects and possible dusty paths. Garden roses require a plausible flowering season; no identical flower beds year-round. Wind and water sounds carry unevenly through trees; private lake conversations cannot be overheard from a closed castle bedroom 1 km away.

## Story and artwork contract

Every scene brief must identify the physical place, floor, arrival route, elapsed walking time, carried props, weather, sightline and exit. A background ID is a broad setting, not permission to teleport. A stage change is presentation; it does not by itself narrate a journey. Write an arrival beat or an explicit elapsed-time bridge for distant moves. Preserve the weekly activity-slot system: minutes within a date do not consume extra weeks or grant extra meetings. Do not add a minute-by-minute simulation merely to enforce this document.

Future image briefs must include compass-facing camera, room/floor or path position, fixed silhouette/landmarks, doors/windows, companion seat, season, weather and lighting. At the lake landing looking southwest the distant castle is uphill and partly screened by trees; from the suite's west window no lake is visible. Do not render the estate lake against the courtyard steps. Keep people out of clean location plates. Regeneration is a later task; existing raster files and hotspot positions remain pending spatial review.

## Current scene audit and limits

Inspected active location registry, map coordinates, shared date staging, Rebeka's date English text and Boglárka's staged suite visit. Current CastleMap positions are schematic menu placements, not geographic coordinates or a floor plan. Nine registered background locations are assigned above; new estate places do not yet have runtime scenes or art.

Rebeka's `date_return_0` currently returns from Holdkör to the lake without stating the 12-minute walk; generic date staging also elides travel in Gréta's lake/courtyard movement. These are identified revision targets, not claimed corrected dialogue. Boglárka's courtyard/library/suite sequence must preserve the different floors and the suite's ownership. This batch establishes the spatial contract and tested route calculator; a complete assembled-scene, bilingual and CLI travel-continuity pass remains pending. No claim is made that a five-minute lake/bedroom line was found: that was the user's example of a prohibited contradiction.

## Measured drawing extension — 28 October 2026

[Map specification and positive/negative prompts](maps/MAP-GENERATION.md) provide exact footprint/room envelopes, doors, stair levels, shoreline, route centre lines, terrain guides and drawing scales. [JSON geometry](maps/estate-plan.json) and its [north-up SVG](maps/estate-plan.svg) are the measured reference. The larger main-house north–south dimension and attached service-annex placement clarify the earlier approximate footprint; room anchors and canonical walking times remain unchanged.

## Hungarian world expansion — 29 October 2026

[Hungarian world and folklore](HUNGARIAN-WORLD.md) adds the user-requested cultural and historical layer: a clearly fictional estate chronology, sourced real influences and character-specific memories. It preserves this document’s existing authority. Two optional bilingual gatherings introduce these details; the broader foundation is not all runtime dialogue. No folklore-based clue, new magical power, ancestry retcon or geometry change is implied.
