#!/usr/bin/env node
/**
 * process-assets.mjs
 *
 * Local post-processing for game assets:
 * 1. Make transparent cutouts from images generated on solid backgrounds
 *    (white-key / black-key via ffmpeg colorkey, soft edges).
 * 2. Assemble numbered transparent PNG frames into looping animated WebP
 *    with real alpha (libwebp_anim + yuva420p).
 *
 * Usage examples:
 *   node scripts/process-assets.mjs cutout input.png output.png --key white
 *   node scripts/process-assets.mjs anim frames/ frame_%04d.png out.webp --fps 8
 *
 * Requires ffmpeg in PATH. Prefer generating on pure #FFFFFF or #000000
 * when native transparency is unavailable so the key is clean.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`Command failed: ${cmd} ${args.join(" ")}`);
    process.exit(r.status ?? 1);
  }
}

function ensureDir(file) {
  mkdirSync(dirname(file), { recursive: true });
}

function cutout(input, output, key = "white", similarity = "0.08", blend = "0.05") {
  if (!existsSync(input)) {
    console.error("Input not found:", input);
    process.exit(1);
  }
  ensureDir(output);

  const color = key.toLowerCase() === "black" ? "0x000000" : "0xFFFFFF";
  // colorkey → format rgba so alpha is preserved, then export PNG
  const vf = [
    `colorkey=${color}:${similarity}:${blend}`,
    "format=rgba"
  ].join(",");

  run("ffmpeg", [
    "-y", "-i", input,
    "-vf", vf,
    "-c:v", "png",
    output
  ]);
  console.log("Cutout written:", output);
}

function anim(pattern, output, fps = 8, lossless = true) {
  // pattern is the ffmpeg input pattern, e.g. "frames/frame_%04d.png"
  ensureDir(output);

  const args = [
    "-y",
    "-framerate", String(fps),
    "-i", pattern,
    "-c:v", "libwebp_anim",
    "-pix_fmt", "yuva420p",
    "-loop", "0",
    "-an"
  ];

  if (lossless) {
    args.push("-lossless", "1");
  } else {
    args.push("-quality", "80");
  }

  args.push(output);
  run("ffmpeg", args);
  console.log("Animation written:", output);
}

function main() {
  const [,, cmd, ...rest] = process.argv;
  if (!cmd || ["-h", "--help"].includes(cmd)) {
    console.log(`Usage:
  node scripts/process-assets.mjs cutout <input> <output.png> [--key white|black] [--similarity 0.08] [--blend 0.05]
  node scripts/process-assets.mjs anim <input-pattern> <output.webp> [--fps 8] [--lossy]

Examples:
  node scripts/process-assets.mjs cutout raw/portrait.png out/portrait.png --key white
  node scripts/process-assets.mjs anim frames/frame_%04d.png assets/animations/virag/wink.webp --fps 6
`);
    process.exit(0);
  }

  if (cmd === "cutout") {
    const [input, output, ...flags] = rest;
    let key = "white", similarity = "0.08", blend = "0.05";
    for (let i = 0; i < flags.length; i++) {
      if (flags[i] === "--key") key = flags[++i];
      if (flags[i] === "--similarity") similarity = flags[++i];
      if (flags[i] === "--blend") blend = flags[++i];
    }
    cutout(resolve(input), resolve(output), key, similarity, blend);
  } else if (cmd === "anim") {
    const [pattern, output, ...flags] = rest;
    let fps = 8, lossless = true;
    for (let i = 0; i < flags.length; i++) {
      if (flags[i] === "--fps") fps = Number(flags[++i]);
      if (flags[i] === "--lossy") lossless = false;
    }
    anim(pattern, resolve(output), fps, lossless);
  } else {
    console.error("Unknown command:", cmd);
    process.exit(1);
  }
}

main();
