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
2. Follow [character visual design](design/CHARACTER-VISUALS.md), the single written visual authority. Check actual reference availability in [ART-REGISTER.md](ART-REGISTER.md); historical prompts and removed masters are not current references. Use existing reviewed references; do not regenerate an asset just because an upload was interrupted. Use the available image-generation skill for creation or edits.
3. Keep source images and provenance under `assets/generated/`, references under `assets/references/`, and optimized runtime exports under `assets/characters/`, `assets/backgrounds/` or `assets/animations/`. Never activate archived candidates automatically.
4. Inspect appearance, dimensions, transparency, crop and file size. For animated assets check loop timing and a separate static poster; verify pause, reduced-motion and missing-media behavior. Follow [ANIMATION-PLAN.md](ANIMATION-PLAN.md) for animation budgets.
5. Update the appropriate runtime manifest, CLI descriptions and production record. Record prompts, source/export hashes and honest review status. Generated, reviewed, uploaded and published are different states. Do not mark planned artwork complete.

## Multi-provider generation for transparent assets and animations

**Provider routing (current):**
- **Venice** — only for fully explicit content (uncensored models, `safe_mode: false`). Do not use Venice for non-explicit or merely suggestive work.
- **Prefer editing for consistency** — whenever an existing approved reference or previous generation exists, try image editing (Venice edit, ChatGPT edit, Grok edit, or local tools) instead of fresh generation so identity, style and crop stay locked.
- Non-explicit work → ChatGPT (or Recraft for icons/UI).
- Suggestive (but not fully explicit) content → Grok Imagine + Background Removal.
- Icons/UI → Recraft or ChatGPT.

Venice advantages for explicit work: native transparent PNG/WebP, private/uncensored models, existing repo tooling.

**Generation rule for cutouts:** When native transparency is not available, generate the subject isolated on a pure solid background (`#FFFFFF` or `#000000`) with no gradients, shadows that touch the edge, or complex environments. This enables clean post-process cutouts via `scripts/process-assets.mjs`.

### Transparent stills (portraits, stickers, cutouts)

| Provider | Approach | Notes |
|----------|----------|-------|
| **Venice** (fully explicit only) | Native: `transparent_background: true` + `format: png/webp` on models with `supportsTransparentBackground` (currently GPT Image 1.5 / 2.5 Flare / Sunburst and -edit variants). Or post `/image/background-remove`. Prefer edit endpoints when a reference exists. | Real alpha including soft edges/shadows. Uncensored models available. |
| **ChatGPT** | Generate or edit on pure white (or white + black pair). App is inconsistent for real alpha; prefer API `background: "transparent"` when available. | Post-process with `process-assets.mjs cutout` or remove.bg / Recraft / Transparify. |
| **Grok Imagine 2.0** | Generate or edit, then use built-in Background Removal → export PNG. | Good for suggestive content. |
| **Recraft** | Generate then Remove BG + export PNG/WebP. | Strong for icons/UI. |

Always verify real alpha (Pillow `mode == RGBA` and transparent pixel share > 0). Do not trust viewer checkerboards or file extensions. Prompt with “isolated, no background, die-cut, pure white background” in addition to any API flag.

Local cutout tool (for solid-bg images):
```bash
node scripts/process-assets.mjs cutout raw/portrait.png out/portrait.png --key white
# or --key black
```

### Animations (prefer animated WebP with alpha)

Follow [ANIMATION-PLAN.md]: 3–6 consistent keyframes, 1.5–3 s, held poses, separate static poster, < 750 KB preferred.

1. Prefer editing an existing identity/composition master for new poses/keyframes so consistency is preserved.
2. Produce key pose frames as transparent PNGs (Venice native only if fully explicit; otherwise ChatGPT/Grok + cutout). Keep canvas, crop, lighting and identity locked.
3. Assemble locally with the repo script (uses `libwebp_anim` so previous frames clear correctly):
   ```bash
   node scripts/process-assets.mjs anim frames/frame_%04d.png assets/animations/virag/wink.webp --fps 6
   # add --lossy for smaller files
   ```
   Equivalent raw ffmpeg:
   ```bash
   ffmpeg -framerate 6 -i frame_%04d.png -c:v libwebp_anim -pix_fmt yuva420p -lossless 1 -loop 0 -an animation.webp
   ```
   GIF is fallback only (binary transparency, larger).
4. Export independent poster. Record frame count, durations, dimensions, byte size and hashes.
5. Place reviewed exports under `assets/animations/<actor>/`; sources and provenance under `assets/generated/`.

Venice video models or Grok video can be used for intermediate motion then frame extraction, but the preferred path remains authored keyframes for consistency and cost control. No automatic paid generation of large batches without explicit authorization.

### Practical order for new assets

1. **Prefer editing** an existing approved reference or previous generation for consistency.
2. Fully explicit content → Venice (edit preferred, then generate).
3. Suggestive → Grok Imagine + BG Removal (edit preferred).
4. Non-explicit → ChatGPT on pure solid background (edit preferred).
5. Icons / UI → Recraft or ChatGPT.
6. Run `scripts/process-assets.mjs cutout` on solid-bg results.
7. Assemble animations with `scripts/process-assets.mjs anim`.
8. Always post-process and verify alpha; review against character visual brief and art register before publishing.

Existing Venice Actions workflow (`.github/workflows/venice-assets.yml`) and `art-jobs/venice/` are reserved for fully explicit authorized batches. Documentation updates alone do not authorize large paid runs.

Manual processing is also available via the `process-assets` workflow (Actions → Process assets).

## Publish one image at a time

Use the connected GitHub tools for all remote reads and writes. Local Python/Git commands may inspect files and calculate hashes; no shell GitHub credentials, `git push`, `gh auth`, personal access token or browser upload is required. The connector does not accept a local file path: the orchestration code below bridges local bytes to its base64 argument without emitting them into model context.

For connector-based publication:

1. Build a compact queue of exact paths, byte sizes and Git blob SHAs (`git hash-object -- PATH`, or `git rev-parse COMMIT:PATH` for committed files). A Git blob SHA differs from a raw file SHA-256; do not interchange them.
2. Read the remote head and tree metadata. Skip paths already published with the expected SHA. Reuse previously uploaded blobs by SHA, including those recorded in an upload checkpoint. A blob existing on GitHub does **not** mean the file is reachable from `main`.
3. For a genuinely missing blob, encode the local bytes programmatically and call `create_blob` with `encoding: "base64"`. Keep the encoded string inside orchestration, never in emitted output or a manually composed model tool argument. Compare the returned SHA with the expected local Git blob SHA before proceeding.
4. If a tool bridge has output limits, use bounded, byte-aligned chunks internally, detect truncation, and assemble them programmatically before uploading. Never silently upload a truncated payload. If the environment cannot transfer bytes without exposing them to model context, preserve the files/checkpoint and report the specific limitation; do not dump base64 as a workaround.
5. Create a tree based on the current remote tree, changing only this image path (`mode: "100644"`, `type: "blob"`, its SHA). Create a commit whose parent is the current head, then update `main` with `expected_sha` and no force. Do this sequentially for each image. A rejected head check requires rereading `main` and preserving intervening changes.
6. After each successful ref update, save a compact checkpoint and verify the published path/SHA using tree metadata. Report only a short progress count or milestone. Do not postpone all publication until the whole generation session finishes.
7. Publish dependent manifest, story and documentation changes coherently after their assets are available. Reuse uploaded blob SHAs; do not upload the same image again to include it in an integration commit.

`create_blob` is for binary transport. UTF-8 `create_file`/`update_file` tools must not be used to write a base64 string into an image path. Do not commit `.b64` copies or embed images in source code. Preserve ordinary image files in Git.

## Executable GitHub connector recipe

These examples run **inside `functions.exec`**, not in a terminal or standalone Node process. `tools`, `store`, `load` and `text` belong to that orchestration environment; it has no direct filesystem access. `tools.exec_command` supplies the local Python bridge. Discover these exact tools and inspect their schemas before use:

| Tool | Required operation |
| --- | --- |
| `mcp__codex_apps__github_fetch` | Read branch ref, Git commit/tree metadata and Actions |
| `mcp__codex_apps__github_create_blob` | Upload binary bytes with `content` and `encoding: "base64"` |
| `mcp__codex_apps__github_create_tree` | Add the path/SHA to the existing tree |
| `mcp__codex_apps__github_create_commit` | Create a commit with the current head as parent |
| `mcp__codex_apps__github_update_ref` | Publish with `branch_name: "main"`, `expected_sha`, `force: false` |

### 1. Transfer a single local image without emitting its content

Set `local` to an existing absolute path and `path` to its intended repository path. Review the image first. On resume, skip this transfer when a verified blob SHA is already available. The chunk size is divisible by three, allowing base64 chunks to concatenate without intermediate padding. Each tool result stays inside JavaScript; **never add `text(r)` or log `encoded`**.

```javascript
const repo = "zodnosferato-code/ligetvar";
const local = "/absolute/checkout/assets/animations/virag/wink-poster.webp";
const path = "assets/animations/virag/wink-poster.webp";
const q = s => "'" + s.replace(/'/g, "'\\''") + "'";
const metaPy = "import sys,pathlib,hashlib,json;p=pathlib.Path(sys.argv[1]);b=p.read_bytes();print(json.dumps({'bytes':len(b),'sha':hashlib.sha1(b'blob '+str(len(b)).encode()+b'\\0'+b).hexdigest()}))";
const m = await tools.exec_command({
  cmd: "python -c " + q(metaPy) + " " + q(local), max_output_tokens: 300
});
if (m.exit_code !== 0) throw Error("Cannot inspect local asset");
const meta = JSON.parse(m.output);
let encoded = "";
for (let offset = 0; offset < meta.bytes; offset += 12288) {
  const py = "import sys,base64;f=open(sys.argv[1],'rb');f.seek(int(sys.argv[2]));print(base64.b64encode(f.read(12288)).decode())";
  const r = await tools.exec_command({
    cmd: "python -c " + q(py) + " " + q(local) + " " + offset,
    max_output_tokens: 20000
  });
  const chunk = r.output.trim();
  const length = 4 * Math.ceil(Math.min(12288, meta.bytes - offset) / 3);
  if (r.exit_code !== 0 || chunk.length !== length ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(chunk)) {
    throw Error("Invalid or truncated asset chunk; do not upload");
  }
  encoded += chunk;
}
const result = await tools.mcp__codex_apps__github_create_blob({
  repository_full_name: repo, content: encoded, encoding: "base64"
});
if (result.isError || result.structuredContent?.sha !== meta.sha) {
  throw Error("Upload failed or returned a different blob SHA");
}
store("assetUpload", {repo, path, bytes: meta.bytes, blobSha: meta.sha});
text({path, bytes: meta.bytes, blobSha: meta.sha, state: "uploaded"});
```

This transfer was exercised on 25 October 2026 with the existing 93,262-byte wink poster: the connector returned the expected SHA `316ed290dba01f7cc4fb8771f611c13a0749d798`. No binary payload was emitted and no branch was changed by that check. This verifies the byte bridge, not a guarantee about future connector size limits. For long transfers, use the orchestration tool's yield/wait mechanism without printing payloads.

### 2. Publish and verify that image

Persist the upload metadata to the checkpoint described below before continuing. `store` survives orchestration calls in this session, but is not a durable cross-session checkpoint. This example fetches the actual base **tree SHA**, preserves existing files, and rejects concurrent head changes.

```javascript
const a = load("assetUpload"); // Or restore verified metadata from checkpoint.
if (!a) throw Error("Missing upload checkpoint");
const api = "https://api.github.com/repos/" + a.repo;
function unwrap(r) {
  if (r.isError) throw Error("GitHub operation failed; inspect safe metadata");
  const s = r.structuredContent;
  return typeof s?.content === "string" ? JSON.parse(s.content) : s;
}
const get = async suffix => unwrap(await tools.mcp__codex_apps__github_fetch({
  url: api + suffix
}));
const head = (await get("/git/ref/heads/main")).object.sha;
const base = await get("/git/commits/" + head);
const tree = unwrap(await tools.mcp__codex_apps__github_create_tree({
  repository_full_name: a.repo, base_tree_sha: base.tree.sha,
  tree_elements: [{path: a.path, mode: "100644", type: "blob", sha: a.blobSha}]
}));
if (tree.sha === base.tree.sha) {
  text({path: a.path, state: "already published", commit: head});
} else {
  const commit = unwrap(await tools.mcp__codex_apps__github_create_commit({
    repository_full_name: a.repo, parent_sha: head, tree_sha: tree.sha,
    message: "Save asset: " + a.path
  }));
  const update = unwrap(await tools.mcp__codex_apps__github_update_ref({
    repository_full_name: a.repo, branch_name: "main",
    expected_sha: head, sha: commit.sha, force: false
  }));
  if (update.success !== true) throw Error("Ref update not confirmed");
  const published = await get("/git/commits/" + commit.sha);
  if (published.tree.sha !== tree.sha) throw Error("Published tree mismatch");
  const checkpoint = {...a, state: "published", commit: commit.sha};
  store("assetUpload", checkpoint);
  text(checkpoint);
}
```

Save that result to the checkpoint immediately, then continue with the next image. On a rejected ref update, retain the uploaded blob, reread `main`, inspect any competing change to this path and rebuild against the new tree; never force the update. `fetch` wraps GitHub JSON inside `structuredContent.content`, whereas mutation tools return fields such as `structuredContent.sha` directly; the examples account for both formats. Rediscover schemas if the connector changes.

To reconcile after interruption, fetch `/git/commits/{head}` and walk `/git/trees/{sha}` through each path component; compare the final entry's SHA. A recursive tree request is also usable if its `truncated` field is false. Filter results inside orchestration and emit only matching path/SHA entries. Never use `/contents/{image}` or `/git/blobs/{sha}` to retrieve bytes merely for verification. Check final workflows with `/actions/runs?head_sha={commit}&per_page=10`; emit only name, status, conclusion and URL.

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
