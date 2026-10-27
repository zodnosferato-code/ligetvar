# Virág — optional reporter storyline

> **Status:** Eight Hungarian scenes revised in 0.6.0; five runtime portraits, hallway and four moment loops present; historical full-body sheet absent from current main. | **Purpose:** Character canon, branch design and complete side-story handoff.

## User-approved direction

Virág is a 19-year-old adult woman with a loud personality and clear reasoning. Her appearance and signature outfit are maintained only in the [character visual reference](CHARACTER-REFERENCES.md). She uses her college-inspired look to pass as a clueless first-year student. She is actually a junior reporter at **Mérceháló**, a fictional prominent national news agency investigating university corruption. Her newsroom supplies editorial, legal and independent source checks; her age does not magically confer decades of reporting experience. She is not Márton's student or under his academic assessment.

Her fictional **Szabad Hullám** feminist circle values women initiating, owning their sexual agency and choosing openly negotiated nonexclusive relationships. This is her particular movement, not a statement about feminism generally. She is bold, quick to seek closeness, impatient with coyness, and able to admit a logical or ethical mistake. Her early interest is instrumental: Márton looks like a useful insider. Real attraction grows alongside it; she does not retrospectively claim she was innocent.

User clarification: there is **no professional-only route**. She keeps flirting and making new invitations after rejection. The player can refuse individual meetings and physical advances; refusal never makes the selected touch occur. Teasing remains in the dialogue on every path, without a coercive loss of player control. There is no bad ending for Virág. Her newsroom solves all her cases regardless of romantic choices or skipped meetings. She never meets/interacts with Rebeka, Boglárka or Gréta in this storyline.

Her investigation starts with the institution's silence around disappearances, then follows money and complaint handling. She establishes who withheld scholarships, certified uncompleted renovations and buried complaints. She does not expose Soma, supply vampire weaknesses, participate in the confrontation or alter the main institutional ending. Her report's success concerns these separate corruption cases, not a replacement for the supernatural plot.

## Implemented scenes

| Scene | Earliest week / place | Story and choices |
| --- | --- | --- |
| `virag_1` The lost first-year | 2 / hallway, daytime only | Asks directions, flirts immediately with a wink; optional arm-link and immediate private encounter. Separate invitation, confirmation, reconsideration and refusal paths. Adult status and not being his student are established before intimacy; the private interval is implied off-screen. |
| `virag_2` Back of the business card | 3 / courtyard | Reveals her employer and initial manipulation. Play along knowingly, challenge her, or decline today's date. All preserve her pursuit. |
| `virag_3` Szabad Hullám | 4 / library | Compare scholarship records, discuss her fictional feminist movement; sit close, debate her reasoning or keep distance. File an information request; an inconsistency is not yet proof. |
| `virag_4` Coffee without commitments | 6 / lake | Coffee and a real lead; early direct invitation to a brief mutual kiss, teasing delay or refusal. Separate departures. |
| `virag_5` The folded page | 8 / courtyard | Discover her instrumental source plan. Knowing participation, hurt or ending today's meeting all lead to accountability and independent source verification. No punitive route lock. |
| `virag_6` What the numbers reveal | 10 / library → courtyard | Establish related-party contracting and suppressed complaints, acknowledge limits on disappearance claims. Walk together, finish checking deadline or leave. |
| `virag_7` Closed notebook, open question | 12 / lake | Discuss nonexclusivity without overriding others' agreements. Accept cuddling, talk without touch or decline a relationship promise. She keeps initiating. |
| `virag_8` After the headline | 13 / courtyard | Published, verified investigation and concrete remedies. Congratulate her, tease her or say goodbye. There is no final date, relationship decision or exclusivity milestone. |

Every chapter costs one discretionary slot, including movement; all remain available through week 14 and require only the preceding chapter. Refusals complete the current chapter and do not close later ones. Eight optional slots fit within the existing 32-slot semester, competing normally with other outings; no extra time or special mandatory slot is created. Nobody must buy gifts, choose a main romance direction or accept physical affection to progress.

The full report is also delivered in the final public epilogue, even if no Virág meetings were played. Players who met her receive an ongoing casual-contact coda, without a final-date choice. Skipping scenes does not fabricate meetings, romantic memories or private journal entries. Her corruption discoveries are recorded in witnessed scene journals rather than mixed into the main vampire-evidence registry. Main romance commitments and bond scores are unchanged; she is a side relationship, not a fourth exclusive main-ending selector.

## Voice and staging

She uses quick observations and deliberately transparent flirting: “A nyilak szerint vagy eltévedtem, vagy a könyvelés a falban lakik.” She can become serious without losing her confidence. The accountability scene does not vanish behind a joke. No graphic sexual prose or explicit artwork is required for this route.

Stage IDs are explicit per node, including branch merges and departures. `arm`, `beside`, `kissed` and `cuddled` use close framing; refusal paths retain distance. Three physical GIF-like moment IDs are attached only to accepted actions. Five 640×800 transparent portraits and the daylight hallway are now active. A 2.4-second, four-frame wink WebP plays on the first invitation with a separate static poster. The earlier full-body reference is no longer in the current repository; see the visual reference for available identity files.

## Remaining work

Five expressions, the hallway, and wink/arm-link/kiss/cuddle loops with separate posters are present in the runtime manifests. Historical ChatGPT production sources and the full-body sheet are absent from current main. Future work must follow the [art register](ART-REGISTER.md). English text is part of the existing localisation backlog. Current Hungarian prose is an authored first pass; user literary review remains welcome. Tests cover reachability, refusal, per-node save/resume, one-slot completion, unchanged main bonds and guaranteed reporting success; they are not a claim of final editorial approval.

## Latest user direction — 0.6.0

The user chose a blue pixie haircut, an intentionally seductive version of her established outfit, and immediate closeness. Virág has no traditional dating progression or final date. A mutually chosen private encounter is available in the first meeting, handled off-screen without graphic content; refusing or reconsidering never grants its witnessed decision. Accepting privacy grants no evidence, bond bonus or reporting advantage. The eight optional scenes and successful cases remain independent of physical choices.

Release 0.6.0 uses content epoch 3 because scene graphs and final-decision IDs changed; schema 4 remains unchanged. Older content saves receive the existing incompatibility message. No migrations.
