# Image Generation Assets Catalog

> **Status:** Active production reference. Compiled 30 October 2026. | **Purpose:** Single self-contained source describing every image asset used or planned for generation in Ligetvár. Every asset has its own detailed description, ID, positive and negative prompts. No external file references.

All generation must use adult proportions only. Attach current runtime neutral portraits as identity references for characters. Prefer image-edit endpoints when a reference exists. Venice is reserved for fully explicit content. Backgrounds must be empty of people. Existing runtime files are noted; all planned assets are listed regardless of current presence.

## Setting, style and negative prompts

**Setting.** Ligetvár is a fictional specialist university campus on a secluded historic estate in the wooded Transdanubian foothills of Hungary. Architecture is inspired by the real Nádasdy Castle at Nádasdladány: nineteenth-century Hungarian Tudor Gothic, not a medieval fortress. Warm ivory plaster, pale limestone dressings, dark slate roofs, stepped gables, mullioned windows, clustered chimneys and one dominant square clock tower at the southeast corner. The main house is a broad U open to the south around a courtyard; converted granary, stables, steward’s house and riding hall share the same materials. A secluded lake (Békás-tó) lies northeast, roughly 15–20 minutes’ walk from the upper suites. Dense oak-hornbeam forest, a ridge to the northwest and a distant village to the south complete the landscape. Subtle modern college fixtures (electric lamps, heating, ordinary institutional furniture) are present but restrained. Default season is early October (gold linden, russet oak).

**Style.** All assets are highly detailed non-pixel 2D anime: fine controlled linework, crisp cel shading, adult proportions, restrained texture, slate-blue shadows and amber accents. No photorealism, no 3D renders, no chibi, no pixel art. Portraits are head-and-shoulders with transparent backgrounds, consistent eye line and complete hair crowns. Backgrounds are empty first-person views at seated player eye height (~1.2–1.65 m), with a natural empty companion seat facing the viewer and open foreground for dialogue. Explicit content (adult only) uses the same drawn-anime style and must lock facial identity, marks and body type to the current neutral portraits.

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

Each expression is listed separately with its own full description. Runtime portraits use assets/characters/<actor>/<expression>-v1.webp. Use neutrals as identity masters. Expressions edit only facial features. Framing: head-and-shoulders, complete hair crown, both shoulders, consistent eye line, transparent background.

### Rebeka Dorn
Identity summary: 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face, long straight black hair with one plum streak on anatomical left (viewer right frontally), one beauty mark below left eye, berry lips, high-neck black dress, plain silver choker. Full-body clothing: long-sleeved black midi dress, low-heeled black ankle boots.

- **rebeka_neutral** (existing runtime): Neutral attentive expression with proud direct gaze. Description: Head-and-shoulders portrait of Rebeka looking toward the viewer with a calm, confident expression. Preserve exact facial geometry, the plum streak on viewer right, and the beauty mark under the left eye. Soft even lighting, transparent background. Positive: 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Proud direct gaze. High-neck black dress and broad plain silver choker. Negative: mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace.

- **rebeka_amused** (existing runtime): Restrained sardonic smile. Description: Edit from neutral. Slight smile that is character-specific and restrained, gently raised cheek, slight eyebrow lift. Eyes remain recognizably the same. Do not change hair, clothing, crop or lighting. Positive: same identity as neutral + character-specific restrained amused smile, gently raised cheek and slight eyebrow lift; eyes remain recognizably the same. Negative: same as neutral + exaggerated grin, open-mouthed laugh, closed eyes.

- **rebeka_displeased** (existing runtime): Subtly drawn brows, steady eyes, closed unsmiling mouth. Description: Edit from neutral. Clear restrained displeasure without rage caricature. Preserve identity completely. Positive: same identity + clear restrained displeased expression: subtly drawn brows, steady eyes, closed unsmiling mouth. No rage caricature. Negative: same as neutral + rage face, shouting mouth, tears, open mouth.

- **rebeka_vulnerable** (existing runtime): Softened eyes, slight uncertainty in brows, relaxed lips. Description: Edit from neutral. Quiet vulnerable expression without crying or infantilization. Preserve adult features. Positive: same identity + quiet vulnerable expression: softened eyes, slight uncertainty in brows, relaxed lips. No crying, no exaggerated blush or infantilization. Negative: same as neutral + crying, tears, exaggerated blush, childlike proportions.

- **rebeka_affectionate** (existing runtime): Relaxed brows, fond direct eyes, small sincere smile. Description: Edit from neutral. Warm affectionate expression, fully clothed ordinary portrait. No seductive posing. Positive: same identity + warm affectionate expression: relaxed brows, fond direct eyes and a small sincere smile. Fully clothed ordinary portrait; no seductive posing. Negative: same as neutral + seductive pose, exposed clothing, exaggerated smile.

- **rebeka_fullbody** (planned): Clothed full-body standing pose. Description: Full body from complete hair crown to soles of shoes, natural standing pose, hands relaxed and visible, comfortable margin around all limbs. Preserve tall slender proportions and exact identity marks. Positive: same identity + full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, long-sleeved black midi dress, low-heeled black ankle boots. Negative: same as neutral + cropped feet, wrong proportions, chibi, extra limbs.

### Boglárka Fazekas
Identity summary: 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face, dense freckles, warm brown eyes, chestnut hair in loose side braid over anatomical right shoulder (viewer left), moss-green cardigan over cream dress. Full-body: below-knee cream dress, hip-length moss-green cardigan, flat brown shoes.

- **boglarka_neutral** (existing runtime): Quiet attentive expression. Description: Head-and-shoulders portrait with quietly observant gaze and understated warmth. Preserve freckles and braid on viewer left. Positive: 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Attentive quiet expression. Moss-green cardigan open over a cream dress with a rounded neckline. Negative: childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes.

- **boglarka_amused** (existing runtime): Dry understated smile. Description: Edit from neutral. Restrained amused expression. Positive: same identity + restrained amused smile, gently raised cheek, slight eyebrow lift. Negative: same as neutral + exaggerated grin.

- **boglarka_displeased** (existing runtime): Subtly drawn brows, steady eyes, closed unsmiling mouth. Description: Edit from neutral. Restrained displeasure. Positive: same identity + clear restrained displeased expression. Negative: same as neutral + rage face.

- **boglarka_vulnerable** (existing runtime): Softened eyes, slight uncertainty in brows. Description: Edit from neutral. Quiet vulnerable expression. Positive: same identity + quiet vulnerable expression. Negative: same as neutral + crying, infantilization.

- **boglarka_affectionate** (existing runtime): Fond direct eyes, small sincere smile. Description: Edit from neutral. Warm affectionate expression. Positive: same identity + warm affectionate expression. Negative: same as neutral + seductive pose.

- **boglarka_fullbody** (planned): Clothed full-body. Description: Full body preserving short adult stature and softly fuller silhouette. Positive: same identity + full body, below-knee cream dress, hip-length moss-green cardigan, flat brown shoes. Negative: same as neutral + tall proportions, thin build.

### Gréta Váradi
Identity summary: 21-year-old adult woman, 168 cm, slim athletic silhouette, rectangular adult face, copper hair in practical low ponytail, thin rectangular glasses, fully buttoned white shirt, forest-green vest, graphite skirt. Full-body: graphite knee-length skirt, low-heeled black loafers.

- **greta_neutral** (existing runtime): Alert direct expression. Description: Head-and-shoulders portrait with alert, direct presence. Preserve glasses and practical ponytail. No pencil in hair. Positive: 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Alert direct expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest. Negative: pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions.

- **greta_amused** (existing runtime): Direct warm smile. Description: Edit from neutral. Restrained amused expression. Positive: same identity + restrained amused smile. Negative: same as neutral + exaggerated grin.

- **greta_displeased** (existing runtime): Subtly drawn brows, closed unsmiling mouth. Description: Edit from neutral. Restrained displeasure. Positive: same identity + restrained displeased expression. Negative: same as neutral + rage face.

- **greta_vulnerable** (existing runtime): Softened eyes, reduced composure. Description: Edit from neutral. Quiet vulnerable expression. Positive: same identity + quiet vulnerable expression. Negative: same as neutral + crying.

- **greta_affectionate** (existing runtime): Fond eyes, restrained personal smile. Description: Edit from neutral. Warm affectionate expression. Positive: same identity + warm affectionate expression. Negative: same as neutral + seductive pose.

- **greta_fullbody** (planned): Clothed full-body. Description: Full body preserving athletic silhouette and fully buttoned shirt. Positive: same identity + full body, graphite knee-length skirt, low-heeled black loafers. Negative: same as neutral + wrong skirt length.

### Virág
Identity summary: 19-year-old petite adult woman, 160 cm, vivid medium-green pixie cut (override any blue in references), grey-blue eyes, confident teasing expression, open-collar white blouse, burgundy cardigan, charcoal pleated skirt, dark tights, black ankle boots.

- **virag_neutral** (existing runtime): Confident teasing expression with small smile. Description: Head-and-shoulders portrait. Hair must be vivid medium green, not blue or teal. Preserve adult proportions. Positive: 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows, small confident smile. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Confident teasing expression and relaxed self-assured posture. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Negative: childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories.

- **virag_amused** (existing runtime): Knowing playful smile. Description: Edit from neutral. Restrained amused expression. Positive: same identity + restrained amused smile. Negative: same as neutral + exaggerated grin.

- **virag_displeased** (existing runtime): Tension in brows and mouth. Description: Edit from neutral. Restrained displeasure. Positive: same identity + restrained displeased expression. Negative: same as neutral + rage face.

- **virag_vulnerable** (existing runtime): Subtle softened gaze. Description: Edit from neutral. Quiet vulnerable expression. Positive: same identity + quiet vulnerable expression. Negative: same as neutral + crying.

- **virag_affectionate** (existing runtime): Warm eye contact, restrained smile. Description: Edit from neutral. Warm affectionate expression. Positive: same identity + warm affectionate expression. Negative: same as neutral + seductive pose.

- **virag_fullbody** (planned): Clothed full-body. Description: Full body with dark tights and black ankle boots. Positive: same identity + full body, dark tights, black ankle boots, charcoal pleated skirt. Negative: same as neutral + blue hair, long hair.

### Végh Soma
Identity summary: Ordinary less conventionally handsome Hungarian university assistant, black hair, moustache, slightly stocky with small belly, brown knitted vest over light shirt. Small crooked rectangular brass pin on anatomical-left vest chest. Transformed form retains same face, moustache and clothes with modest weight loss, pointed fangs and glowing red eyes.

- **soma_neutral** (existing runtime, human): Reserved slightly weary expression. Description: Head-and-shoulders portrait of ordinary human Soma. Preserve stocky build indication and brass pin. Positive: Adult Hungarian university assistant, ordinary and less conventionally handsome, slightly stocky with a small belly. Light warm skin, broad adult face, strong dark eyebrows, dark muted eyes, substantial nose, dark moustache with no full beard, short tousled black hair swept loosely to one side. Reserved slightly weary expression. Brown V-neck knitted vest over a light cream collared shirt with open top button. A small, slightly crooked rectangular brass pin on his anatomical-left vest chest (viewer right frontally); plain unlettered metal. Negative: clean-shaven face, full beard, glamorous model face, lean muscular body, red eyes, fangs, vampire cape, aristocratic costume, occult pin, lettered badge, oversized pin, missing brass pin.

- **soma_transformed** (existing runtime): Same man with glowing red irises and pointed upper canine fangs, modest weight loss. Description: Edit from human neutral. Subtle supernatural transformation only. Preserve recognizability. Positive: The same adult man as human Soma: identical face, black hair, dark moustache, ordinary features, brown knitted vest and light collared shirt. Only modest weight loss, glowing red irises and pointed upper canine fangs. Preserve recognizability and restrained transformation; no gore. Small crooked rectangular brass pin. Negative: different identity, missing moustache, extreme emaciation, muscular makeover, monstrous face, pointed ears, wings, cape, blood, gore, missing brass pin.

- **soma_fullbody** (planned): Clothed full-body for both forms. Description: Full body preserving stocky build and brass pin. Positive: same identity + full body standing, preserve stocky build and brass pin. Negative: same as human/transformed + wrong body type.

### Supporting cast
- **denes_neutral** (existing runtime): Mature man with salt-and-pepper hair greying at temples, short beard, white medical coat over charcoal shirt. Burgundy pen in left breast pocket. Description: Calm attentive expression. Positive: Mature adult man, visible forehead and eye-area lines, warm light-to-medium skin, broad defined face, dark muted eyes, thick brows. Short swept-back dark hair with conspicuous silver-grey at the temples, short salt-and-pepper beard and moustache. Calm attentive expression. White medical coat with lapels over an open-collar charcoal shirt. One dark burgundy pen clipped into the anatomical-left breast pocket. Negative: youthful smooth face, clean-shaven face, long beard, entirely black hair, stethoscope, invented insignia, missing burgundy pen.

- **julia_neutral** (existing runtime): Mature woman with short curly dark hair, navy blazer, grey-green blouse, ginkgo-leaf brooch on left lapel, small round earrings. Description: Quietly attentive expression. Positive: Mature adult woman, warm light skin, oval adult face, defined cheekbones, dark brown eyes, fine arched dark brows, muted rose lips. Short voluminous dark brown-black curly bob around the jaw. Quietly attentive expression. Dark navy blazer over a softly draped grey-green open-neck blouse; small understated round earrings. A small matte silver ginkgo-leaf brooch on her anatomical-left blazer lapel. Negative: young student face, straight long hair, copper hair, glasses, ornate jewellery, white medical coat, oversized brooch, missing ginkgo brooch.

- **aron_neutral** (existing runtime): Older man in his late sixties, grey hair, glasses, dark suit, burgundy tie with silver tie bar. Description: Serious direct gaze. Positive: Older man in his late sixties, light skin, long angular face, lined forehead, deep-set dark eyes, grey eyebrows, clean-shaven. Short silver-grey hair swept back and to the side, thin rectangular metal-framed glasses. Serious direct gaze. Dark charcoal suit jacket, pale collared shirt and burgundy tie. A narrow brushed-silver horizontal tie bar across the lower visible part of his burgundy tie. Negative: young face, auburn hair, tweed jacket, beard, missing glasses, black hair without grey, friendly exaggerated grin, missing tie bar.

- **lilla_neutral** (existing runtime): Adult woman in her early thirties, shoulder-length chestnut hair, teal cardigan, pale blouse, three cream floral embroidery motifs at left neckline. Description: Restrained slight smile. Positive: Adult woman in her early thirties, fair skin, oval face, muted grey-green eyes, soft brown brows, natural pink lips and restrained slight smile. Shoulder-length chestnut-brown hair with soft waves and a loose forehead fringe. Teal knitted cardigan worn open over a pale cream buttoned collared blouse. Three small cream floral embroidery motifs grouped at the anatomical-left cardigan neckline. Negative: teenage face, dark-blonde hair, plum sweater, blue pixie cut, elaborate hairstyle, exaggerated grin, large floral print, missing cream embroidery.

Márton (viewpoint) and narrator have no portraits. Planned supporting expressions (amused, displeased, vulnerable, affectionate) follow the same edit-from-neutral rules as main women if required.

## Backgrounds

Each location and lighting/season variant is listed separately with its own description. All are empty first-person anime scenes with companion seat. Runtime files use assets/backgrounds/*-anime-v1.webp or specific variants. Autumn is default.

**Shared background positive:**
```text
Empty 16:9 environment, first-person camera at seated player eye height. A clearly empty natural companion chair or bench faces the viewer across a small table or open space. Calm conversation composition. Preserve gothic location mood with subtle modern college electric fixtures. Day scenes remain visibly daytime. No people.
```
**Shared background negative:** (shared + people terms above)

- **classroom_day** (existing runtime): Pointed stone window arches, autumn daylight, dark timber desks, chalkboard, electric task lamps. Empty chair across desk. North teaching range, ground floor. Description: Seminar room adapted from former ballroom with large north windows.

- **classroom_dusk** (existing runtime): Same architecture, autumn dusk outside windows, electric task lamps on. Description: Edit lighting only from classroom_day. Preserve furniture and seats.

- **library_day** (existing runtime): Tall dark wooden bookcases, pointed arches, electric reading lamps, slate-blue autumn light. Seated at shared reading table, empty chair opposite. East wing, ground with gallery. Description: Quiet castle-college library.

- **library_evening** (existing runtime): Same shelves and chairs, evening blue outside, warm electric reading lamps. Description: Edit lighting only from library_day.

- **department_day** (existing runtime): Dark timber shelves, stone window, folders without readable labels, closed laptop, meeting table with empty visitor chair. West wing, first floor. Description: Working university department office.

- **department_night** (existing runtime): Same furniture, night lighting, warm electric lamps. Description: Edit lighting only from department_day.

- **courtyard_day** (existing runtime): Weathered stone arcades, ivy, mature linden tree, restrained electric wall lamps, cool autumn sky. Small table, empty bench facing player. South of main house, 55×40 m. Description: College inner courtyard.

- **courtyard_night** (existing runtime): Same seating and architecture, night sky, soft amber electric wall lamps, cool moonlit stone. Description: Edit lighting only from courtyard_day.

- **apartment_day** (existing runtime, suite): Modest faculty suite, lived-in books, plain kitchenette side, timber floor, old stone window surround with autumn daylight, warm desk lamp. Small table, empty chair. West wing, second floor; west-facing windows (no lake). Description: Márton’s private suite.

- **apartment_night** (existing runtime): Same room, night interior lighting. Description: Edit lighting only from apartment_day.

- **bekas_day** (existing runtime): Reeds, muted lake reflections, weathered path, distant castle stonework. Low picnic table, empty bench opposite. Landing viewpoint northeast of castle. Description: Békás Lake landing.

- **bekas_night** (existing runtime): Same landing, night lighting, soft reflections. Description: Edit lighting only from bekas_day.

- **holdkor_night** (existing runtime): Vaulted stone ceiling, intimate amber electric lamps, simple small projection screen, dark timber furniture. Conversational table, empty chair. No ritual props. Cellar of converted granary east-southeast. Description: Holdkör student arts club.

- **chamber_day** (existing runtime): Practical maintenance room, weathered stone walls, old utility pipes, shallow service trench with three floor anchor fittings, ordinary service exit door. Worktable with empty folding chair. Daytime light through small high window + amber electric work lamp. Beneath service annex. Description: Service chamber.

- **hallway_day** (existing runtime): Main doors, stair, noticeboard, central indoor distribution. Ground floor entrance gallery. Description: Entrance gallery.

**Concept and additional locations (planned):**
- **castle_exterior**: North-up or first-person ground-level view of the main house, square southeast clock tower, ivory plaster, dark slate roofs, autumn trees. No people. Description: Exterior of the main castle building.
- **gatehouse**: Arrival court ~300 m south, modest gate building, approach road. Empty. Description: Gatehouse and arrival area.
- **residences**: Stable/steward ranges southeast, two-storey student lodging, same plaster/slate palette. Empty. Description: Student residences.
- **workshop**: Former riding hall southwest, tall roof, sprung floor, clear exercise space. Empty. Description: Mystical gymnastics workshop.
- **forest_boundary**: Stile and woodland path beyond managed lawns, mature oak-hornbeam. Empty. Description: Forest boundary path.
- **ridge_lookout**: Small clearing northwest, partial tower glimpse through trees. Empty. Description: Ridge lookout.
- **village**: Distant settlement >3 km south, not visible from campus; optional distant view. Empty. Description: Distant village.

### Seasonal variants
Generate by editing base while locking architecture, furniture, seats and camera. Suggested IDs append _winter, _spring, _summer (autumn is default). Description for each season follows the shared seasonal guidance.

- Autumn: Gold linden, russet oak, damp paths, warm amber light.
- Winter: Bare branches, frost or light snow, cool blue-grey light, early darkness, dark yew. No lush green.
- Spring: Budding leaves, woodland flowers, soft green emerging, mild light.
- Summer: Dense green canopy, tall reeds at lake, strong daylight, deep shade.

Seasonal negative: wrong season foliage, tropical plants, alpine mountains, summer blossom with winter snow, identical flower beds year-round, safe ice path across lake.

## Other assets

- **icon_book**, **icon_bottles**, **icon_chair**, **icon_door**, **icon_phone**, **icon_shelf**, **icon_stat_calm**, **icon_stat_energy**, **icon_stat_insight**, **icon_stat_money**, **icon_stat_presence**, **ui_heart_empty**, **ui_heart_full** (existing or planned): Simple clean PNG icons matching gothic-college theme, no text. Description: Minimal UI and planning icons. Positive: clean vector-like icon, restrained gothic-college style, no lettering. Negative: text, photorealism, complex scenery.

- **recycling_collectibles** (existing concept): Transparent 2×2 atlas of green glass bottle, blue plastic bottle, copper drink can, purple glass bottle. Description: Collectible illustrations for minigame. Positive: clean transparent atlas, four distinct containers, soft shading. Negative: text, labels with readable words, people.

- **virag_wink_loop**, **virag_arm_loop**, **virag_kiss_loop**, **virag_cuddle_loop** (existing, with posters virag_wink_poster etc.): Short WebP moment loops derived from Virág identity. Description: Animation loops preserving green pixie hair and outfit. Positive: same Virág identity + specific action (wink / arm link / brief kiss / cuddle), adult proportions. Negative: blue hair, childlike proportions, extra characters.

- **rebeka_fullbody**, **boglarka_fullbody**, **greta_fullbody**, **virag_fullbody**, **soma_fullbody** (planned identity sheets): Clothed full-body reference sheets. Description: Face close-up left + simple clothed full-body front right on neutral light-grey background. Use neutral portrait as identity lock. Positive: face close-up left + simple clothed full-body front right, neutral light-grey background, no text. Negative: extra poses, alternate costumes, text, labels.

## Sexual / explicit content

All characters are adults (19+). Explicit content is optional, never gates the investigation or endings, requires mutual choice, invitation, reconsideration/refusal branches and aftermath. Style matches runtime: detailed non-pixel drawn anime, adult proportions, identity locked to current neutral portraits. Venice preferred. Current intimacy is fade-to-black; planned expansion uses drawn CGs and short loops.

**Character-specific preferences:**
- Rebeka: control of pace/gaze, clothing/choker play, sarcasm drops in private.
- Boglárka: mutual oral focus, deliberate requests, quiet aftercare.
- Gréta: practical checks, playful energy, light restraint where fitting.
- Virág: immediate and repeated explicit, independent of main routes.
- Lilla (optional): sensory grounding, slow touch, temperature contrast, mostly clothed.
- Júlia (optional): experienced quiet instruction, partial professional attire.

**Cataloged explicit assets** (candidates; generate only with authorization):
- **explicit_rebeka_oral_kneeling**: Kneeling, performing fellatio, eyes looking up, hands behind back, black keyhole dress pulled down to waist, dim gothic apartment or dark lakeside, single streetlamp. Description: Explicit kneeling oral scene preserving Rebeka identity. Positive: same Rebeka identity + explicit kneeling oral, preserve facial geometry and marks. Negative: shared + child, underage, wrong hair, missing beauty mark.
- **explicit_rebeka_oral_explicit**: More explicit deep oral, dress fully pulled down, bare breasts, saliva string, eyes half-lidded, scar on abdomen visible, lakeside night rim light. Description: Deeper explicit oral variant. Positive: same identity + deeper explicit oral. Negative: same as above.
- **explicit_rebeka_bent_over**: Bent over low stone wall or bench at dark lakeside, dress hiked, underwear aside, bare ass/thighs, penetration from behind visible, looking back flushed, scar visible. Description: Explicit bent-over penetration. Positive: same identity + explicit bent-over penetration. Negative: same as above.
- **explicit_rebeka_riding**: Straddling viewer, dress/underwear off or around thighs, bare breasts, scar under hand or mouth, hands on viewer chest, half-lidded eyes, apartment or lakeside night. Description: Explicit riding scene. Positive: same identity + explicit riding. Negative: same as above.
- **explicit_boglarka_undress**: Cardigan shrugged off, cream dress sliding down, soft full breasts and curves exposed, blushing, watching viewer, quiet library alcove or apartment. Description: Modest undress preserving freckles and braid. Positive: same Boglárka identity + modest undress, preserve freckles and braid. Negative: shared + missing freckles, wrong braid side.
- **explicit_boglarka_oral_on_her**: Lying back on bed/sofa, dress and cardigan off, bare breasts, legs parted, receiving slow oral and fingering, blushing deeply, freckles visible, quiet apartment. Description: Explicit receiving oral. Positive: same identity + explicit receiving oral. Negative: same as above.
- **explicit_boglarka_riding**: Straddling viewer, dress hiked or off, bare breasts, blushing soft smile, half-lidded eyes, hands on viewer chest, cardigan half on, quiet apartment night. Description: Explicit riding scene. Positive: same identity + explicit riding. Negative: same as above.

**Shared explicit positive append:**
```text
masterpiece, best quality, adult woman, mature female, normal adult proportions, explicit sexual content, uncensored, nsfw, crisp cel-shaded anime, matching the supplied portrait identity exactly. Preserve facial geometry, marks, freckles, hair and body type. Change only pose, clothing state and setting. Detailed face, clean lines, two shading bands, no text, no watermark.
```
**Shared explicit negative:** shared negatives + `child, underage, photorealism, extra limbs, distorted anatomy, text, watermark, identity drift, wrong hair colour, missing freckles or marks`.

Additional planned explicit assets (not yet cataloged as active): greta desk oral/bent/after, virag oral/wall/lake, triad kiss/oral/riding, lilla sensory CG, julia guided CG. Identity sheets (clothed → partial → nude) first, then scene CGs. Register only after visual review.

## Production notes

- Current runtime coverage: full expression sets for Rebeka, Boglárka, Gréta, Virág; Soma human+transformed; supporting neutrals; 14+ background variants; Virág animations.
- User-approved finals: Soma, Áron, Lilla. Others assistant-reviewed; general style acceptance open.
- Virág hair is now vivid medium green (160 cm); existing blue-haired files are face/cut/costume references only.
- Distinguishing details (Soma brass pin, Dénes pen, Júlia ginkgo brooch, Áron tie bar, Lilla embroidery) are for future generations; not yet in all runtime exports.
- Prefer edit from reviewed neutrals for consistency. Record provenance. Do not treat generated candidates as approved runtime without review.

Update this catalog when new assets are added or identities change. Production prompts must follow the visual authority contained here.
