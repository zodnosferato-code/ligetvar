# Character image-generation prompts

> **Status:** Prepared 27 October 2026; appearance revisions awaiting specifics. | **Purpose:** Production-ready English prompts derived from [Character visuals](CHARACTER-VISUALS.md), the sole appearance authority.

## Source and review

Reviewed the nine current neutral runtime portraits and Soma's transformed portrait visually on 27 October 2026. References are the linked runtime exports, not removed historical sheets. Observation is not new user approval of the art. The user approved the previously proposed full-body outfit extensions for Rebeka, Boglárka and Gréta in this task. The user requested appearance revisions for Virág/supporting cast but has not yet specified changes; preserve existing identities pending that decision. No images generated or runtime files changed.

## Assemble a prompt

Attach the character's current portrait as an identity reference. Combine the shared positive block, that character's positive block, and one framing/expression variant. Combine shared and character-specific negative blocks. For generators without a negative-prompt field, append them as an “Avoid” instruction. Do not rely on a character name alone. Keep anatomical left/right explicit; do not mirror identity marks. Heights guide relative full-body scale, not visible text or measurements in the image.

### Shared positive prompt

```text
Detailed non-pixel anime character illustration for a gothic romance visual novel, controlled clean linework, crisp cel shading, restrained highlights, consistent adult anatomy. One character only. Use the attached current runtime portrait as the identity reference; preserve face shape, hairline, hairstyle, eye colour, body type and costume colours. Head-and-shoulders dialogue portrait, complete hair crown, both shoulders visible, consistent eye line and scale across the set, relaxed upright pose, neutral attentive expression, soft even lighting, genuinely transparent background, clean alpha edges. No lettering.
```

### Shared negative prompt

```text
pixel art, photorealism, 3D render, rough sketch, inconsistent rendering, childlike proportions, oversized chibi head, exaggerated anatomy, distorted face, asymmetrical eyes, extra limbs or fingers, fused hands, duplicate person, extra character, cropped hair crown, cut-off chin, extreme perspective, scenery, props not requested, opaque background, checkerboard baked into image, halo, text, logo, signature, watermark, costume or identity drift
```

## Character blocks

### Rebeka Dorn

Identity reference: [current portrait](../../assets/characters/rebeka/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
20-year-old adult woman, 175 cm, tall slender build, pale skin, angular face tapering to a pointed chin, narrow violet eyes with dark upper lashes, fine dark eyebrows, small defined nose, muted berry-pink lips. Long straight glossy black hair with forehead fringe; a single vivid plum-purple streak falls on her anatomical left, viewer right in a frontal image. One small beauty mark below her anatomical left eye. Proud direct gaze. High-neck black dress and broad plain silver choker.
```

**Negative prompt — append to shared negatives**

```text
mirrored plum streak, multiple coloured streaks, missing or duplicated beauty mark, beauty mark on the right, curly hair, ornate hairstyle, bright costume, gold necklace
```

**Full-body guidance:** Long-sleeved black midi dress and low-heeled black ankle boots; preserve tall slender proportions.

### Boglárka Fazekas

Identity reference: [current portrait](../../assets/characters/boglarka/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
19-year-old adult woman, 150 cm, short with softly fuller proportions, round adult face with a gently tapered chin, fair warm skin, dense fine freckles across cheeks and nose, warm brown eyes with amber highlights, soft brown eyebrows, small nose, soft pink lips. Chestnut-brown hair with loose face-framing strands and one thick loose side braid over her anatomical right shoulder, viewer left frontally. Attentive quiet expression. Moss-green cardigan open over a cream dress with a rounded neckline.
```

**Negative prompt — append to shared negatives**

```text
childlike face or body, missing freckles, braid on anatomical left, twin braids, black hair, thin angular build, oversized timid eyes
```

**Full-body guidance:** Below-knee cream dress, hip-length moss-green cardigan, flat brown shoes; retain short adult stature and softly fuller silhouette.

### Gréta Váradi

Identity reference: [current portrait](../../assets/characters/greta/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
21-year-old adult woman, 168 cm, slim athletic silhouette, fair skin, rectangular adult face with a defined jaw, clear blue eyes, fine copper-brown eyebrows, restrained natural pink lips. Copper-orange hair with a simple side part, swept neatly back into a practical low ponytail. Thin dark rectangular glasses. Alert direct expression. Fully buttoned white collared shirt and tailored forest-green buttoned vest.
```

**Negative prompt — append to shared negatives**

```text
pencil in hair, elaborate updo, missing glasses, round oversized glasses, copied beauty mark, unbuttoned shirt, tie, soft childlike proportions
```

**Full-body guidance:** Graphite knee-length skirt and low-heeled black loafers; preserve the fully buttoned shirt and forest-green vest.

### Virág

Identity reference: [current portrait](../../assets/characters/virag/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
19-year-old petite adult woman; exact height unspecified. Fair skin, defined adult jaw and chin, grey-blue eyes with dark upper lashes, fine blue-dark eyebrows, small confident smile. Vivid cobalt-blue short pixie haircut with a long side-swept fringe and closely shaped sides, ears partly exposed. Confident teasing expression and relaxed self-assured posture. Fitted white blouse with open collar, burgundy cardigan worn open, charcoal pleated skirt. Preserve current adult proportions.
```

**Negative prompt — append to shared negatives**

```text
childlike face, twin tails, long hair, pastel blue hair, green eyes, closed high collar, school insignia, school uniform badge, invented accessories
```

**Full-body guidance:** Dark tights and black ankle boots; retain the existing blouse, cardigan and charcoal pleated skirt. Height remains unspecified.

### Végh Soma — human

Identity reference: [current portrait](../../assets/characters/soma/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
Adult Hungarian university assistant, exact age unspecified, ordinary and less conventionally handsome, slightly stocky with a small belly. Light warm skin, broad adult face, strong dark eyebrows, dark muted eyes, substantial nose, dark moustache with no full beard, short tousled black hair swept loosely to one side. Reserved slightly weary expression. Brown V-neck knitted vest over a light cream collared shirt with open top button. Retain modest, ordinary proportions.
```

**Negative prompt — append to shared negatives**

```text
clean-shaven face, full beard, glamorous model face, lean muscular body, red eyes, fangs, vampire cape, aristocratic costume
```

**Full-body guidance:** No approved full-body sheet or lower-body costume; request a decision before inventing trousers or footwear.

### Végh Soma — transformed

Identity reference: [current portrait](../../assets/characters/soma/transformed-v1.webp).

**Positive prompt — append to shared block**

```text
The same adult man as human Soma: identical face, black hair, dark moustache, ordinary features, brown knitted vest and light collared shirt. Only modest weight loss, glowing red irises and pointed upper canine fangs. Preserve recognizability and restrained transformation; no gore.
```

**Negative prompt — append to shared negatives**

```text
different identity, missing moustache, extreme emaciation, muscular makeover, monstrous face, pointed ears, wings, cape, blood, gore
```

**Full-body guidance:** Same unresolved lower-body costume as human Soma; transformation must not introduce a new costume.

### Dr. Farkas Dénes

Identity reference: [current portrait](../../assets/characters/denes/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
Mature adult man, exact age not fixed; visible forehead and eye-area lines, warm light-to-medium skin, broad defined face, dark muted eyes, thick brows. Short swept-back dark hair with conspicuous silver-grey at the temples, short salt-and-pepper beard and moustache. Calm attentive expression. White medical coat with lapels over an open-collar charcoal shirt.
```

**Negative prompt — append to shared negatives**

```text
youthful smooth face, clean-shaven face, long beard, entirely black hair, stethoscope or medical props not requested, invented insignia
```

**Full-body guidance:** Lower-body costume unspecified.

### Dr. Sárközi Júlia

Identity reference: [current portrait](../../assets/characters/julia/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
Mature adult woman, exact age not fixed, warm light skin, oval adult face, defined cheekbones, dark brown eyes, fine arched dark brows, muted rose lips. Short voluminous dark brown-black curly bob around the jaw, softly side-parted. Quietly attentive expression. Dark navy blazer over a softly draped grey-green open-neck blouse; small understated round earrings visible in the reference.
```

**Negative prompt — append to shared negatives**

```text
young student face, straight long hair, copper hair, glasses, ornate jewellery, white medical coat
```

**Full-body guidance:** Lower-body costume unspecified.

### Dr. Kerekes Áron

Identity reference: [current portrait](../../assets/characters/aron/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
Older man in his late sixties, light skin, long angular face, lined forehead, visible eye-area and cheek lines, deep-set dark eyes, grey eyebrows, clean-shaven face. Short silver-grey hair swept back and to the side, thin rectangular metal-framed glasses. Serious direct gaze, closed mouth. Dark charcoal suit jacket, pale collared shirt and burgundy tie.
```

**Negative prompt — append to shared negatives**

```text
young face, auburn hair, tweed jacket, beard, missing glasses, black hair without grey, friendly exaggerated grin
```

**Full-body guidance:** Suit trousers and footwear are not specified by the portrait; confirm before full-body production.

### Lilla

Identity reference: [current portrait](../../assets/characters/lilla/neutral-v1.webp).

**Positive prompt — append to shared block**

```text
Adult woman in her early thirties, fair skin, oval face tapering gently at the chin, muted grey-green eyes, soft brown brows, natural pink lips and restrained slight smile. Shoulder-length chestnut-brown hair with soft waves and a loose forehead fringe, natural volume around the face. Teal knitted cardigan worn open over a pale cream buttoned collared blouse.
```

**Negative prompt — append to shared negatives**

```text
teenage face, dark-blonde hair, plum sweater, blue pixie cut, elaborate hairstyle, exaggerated grin
```

**Full-body guidance:** Lower-body costume unspecified.

## Framing and expressions

- **Portrait:** Use the shared framing as written. Current exports vary from bust to waist/hip; new portrait batches must use the same crop and eye line. Preserve visible costume construction without inventing off-canvas details.
- **Full body:** Replace the shared head-and-shoulders sentence with “Full body from complete hair crown to soles, comfortable margin around all limbs, natural standing pose, hands relaxed and visible, neutral perspective, same scale throughout the set.” Append the character's full-body guidance only where approved. Do not attempt undefined supporting-cast outfits yet.
- **Amused:** Small natural smile; Rebeka slightly sardonic, Boglárka dry and understated, Gréta direct and warm, Virág knowing and playful.
- **Displeased:** Tension in brows and mouth, recognizably the same face; no rage caricature.
- **Vulnerable:** Subtle softened gaze and reduced composure; preserve adult features, no compulsory tears.
- **Affectionate:** Warm eye contact and a restrained personal smile; same clothing and physical identity. Gréta's affectionate art is currently missing; this prompt is preparation, not an asset-completion claim.
- Change only the expression for expression variants. Do not change hair, costume, age, body or lighting. Use the neutral portrait as the identity master each time.

## Decisions still needed

1. Which of Virág, Soma, Dénes, Júlia, Áron and Lilla should change, and what exact face, hair, build, age presentation or costume changes are intended? Existing user-approved older Áron/Lilla and moustached Soma remain canon until superseded explicitly.
2. Is Virág's height worth fixing numerically? Her petite adult build is established, exact height is not.
3. Review the observed eye colours/material details in CHARACTER-VISUALS.md if changing the current look. These are visual observations, not measurements from original source art.
4. Supporting-cast full-body garments and footwear remain undefined. Historical swimwear is still proposed; the everyday-outfit approval does not approve swimwear.

Márton has no established visible design or runtime portrait. Narration is not a visible character; no prompt is invented for either.
