# Narrative rewrite workflow

> **Status:** User-approved workflow, 28 October 2026; scene planning and rewriting deferred. | **Purpose:** Connect the master plot, character guidance, scene specifications and repeated playthrough review.

## User decision and immediate scope
Record problems first. Do not patch dialogue as problems arise during the baseline playthrough. This supersedes the suggestion to rewrite each encountered scene immediately. In the next discussion, develop scene-by-scene descriptions and reconcile character guidance before implementing narrative changes.

## Sources and order
1. **Master plot:** [STORY-REVIEW.md](STORY-REVIEW.md) is the maintained overall plot/semester outline. Its confirmed direction and explicitly proposed beats remain distinct; this workflow does not approve every proposed detail. Preserve its source-review findings as context.
2. **Characters:** [CHARACTER-VOICES.md](CHARACTER-VOICES.md) owns personality, motives and speech; [CHARACTER-VISUALS.md](CHARACTER-VISUALS.md) owns appearance. Reconcile contradictions with the master plot explicitly, asking the user about material story/character decisions.
3. **Scene specifications, next discussion:** develop a linked scene-by-scene document derived from those sources. Do not infer that current runtime dialogue is the intended new plot.
4. **Rewrite one scene at a time:** read its specification, relevant character profiles and connected scenes. Expand, shorten or replace text as needed for naturalness, coherence and pacing; length alone is not a target. Preserve branch, knowledge and scheduling contracts.
5. **Repeated playthroughs:** test revised scenes in complete routes, record new findings, deliberately revise, and rerun affected paths. Keep baseline observations separate from post-change evidence.

## Scene specification fields
Stable scene ID; plot purpose; week/window and prerequisites; participants/location; entry knowledge per character; emotional starting point; concrete beats and revelations; choices/refusal alternatives; resulting knowledge and relationship changes; callbacks; departure and next-scene dependencies. Specify player-name interpolation and localization needs. Mark unresolved decisions rather than inventing approval.

## Findings and validation
Use [PLAYTHROUGH-FINDINGS.md](PLAYTHROUGH-FINDINGS.md) for observations, linked to the tested commit, route and scene/line/choice. Record the problem, consequence and proposed direction; distinguish observed, inferred and untested. A finding is not a patch or an approved plot decision.

Blind agent runs use only public CLI observations, no author inspection or scripted walkthrough. Record actual ending, route, errors, stalls, save/resume, transcript and coverage. A single route does not prove all routes. Browser visuals, animation playback and human enjoyment remain separate checks.

After an approved revision, verify relevant branch/knowledge/name/localization behavior and save/resume, then the affected full route. Preserve mutually chosen intimacy and the confirmed fade-to-black direction. Record checks actually run. [TRACKER.md](TRACKER.md) remains the single feature-status tracker.
