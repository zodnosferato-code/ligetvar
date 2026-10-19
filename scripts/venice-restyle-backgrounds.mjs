// Restyle three existing game backgrounds through Venice, keeping their composition as reference.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const apiKey = process.env.IMAGE_GENERATOR_KEY;
if (!apiKey) {
  console.error("IMAGE_GENERATOR_KEY is missing.");
  process.exit(1);
}

const model = "qwen-image-3-edit";
const outputDir = "artifacts/venice-backgrounds";
const globalDirection = [
  "Restyle this exact game background as highly detailed, polished anime environment art.",
  "Keep the original room or outdoor layout, architecture, recognizable props, lighting mood, and camera composition wherever possible.",
  "Render as a richly painted 2D anime background with fine linework, layered textures, subtle atmospheric depth, and nuanced cinematic lighting.",
  "Strictly non-pixel-art: no pixel edges, sprites, 8-bit or 16-bit look, voxel style, or isometric game view.",
  "First-person point of view of the player character at natural seated eye level, as if having a quiet conversation with a companion.",
  "Keep a clear, inviting empty place for a woman to sit, facing the player: preserve or add a visible chair, bench, or seat in the conversational area.",
  "Show the environment only: no people, character silhouettes, faces, text, speech bubbles, interface elements, logos, or watermarks.",
  "Use restrained gothic-romantic university colors and realistic proportions. Keep the background readable behind dialogue portraits."
].join(" ");

const scenes = [
  {
    id: "classroom",
    source: "assets/backgrounds/classroom.jpg",
    output: "classroom-anime.png",
    location: "An old university classroom in a castle college: dark wood desks, tall windows, chalkboard, quiet academic atmosphere. Keep a clear empty student chair across the nearest desk, facing the viewer."
  },
  {
    id: "library",
    source: "assets/backgrounds/library.jpg",
    output: "library-anime.png",
    location: "A quiet old university library: tall bookcases, warm reading lamps, worn wood and a hushed gothic-academic atmosphere. Keep a shared reading table and one clearly visible empty chair facing the viewer."
  },
  {
    id: "courtyard",
    source: "assets/backgrounds/courtyard.jpg",
    output: "courtyard-anime.png",
    location: "The same secluded castle courtyard: old stone, mature trees and a calm romantic mood. Keep a clearly visible empty stone or wooden bench in the conversational area, oriented toward the viewer."
  }
];

await mkdir(outputDir, { recursive: true });
const manifest = {
  generatedAt: new Date().toISOString(),
  provider: "Venice AI",
  endpoint: "/api/v1/image/edit",
  model,
  status: "draft-not-approved",
  assets: []
};

for (const scene of scenes) {
  const source = await readFile(scene.source);
  const prompt = globalDirection + " Location-specific direction: " + scene.location;
  console.log("Generating draft:", scene.id);

  const response = await fetch("https://api.venice.ai/api/v1/image/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      image: source.toString("base64"),
      prompt,
      aspect_ratio: "auto",
      resolution: "2K",
      output_format: "png",
      safe_mode: true
    }),
    signal: AbortSignal.timeout(240_000)
  });

  if (!response.ok) {
    console.error(`Venice image edit failed for ${scene.id} (HTTP ${response.status}).`);
    process.exit(1);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("image/")) {
    console.error(`Venice returned a non-image response for ${scene.id}.`);
    process.exit(1);
  }

  const outputPath = join(outputDir, scene.output);
  const image = Buffer.from(await response.arrayBuffer());
  if (image.length < 1024) {
    console.error(`Venice returned an unexpectedly small image for ${scene.id}.`);
    process.exit(1);
  }
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, image);

  manifest.assets.push({
    id: scene.id,
    source: scene.source,
    output: scene.output,
    contentType,
    bytes: image.length,
    prompt
  });
  console.log(`Saved draft: ${outputPath} (${image.length} bytes)`);
}

await writeFile(join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log("All three image drafts are ready; none has been added to the runtime manifest.");
