# Recycling presentation — 27 October 2026

User request: make the match-three game more satisfying through animation and generated collectible artwork. This pass covers recycling; archive matching remains unchanged.

## Behavior

- Green glass bottle, blue plastic bottle, copper-colored drink can and purple glass bottle replace geometric glyphs. Labels and the CLI legend describe the actual objects.
- Adjacent swaps travel to their destination; unsuccessful swaps return without spending a move. Matches pop with a brief sparkle, surviving pieces fall and replacements enter from above. Each cascade displays points and its existing 2×/3× multiplier. Dead-board reshuffles have explicit feedback.
- A free optional hint outlines a legal pair. Input is locked during playback to prevent overlapping moves. Final rewards appear after the last animation.
- The existing resolver optionally emits transient frames; browser, CLI, scoring, randomness, rewards and move budgets use the same calculation. The final result is saved immediately, so leaving/reloading during playback resumes the settled board. Frames never enter saves. No compatibility epoch changes are needed.
- Reduced-motion users get static phase feedback with short delays and no transforms/sparkles. No timers constrain player decisions.

## Asset record

Built-in ChatGPT image generation; prompt in [prompt.txt](../assets/generated/recycling/prompt.txt). One 2×2 transparent atlas, four objects; top-left green glass, top-right blue plastic, bottom-left copper can, bottom-right purple glass. Assistant inspected the generated source and optimized export for identity, crop, transparency and distinct shapes. Final user style acceptance is pending.

| File | Dimensions / alpha | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `assets/generated/recycling/collectibles-source.webp` | 1254×1254 RGBA | 206902 | `0d71894611a72fb34ae01fdadb9428e42f85a165642af96e5292a9c2283e1d04` |
| `assets/minigames/recycling/collectibles.webp` | 512×512 RGBA | 45614 | `b4c6e0c199be212161a6edf1ad3b8edbfd682b0fea17687a1d5eac00b800d452` |

The source WebP retains original dimensions; the runtime export is resized and optimized. Original generated PNG SHA-256 is recorded in provenance.json. Runtime selection is declared in `src/game/content/assets.ts`; Vite bundles the atlas directly. No base64 is stored in source.

## Verification

- TypeScript and Vite production build passed.
- All 12 leisure tests passed, including playback/committed-result equality through all 12 moves in each of 16 weekly boards (192 moves), score accounting and immutable inputs.
- Full local suite could not pass in the text-only connector checkout: existing image files/public symlink targets and the external CLI route script were not downloaded. These failures do not establish runtime regressions; the complete remote repository's Actions are the full-suite gate.
- Browser/mobile visual playback is not certified: local Playwright has no installed Chromium and its download returned an invalid archive. Source and optimized artwork were inspected; 320/390/1440px browser playback, keyboard focus, reduced-motion playback and final style acceptance remain review gates.
