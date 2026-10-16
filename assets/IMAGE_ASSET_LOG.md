# Image Asset Log - Ligetvár

**Date reviewed**: 2026-10-16  
**Reviewed by**: Grok (AI assistant)  
**Purpose**: Describe existing images in `assets/` and note potential uses in the pixel dating simulator. Flag/remove unusable images with severe anatomical errors (missing arms, extra limbs, etc.).

All images are AI-generated in a detailed pixel-manga / downscaled pixel art style matching the visual bible. They serve as high-resolution references for further pixel art conversion, consistency in generation, or direct use in the web/Tauri game.

## Summary of Review
- Sampled character full-body, face, emotion, background, icon, and multiple intimate reference images.
- Most images are usable: correct limb count (two arms, two legs), consistent character designs (Boglárka: brown braid, freckles, soft features; Gréta: red ponytail, glasses, freckles; Rebeka: long black/purple hair, choker, gothic look).
- Hands/fingers are often simplified or slightly imperfect (common in AI gen), but no clear cases of 0/3+ arms or major unusable deformities in sampled images.
- **Removed**: `assets/characters/greta/greta-face-front.jpg` — contained a large gibberish text banner overlay (AI artifact) at the bottom, making it unusable as a clean face reference.

## Categories and Potential Uses

### 1. Character Full-Body Clothed (`assets/characters/{name}/{name}-full-front-clothed.jpg`)
- **Boglárka**: Young woman in green cardigan, white dress, holding a book, brown braid, freckles. Soft, student-like appearance.
- **Gréta**: Red hair ponytail, glasses, green sweater vest over white shirt, gray skirt, heels. Professional/teacher or older student vibe.
- **Rebeka**: Long black hair with purple streak, black turtleneck dress, boots, choker. Darker, more mature/goth aesthetic.
- **Uses**: Base standing sprites for dialogue scenes, character selection screen, overworld or first-person POV encounters, style reference for pixelization.

### 2. Character Faces and Emotions (`assets/characters/{name}/`)
- Face-front and emotion variants (smile, blush, trust, flustered, yielding, anger, halfsmile, vulnerable).
- Close-up portraits showing expression changes.
- **Uses**: Dialogue portrait system (common in visual novels/dating sims), emotion overlays or separate sprites, character profile cards, generation seeds for consistent faces.

### 3. Backgrounds (`assets/backgrounds/`)
- **library.jpg**: Gothic stone library with bookshelves, arched windows, moonlight, table with papers/book — atmospheric night study.
- **classroom.jpg**: Gothic hall classroom with wooden desks, arched windows showing mountains, candlelight.
- **apartment.jpg**: Cozy stone-walled bedroom with bed, armchair, window overlooking city/castle, bookshelves, candle.
- Others: courtyard, department, hallway, holdkor-night, bekas-to.
- **Uses**: Scene backgrounds for different locations in the 16-week semester game (university library, classroom, dorm/apartment, courtyard). Perfect for visual novel style scenes.

### 4. Icons (`assets/icons/`)
- Pixel-style icons: book, bottles, chair, door, phone, shelf.
- Clean, simple, game-ready.
- **Uses**: UI elements — inventory items, interactable objects, menu icons, location markers.

### 5. Intimate / NSFW References (`assets/references/intim/`)
- Large set of escalation-band images (light / medium / hardcore) for all three characters, plus some duo scenes (kisses, makeouts).
- Poses include: standing nude, all-fours, kneeling, bent over, reclining/spread, self-touch, lingerie, bound, wet/bath, hallway flash, library/office settings, etc.
- Character-consistent: Boglárka soft and blushy, Gréta with glasses often, Rebeka with choker and darker vibe.
- Settings match the gothic university/apartment aesthetic (stone walls, banners with lions, lanterns, purple bedding).
- **Uses**:
  - Reference material for planning and generating the intimate scenes (as noted in the intim README and 31-szexuális-jelenetek-terv.md).
  - Style and pose references for pixel art versions of adult content.
  - Consistency checks for AI generation of further scenes.
  - Not intended as final in-game assets without pixel conversion (high detail).

## Notes for Future Generation
- Stick to the locked character descriptions in `CHARACTER_LOCKS.md` and `WORKING_PROMPTS.md`.
- Prefer clean compositions without text overlays or severe anatomy errors.
- Full-body and face refs are the strongest for consistency.
- Backgrounds are excellent and ready for use or further refinement.

This log can be updated as more images are added or refined.
