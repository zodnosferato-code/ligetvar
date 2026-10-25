# Asset workflow for AI agents

> **Status:** Active. | **Purpose:** Produce, review and publish assets reliably while keeping binary data out of agent context.

## Non-negotiable context rules

- Never print, paste, summarize or manually reconstruct base64 image data, data URLs, binary files or binary Git patches in conversation or model-visible tool output. Encoding is a transport detail, not something the model needs to read.
- Keep bytes inside files or programmatic tool orchestration. Pass a tool result directly to the upload tool without emitting its payload. Return only path, byte count, hash, status and commit SHA. Do not log complete tool responses that may contain image content.
- Do not fetch image contents to check whether an upload succeeded. Compare Git tree entries and blob SHAs. Use an image viewer for visual review, with a small preview where sufficient.
- Discover only the tools needed for the current step. Avoid dumping tool registries, full manifests, repeated documentation or all source images into context.
- Do not conclude that the GitHub connection cannot upload images merely because its binary transport requires base64. Programmatic base64 transfer is acceptable; exposing that data to the model is not.

## Prepare and review

1. Read `AGENT.md` and the relevant art register/production checkpoint. Inspect the latest remote `main` and local changes before writing. Preserve unrelated work.
2. Follow the approved character identity, style and scene framing. Use existing reviewed references; do not regenerate an asset just because an upload was interrupted. Use the available image-generation skill for creation or edits.
3. Keep source images and provenance under `assets/generated/`, references under `assets/references/`, and optimized runtime exports under `assets/characters/`, `assets/backgrounds/` or `assets/animations/`. Never activate archived candidates automatically.
4. Inspect appearance, dimensions, transparency, crop and file size. For animated assets check loop timing and a separate static poster; verify pause, reduced-motion and missing-media behavior. Follow [ANIMATION-PLAN.md](ANIMATION-PLAN.md) for animation budgets.
5. Update the appropriate runtime manifest, CLI descriptions and production record. Record prompts, source/export hashes and honest review status. Generated, reviewed, uploaded and published are different states. Do not mark planned artwork complete.

## Publish one image at a time

Use the connected GitHub tools when sufficient. If using an already authenticated Git workflow, stage explicit paths and push each image checkpoint normally; never print binary diffs. Missing shell credentials do not imply that the GitHub connector is unavailable.

For connector-based publication:

1. Build a compact queue of exact paths, byte sizes and Git blob SHAs (`git hash-object -- PATH`, or `git rev-parse COMMIT:PATH` for committed files). A Git blob SHA differs from a raw file SHA-256; do not interchange them.
2. Read the remote head and tree metadata. Skip paths already published with the expected SHA. Reuse previously uploaded blobs by SHA, including those recorded in an upload checkpoint. A blob existing on GitHub does **not** mean the file is reachable from `main`.
3. For a genuinely missing blob, encode the local bytes programmatically and call `create_blob` with `encoding: "base64"`. Keep the encoded string inside orchestration, never in emitted output or a manually composed model tool argument. Compare the returned SHA with the expected local Git blob SHA before proceeding.
4. If a tool bridge has output limits, use bounded, byte-aligned chunks internally, detect truncation, and assemble them programmatically before uploading. Never silently upload a truncated payload. If the environment cannot transfer bytes without exposing them to model context, preserve the files/checkpoint and report the specific limitation; do not dump base64 as a workaround.
5. Create a tree based on the current remote tree, changing only this image path (`mode: "100644"`, `type: "blob"`, its SHA). Create a commit whose parent is the current head, then update `main` with `expected_sha` and no force. Do this sequentially for each image. A rejected head check requires rereading `main` and preserving intervening changes.
6. After each successful ref update, save a compact checkpoint and verify the published path/SHA using tree metadata. Report only a short progress count or milestone. Do not postpone all publication until the whole generation session finishes.
7. Publish dependent manifest, story and documentation changes coherently after their assets are available. Reuse uploaded blob SHAs; do not upload the same image again to include it in an integration commit.

`create_blob` is for binary transport. UTF-8 `create_file`/`update_file` tools must not be used to write a base64 string into an image path. Do not commit `.b64` copies or embed images in source code. Preserve ordinary image files in Git.

## Checkpoints and recovery

Keep a small machine-readable checkpoint outside tracked runtime assets. Use these fields, without image content or credentials:

```json
{
  "repository": "zodnosferato-code/ligetvar",
  "branch": "main",
  "sourceCommit": "<local commit, if applicable>",
  "lastPublishedCommit": "<verified remote commit>",
  "files": [
    {
      "path": "assets/characters/example/neutral-v1.webp",
      "bytes": 12345,
      "blobSha": "<Git blob SHA>",
      "state": "published",
      "commit": "<commit containing this path>"
    }
  ]
}
```

Distinguish `pending`, `uploaded` (blob only) and `published` (reachable from the branch). Write the checkpoint after each completed step. On resume, treat remote tree metadata as authoritative, reconcile the queue and continue only missing work. A scratch checkpoint is temporary: publish images promptly and record durable progress, remaining assets and final commit references in the production documentation. Do not claim local files are permanently saved just because they survived an earlier interruption.

## Verify and hand off

- Verify every changed remote path against its expected blob SHA. Whole-tree equality with a tested local commit is useful only when both trees intentionally contain the same complete repository state; never overwrite newer remote work to obtain equality.
- Run checks appropriate to actual code changes. For upload-only work, do not repeat the full test suite for each image. Check the final commit's GitHub Actions tests and deployment, using its SHA to avoid reporting an older run.
- Do not claim tests, visual checks or deployment passed without evidence. Report pending or failed workflows accurately.
- Finish with the final commit link, image count, outstanding assets and actual verification status. Keep the handoff short; retain operational detail in the production record rather than conversation history.
