# Image Generation Assets Catalog

> **Status:** Active production reference. Compiled 30 October 2026 from current design authorities, production records and runtime inventory. | **Purpose:** Single source describing every image asset used or planned for generation in Ligetvár, including those already present in the repository. Provides ready positive and negative prompts. Appearance authority remains [Character visual design](design/CHARACTER-VISUALS.md); this document implements it for generation.

All generation must use adult proportions only. Attach current runtime neutral portraits as identity references for characters. Prefer image-edit endpoints when a reference exists. Venice is reserved for fully explicit content. Backgrounds must be empty of people. Existing runtime files are listed; candidates under `assets/generated/` are production history, not automatic runtime replacements.

## Setting, style and negative prompts

**Setting.** Ligetvár is a fictional specialist university campus on a secluded historic estate in the wooded Transdanubian foothills of Hungary. The architecture is inspired by the real Nádasdy Castle at Nádasdladány: nineteenth-century Hungarian Tudor Gothic, not a medieval fortress. Warm ivory plaster, pale limestone dressings, dark slate roofs, stepped gables, mullioned windows, clustered chimneys and one dominant square clock tower at the southeast corner define the look. The main house is a broad U open to the south around a courtyard; converted granary, stables, steward’s house and riding hall share the same materials. A secluded lake (Békás-tó) lies northeast, roughly 15–20 minutes’ walk from the upper suites. Dense oak-hornbeam forest, a ridge to the northwest and a distant village to the south complete the landscape. Subtle modern college fixtures (electric lamps, heating, ordinary institutional furniture) are present but restrained. The default season is early October.

**Style.** All assets are highly detailed non-pixel 2D anime: fine controlled linework, crisp cel shading, adult proportions, restrained texture, slate-blue shadows and amber accents. No photorealism, no 3D renders, no chibi, no pixel art. Portraits are head-and-shoulders with transparent backgrounds, consistent eye line and complete hair crowns. Backgrounds are empty first-person views at seated player eye height, with a natural empty companion seat facing the viewer and open foreground for dialogue. Explicit content (adult only) uses the same drawn-anime style and must lock facial identity, marks and body type to the current neutral portraits.

**Negative prompts.** Always append the shared negative block (and any character- or location-specific negatives) to suppress unwanted results. Core exclusions include pixel art, photorealism, 3D renders, childlike or exaggerated anatomy, distorted faces, extra limbs, text, watermarks, identity drift and (for backgrounds) any people, silhouettes or human reflections. Seasonal and explicit sections add further targeted negatives. If a generator has no separate negative field, append the exclusions as an “Avoid” instruction.

## Shared generation rules

**Style positive (append to all):**
```text
Highly detailed non-pixel 2D anime, fine controlled linework, adult proportions, crisp cel shading, restrained texture, slate-blue shadows and amber accents. Gothic Hungarian castle college atmosphere inspired by Nádasdy Castle Tudor Gothic (warm ivory plaster, pale limestone, dark slate roofs, stepped gables, mullioned windows, one dominant square clock tower). No photorealism, chibi, text or watermark.
```

**Shared negative:**
```text
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery not requested, props not requested, opaque background for portraits, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift
```

For backgrounds add to negative: `person, people, woman, man, girl, boy, human, mannequin, statue, character, silhouette, face, body, hands, human reflection, over-the-shoulder`.

## Character portraits

Runtime portraits live in `assets/characters/<actor>/<expression>-v1.webp`. Use current neutrals as identity masters. Expressions derive from neutrals by editing only facial features. Framing: head-and-shoulders, complete hair crown, both shoulders, consistent eye line, transparent background.

### Rebeka Dorn (existing: all 5 expressions)
- Runtime: `assets/characters/rebeka/{neutral,amused,displeased,vulnerable,affectionate}-v1.webp`
- Identity: 20, 175 cm, tall slender, pale skin, angular face, long straight black hair with one plum streak on anatomical left (viewer right frontally), one beauty mark below left eye, berry lips, high-neck black dress, plain silver choker.

**Positive (append to shared style + portrait framing):**
```text
20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Proud direct gaze. High-neck black dress and broad plain silver choker.
```
**Negative (append to shared):**
```text
mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace
```
Full-body: long-sleeved black midi dress, low-heeled black ankle boots.

### Boglárka Fazekas (existing: all 5)
- Runtime: `assets/characters/boglarka/{neutral,amused,displeased,vulnerable,affectionate}-v1.webp`
- Identity: 19, 150 cm, short softly fuller, round adult face, freckles, warm brown eyes, chestnut hair in loose side braid over anatomical right shoulder (viewer left), moss-green cardigan over cream dress.

**Positive:**
```text
19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Attentive quiet expression. Moss-green cardigan open over a cream dress with a rounded neckline.
```
**Negative:**
```text
childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes
```
Full-body: below-knee cream dress, hip-length moss-green cardigan, flat brown shoes.

### Gréta Váradi (existing: 5, affectionate added 2026-10-30)
- Runtime: `assets/characters/greta/{neutral,amused,displeased,vulnerable,affectionate}-v1.webp`
- Identity: 21, 168 cm, slim athletic, rectangular face, copper hair in practical low ponytail, thin rectangular glasses, fully buttoned white shirt, forest-green vest, graphite skirt.

**Positive:**
```text
21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Alert direct expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest.
```
**Negative:**
```text
pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions
```
Full-body: graphite knee-length skirt, low-heeled black loafers.

### Virág (existing: all 5 + animations)
- Runtime portraits: `assets/characters/virag/{neutral,amused,displeased,vulnerable,affectionate}-v1.webp`
- Identity: 19, 160 cm, petite adult, vivid medium-green pixie cut (override any blue in references), grey-blue eyes, confident teasing, open-collar white blouse, burgundy cardigan, charcoal pleated skirt, dark tights, black ankle boots.
- Animations (reviewed): wink, arm-link, kiss, cuddle loops + posters in `assets/animations/virag/`.

**Positive:**
```text
19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows, small confident smile. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Confident teasing expression and relaxed self-assured posture. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt.
```
**Negative:**
```text
childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories
```
Full-body: dark tights and black ankle boots. Preserve adult proportions.

### Végh Soma (existing: human + transformed)
- Runtime: `assets/characters/soma/neutral-v1.webp` (human), `transformed-v1.webp`.
- Identity: ordinary less conventionally handsome Hungarian assistant, black hair, moustache, slightly stocky with small belly, brown knitted vest over light shirt. Transformed: same face/moustache/clothes, modest weight loss, pointed fangs, glowing red eyes. Small crooked rectangular brass pin on anatomical-left vest chest.

**Human positive:**
```text
Adult Hungarian university assistant, ordinary and less conventionally handsome, slightly stocky with a small belly. Light warm skin, broad adult face, strong dark eyebrows, dark muted eyes, substantial nose, dark moustache with no full beard, short tousled black hair swept loosely to one side. Reserved slightly weary expression. Brown V-neck knitted vest over a light cream collared shirt with open top button. A small, slightly crooked rectangular brass pin on his anatomical-left vest chest (viewer right frontally); plain unlettered metal.
```
**Transformed positive:** same identity + `Only modest weight loss, glowing red irises and pointed upper canine fangs. Preserve recognizability.`
**Negative:**
```text
clean-shaven face, full beard, glamorous model face, lean muscular body, red eyes (for human), fangs (for human), vampire cape, aristocratic costume, occult pin, lettered badge, oversized pin, missing brass pin, monstrous face, pointed ears, wings, blood, gore
```

### Supporting cast (existing neutrals)
**Dr. Farkas Dénes** (`assets/characters/denes/neutral-v1.webp`): Mature man, salt-and-pepper hair greying at temples, short beard, white medical coat over charcoal shirt. Burgundy pen in left breast pocket.
```text
Positive: Mature adult man, visible forehead and eye-area lines, warm light-to-medium skin, broad defined face, dark muted eyes, thick brows. Short swept-back dark hair with conspicuous silver-grey at the temples, short salt-and-pepper beard and moustache. Calm attentive expression. White medical coat with lapels over an open-collar charcoal shirt. One dark burgundy pen clipped into the anatomical-left breast pocket.
Negative: youthful smooth face, clean-shaven face, long beard, entirely black hair, stethoscope, invented insignia, missing burgundy pen
```

**Dr. Sárközi Júlia** (`assets/characters/julia/neutral-v1.webp`): Mature woman, short curly dark hair, navy blazer, grey-green blouse, ginkgo-leaf brooch on left lapel, small round earrings.
```text
Positive: Mature adult woman, warm light skin, oval adult face, defined cheekbones, dark brown eyes, fine arched dark brows, muted rose lips. Short voluminous dark brown-black curly bob around the jaw. Quietly attentive expression. Dark navy blazer over a softly draped grey-green open-neck blouse; small understated round earrings. A small matte silver ginkgo-leaf brooch on her anatomical-left blazer lapel.
Negative: young student face, straight long hair, copper hair, glasses, ornate jewellery, white medical coat, oversized brooch, missing ginkgo brooch
```

**Dr. Kerekes Áron** (`assets/characters/aron/neutral-v1.webp`): Older man late sixties, grey hair, glasses, dark suit, burgundy tie with silver tie bar.
```text
Positive: Older man in his late sixties, light skin, long angular face, lined forehead, deep-set dark eyes, grey eyebrows, clean-shaven. Short silver-grey hair swept back and to the side, thin rectangular metal-framed glasses. Serious direct gaze. Dark charcoal suit jacket, pale collared shirt and burgundy tie. A narrow brushed-silver horizontal tie bar across the lower visible part of his burgundy tie.
Negative: young face, auburn hair, tweed jacket, beard, missing glasses, black hair without grey, friendly exaggerated grin, missing tie bar
```

**Lilla** (`assets/characters/lilla/neutral-v1.webp`): Early thirties, shoulder-length chestnut hair, teal cardigan, pale blouse, three cream floral embroidery motifs at left neckline.
```text
Positive: Adult woman in her early thirties, fair skin, oval face, muted grey-green eyes, soft brown brows, natural pink lips and restrained slight smile. Shoulder-length chestnut-brown hair with soft waves and a loose forehead fringe. Teal knitted cardigan worn open over a pale cream buttoned collared blouse. Three small cream floral embroidery motifs grouped at the anatomical-left cardigan neckline.
Negative: teenage face, dark-blonde hair, plum sweater, blue pixie cut, elaborate hairstyle, exaggerated grin, large floral print, missing cream embroidery
```

Márton (viewpoint) and narrator have no portraits.

**Expression variants (edit only):**
- Amused: restrained character-specific smile, gently raised cheek, slight eyebrow lift.
- Displeased: subtly drawn brows, steady eyes, closed unsmiling mouth. No rage.
- Vulnerable: softened eyes, slight uncertainty in brows, relaxed lips. No crying or infantilization.
- Affectionate: relaxed brows, fond direct eyes, small sincere smile. Fully clothed.

Preserve exact identity, hair, marks, outfit, crop, lighting. Change only facial features.

## Backgrounds

Runtime in `assets/backgrounds/*-anime-v1.webp` (or specific night variants). Title uses `courtyard.jpg`. All are detailed non-pixel anime, gothic castle-college, first-person seated POV with empty companion seat, subtle modern electric fixtures. Autumn default (early October: gold linden and russet oak).

**Shared background positive:**
```text
Empty 16:9 environment, first-person camera at seated player eye height. A clearly empty natural companion chair or bench faces the viewer across a small table or open space. Calm conversation composition. Preserve gothic location mood with subtle modern college electric fixtures. Day scenes remain visibly daytime. No people.
```
**Shared background negative:** (shared + people terms above)

Existing runtime locations and suggested prompts (edit from current or generate matching geography):
- Classroom (day/dusk): pointed stone window arches, autumn daylight or dusk, dark timber desks, chalkboard, electric task lamps. Empty chair across desk.
- Library (day/evening): tall dark wooden bookcases, pointed arches, electric reading lamps, slate-blue light. Seated at shared reading table, empty chair opposite.
- Department office (day/night): dark timber shelves, stone window, folders, closed laptop, meeting table with empty visitor chair.
- Courtyard (day/night): weathered stone arcades, ivy, mature linden tree, restrained electric wall lamps, autumn or night sky. Small table, empty bench facing player.
- Apartment/suite: modest faculty suite, lived-in books, kitchenette side, timber floor, stone window, autumn daylight or night, desk lamp. Small table, empty chair.
- Békás Lake (day/night): reeds, muted lake reflections, weathered path, distant castle stonework. Low picnic table, empty bench opposite. Landing viewpoint.
- Holdkör (night): vaulted stone ceiling, intimate amber electric lamps, small projection screen, dark timber. Conversational table, empty chair. No ritual props.
- Chamber: practical maintenance room, weathered stone, utility pipes, service trench with three anchor fittings, service exit. Worktable with empty folding chair. Daylight + work lamp.
- Hallway/entrance gallery: main doors, stair, noticeboard, central distribution.

Additional concept candidates exist under `assets/generated/geography-concepts-2026-10-28/` (castle exterior, gatehouse, residences, workshop, forest, ridge, village). Use castle geography for spatial constraints: Nádasdy-inspired Tudor Gothic, specific orientations, no people, first-person ground-level views.

Lighting variants: edit base to change only time of day/lighting while preserving exact architecture, furniture, seats and camera.

### Seasonal variations

Current runtime backgrounds are autumn (early October). Generate seasonal variants by editing the base while locking architecture, furniture, companion seats, camera and permanent details. Change only foliage, ground cover, water appearance, lighting temperature and weather effects.

- **Autumn (default, existing):** Gold linden leaves, russet oak, damp paths, chestnuts under appropriate trees, warm ivory/slate/amber palette, Transdanubian oak-hornbeam woodland.
- **Winter:** Bare deciduous branches, dark yew evergreen, intermittent frost or light snow, early darkness, cool blue-grey light, bare ground or light snow cover. No lush green grass. Sparse low lighting on paths.
- **Spring:** Buds, woodland flowers before canopy closure, fresh green emerging, warmer evenings, soft pastel light. No full summer density.
- **Summer:** Dense shade under mature trees, full green canopy, tall reeds at lake margins, insects, possible dusty paths, strong daylight with deep shadows. No autumn colours.

**Seasonal positive append (choose one):**
```text
Winter: bare branches, frost or light snow, cool blue-grey light, early darkness, dark yew. Spring: budding leaves, woodland flowers, soft green emerging, mild light. Summer: dense green canopy, tall reeds, strong daylight, deep shade. Autumn: gold linden, russet oak, damp paths, warm amber light.
```
**Seasonal negative append:** `wrong season foliage, tropical plants, alpine mountains, summer blossom with winter snow, identical flower beds year-round, safe ice path across lake`.

Do not invent a safe lake-ice crossing. Preserve empty first-person framing.

## Location map, building and rooms

Spatial authority is [CASTLE-GEOGRAPHY.md](design/CASTLE-GEOGRAPHY.md) and measured geometry in [docs/design/maps/](design/maps/). Fictional estate inspired by Nádasdy Castle at Nádasdladány (19th-century Hungarian Tudor Gothic): warm ivory plaster, pale limestone dressings, dark slate roofs, stepped gables, mullioned windows, clustered chimneys, one dominant square southeast clock tower. Not a medieval fortress. Modern heating, electricity and institutional fittings are discreet.

**Estate overview:** Managed park ~1.4 km east–west by 1.6 km north–south in Transdanubian wooded foothills. Castle terrace at 220 m elevation; Békás Lake water ~195 m, northeast, secluded (15–20 min walk from suite). Dense oak-hornbeam forest beyond managed lawns; ridge northwest; village >3 km south. Lime avenue to lake. No tropical plants or alpine mountains.

**Main building (U-shaped, open south):** Approximately 110 m east–west × 115 m north–south. West wing: staff offices (level 1) and suites (level 2). East wing: library (two storeys, lake-facing high windows). North range: teaching rooms. Low southern entrance gallery/arcade. Service annex east with cellar chamber. Inner garden between wings; public courtyard south of house (55×40 m, off-centre mature small-leaved linden, restrained flower beds, sheltered bench).

**Key rooms and positions (Hungarian floor counting: ground=0):**
- Entrance gallery / hallway: ground floor, main doors, stair, noticeboard. Central distribution.
- Department office: west wing, first floor. Márton’s daytime hub. Meeting table, shelves, stone window.
- Márton’s suite: west wing, second floor. Bedroom windows face west into trees (cannot see lake). Sitting area + bedroom + bath. Modest faculty apartment with kitchenette side.
- Library: east wing, ground with internal gallery. Tall dark wooden bookcases, pointed arches, electric reading lamps.
- Classroom: north teaching range, ground floor. Former ballroom, large north windows, timber desks, chalkboard.
- Holdkör: converted granary cellar, east-southeast. Vaulted stone, amber lamps, small projection screen. External approach + descending stair.
- Service chamber: beneath service annex. Weathered stone, utility pipes, shallow service trench with three floor anchor fittings, ordinary service exit.
- Other estate: student residences (stable/steward ranges southeast), mystical gymnastics workshop (former riding hall southwest), gatehouse ~300 m south, Békás Lake landing (+650,+350 m), forest boundary, ridge lookout, distant village.

Future backgrounds must respect compass-facing camera, floor/position, fixed landmarks, doors/windows, empty companion seat, season and lighting. Suite west window never shows lake. Courtyard does not adjoin lake. See map generation prompts in `docs/design/maps/MAP-GENERATION.md` for orthographic plans.

## Other assets

**Icons** (`assets/icons/`): 13 PNG planning/UI icons (book, bottles, chair, door, phone, shelf, stats, hearts). Simple clean designs matching gothic-college theme; no text. Generate matching style if expanding.

**Recycling collectibles** (`assets/minigames/recycling/collectibles.webp`): transparent 2x2 atlas of green glass bottle, blue plastic bottle, copper drink can, purple glass bottle. Generated concept; user acceptance open.

**Animations**: Virág moment loops (wink, arm, kiss, cuddle) with separate posters. Derive from identity; preserve face and outfit.

**Reference sheets and full-body**: Venice candidates exist for main women full-body under `assets/generated/venice/`. Use only after identity check against current runtime neutrals. Soma has none.

## Sexual / explicit content

All characters are adults (19+). Explicit content is optional, never gates the investigation or endings, requires mutual choice, invitation, reconsideration/refusal branches and aftermath. Style matches runtime: detailed non-pixel drawn anime, adult proportions, identity locked to current neutral portraits. Venice preferred for fully explicit generation; prefer edit from identity masters. No photorealism. Current intimacy presentation is fade-to-black; planned expansion uses drawn CGs, short moment loops and expression variants.

**Character-specific preferences (from design plans):**
- Rebeka: control of pace/gaze, clothing/choker play, sarcasm drops in private. Key acts: kneeling oral, deep oral, bent-over penetration, riding.
- Boglárka: mutual oral focus, deliberate requests, quiet aftercare, body acceptance. Key acts: undress/exposure, receiving oral/fingering, riding.
- Gréta: practical checks, playful energy, light restraint/spanking where fitting, desk scenes.
- Virág: immediate and repeated explicit, independent of main routes; oral and wall/bench sex.
- Supporting (optional one-offs): Lilla — sensory grounding, slow touch, temperature contrast, mostly clothed, verbal presence. Júlia — experienced quiet instruction, partial professional attire, directing pace.

**Cataloged explicit assets** (from `scripts/venice/catalog.mjs`; candidates, not runtime; generate only with authorization):
- `explicit_rebeka_oral_kneeling`: Kneeling, performing fellatio, eyes looking up, hands behind back, black keyhole dress pulled down to waist, dim gothic apartment or dark lakeside, single streetlamp.
- `explicit_rebeka_oral_explicit`: More explicit deep oral, dress fully pulled down, bare breasts, saliva string, eyes half-lidded, scar on abdomen visible, lakeside night rim light.
- `explicit_rebeka_bent_over`: Bent over low stone wall or bench at dark lakeside, dress hiked, underwear aside, bare ass/thighs, penetration from behind visible, looking back flushed, scar visible.
- `explicit_rebeka_riding`: Straddling viewer, dress/underwear off or around thighs, bare breasts, scar under hand or mouth, hands on viewer chest, half-lidded eyes, apartment or lakeside night.
- `explicit_boglarka_undress`: Cardigan shrugged off, cream dress sliding down, soft full breasts and curves exposed, blushing, watching viewer, quiet library alcove or apartment.
- `explicit_boglarka_oral_on_her`: Lying back on bed/sofa, dress and cardigan off, bare breasts, legs parted, receiving slow oral and fingering, blushing deeply, freckles visible, quiet apartment.
- `explicit_boglarka_riding`: Straddling viewer, dress hiked or off, bare breasts, blushing soft smile, half-lidded eyes, hands on viewer chest, cardigan half on, quiet apartment night.

**Shared explicit positive append:**
```text
masterpiece, best quality, adult woman, mature female, normal adult proportions, explicit sexual content, uncensored, nsfw, crisp cel-shaded anime, matching the supplied portrait identity exactly. Preserve facial geometry, marks, freckles, hair and body type. Change only pose, clothing state and setting. Detailed face, clean lines, two shading bands, no text, no watermark.
```
**Shared explicit negative:** shared negatives + `child, underage, photorealism, extra limbs, distorted anatomy, text, watermark, identity drift, wrong hair colour, missing freckles or marks`.

Historical production also planned Gréta desk oral/bent/after, Virág oral/wall/lake, and triad kiss/oral/riding; these are not in the current catalog.mjs. Identity sheets (clothed → partial → nude) first, then scene CGs. Register only after visual review. See [NSFW-IMPLEMENTATION-PLAN.md](design/NSFW-IMPLEMENTATION-PLAN.md) and [SIDE-EVENTS-NSFW.md](design/SIDE-EVENTS-NSFW.md) for full structure.

## Production notes

- Current runtime coverage: full expression sets for Rebeka, Boglárka, Gréta, Virág; Soma human+transformed; supporting neutrals; 14+ background variants; Virág animations.
- User-approved finals: Soma, Áron, Lilla. Others assistant-reviewed; general style acceptance open.
- Virág hair is now vivid medium green (160 cm); existing blue-haired files are face/cut/costume references only.
- Distinguishing details (Soma brass pin, Dénes pen, Júlia ginkgo brooch, Áron tie bar, Lilla embroidery) are for future generations; not yet in all runtime exports.
- Prefer edit from reviewed neutrals for consistency. Record provenance. Do not treat generated candidates as approved runtime without review.
- Spatial authority: [CASTLE-GEOGRAPHY.md](design/CASTLE-GEOGRAPHY.md). Appearance: [CHARACTER-VISUALS.md](design/CHARACTER-VISUALS.md). Workflow: [ASSET-AGENT-WORKFLOW.md](ASSET-AGENT-WORKFLOW.md).

Update this catalog when new assets are added or identities change. Production prompts must follow the visual authority, not historical files.
