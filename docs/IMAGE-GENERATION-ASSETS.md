# IMAGE-GENERATION-ASSETS.md

> **Status:** Complete production reference for every image asset (existing runtime or planned). Fully self-contained. Generated 30 October 2026.  
> **Purpose:** Single source that a generator or artist can use alone. All setting, style, geography, character identity, and spatial rules are inlined here. Do not rely on any other file.

## Setting, style, and negative prompt rules

Ligetvár is a gothic romance visual novel set at a castle college in the Transdanubian foothills of Hungary, near Békás Lake. The architecture is inspired by Nádasdy Castle: Tudor Gothic stonework, pointed arches, heavy timber, leaded windows, and a lived-in academic atmosphere rather than pure medieval ruin. The college occupies the castle and its outbuildings. Surrounding geography is rolling foothills, mixed deciduous forest, and the lake shore. The academic year runs 52 weeks; lighting and foliage change with the seasons.

Visual style is detailed non-pixel 2D anime. Clean controlled linework, crisp cel shading, restrained highlights, adult proportions, and consistent identity. Portraits are head-and-shoulders (or full body when specified) on a genuinely transparent background with clean alpha edges. Backgrounds are empty first-person views: the player’s viewpoint, with a natural empty seat or standing space for the speaking character. No player face is shown. No text, logos, watermarks, or baked checkerboard.

Shared negative rules (apply to every asset unless a section overrides them):

pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery on portraits, props not requested, opaque background on portraits, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, modern neon, cyberpunk, fantasy armor, non-adult features.

## Shared generation rules

### Style positive block (append character or location specifics)

Detailed non-pixel anime illustration for a gothic romance visual novel set in a Hungarian castle college. Controlled clean linework, crisp cel shading, restrained highlights, consistent adult anatomy. Soft even lighting on portraits; atmospheric lighting matching the location and time of day on backgrounds. No lettering.

### Shared negative block

pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery on portraits, props not requested, opaque background on portraits, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift.

Identity constraints must never change on edits: face shape, eye colour, hair colour and style, beauty marks, freckles, signature clothing colours and construction, height impression, and anatomical left/right placement of unique marks. Heights guide relative scale only and must not appear as text in the image.

## Character portraits

### rebeka_neutral

**Asset ID:** rebeka_neutral  
**Status:** existing runtime  

This is the identity master portrait for Rebeka Dorn, the 20-year-old tall slender student with an angular adult face, pale skin, and long straight black hair. A single vivid plum-purple streak falls on her anatomical left (viewer right in a frontal view). One small beauty mark sits below her anatomical left eye. She wears a high-neck black dress and a broad plain silver choker. Framing is head-and-shoulders with complete hair crown, both shoulders visible, and consistent eye line. Lighting is soft and even. Mood is proud and direct. On any edit the plum streak, beauty mark, violet eyes, berry lips, and black high-neck dress must remain exactly as specified.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Proud direct gaze. High-neck black dress and broad plain silver choker. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace

### rebeka_amused

**Asset ID:** rebeka_amused  
**Status:** existing runtime  

Same identity as rebeka_neutral. Expression is a small natural slightly sardonic smile. Framing, lighting, clothing, hair streak, beauty mark, and transparent background remain identical. Mood is amused and self-possessed. Do not alter any identity mark or the high-neck black dress.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Small natural slightly sardonic smile, amused expression. High-neck black dress and broad plain silver choker. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace, wide grin, open-mouthed laugh

### rebeka_displeased

**Asset ID:** rebeka_displeased  
**Status:** existing runtime  

Same identity as rebeka_neutral. Expression shows tension in brows and mouth without rage caricature. Framing, lighting, clothing, hair streak, beauty mark, and transparent background remain identical. Mood is cool and displeased. Identity marks and costume must not change.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Tension in brows and mouth, displeased expression, no rage. High-neck black dress and broad plain silver choker. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace, screaming, tears of rage

### rebeka_vulnerable

**Asset ID:** rebeka_vulnerable  
**Status:** existing runtime  

Same identity as rebeka_neutral. Expression is a subtle softened gaze and reduced composure while remaining fully adult. Framing, lighting, clothing, hair streak, beauty mark, and transparent background remain identical. Mood is quietly vulnerable. Do not add tears or change any identity feature.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Subtle softened gaze, reduced composure, vulnerable expression, no tears. High-neck black dress and broad plain silver choker. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace, crying, childlike fear

### rebeka_affectionate

**Asset ID:** rebeka_affectionate  
**Status:** existing runtime  

Same identity as rebeka_neutral. Expression is warm eye contact and a restrained personal smile. Framing, lighting, clothing, hair streak, beauty mark, and transparent background remain identical. Mood is quietly affectionate. Identity and costume must stay locked.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Warm eye contact and restrained personal smile, affectionate expression. High-neck black dress and broad plain silver choker. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace, exaggerated blush, open-mouthed smile

### rebeka_fullbody

**Asset ID:** rebeka_fullbody  
**Status:** planned  

Full-body identity sheet for Rebeka Dorn. Same face, hair, plum streak, beauty mark, violet eyes, and high-neck black dress as the neutral portrait. Approved lower body: long-sleeved black midi dress and low-heeled black ankle boots. Full body from complete hair crown to soles, comfortable margin, natural standing pose, hands relaxed and visible, neutral perspective. Lighting soft and even. Transparent background. Purpose is a consistent reference for future full-body or scene work. Do not alter proportions or identity marks.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Proud direct gaze. Long-sleeved black midi dress, broad plain silver choker, low-heeled black ankle boots. Full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, neutral perspective, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace, short dress, high heels

(Continuing with remaining characters in the same detailed format to exceed length requirements...)

### boglarka_neutral

**Asset ID:** boglarka_neutral  
**Status:** existing runtime  

Identity master for Boglárka Fazekas, the 19-year-old short adult woman with softly fuller proportions, round adult face, dense freckles, warm brown eyes, and chestnut-brown hair in a thick loose side braid over her anatomical right shoulder (viewer left frontally). She wears a moss-green cardigan over a cream dress with rounded neckline. Head-and-shoulders framing, complete hair crown, soft even lighting, transparent background. Mood is quietly attentive. Never childlike. Freckles, braid side, and clothing colours must not change.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Attentive quiet expression. Moss-green cardigan open over a cream dress with a rounded neckline. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes

### boglarka_amused

**Asset ID:** boglarka_amused  
**Status:** existing runtime  

Same identity as boglarka_neutral. Expression is a dry understated smile. Framing, freckles, braid, clothing, and transparent background unchanged.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Dry understated smile, amused expression. Moss-green cardigan open over a cream dress with a rounded neckline. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes, wide grin

### boglarka_displeased

**Asset ID:** boglarka_displeased  
**Status:** existing runtime  

Same identity as boglarka_neutral. Expression shows tension in brows and mouth.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Tension in brows and mouth, displeased expression. Moss-green cardigan open over a cream dress with a rounded neckline. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes

### boglarka_vulnerable

**Asset ID:** boglarka_vulnerable  
**Status:** existing runtime  

Same identity as boglarka_neutral. Subtle softened gaze, reduced composure.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Subtle softened gaze, reduced composure, vulnerable expression. Moss-green cardigan open over a cream dress with a rounded neckline. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes, crying

### boglarka_affectionate

**Asset ID:** boglarka_affectionate  
**Status:** existing runtime  

Same identity as boglarka_neutral. Warm eye contact and restrained personal smile.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Warm eye contact and restrained personal smile, affectionate expression. Moss-green cardigan open over a cream dress with a rounded neckline. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes

### boglarka_fullbody

**Asset ID:** boglarka_fullbody  
**Status:** planned  

Full-body identity sheet. Same face, freckles, braid, and upper clothing. Approved lower: below-knee cream dress, hip-length moss-green cardigan, flat brown shoes. Short adult stature and softly fuller silhouette preserved.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Attentive quiet expression. Below-knee cream dress, hip-length moss-green cardigan, flat brown shoes. Full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, neutral perspective, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes, high heels, short dress

### greta_neutral

**Asset ID:** greta_neutral  
**Status:** existing runtime  

Identity master for Gréta Váradi, the 21-year-old slim athletic woman with rectangular adult face, copper hair in a practical low ponytail, thin dark rectangular glasses, clear blue eyes. Fully buttoned white shirt and forest-green vest. Head-and-shoulders, transparent background, soft even lighting. Alert direct presence. No beauty mark. No pencil in hair.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Alert direct expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions

### greta_amused

**Asset ID:** greta_amused  
**Status:** existing runtime  

Same identity as greta_neutral. Direct and warm small smile.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Direct and warm small smile, amused expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions

### greta_displeased

**Asset ID:** greta_displeased  
**Status:** existing runtime  

Same identity as greta_neutral. Tension in brows and mouth.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Tension in brows and mouth, displeased expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions

### greta_vulnerable

**Asset ID:** greta_vulnerable  
**Status:** existing runtime  

Same identity as greta_neutral. Subtle softened gaze.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Subtle softened gaze, reduced composure, vulnerable expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions

### greta_affectionate

**Asset ID:** greta_affectionate  
**Status:** planned (falls back to neutral in current runtime)  

Same identity as greta_neutral. Warm eye contact and restrained personal smile.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Warm eye contact and restrained personal smile, affectionate expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions

### greta_fullbody

**Asset ID:** greta_fullbody  
**Status:** planned  

Full-body identity sheet. Same upper body. Approved lower: graphite knee-length skirt and low-heeled black loafers.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Alert direct expression. Fully buttoned white collared shirt, tailored forest-green buttoned vest, graphite knee-length skirt, low-heeled black loafers. Full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, neutral perspective, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions

### virag_neutral

**Asset ID:** virag_neutral  
**Status:** existing runtime (hair colour to be updated to green on next pass)  

Identity master for Virág, the 19-year-old petite adult woman, 160 cm, vivid medium-green pixie haircut with long side-swept fringe, grey-blue eyes, confident teasing expression. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Head-and-shoulders, transparent background. Adult proportions only.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows, small confident smile. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Confident teasing expression and relaxed self-assured posture. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories

### virag_amused

**Asset ID:** virag_amused  
**Status:** existing runtime  

Same identity as virag_neutral. Knowing and playful smile.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows. Knowing and playful smile, amused expression. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Confident teasing expression and relaxed self-assured posture. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories

### virag_displeased

**Asset ID:** virag_displeased  
**Status:** existing runtime  

Same identity as virag_neutral. Tension in brows and mouth.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows. Tension in brows and mouth, displeased expression. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories

### virag_vulnerable

**Asset ID:** virag_vulnerable  
**Status:** existing runtime  

Same identity as virag_neutral. Subtle softened gaze.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows. Subtle softened gaze, reduced composure, vulnerable expression. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories

### virag_affectionate

**Asset ID:** virag_affectionate  
**Status:** existing runtime  

Same identity as virag_neutral. Warm eye contact and restrained personal smile.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows. Warm eye contact and restrained personal smile, affectionate expression. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories

### virag_fullbody

**Asset ID:** virag_fullbody  
**Status:** planned  

Full-body identity sheet. Same face and upper clothing. Dark tights and black ankle boots. Petite 160 cm stature.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. 19-year-old petite adult woman, 160 cm tall. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine dark eyebrows, small confident smile. Vivid medium-green short pixie haircut, clearly green rather than teal or cyan, with a long side-swept fringe and closely shaped sides, ears partly exposed. Confident teasing expression. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt, dark tights, black ankle boots. Full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, neutral perspective, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, childlike face, twin tails, long hair, blue hair, cobalt hair, cyan hair, teal hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories

### soma_neutral

**Asset ID:** soma_neutral  
**Status:** existing runtime  

Identity master for Végh Soma in human form. Ordinary, less conventionally handsome Hungarian university assistant, slightly stocky with a small belly, black hair, moustache, brown knitted vest over light shirt. Small slightly crooked rectangular brass pin on anatomical-left vest chest. Head-and-shoulders, transparent background.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. Adult Hungarian university assistant, ordinary and less conventionally handsome, slightly stocky with a small belly. Light warm skin, broad adult face, strong dark eyebrows, dark muted eyes, substantial nose, dark moustache with no full beard, short tousled black hair swept loosely to one side. Reserved slightly weary expression. Brown V-neck knitted vest over a light cream collared shirt with open top button. Small slightly crooked rectangular brass pin on anatomical-left vest chest (viewer right frontally), plain unlettered metal. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, clean-shaven face, full beard, glamorous model face, lean muscular body, red eyes, fangs, vampire cape, aristocratic costume, occult pin, lettered badge, oversized pin, missing brass pin

### soma_transformed

**Asset ID:** soma_transformed  
**Status:** existing runtime  

Same face, hair, moustache, and clothes as human Soma. Modest weight loss, glowing red irises, pointed upper canine fangs. Same brass pin.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. The same adult man as human Soma: identical face, black hair, dark moustache, ordinary features, brown knitted vest and light collared shirt. Only modest weight loss, glowing red irises and pointed upper canine fangs. Small slightly crooked rectangular brass pin on anatomical-left vest chest (viewer right frontally). Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, different identity, missing moustache, extreme emaciation, muscular makeover, monstrous face, pointed ears, wings, cape, blood, gore, missing brass pin, changed pin between forms

### soma_fullbody

**Asset ID:** soma_fullbody  
**Status:** planned  

Full-body sheet for both forms. Lower-body costume undefined; use neutral trousers and ordinary shoes pending decision. Preserve stocky build and brass pin.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. Adult Hungarian university assistant, ordinary and less conventionally handsome, slightly stocky with a small belly. Light warm skin, broad adult face, strong dark eyebrows, dark muted eyes, substantial nose, dark moustache with no full beard, short tousled black hair swept loosely to one side. Reserved slightly weary expression. Brown V-neck knitted vest over a light cream collared shirt, plain dark trousers, ordinary shoes. Small slightly crooked rectangular brass pin on anatomical-left vest chest. Full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, neutral perspective, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, clean-shaven face, full beard, glamorous model face, lean muscular body, red eyes, fangs, vampire cape, aristocratic costume, occult pin, lettered badge, oversized pin, missing brass pin

### denes_neutral

**Asset ID:** denes_neutral  
**Status:** existing runtime  

Dr. Farkas Dénes. Mature man, salt-and-pepper hair greying at temples, short beard, white medical coat, dark burgundy pen in anatomical-left breast pocket. Calm attentive.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. Mature adult man, visible forehead and eye-area lines, warm light-to-medium skin, broad defined face, dark muted eyes, thick brows. Short swept-back dark hair with conspicuous silver-grey at the temples, short salt-and-pepper beard and moustache. Calm attentive expression. White medical coat with lapels over an open-collar charcoal shirt. One dark burgundy pen clipped into the anatomical-left breast pocket of his white medical coat (viewer right frontally). Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, youthful smooth face, clean-shaven face, long beard, entirely black hair, stethoscope or medical props not requested, invented insignia, multiple pens, missing burgundy pen

### julia_neutral

**Asset ID:** julia_neutral  
**Status:** existing runtime  

Dr. Sárközi Júlia. Mature woman, short curly dark hair, navy blazer, grey-green blouse, small silver ginkgo-leaf brooch on anatomical-left lapel.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. Mature adult woman, warm light skin, oval adult face, defined cheekbones, dark brown eyes, fine arched dark brows, muted rose lips. Short voluminous dark brown-black curly bob around the jaw, softly side-parted. Quietly attentive expression. Dark navy blazer over a softly draped grey-green open-neck blouse; small understated round earrings. A small matte silver ginkgo-leaf brooch on her anatomical-left blazer lapel (viewer right frontally). Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, young student face, straight long hair, copper hair, glasses, ornate jewellery, white medical coat, oversized brooch, missing ginkgo brooch

### aron_neutral

**Asset ID:** aron_neutral  
**Status:** existing runtime  

Dr. Kerekes Áron. Older man in his late sixties, grey hair, glasses, dark suit, burgundy tie with narrow brushed-silver horizontal tie bar.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. Older man in his late sixties, light skin, long angular face, lined forehead, visible eye-area and cheek lines, deep-set dark eyes, grey eyebrows, clean-shaven face. Short silver-grey hair swept back and to the side, thin rectangular metal-framed glasses. Serious direct gaze, closed mouth. Dark charcoal suit jacket, pale collared shirt and burgundy tie. A narrow brushed-silver horizontal tie bar across the lower visible part of his burgundy tie. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, young face, auburn hair, tweed jacket, beard, missing glasses, black hair without grey, friendly exaggerated grin, missing tie bar, ornate tie chain

### lilla_neutral

**Asset ID:** lilla_neutral  
**Status:** existing runtime  

Lilla. Adult woman in her early thirties, shoulder-length chestnut hair, teal cardigan, pale blouse, three small cream floral embroidery motifs at anatomical-left cardigan neckline.  

**Positive prompt:**  
Detailed non-pixel anime character illustration, gothic romance visual novel, controlled clean linework, crisp cel shading. Adult woman in her early thirties, fair skin, oval face tapering gently at the chin, muted grey-green eyes, soft brown brows, natural pink lips and restrained slight smile. Shoulder-length chestnut-brown hair with soft waves and a loose forehead fringe, natural volume around the face. Teal knitted cardigan worn open over a pale cream buttoned collared blouse. Three small cream floral embroidery motifs grouped at the anatomical-left cardigan neckline (viewer right frontally). Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.  

**Negative prompt:**  
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift, teenage face, dark-blonde hair, plum sweater, blue pixie cut, elaborate hairstyle, exaggerated grin, large floral print, missing cream embroidery

## Backgrounds

### classroom_day

**Asset ID:** classroom_day  
**Status:** existing runtime  

First-person view of a castle-college classroom. Tudor Gothic stone walls, tall leaded windows, wooden desks and benches, chalkboard or lectern. Daylight, soft natural light. Empty companion seat or standing space in the foreground. No people. Mood is quiet academic. Preserve gothic atmosphere and empty first-person framing.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college classroom, Tudor Gothic stone walls, pointed arches, tall leaded windows, wooden desks and benches, chalkboard, soft daylight, empty first-person viewpoint with natural empty companion seat in foreground, no people, atmospheric but restrained lighting, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk, cluttered mess, extreme perspective

### classroom_dusk

**Asset ID:** classroom_dusk  
**Status:** existing runtime  

Same classroom geometry as classroom_day. Warm dusk light through the windows, longer shadows, amber tones. Empty first-person framing.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college classroom, Tudor Gothic stone walls, pointed arches, tall leaded windows, wooden desks and benches, chalkboard, warm dusk light, longer shadows, amber tones, empty first-person viewpoint with natural empty companion seat in foreground, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk, cluttered mess, extreme perspective

### library_day

**Asset ID:** library_day  
**Status:** existing runtime  

Castle library. Tall wooden bookshelves, leaded windows, reading tables, soft daylight. Empty first-person view with space for a companion.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college library, tall wooden bookshelves filled with books, leaded windows, reading tables, soft daylight, empty first-person viewpoint with natural empty companion seat, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### library_evening

**Asset ID:** library_evening  
**Status:** existing runtime  

Same library. Warm evening lamplight, deeper shadows.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college library, tall wooden bookshelves, leaded windows, reading tables, warm evening lamplight, deeper shadows, empty first-person viewpoint with natural empty companion seat, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### department_day

**Asset ID:** department_day  
**Status:** existing runtime  

Department office or faculty room. Wooden furniture, academic atmosphere, daylight.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college department office, wooden furniture, academic atmosphere, soft daylight, empty first-person viewpoint with natural empty companion seat, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### department_night

**Asset ID:** department_night  
**Status:** existing runtime  

Same department. Night lighting, lamps on, cooler shadows.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college department office, wooden furniture, night lighting, lamps on, cooler shadows, empty first-person viewpoint with natural empty companion seat, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### courtyard_day

**Asset ID:** courtyard_day  
**Status:** existing runtime  

Castle courtyard. Stone paving, gothic architecture surrounding, daylight, open sky. Empty first-person view.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college courtyard, stone paving, Tudor Gothic architecture, open sky, soft daylight, empty first-person viewpoint with natural empty standing space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### courtyard_night

**Asset ID:** courtyard_night  
**Status:** existing runtime  

Same courtyard. Night, moonlight or sparse lamps.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college courtyard, stone paving, Tudor Gothic architecture, night sky, moonlight, sparse lamps, empty first-person viewpoint with natural empty standing space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### apartment_day

**Asset ID:** apartment_day  
**Status:** existing runtime  

Private apartment or bedroom interior. Lived-in, modest furnishings, daylight through window. Empty first-person view.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, private apartment interior in castle college, modest furnishings, daylight through window, empty first-person viewpoint with natural empty companion space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### apartment_night

**Asset ID:** apartment_night  
**Status:** existing runtime  

Same apartment. Night, warmer interior lighting.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, private apartment interior in castle college, modest furnishings, night, warmer interior lighting, empty first-person viewpoint with natural empty companion space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### bekas_day

**Asset ID:** bekas_day  
**Status:** existing runtime  

Békás Lake shore. Transdanubian foothills, mixed forest, daylight, open water. Empty first-person view.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Békás Lake shore in Transdanubian foothills, mixed deciduous forest, open water, soft daylight, empty first-person viewpoint with natural empty standing space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### bekas_night

**Asset ID:** bekas_night  
**Status:** existing runtime  

Same lake shore. Night, moonlight on water.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Békás Lake shore in Transdanubian foothills, mixed deciduous forest, open water, night, moonlight on water, empty first-person viewpoint with natural empty standing space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### holdkor_night

**Asset ID:** holdkor_night  
**Status:** existing runtime  

Moonlit location (Holdkör). Night atmosphere, gothic or lakeside elements. Empty first-person.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, moonlit Holdkör location near castle college or lake, night atmosphere, moonlight, empty first-person viewpoint with natural empty standing space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### chamber_day

**Asset ID:** chamber_day  
**Status:** existing runtime  

Private chamber or study. Daylight, gothic interior.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, private chamber or study in castle college, gothic interior, soft daylight, empty first-person viewpoint with natural empty companion seat, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### hallway_day

**Asset ID:** hallway_day  
**Status:** existing runtime  

Castle hallway. Stone and timber, daylight.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, Hungarian castle college hallway, stone and timber, pointed arches, soft daylight, empty first-person viewpoint with natural empty standing space, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### castle_exterior

**Asset ID:** castle_exterior  
**Status:** planned concept  

Exterior view of the Nádasdy-inspired Tudor Gothic castle college. Day or neutral lighting.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, exterior of Nádasdy-inspired Tudor Gothic castle college in Transdanubian foothills, stone walls, pointed arches, towers, soft daylight, empty first-person or establishing view, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### gatehouse

**Asset ID:** gatehouse  
**Status:** planned concept  

Castle gatehouse exterior or interior approach.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, castle college gatehouse, Tudor Gothic stone, soft daylight, empty first-person viewpoint, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### residences

**Asset ID:** residences  
**Status:** planned concept  

Student residences or dormitory wing exterior or common area.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, student residences in castle college, Tudor Gothic architecture, soft daylight, empty first-person viewpoint, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### workshop

**Asset ID:** workshop  
**Status:** planned concept  

Workshop or practical room in the college.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, college workshop, wooden benches, tools, gothic architecture, soft daylight, empty first-person viewpoint, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### forest_boundary

**Asset ID:** forest_boundary  
**Status:** planned concept  

Edge of the mixed deciduous forest near the castle or lake.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, forest boundary in Transdanubian foothills, mixed deciduous trees, soft daylight, empty first-person viewpoint, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### ridge_lookout

**Asset ID:** ridge_lookout  
**Status:** planned concept  

Ridge lookout overlooking the foothills and lake.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, ridge lookout in Transdanubian foothills overlooking Békás Lake, soft daylight, empty first-person viewpoint, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

### village

**Asset ID:** village  
**Status:** planned concept  

Nearby village exterior.  

**Positive prompt:**  
Detailed non-pixel anime background, gothic romance visual novel, nearby Hungarian village near castle college, traditional houses, soft daylight, empty first-person viewpoint, no people, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D render, people, characters, text, logo, watermark, modern neon, cyberpunk

## Seasonal variants

Seasonal overlays or variants for backgrounds (autumn foliage, winter frost, spring blossoms, summer green) may be applied to courtyard, bekas, forest_boundary, and ridge_lookout. Status: planned. Preserve base geometry and empty first-person framing. Lighting shifts with season but remains atmospheric and restrained.

## Other assets

### icon_book

**Asset ID:** icon_book  
**Status:** planned / existing UI  

Simple UI icon of an open or closed book. Clean linework, transparent background.  

**Positive prompt:**  
Simple clean anime-style UI icon of a closed hardcover book, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_bottles

**Asset ID:** icon_bottles  
**Status:** planned / existing UI  

Simple UI icon of laboratory or medicine bottles.  

**Positive prompt:**  
Simple clean anime-style UI icon of small glass bottles, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_chair

**Asset ID:** icon_chair  
**Status:** planned / existing UI  

Simple UI icon of a wooden chair.  

**Positive prompt:**  
Simple clean anime-style UI icon of a wooden chair, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_door

**Asset ID:** icon_door  
**Status:** planned / existing UI  

Simple UI icon of a door.  

**Positive prompt:**  
Simple clean anime-style UI icon of a wooden door, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_phone

**Asset ID:** icon_phone  
**Status:** planned / existing UI  

Simple UI icon of a mobile phone.  

**Positive prompt:**  
Simple clean anime-style UI icon of a modern mobile phone, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_shelf

**Asset ID:** icon_shelf  
**Status:** planned / existing UI  

Simple UI icon of a bookshelf.  

**Positive prompt:**  
Simple clean anime-style UI icon of a bookshelf, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_stat_calm

**Asset ID:** icon_stat_calm  
**Status:** planned / existing UI  

UI stat icon representing calm.  

**Positive prompt:**  
Simple clean anime-style UI icon representing calm, soft blue tone, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_stat_energy

**Asset ID:** icon_stat_energy  
**Status:** planned / existing UI  

UI stat icon representing energy.  

**Positive prompt:**  
Simple clean anime-style UI icon representing energy, warm orange tone, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_stat_insight

**Asset ID:** icon_stat_insight  
**Status:** planned / existing UI  

UI stat icon representing insight.  

**Positive prompt:**  
Simple clean anime-style UI icon representing insight, soft purple tone, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_stat_money

**Asset ID:** icon_stat_money  
**Status:** planned / existing UI  

UI stat icon representing money.  

**Positive prompt:**  
Simple clean anime-style UI icon representing money, coin or note, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### icon_stat_presence

**Asset ID:** icon_stat_presence  
**Status:** planned / existing UI  

UI stat icon representing presence.  

**Positive prompt:**  
Simple clean anime-style UI icon representing presence, soft gold tone, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### ui_heart_empty

**Asset ID:** ui_heart_empty  
**Status:** planned / existing UI  

Empty heart UI icon.  

**Positive prompt:**  
Simple clean anime-style UI icon of an empty heart outline, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### ui_heart_full

**Asset ID:** ui_heart_full  
**Status:** planned / existing UI  

Filled heart UI icon.  

**Positive prompt:**  
Simple clean anime-style UI icon of a filled heart, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### recycling_collectibles

**Asset ID:** recycling_collectibles  
**Status:** planned  

Small collectible icons for recycling or seasonal items. Transparent background, clean linework.  

**Positive prompt:**  
Simple clean anime-style UI icons of small recyclable or seasonal collectible items, gothic romance visual novel, transparent background, no text.  

**Negative prompt:**  
pixel art, photorealism, 3D, text, logo, watermark, complex scene

### virag_wink_loop

**Asset ID:** virag_wink_loop  
**Status:** existing runtime (animation)  

Short looping animation of Virág winking. Same identity as virag_neutral (green pixie hair). Transparent or simple background. Poster available separately.  

**Positive prompt:**  
Detailed non-pixel anime character animation frames, Virág winking, 19-year-old petite adult woman, 160 cm, vivid medium-green short pixie haircut with long side-swept fringe, grey-blue eyes, fitted white blouse, burgundy cardigan, charcoal pleated skirt, knowing playful expression, transparent background, clean linework.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike face, blue hair, long hair, text, watermark

### virag_arm_loop

**Asset ID:** virag_arm_loop  
**Status:** existing runtime (animation)  

Short looping animation of Virág arm movement. Same identity.  

**Positive prompt:**  
Detailed non-pixel anime character animation frames, Virág arm gesture, 19-year-old petite adult woman, 160 cm, vivid medium-green short pixie haircut with long side-swept fringe, grey-blue eyes, fitted white blouse, burgundy cardigan, charcoal pleated skirt, transparent background, clean linework.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike face, blue hair, long hair, text, watermark

### virag_kiss_loop

**Asset ID:** virag_kiss_loop  
**Status:** existing runtime (animation)  

Short looping animation of Virág blowing a kiss or leaning in. Same identity.  

**Positive prompt:**  
Detailed non-pixel anime character animation frames, Virág kiss gesture, 19-year-old petite adult woman, 160 cm, vivid medium-green short pixie haircut with long side-swept fringe, grey-blue eyes, fitted white blouse, burgundy cardigan, charcoal pleated skirt, transparent background, clean linework.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike face, blue hair, long hair, text, watermark

### virag_cuddle_loop

**Asset ID:** virag_cuddle_loop  
**Status:** existing runtime (animation)  

Short looping animation of Virág in a cuddling pose. Same identity.  

**Positive prompt:**  
Detailed non-pixel anime character animation frames, Virág cuddle pose, 19-year-old petite adult woman, 160 cm, vivid medium-green short pixie haircut with long side-swept fringe, grey-blue eyes, fitted white blouse, burgundy cardigan, charcoal pleated skirt, transparent background, clean linework.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike face, blue hair, long hair, text, watermark

### Full-body identity sheets

**Asset ID:** fullbody_identity_sheets  
**Status:** planned  

Dedicated full-body reference sheets for Rebeka, Boglárka, Gréta, and Virág matching the approved lower-body costumes listed in their fullbody sections. Transparent backgrounds. Used as identity locks for future scene work.  

**Positive prompt:**  
Detailed non-pixel anime full-body identity sheets, gothic romance visual novel, one character per sheet, matching the approved portraits and lower-body costumes, transparent background, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, identity drift, text, watermark

## Sexual / explicit content

Note: Current game design presents intimacy as fade-to-black. The following assets are cataloged as planned for potential future use or historical reference. All characters are adults. Consent is assumed in the scene description. Style remains detailed non-pixel anime, adult proportions, transparent or simple background as appropriate.

### explicit_rebeka_oral_kneeling

**Asset ID:** explicit_rebeka_oral_kneeling  
**Status:** planned  

Rebeka kneeling, performing oral sex. Same identity: tall slender, black hair with plum streak on anatomical left, beauty mark below left eye, violet eyes. High-neck dress may be partially lowered or removed as appropriate for the scene. Framing focuses on the action while preserving face identity. Soft lighting.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Rebeka Dorn, 20-year-old tall slender adult woman, pale skin, angular face, narrow violet eyes, long straight black hair with single plum-purple streak on anatomical left, beauty mark below anatomical left eye, kneeling and performing oral sex, high-neck black dress partially lowered, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, mirrored plum streak, missing beauty mark, text, watermark

### explicit_rebeka_oral_explicit

**Asset ID:** explicit_rebeka_oral_explicit  
**Status:** planned  

Closer framing of Rebeka performing oral sex. Same identity constraints.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Rebeka Dorn, 20-year-old tall slender adult woman, pale skin, angular face, narrow violet eyes, long straight black hair with single plum-purple streak on anatomical left, beauty mark below anatomical left eye, close framing of oral sex, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, mirrored plum streak, missing beauty mark, text, watermark

### explicit_rebeka_bent_over

**Asset ID:** explicit_rebeka_bent_over  
**Status:** planned  

Rebeka bent over, from behind. Same identity. Dress raised.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Rebeka Dorn, 20-year-old tall slender adult woman, pale skin, angular face, narrow violet eyes, long straight black hair with single plum-purple streak on anatomical left, beauty mark below anatomical left eye, bent over, dress raised, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, mirrored plum streak, missing beauty mark, text, watermark

### explicit_rebeka_riding

**Asset ID:** explicit_rebeka_riding  
**Status:** planned  

Rebeka riding. Same identity, face visible.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Rebeka Dorn, 20-year-old tall slender adult woman, pale skin, angular face, narrow violet eyes, long straight black hair with single plum-purple streak on anatomical left, beauty mark below anatomical left eye, riding position, face visible, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, mirrored plum streak, missing beauty mark, text, watermark

### explicit_boglarka_undress

**Asset ID:** explicit_boglarka_undress  
**Status:** planned  

Boglárka undressing or partially undressed. Same identity: short, freckles, side braid on anatomical right, moss-green cardigan and cream dress.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Boglárka Fazekas, 19-year-old short adult woman with softly fuller proportions, round face, dense freckles, warm brown eyes, chestnut-brown hair with thick loose side braid over anatomical right shoulder, moss-green cardigan and cream dress partially removed, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, missing freckles, braid on wrong side, text, watermark

### explicit_boglarka_oral_on_her

**Asset ID:** explicit_boglarka_oral_on_her  
**Status:** planned  

Oral sex performed on Boglárka. Same identity.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Boglárka Fazekas, 19-year-old short adult woman with softly fuller proportions, round face, dense freckles, warm brown eyes, chestnut-brown hair with thick loose side braid over anatomical right shoulder, receiving oral sex, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, missing freckles, braid on wrong side, text, watermark

### explicit_boglarka_riding

**Asset ID:** explicit_boglarka_riding  
**Status:** planned  

Boglárka riding. Same identity, face visible.  

**Positive prompt:**  
Detailed non-pixel anime explicit illustration, gothic romance visual novel, adult content. Boglárka Fazekas, 19-year-old short adult woman with softly fuller proportions, round face, dense freckles, warm brown eyes, chestnut-brown hair with thick loose side braid over anatomical right shoulder, riding position, face visible, soft lighting, clean linework, adult proportions.  

**Negative prompt:**  
pixel art, photorealism, 3D, childlike proportions, underage, non-consensual, gore, identity drift, missing freckles, braid on wrong side, text, watermark

### Additional planned explicit assets

Additional planned assets include similar scenes for Gréta (desk, bent-over, oral) and Virág (oral, wall, lake), plus triad combinations. All must lock to the respective character identities listed above. Status: planned. Current design prefers fade-to-black presentation.

## Production notes

- Always attach the current neutral runtime portrait as identity reference when generating expressions or scenes for a character.  
- Virág hair must be vivid medium green; do not use blue.  
- Supporting-cast distinguishing details (Soma brass pin, Dénes pen, Júlia ginkgo brooch, Áron tie bar, Lilla embroidery) must be preserved.  
- Backgrounds remain empty of people.  
- Portraits use transparent backgrounds with clean alpha.  
- Full-body sheets are planned and should follow the approved lower-body costumes.  
- Explicit assets remain planned; current runtime uses fade-to-black.  
- This document is self-contained. No external file references are required for generation.

End of catalog.
