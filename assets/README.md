# Game assets

> **Status:** Active. | **Purpose:** Asset locations, manifest, and current art brief.

AI agents must follow the [asset workflow](../docs/ASSET-AGENT-WORKFLOW.md) for generation, review and publication. Keep binary/base64 payloads out of model context and commit each image with a resumable checkpoint.

The active image manifest is `src/game/content/assets.ts`. The current location backgrounds are kept under `backgrounds/`; their atmosphere is the accepted baseline. The player-facing scene framing should feel like the player is present, with a natural place for the character to sit opposite them.

Character and background art are transitional. The approved direction is detailed, non-pixel anime illustration with crisp cel shading. Redraw characters while retaining key identifiers. Preserve the gothic background mood, add subtle modern college cues, and frame scenes from the seated player's point of view with a natural seat opposite in [the art register](../docs/ART-REGISTER.md).

Historical non-runtime assets have been removed to save space. Only active runtime assets listed in the manifest are retained.
