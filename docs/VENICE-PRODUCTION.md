# Venice production inventory

> **Status:** Requested candidates; not final approved art. | **Purpose:** Trace every requested image to runtime or production-reference needs.

Generated with `node --experimental-strip-types tools/art-inventory.mjs`. Source: `scripts/venice/catalog.mjs` plus the active scene registry. 32 runtime images and 5 reference sheets. Lilla's portrait is added to the plan's 31-image minimum because her direct interview dialogue is now present in the runtime. Márton remains the viewpoint character and needs no invented face.

The user requested Venice generation on 19 October 2026 and selected WAI Illustrious + FireRed. The initial WAI portrait uses 1024×1280; reference edits use FireRed. Portrait alpha is extracted through Venice, with raw billed outputs checkpointed before extraction. The first request generates Rebeka's neutral portrait and the classroom; these are inspected together before production is expanded. Each expression is edited from that woman's neutral master. Soma's transformed form is edited from his human master. Lighting edits retain the generated base architecture. Existing backgrounds provide location/mood references, not a pixel style target. Additional cast appearances are explicitly proposed designs awaiting final acceptance.

| Asset | Use | Output under assets/generated/venice | Source references |
| --- | --- | --- | --- |
| `rebeka_neutral` | Speaker rebeka; neutral; 31 scenes | `portraits/rebeka/neutral.png` | New written design |
| `classroom` | classroom; day; 6 scenes at base location | `backgrounds/classroom.png` | repo:assets/backgrounds/classroom.jpg |
| `boglarka_neutral` | Speaker boglarka; neutral; 31 scenes | `portraits/boglarka/neutral.png` | rebeka_neutral |
| `greta_neutral` | Speaker greta; neutral; 25 scenes | `portraits/greta/neutral.png` | rebeka_neutral |
| `soma_neutral` | Speaker soma; neutral; 6 scenes | `portraits/soma/neutral.png` | rebeka_neutral |
| `denes_neutral` | Speaker denes; neutral; 8 scenes | `portraits/denes/neutral.png` | rebeka_neutral |
| `julia_neutral` | Speaker julia; neutral; 9 scenes | `portraits/julia/neutral.png` | rebeka_neutral |
| `aron_neutral` | Speaker aron; neutral; 7 scenes | `portraits/aron/neutral.png` | rebeka_neutral |
| `lilla_neutral` | Speaker lilla; neutral; 1 scenes | `portraits/lilla/neutral.png` | rebeka_neutral |
| `rebeka_amused` | Speaker rebeka; amused; 31 scenes | `portraits/rebeka/amused.png` | rebeka_neutral |
| `rebeka_displeased` | Speaker rebeka; displeased; 31 scenes | `portraits/rebeka/displeased.png` | rebeka_neutral |
| `rebeka_vulnerable` | Speaker rebeka; vulnerable; 31 scenes | `portraits/rebeka/vulnerable.png` | rebeka_neutral |
| `rebeka_affectionate` | Speaker rebeka; affectionate; 31 scenes | `portraits/rebeka/affectionate.png` | rebeka_neutral |
| `boglarka_amused` | Speaker boglarka; amused; 31 scenes | `portraits/boglarka/amused.png` | boglarka_neutral |
| `boglarka_displeased` | Speaker boglarka; displeased; 31 scenes | `portraits/boglarka/displeased.png` | boglarka_neutral |
| `boglarka_vulnerable` | Speaker boglarka; vulnerable; 31 scenes | `portraits/boglarka/vulnerable.png` | boglarka_neutral |
| `boglarka_affectionate` | Speaker boglarka; affectionate; 31 scenes | `portraits/boglarka/affectionate.png` | boglarka_neutral |
| `greta_amused` | Speaker greta; amused; 25 scenes | `portraits/greta/amused.png` | greta_neutral |
| `greta_displeased` | Speaker greta; displeased; 25 scenes | `portraits/greta/displeased.png` | greta_neutral |
| `greta_vulnerable` | Speaker greta; vulnerable; 25 scenes | `portraits/greta/vulnerable.png` | greta_neutral |
| `greta_affectionate` | Speaker greta; affectionate; 25 scenes | `portraits/greta/affectionate.png` | greta_neutral |
| `soma_vampire` | Speaker soma; transformed; 6 scenes | `portraits/soma/vampire.png` | soma_neutral |
| `library` | library; day; 9 scenes at base location | `backgrounds/library.png` | repo:assets/backgrounds/library.jpg, classroom |
| `department` | department; day; 6 scenes at base location | `backgrounds/department.png` | repo:assets/backgrounds/department.jpg, classroom |
| `holdkor` | holdkor; night; 3 scenes at base location | `backgrounds/holdkor.png` | repo:assets/backgrounds/holdkor-night.jpg, classroom |
| `courtyard` | courtyard; day; 22 scenes at base location | `backgrounds/courtyard.png` | repo:assets/backgrounds/courtyard.jpg, classroom |
| `apartment` | apartment; day; 3 scenes at base location | `backgrounds/apartment.png` | repo:assets/backgrounds/apartment.jpg, classroom |
| `bekas` | bekas; day; 3 scenes at base location | `backgrounds/bekas.png` | repo:assets/backgrounds/bekas-to.jpg, classroom |
| `chamber` | chamber; day; 2 scenes at base location | `backgrounds/chamber.png` | classroom, holdkor |
| `classroom_dusk` | classroom; evening; 6 scenes at base location | `backgrounds/classroom_dusk.png` | classroom |
| `courtyard_night` | courtyard; night; 22 scenes at base location | `backgrounds/courtyard_night.png` | courtyard |
| `library_evening` | library; evening; 9 scenes at base location | `backgrounds/library_evening.png` | library |
| `rebeka_identity_sheet` | Non-runtime identity/material reference | `references/rebeka-identity.png` | rebeka_neutral |
| `boglarka_identity_sheet` | Non-runtime identity/material reference | `references/boglarka-identity.png` | boglarka_neutral |
| `greta_identity_sheet` | Non-runtime identity/material reference | `references/greta-identity.png` | greta_neutral |
| `soma_identity_sheet` | Non-runtime identity/material reference | `references/soma-identity.png` | soma_neutral |
| `architecture_sheet` | Non-runtime identity/material reference | `references/castle-architecture.png` | classroom, courtyard, chamber |

## Runtime and production boundaries

Candidates are saved to the repository and uploaded as an Actions artifact. They do not become runtime assets merely because the API returned a file. The provenance manifest records prompts, model IDs, source hashes, dimensions, alpha-channel presence, request ID and generation status. Keys and request/response bodies containing image data are never logged or persisted.

Final acceptance checks: adult character identity; correct left/right marks; no drift between expressions; same crop/eye line/outfit; usable alpha; no text or watermark; clear seated player viewpoint; an empty natural companion seat; recognizable locations; consistent daylight and evening variants; desktop/mobile readability. The assistant and supporting cast are design proposals until reviewed. The architecture sheet is a visual materials reference, not a measured plan.

The initial request has a two-new-image budget. A follow-up production request can reuse verified outputs and request the remaining dependency-ordered images. Interrupted runs preserve completed outputs and their hashes; a rerun never silently replaces a different prompt/reference signature.

## Actual execution status — 21 October 2026

**4/37 Venice candidates generated; 33 remain.** The one-image Boglárka and Gréta requests succeeded (Actions runs 39599840142 and 39600565764), so the historical HTTP 402 is no longer the current block. No billing settings were changed. The previous alpha endpoint HTTP 403 was not retested.

Three neutral portraits and the classroom are now reviewed and registered in the runtime. Built-in imagegen produced transparent identity-cleaned derivatives of the Venice portraits: Rebeka's single beauty mark/crown, Boglárka's correct-side braid/crown, Gréta's removal of copied marks/buttoned shirt/matching crop. Original Venice candidates remain unchanged. Full-resolution cutouts and export hashes are in `assets/generated/portrait-cutouts/manifest.json`; runtime uses 640×800 WebP portraits and a 1280×720 classroom WebP. This is four reviewed runtime assets, not completion of the 32-image set or final user art approval.

Next: derive the twelve main-character expressions from the CLEANED neutral masters, one at a time. Then review supporting cast, Soma's transformation, remaining locations and lighting variants, and finally reference sheets. The current production catalog still describes the opaque Venice-source dependency chain; do not run expression batches from those uncorrected sources. Retain the existing backgrounds until their replacements pass review. No unattended production or paid retry is scheduled.
