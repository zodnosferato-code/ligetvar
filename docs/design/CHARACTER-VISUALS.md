# Character visual design

> **Status:** Active visual authority, reconciled 27 October 2026. | **Purpose:** Keep every character's appearance, identity references and approval status in one place.

This is the single maintained written source for character appearance. Story roles and voice belong in [character voices](CHARACTER-VOICES.md) and [Virág's story](../VIRAG-STORY.md); runtime selection belongs in `src/game/content/assets.ts`. Production prompts are implementations of this brief, never an independent authority. Historical prompts, manifests and design documents do not override it.

## Shared visual rules

Detailed non-pixel anime illustration, controlled linework, crisp cel shading and consistent adult proportions. Preserve each person's face, hair, body type and signature outfit across expressions. Use simple hairstyles; no pencil in Gréta's hair. Avoid exaggerated abdominal volume. Portraits use transparent backgrounds, a complete hair crown, consistent head-and-shoulders framing and eye line. The speaking NPC overlays the location background; Márton and narration have no portraits.

Use each current neutral runtime portrait as the available identity reference. Earlier cleaned PNG masters and ChatGPT reference sheets are no longer in the current tree: do not link to them or claim they are available. Existing Venice candidates are production history and must not replace reviewed runtime identities automatically. Full-body clothing extensions below remain proposals where indicated.

## Main women

| Character | Age / height | Identity and appearance | Signature clothing | Current reference |
| --- | --- | --- | --- | --- |
| Rebeka Dorn | 20 / 175 cm | Tall, slender; angular adult face, pale skin, long straight black hair. One plum streak on her anatomical left (viewer right frontally), one beauty mark below her left eye. Proud direct gaze, berry lips. | High-neck black dress, simple silver choker. Long-sleeved midi construction and low-heeled black ankle boots approved 27 October 2026. | [Neutral portrait](../../assets/characters/rebeka/neutral-v1.webp) |
| Boglárka Fazekas | 19 / 150 cm | Short adult woman with a softly fuller figure, round adult face, freckles, warm brown eyes. Brown loose side braid over her anatomical right shoulder (viewer left frontally). Quietly attentive, never childlike. | Moss-green cardigan over cream dress. Below-knee hem, hip-length cardigan and flat brown shoes approved 27 October 2026. | [Neutral portrait](../../assets/characters/boglarka/neutral-v1.webp) |
| Gréta Váradi | 21 / 168 cm | Slim athletic silhouette, rectangular adult face, copper hair in a practical ponytail, thin rectangular glasses. Alert, direct presence; no copied beauty marks. | Fully buttoned white shirt, forest-green vest, graphite skirt. Knee-length hem and low-heeled black loafers approved 27 October 2026. | [Neutral portrait](../../assets/characters/greta/neutral-v1.webp) |
| Virág | 19 / 160 cm | Petite adult woman, vivid green pixie haircut, grey-blue eyes, confident teasing expression. Preserve adult facial proportions. | Open-collar fitted white blouse, burgundy cardigan, charcoal pleated skirt, dark tights, black ankle boots. Deliberately flirtatious college-inspired look. | [Neutral portrait](../../assets/characters/virag/neutral-v1.webp) |

Rebeka, Boglárka and Virág have five runtime expressions: neutral, amused, displeased, vulnerable and affectionate. Gréta has four; affectionate falls back to neutral. General art-set acceptance remains open; assistant review is not user approval.

## Supporting cast and viewpoint

| Character | Current appearance | Status / identity reference |
| --- | --- | --- |
| Végh Soma | Ordinary, less conventionally handsome Hungarian university assistant: black hair, moustache, slightly stocky build with a small belly, brown knitted vest over a light shirt. Transformation retains the same face, moustache and clothes, with modest weight loss, pointed fangs and glowing red eyes. Do not restore the lean clean-shaven proposal. | User-approved final design. [Human](../../assets/characters/soma/neutral-v1.webp), [transformed](../../assets/characters/soma/transformed-v1.webp). Human in week 1; transformed from week 2. |
| Dr. Farkas Dénes | Mature man with dark hair greying at the temples, short beard, white medical coat over a dark shirt; calm attentive expression. Earlier production brief suggested about 50; exact age is not newly fixed here. | Assistant-reviewed runtime design; final general style approval open. [Portrait](../../assets/characters/denes/neutral-v1.webp). |
| Dr. Sárközi Júlia | Mature woman with short curly dark hair, dark blazer and grey-green blouse, quietly attentive expression. Earlier brief suggested about 48; exact age is not newly fixed here. | Assistant-reviewed runtime design; final general style approval open. [Portrait](../../assets/characters/julia/neutral-v1.webp). |
| Dr. Kerekes Áron | Older man in his late sixties, grey hair, glasses, dark suit and burgundy tie, serious direct gaze. Supersedes the younger auburn-haired tweed-jacket proposal. | User-approved final older design. [Portrait](../../assets/characters/aron/neutral-v1.webp). |
| Lilla | Adult woman in her early thirties, shoulder-length brown hair, teal cardigan and pale collared blouse, restrained slight smile. Supersedes the 22-year-old dark-blonde/plum-sweater proposal. | User-approved final older design. [Portrait](../../assets/characters/lilla/neutral-v1.webp). |
| Márton | Teacher and study director; first-person viewpoint. No new visible face or body design is established by this audit. | No runtime portrait. |
| Narrator | Narrative voice, not a visible character. | No runtime portrait. |

## Costume and reference availability

Historical swimwear proposals: Rebeka black/plum bikini; Boglárka green/cream two-piece with high-waisted bottoms; Gréta sporty green top and swim shorts. The earlier ChatGPT costume sheets, three main-woman full-body sheets, Virág sheet and architecture sheet are absent from current main. They are historical production records, not available reference files or runtime costumes. Do not silently substitute the newer Venice full-body candidates for the removed reviewed sheets.

Current Venice full-body candidates exist for Rebeka, Boglárka, Gréta and Virág under `assets/generated/venice/portraits/<actor>/fullbody.png`. Candidate presence does not certify identity consistency, alpha, approval or runtime integration. Soma has no current full-body sheet.

## Maintaining consistency

1. Update this brief first when a user approves an appearance change; state what supersedes the old design.
2. Keep production identities consistent with this file, and derive expressions from the reviewed neutral portrait.
3. Update manifests and player-facing descriptions only after checking the actual exported image. Hungarian gameplay descriptions in `asset-descriptions.ts` are localized runtime content, not a second production brief.
4. Record generated, assistant-reviewed, user-approved and published states separately in the [art register](../ART-REGISTER.md). Never infer review from a nonzero file.

## Image-generation preparation — 27 October 2026

[Positive and negative prompt pack](CHARACTER-IMAGE-PROMPTS.md) derives production instructions from this authority. The user approved the three main women's full-body outfit extensions above, superseding their proposed status. No new full-body art was produced. The user asked to review portraits and describe them. Their subsequent 27 October decision fixes Virág at 160 cm with green pixie-cut hair and retains the existing supporting cast with small distinguishing details; see the production update below.

### Current portrait observations

Visually reviewed the nine neutral runtime portraits and Soma's transformed portrait. These observations describe the current rendered look; they do not claim exact colour sampling or final user approval.

| Character | Additional visible details useful for generation |
| --- | --- |
| Rebeka | Violet eyes; dark upper lashes; forehead fringe; muted berry-pink lips; silver choker is broad and plain. Preserve the written anatomical-left streak and beauty mark even in angled poses. |
| Boglárka | Chestnut-brown hair with loose face-framing strands; brown eyes with amber highlights; fine dense freckles across nose and cheeks; cream rounded neckline. |
| Gréta | Blue eyes; side-parted copper hair tied into a low ponytail; thin dark rectangular glasses; tailored green buttoned vest. |
| Virág | Long side-swept fringe within the cobalt pixie cut; ears partly exposed; grey-blue eyes; open cardigan and fitted buttoned blouse; confident small smile. |
| Soma | Strong dark brows, substantial nose, dark muted eyes, short tousled side-swept black hair and moustache without a full beard; brown V-neck knit vest and light open-collar shirt. Transformed portrait retains these with red eyes and pointed upper canines. |
| Dénes | Swept-back salt-and-pepper hair, pronounced grey temples, short salt-and-pepper beard and moustache, visible forehead/eye-area lines, charcoal open-collar shirt beneath medical coat. |
| Júlia | Jaw-length voluminous dark curly bob, dark brown eyes, muted rose lips, navy blazer, draped grey-green blouse and small understated round earrings. |
| Áron | Side-swept silver-grey hair, thin rectangular metal glasses, lined long angular face, clean-shaven, charcoal suit and pale shirt beneath burgundy tie. |
| Lilla | Softly wavy chestnut shoulder-length hair with loose forehead fringe; muted grey-green eyes; teal knit cardigan and pale cream buttoned collared blouse. |

Portraits currently have different crop lengths; new dialogue sets should follow the shared head-and-shoulders framing rather than copy each source crop. Exact ages not previously fixed, supporting-cast lower-body clothing and historical swimwear remain unresolved. New appearance revisions must name the affected character and superseded traits before prompt or asset changes.

## Production update — Virág and supporting details, 27 October 2026

User decision: Virág is **160 cm** and has a **green pixie cut**, superseding cobalt-blue hair and unspecified height. Retain her face, grey-blue eyes, adult proportions, long side-swept pixie fringe and existing outfit. Use vivid medium green, visibly green rather than teal or cyan, as the production colour interpretation. Her existing blue-haired portrait is a face/cut/costume reference only; its hair colour must not override this update. Current portraits, posters and animation frames have not been recoloured in this documentation pass.

The other supporting characters retain their established age presentation, faces, hair, builds and base outfits. The user authorized small distinguishing additions; the following clothing details are production choices under that direction, not features observed in the existing portraits. Preserve each detail across expressions; never copy it to another character.

| Character | New distinguishing detail |
| --- | --- |
| Soma | A small, slightly crooked rectangular brass pin on his anatomical-left vest chest (viewer right frontally); plain unlettered metal, not an occult emblem. |
| Dénes | One dark burgundy pen clipped into the anatomical-left breast pocket of his white medical coat (viewer right frontally); no lettering or badge. |
| Júlia | A small matte silver ginkgo-leaf brooch on her anatomical-left blazer lapel (viewer right frontally), retaining her existing small round earrings. |
| Áron | A narrow brushed-silver horizontal tie bar across the lower visible part of his burgundy tie; no crest, chain or lettering. |
| Lilla | Three small cream floral embroidery motifs grouped at the anatomical-left cardigan neckline (viewer right frontally); subtle stitched texture, not a print or logo. |

Soma retains the same pin in human and transformed forms. It is ordinary clothing decoration and must not imply new supernatural lore or evidence. These additions are documented for future art, not yet present in runtime exports. Márton remains unseen; no visible player design is introduced. Supporting-cast full-body clothes and shoes remain undefined.
