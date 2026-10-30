# Image Generation Assets Catalog

> **Status:** Active production reference. Compiled 30 October 2026 from current design authorities, production records and runtime inventory. | **Purpose:** Single source describing every image asset used or planned for generation in Ligetvár, including those already present in the repository. Provides ready positive and negative prompts. Appearance authority remains [Character visual design](design/CHARACTER-VISUALS.md); this document implements it for generation.

All generation must use adult proportions only. Attach current runtime neutral portraits as identity references for characters. Prefer image-edit endpoints when a reference exists. Venice is reserved for fully explicit content. Backgrounds must be empty of people. Existing runtime files are listed; candidates under `assets/generated/` are production history, not automatic runtime replacements.

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

Runtime in `assets/backgrounds/*-anime-v1.webp` (or specific night variants). Title uses `courtyard.jpg`. All are detailed non-pixel anime, gothic castle-college, first-person seated POV with empty companion seat, subtle modern electric fixtures. Autumn default.

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

## Other assets

**Icons** (`assets/icons/`): 13 PNG planning/UI icons (book, bottles, chair, door, phone, shelf, stats, hearts). Simple clean designs matching gothic-college theme; no text. Generate matching style if expanding.

**Recycling collectibles** (`assets/minigames/recycling/collectibles.webp`): transparent 2x2 atlas of green glass bottle, blue plastic bottle, copper drink can, purple glass bottle. Generated concept; user acceptance open.

**Animations**: Virág moment loops (wink, arm, kiss, cuddle) with separate posters. Derive from identity; preserve face and outfit.

**Reference sheets and full-body**: Venice candidates exist for main women full-body under `assets/generated/venice/`. Use only after identity check against current runtime neutrals. Soma has none.

**Explicit assets** (adult only, Venice preferred, review required): Production catalog includes kneeling oral, explicit oral, bent-over, riding variants for Rebeka; undress, oral-on-her, riding for Boglárka and others. Always preserve exact facial identity, marks and proportions from neutral masters. Fully clothed ordinary portraits otherwise. See `scripts/venice/catalog.mjs` for historical explicit prompts; do not generate without explicit authorization.

## Production notes

- Current runtime coverage: full expression sets for Rebeka, Boglárka, Gréta, Virág; Soma human+transformed; supporting neutrals; 14+ background variants; Virág animations.
- User-approved finals: Soma, Áron, Lilla. Others assistant-reviewed; general style acceptance open.
- Virág hair is now vivid medium green (160 cm); existing blue-haired files are face/cut/costume references only.
- Distinguishing details (Soma brass pin, Dénes pen, Júlia ginkgo brooch, Áron tie bar, Lilla embroidery) are for future generations; not yet in all runtime exports.
- Prefer edit from reviewed neutrals for consistency. Record provenance. Do not treat generated candidates as approved runtime without review.
- Spatial authority: [CASTLE-GEOGRAPHY.md](design/CASTLE-GEOGRAPHY.md). Appearance: [CHARACTER-VISUALS.md](design/CHARACTER-VISUALS.md). Workflow: [ASSET-AGENT-WORKFLOW.md](ASSET-AGENT-WORKFLOW.md).

Update this catalog when new assets are added or identities change. Production prompts must follow the visual authority, not historical files.
