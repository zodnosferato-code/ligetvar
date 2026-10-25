# Virág — optional reporter storyline

> **Status:** Eight Hungarian scenes implemented in 0.5.0; art pending. | **Purpose:** Character canon, branch design and complete side-story handoff.

## User-approved direction

Virág is a 19-year-old adult woman, petite, with short blue hair, a loud personality and clear reasoning. She dresses in attractive college-inspired clothes to pass as a clueless first-year student. She is actually a junior reporter at **Mérceháló**, a fictional prominent national news agency investigating university corruption. Her newsroom supplies editorial, legal and independent source checks; her age does not magically confer decades of reporting experience. She is not Márton's student or under his academic assessment.

Her fictional **Szabad Hullám** feminist circle values women initiating, owning their sexual agency and choosing openly negotiated nonexclusive relationships. This is her particular movement, not a statement about feminism generally. She is bold, quick to seek closeness, impatient with coyness, and able to admit a logical or ethical mistake. Her early interest is instrumental: Márton looks like a useful insider. Real attraction grows alongside it; she does not retrospectively claim she was innocent.

User clarification: there is **no professional-only route**. She keeps flirting and making new invitations after rejection. The player can refuse individual meetings and physical advances; refusal never makes the selected touch occur. Teasing remains in the dialogue on every path, without a coercive loss of player control. There is no bad ending for Virág. Her newsroom solves all her cases regardless of romantic choices or skipped meetings. She never meets/interacts with Rebeka, Boglárka or Gréta in this storyline.

Her investigation starts with the institution's silence around disappearances, then follows money and complaint handling. She establishes who withheld scholarships, certified uncompleted renovations and buried complaints. She does not expose Soma, supply vampire weaknesses, participate in the confrontation or alter the main institutional ending. Her report's success concerns these separate corruption cases, not a replacement for the supernatural plot.

## Implemented scenes

| Scene | Earliest week / place | Story and choices |
| --- | --- | --- |
| `virag_1` The lost first-year | 2 / hallway, daytime only | Asks directions, pushes for a date; flirt, directions or leave; separate arm-link invitation with accepted/refused branches. Her suspiciously precise interest is foreshadowed. |
| `virag_2` Back of the business card | 3 / courtyard | Reveals her job and initial manipulation before further intimacy. Play along knowingly, challenge her, or decline today's date. All preserve her pursuit. |
| `virag_3` Szabad Hullám | 4 / library | Compare scholarship records, discuss her fictional feminist movement; sit close, debate her reasoning or keep distance. File an information request; an inconsistency is not yet proof. |
| `virag_4` The date's fine print | 6 / lake | Coffee and a real lead; early direct invitation to a brief mutual kiss, teasing delay or refusal. Separate departures. |
| `virag_5` The folded page | 8 / courtyard | Discover her instrumental source plan. Knowing participation, hurt or ending today's meeting all lead to accountability and independent source verification. No punitive route lock. |
| `virag_6` What the numbers reveal | 10 / library → courtyard | Establish related-party contracting and suppressed complaints, acknowledge limits on disappearance claims. Walk together, finish checking deadline or leave. |
| `virag_7` Closed notebook, open question | 12 / lake | Discuss nonexclusivity without overriding others' agreements. Accept cuddling, talk without touch or decline a relationship promise. She keeps initiating. |
| `virag_8` After the headline | 13 / courtyard | Published, verified investigation and concrete remedies. Accept another date, decide later or decline today. All are successful endings for her. |

Every chapter costs one discretionary slot, including movement; all remain available through week 14 and require only the preceding chapter. Refusals complete the current chapter and do not close later ones. Eight optional slots fit within the existing 32-slot semester, competing normally with other outings; no extra time or special mandatory slot is created. Nobody must buy gifts, choose a main romance direction or accept physical affection to progress.

The full report is also delivered in the final public epilogue, even if no Virág meetings were played. For players who met her, the last witnessed invitation determines the personal coda. Skipping scenes does not fabricate meetings, romantic memories or private journal entries. Her corruption discoveries are recorded in witnessed scene journals rather than mixed into the main vampire-evidence registry. Main romance commitments and bond scores are unchanged; she is a side relationship, not a fourth exclusive main-ending selector.

## Voice and staging

She uses quick observations and deliberately transparent flirting: “A nyilak szerint vagy eltévedtem, vagy a könyvelés a falban lakik.” She can become serious without losing her confidence. The accountability scene does not vanish behind a joke. No graphic sexual prose or explicit artwork is required for this route.

Stage IDs are explicit per node, including branch merges and departures. `arm`, `beside`, `kissed` and `cuddled` use close framing; refusal paths retain distance. Three planned GIF-like moment IDs are attached only to accepted actions. The hallway has an honest missing-background label; Virág has a missing-portrait label. No existing woman's art stands in for her.

## Remaining work

Generate/review her identity sheet, neutral/expression portraits and hallway day background, then the three limited-animation clips in [ANIMATION-PLAN.md](ANIMATION-PLAN.md). English text is part of the existing localisation backlog. Current Hungarian prose is an authored first pass; user literary review remains welcome. Tests cover reachability, refusal, per-node save/resume, one-slot completion, unchanged main bonds and guaranteed reporting success; they are not a claim of final editorial approval.
