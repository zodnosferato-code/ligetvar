# Venice asset requests

> **Status:** Tooling retained; routine production paused by user direction. | **Purpose:** Run bounded, reproducible image batches with the repository secret.

Current instructions: read [AGENT.md](../../AGENT.md), the [design index](../../docs/design/README.md) and [asset workflow](../../docs/ASSET-AGENT-WORKFLOW.md). Do not change requests or dispatch paid generation as part of documentation/asset audits. The following describes retained tooling, not authorization to run it. Counts, provider capabilities and alpha behavior below are dated assumptions; verify them only within an explicitly authorized provider task.

`request.json` is the explicit production request. A change to that file on `main` starts `.github/workflows/venice-assets.yml`. Manual dispatch is also available. The runner reads only the Actions secret `IMAGE_GENERATOR_KEY`; it is never exposed to Vite, saved in Git, or printed.

The [production inventory](../../docs/VENICE-PRODUCTION.md) maps all 37 requested outputs. `scripts/venice/catalog.mjs` contains the identity descriptions, prompts and reference dependency graph. The first request generates two pilot images. Inspect them before requesting the rest. Use exactly the same prompt/model/resolution settings to reuse them; changed specifications stop rather than silently overwrite an existing candidate.

```bash
node scripts/venice-generate-assets.mjs --dry-run
node --experimental-strip-types tools/art-inventory.mjs
```

Actual generation runs in Actions, or in a trusted Node 22+ runtime with `IMAGE_GENERATOR_KEY`. The API models are checked before generation. Non-success responses stop the batch, retain checkpoints and report only a status code. No automatic fallback model or unbounded retry is used. A timeout is not retried automatically because a provider may already have charged that request.

Candidates live under `assets/generated/venice/`, with a provenance manifest and model specification snapshot. Actions preserves partial results, commits only this candidate directory, and uploads an artifact. Candidates remain outside published runtime paths until visual review and explicit manifest registration. Do not copy archived character art back into runtime.

API references checked on 19 October 2026:
- https://docs.venice.ai/api-reference/endpoint/image/generate
- https://docs.venice.ai/api-reference/endpoint/image/edit
- https://docs.venice.ai/api-reference/endpoint/image/multi-edit
- https://docs.venice.ai/api-reference/endpoint/models/list

## Selected models

The user selected **WAI Illustrious + FireRed** on 19 October 2026 after the live Venice model list showed the earlier GPT models unavailable. `wai-Illustrious` generates the initial anime portrait at 1024×1280; `firered-image-edit` edits referenced portraits and locations. All 37 prompts fit the live 1500-character limits. The runner sends only supported model parameters. Portrait alpha is extracted through Venice's `/image/background-remove`; raw billed output is checkpointed first so an extraction failure does not require another generation charge. No local background-removal model or other image provider is used.
