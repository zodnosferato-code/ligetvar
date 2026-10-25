# Key-moment animation plan

> **Status:** GIF/WebP player implemented in 0.5.0; first real wink pilot added in 0.6.0. | **Purpose:** Affordable, consistent movement for selected story moments.

## Decision: short loops from a few authored images

The user clarified on 25 October 2026 that movement should look like GIFs. Use **animated WebP**, with GIF accepted when necessary, built from **3–6 consistent keyframes**. Target 1.5–3 seconds with held poses and an intentional return to the starting pose. This is limited animation: a character leans closer, links arms, smiles after a kiss or settles against a shoulder. Do not pretend that scaling a still portrait depicts these actions. Avoid video generation for the normal production path.

Use a held contact pose plus subtle hair/eye motion for a kiss instead of repeatedly approaching and withdrawing in a mechanical loop. Every physical event is still narrated; animation never supplies missing consent or plot information. A scene transition remains one activity.

**Engineering recommendation, not a measured quote:** pilot one 4-frame clip, one approved reference/composition plus three reference edits. Budget up to two attempts per frame (8 attempts total); review before expanding production. For three 4-frame clips, the planning estimate is 12 accepted images and at most 24 attempts. Reuse neutral frames and backgrounds where they fit. Actual cost is the provider's current output/edit charges times attempts, including charged reference inputs; account plans and rejected generations matter. No paid provider calls were made in this work.

## Format and runtime contract

- Prefer 640×800 for a character shot or 960×640 for a two-person/player-view composition; maximum 1280 per side. No need for full-screen 4K.
- Aim below 750 KB per loop; hard metadata limit 1.5 MB. Duration 500–4000 ms. One visible loop at a time, only on its authored node.
- A distinct still poster is mandatory. Reduced-motion users receive the poster before any animated resource is requested. Pause replaces the animation resource with the poster; resume restarts the loop. It does not preserve frame position.
- `Line.moment` refers to `MOMENT_CLIPS`. `reviewed` entries require local animation and poster paths, dimensions, duration, byte size and an accurate description. `planned` entries have no files and use the normal scene/portrait presentation. Planned descriptions identify intent, never claim visible artwork.
- The `Moment` component fits the scenery, provides a keyboard/touch pause control, reacts to OS reduced-motion changes, and falls back to the poster on failed animation loading. If that also fails, show the description. Choices remain usable immediately; no animation timers trigger game effects.
- Save/resume derives the requested clip from scene/line IDs. No playback position is saved. CLI JSON includes the intended moment, status and `rendered` flag; narration communicates the action in terminal mode. CLI does not load images or need graphics/network credentials.
- Current hooks: `virag_1/arm`, `virag_4/kissed`, `virag_7/cuddled`. Those three pose assets remain planned. The new `virag_1/invite` wink is reviewed and active; all five portraits and the daytime hallway are now present.

## Provider comparison — primary-source review, 25 October 2026

| Tool | Useful role | Production constraints |
| --- | --- | --- |
| ChatGPT image generation/editing | Identity master, composition, reference edits for each key pose, transparent portraits | Current project choice after Venice credits ran out. Generate stills; local tooling assembles the loop. Inspect hand/anatomy consistency and framing. |
| Grok Imagine | Alternative reference-guided image generation/editing for matching poses | Image and video endpoints exist; choose image edits for this workflow. Verify current models, input charges and access before switching. No credentials or integration added. |
| Venice | Existing WAI/FireRed tooling, reference edits and background removal | Existing account-specific model availability must be checked. Transparency depends on model capabilities; post-removal is separate. Credits were reported exhausted; no requests resumed. |

Primary sources:

- [ChatGPT Images](https://help.openai.com/en/articles/11084440-images-in-chatgpt): image creation, edits and transparent backgrounds.
- [OpenAI image generation](https://developers.openai.com/api/docs/guides/image-generation): image generation and editing APIs.
- [Grok Imagine overview](https://docs.x.ai/developers/model-capabilities/imagine): image editing with references and separately priced video generation. Prices/model identifiers are deliberately not pinned in the game.
- [Venice image editing](https://docs.venice.ai/guides/media/image-editing) and [transparent backgrounds](https://docs.venice.ai/guides/media/transparent-backgrounds): reference editing and alpha workflows.
- [Google WebP guide](https://developers.google.com/speed/webp): animation, full colour and alpha. [FAQ](https://developers.google.com/speed/webp/faq): generally lower size than GIF, but decode costs vary; its historical benchmark is not a performance promise for this game.
- [webpmux](https://developers.google.com/speed/webp/docs/webpmux): assemble still WebP frames, set frame durations/loop count. [gif2webp](https://developers.google.com/speed/webp/docs/gif2webp): convert a reviewed GIF if needed.
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion): user preference detection. Animated images require source substitution, not merely disabling CSS animation.

## Production pipeline and remaining gates

1. Approve Virág's adult identity sheet: 19, petite adult proportions, short blue hair, expressive confidence; college-inspired pleated skirt, blouse and cardigan. Her undercover first-year styling is adult campus clothing. No childlike anatomy or school setting.
2. Storyboard the exact selected beat and camera. For hand contact and kissing, use a deliberately composed image; ordinary portrait framing is insufficient. Preserve player-view staging and do not introduce a permanent Márton dialogue portrait.
3. Generate the identity/composition master, then edit against that same approved master for each pose. Do not chain identity drift through unreviewed frames. Fix camera, canvas, background, outfit and light. Keep generated text out of frames.
4. Inspect each frame for identity, hands, proportions, background alignment and alpha edges. Align canvases deterministically, choose held-frame timing and assemble locally with webpmux or equivalent. Never send a full video job merely to obtain four frames.
5. Export an independent poster plus loop; inspect seams, repeated contact, flicker, apparent breathing and mobile crop. Verify actual dimensions, number of frames, duration, byte size and hashes, rather than trusting declared metadata.
6. Promote only reviewed exports under `assets/animations/`; record source prompts, reference hashes, provider/model, export hashes, dimensions and review status under `assets/generated/`. Update manifest description after viewing the actual clip.
7. Test playback, pause/restart, reduced-motion on initial load and after change, failures, save/reload and fast dialogue navigation at 320/390/1440px. Compare minimum mobile device performance before adding more clips. Check no advance/choice waits for playback and no unused animations download.

No new character/animation art was generated in 0.5.0. The roadmap distinguishes renderer implementation from actual art production and visual approval.

## First production pilot — 0.6.0

The user selected a blue pixie haircut and flirtatious blouse/cardigan/skirt styling. ChatGPT generated a full-body identity reference, five transparent expression portraits, a matching wink frame and an empty daytime hallway. The wink was assembled locally from neutral → amused → wink → amused with 1500/350/250/300 ms holds: **4 frames, 2400 ms, 355362 bytes**, 640×800 with alpha. A separate static poster is present. This is a facial loop, not an arm-link or kissing animation. Provenance and prompts: `assets/generated/chatgpt/virag-v1/`. No image-to-video or paid provider API was used. Runtime exports are WebP; original PNG sources remain in the repository.

The full-body image contains a soft backdrop haze and serves only as an identity reference. Runtime portraits were separately generated with clean transparent silhouettes. Final user art acceptance remains open. Dedicated physical-pose clips are still pending.
