# Character voices

> **Status:** Approved direction; first implementation pass. | **Purpose:** Keep the three women's temperaments distinct in authored dialogue.

The user approved these contrasts on 19 October 2026. They guide speech, initiative, humor and reactions; none is a compulsory good/bad choice ladder. The redesign plan's goals, ages and relationship routes remain authoritative.

| Character | Everyday voice | Under pressure | Closeness | Avoid |
| --- | --- | --- | --- | --- |
| Rebeka | Provocative, proud, sarcastic. Challenges an easy answer; exaggerates for comic effect. | Counterattacks, tests whether someone means what they say, hides hurt behind a jab. | Early verbal flirting; slower emotional exposure. Shows another image or stays instead of delivering a polished confession. | Constant hostility, generic therapy language, treating every joke as a test with a correct answer. |
| Boglárka | Observant, quieter, dry humor. Chooses precise words and follows an idea enthusiastically when invited. | Pauses or withdraws first, then names the specific injury. Can disagree without becoming louder. | Makes small deliberate invitations; her initiative grows without replacing her personality. | Infantilizing shyness, permanent passivity, making every sentence a research disclaimer. |
| Gréta | Direct, practical, energetic. Starts things, proposes a place, notices what needs doing. | Takes charge, becomes impatient, tries to solve what may only need company. | Respect first; deliberate private flirting; learning to leave a task unfinished. | Reducing her to an administrator, perfectly composed boundary speeches, making her organize every scene for everyone. |

## Implemented examples

- Rebeka's opening photograph scene asks the player to choose rather than accepting “all are interesting”; her coffee conversation defends the joy of bad films and complains extravagantly about an ordinary missing mug.
- Boglárka's opening scene argues for preserving “perhaps” in a source. Her dry jokes about acknowledgments, library rules and an overlooked side character let her disagree and reveal preferences.
- Gréta catches practical problems, then has to stop managing her own break. Her map, detour and switched-off phone create ordinary wants outside her work.

## Coverage and remaining writing

The expanded pass covers shared weeks 1–3, each first individual relationship scene, and three contextual coffee conversations per woman. Later relationship stages 2–6 and most shared weeks 4–16 remain compact and still need a dedicated writing pass; the existing shared stage template is not the intended final character writing. Do not call the entire story rewritten.

Keep new text in `src/game/content/`. `catalog.ts` assembles one registry; `opening.ts` expands the stable opening nodes, and `conversations.ts` contains optional coffee graphs. The general engine must not infer a personality, route, clue or ending from an actor's name or scene ID.
