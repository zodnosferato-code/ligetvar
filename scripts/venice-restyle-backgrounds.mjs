// Generate three environment-only, player-POV background drafts through Venice.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const apiKey = process.env.IMAGE_GENERATOR_KEY;
if (!apiKey) {
  console.error("IMAGE_GENERATOR_KEY is missing.");
  process.exit(1);
}

const model = "gpt-image-2-5-flare";
const outputDir = "artifacts/venice-backgrounds";
const common = [
  "Create a highly detailed, polished anime background illustration for a gothic-romantic university story game.",
  "Non-pixel-art painted anime environment, fine hand-drawn linework, layered material detail, cinematic depth, atmospheric but readable lighting.",
  "Camera is the player's direct first-person viewpoint at natural seated eye level, looking toward the place where a companion would sit.",
  "Include one ordinary, clearly unoccupied chair or bench across a small table, facing the viewer. Its seat is visibly empty.",
  "Environment-only background plate: show an entirely empty scene. Absolutely no people, no characters, no mannequins, no statues, no silhouettes, no faces, no body parts, no hands, and no human reflections.",
  "No over-the-shoulder framing, no visible player avatar, no pixel art, no isometric view, no text, no UI, no logos, no watermark.",
  "Keep an open, calm conversational composition with readable space for the game's separate dialogue portrait."
].join(" ");

const scenes = [
  {
    id: "classroom",
    output: "classroom-anime.png",
    setting: "Inside an old university classroom in a Hungarian castle college: pointed stone window arches, tall dusk-blue windows, dark timber desks, chalkboard, old wood and restrained candlelight. The viewer is seated at one desk, facing one empty chair across the desk."
  },
  {
    id: "library",
    output: "library-anime.png",
    setting: "A quiet, old castle-college library at evening: towering wooden bookcases, pointed stone arches, warm reading lamps, dark wood and deep blue shadows. The viewer sits at a shared reading table; one empty chair directly opposite is clearly visible."
  },
  {
    id: "courtyard",
    output: "courtyard-anime.png",
    setting: "A secluded inner courtyard of the same gothic university at blue hour: weathered stone arcades, ivy, mature trees, a few warm lanterns and a calm romantic atmosphere. From the seated viewer's eye level, show an empty stone bench opposite the viewer in a natural conversation spot."
  }
];

await mkdir(outputDir, { recursive: true });
const manifest = {
  generatedAt: new Date().toISOString(),
  provider: "Venice AI",
  endpoint: "/api/v1/image/generate",
  model,
  status: "draft-not-approved",
  assets: []
};

for (const scene of scenes) {
  const prompt = common + " Scene: " + scene.setting;
  console.log("Generating environment-only draft:", scene.id);

  const response = await fetch("https://api.venice.ai/api/v1/image/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      prompt,
      negative_prompt: "person, people, woman, man, girl, boy, human, mannequin, statue, character, silhouette, face, body, hands, human reflection, over-the-shoulder, pixel art, pixelated, sprite, isometric, text, watermark",
      aspect_ratio: "16:9",
      resolution: "2K",
      quality: "high",
      format: "png",
      return_binary: false,
      variants: 1,
      safe_mode: true,
      hide_watermark: true
    }),
    signal: AbortSignal.timeout(240_000)
  });

  if (!response.ok) {
    console.error(`Venice image generation failed for ${scene.id} (HTTP ${response.status}).`);
    process.exit(1);
  }

  const result = await response.json();
  let encoded = result.images?.[0];
  if (typeof encoded !== "string" || !encoded) {
    console.error(`Venice returned no image data for ${scene.id}.`);
    process.exit(1);
  }
  encoded = encoded.replace(/^data:image\/[^;]+;base64,/, "");
  const image = Buffer.from(encoded, "base64");
  if (image.length < 1024) {
    console.error(`Venice returned an unexpectedly small image for ${scene.id}.`);
    process.exit(1);
  }

  const outputPath = join(outputDir, scene.output);
  await writeFile(outputPath, image);
  manifest.assets.push({
    id: scene.id,
    output: scene.output,
    bytes: image.length,
    prompt
  });
  console.log(`Saved draft: ${outputPath} (${image.length} bytes)`);
}

await writeFile(join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log("Three environment-only drafts are ready; none has been added to the runtime manifest.");
