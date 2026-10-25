# Character voices

> **Status:** Approved direction; opening and romantic writing passes. | **Purpose:** Keep the three women's temperaments distinct in authored dialogue.

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

The opening pass covers shared weeks 1–3, each first individual relationship scene, and three contextual coffee conversations per woman. The 22 October romantic pass expands all three individual stages 2–6 (15 scenes) and T3/T4/T7/T8 (four scenes). It adds reciprocal personal disclosure, authored topic branches, separately chosen physical pace, repair conversations, everyday plans and witnessed callbacks. Rebeka keeps her defensive humor, Boglárka gains initiative without losing her quiet voice, and Gréta learns to accept company without organizing it. Slower physical closeness retains the same relationship progress; rejecting romance remains a separate choice. Most shared weeks 4–16 and T1/T2/T5/T6 remain compact. Do not call the entire story rewritten.

Keep new text in `src/game/content/`. `catalog.ts` assembles one registry; `opening.ts` expands the stable opening nodes, and `conversations.ts` contains optional coffee graphs. `romance.ts` expands the existing romantic nodes while preserving v2 scene/line/choice IDs; it introduces no extra activity slots or engine rules. The general engine must not infer a personality, route, clue or ending from an actor's name or scene ID.

## Virág — adult optional reporter, 25 October 2026

User-approved voice: 19, short blue hair, petite adult build, loud, witty, reasonable and persistently flirtatious. Her fictional Szabad Hullám feminism favours women's agency and negotiated open relationships. She initially seeks insider access through charm, then admits the manipulation and separates source verification from personal interest. Refusals change the selected action, not her teasing personality or successful reporting outcome. Full scene/branch canon: [VIRAG-STORY.md](VIRAG-STORY.md). No interactions with the three main women.

## Virág update — 0.6.0

Latest user direction supersedes the earlier final-date treatment: blue pixie haircut, deliberately flirtatious blouse/cardigan/skirt look, immediate mutually chosen private encounter handled off-screen, and no final date or commitment milestone. Five transparent portraits, a full-body identity reference, daylight hallway and a 2.4-second wink loop are generated and assistant-reviewed. Dedicated physical-pose clips remain planned. See `docs/VIRAG-STORY.md` and `docs/ANIMATION-PLAN.md` from the repository root for current scope. Content epoch 3 (changed scene graphs/removed final-date decisions), schema 4; no save migration.
