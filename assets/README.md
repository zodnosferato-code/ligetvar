# Game assets

> **Status:** Active. | **Purpose:** Asset organization and authoritative references.

| Location | Contents / authority |
| --- | --- |
| `characters/<actor>/` | Reviewed runtime WebP portraits; selected by `src/game/content/assets.ts` |
| `backgrounds/` | Runtime locations and lighting variants; `courtyard.jpg` is also retained for the title screen |
| `animations/<actor>/` | Moment loops and separate static posters; selected by `src/game/content/animations.ts` |
| `icons/` | Planning-object and UI icons |
| `generated/venice/` | Production candidates, raw outputs and provenance; not evidence of runtime approval |

The [character visual reference](../docs/CHARACTER-REFERENCES.md) contains all maintained written character designs. The [art register](../docs/ART-REGISTER.md) records current coverage and organization findings. Use the [asset workflow](../docs/ASSET-AGENT-WORKFLOW.md) for generation and publication; never print image payloads or base64.

Backgrounds use detailed non-pixel anime art with a gothic castle-college atmosphere and subtle modern fixtures. Frame conversations from the player's position with a natural empty companion seat. Preserve planner object positions and verify hotspot alignment when replacing office or bedroom art.

Earlier ChatGPT masters, reference sheets and archived art folders are absent from current main. Historical documentation may describe their earlier creation; that is not a claim that the files remain available. New production sources belong under `generated/`; reusable reviewed reference sheets may use `references/` when actually created. Do not create empty reference directories or invent missing files.
