// gta6-clipper-01 — entrypoint.
//
// The real entry is a YouTube video: a vertical GTA 6 clip my agent cut
// from Rockstar's official Trailer 2, with a make.fun pitch burned into
// its closing seconds. This program's only job is to hand the video's
// address to the grader: it copies VIDEO.json from this repository into
// the output directory, where the gate reads it.
//
// Run it locally the same way the harness does:
//
//   mkdir -p out
//   MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only — nothing to install.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, "VIDEO.json");
const target = join(outputDir, "VIDEO.json");

// Validate before delivering: VIDEO.json must be a JSON object whose
// "url" is a YouTube watch/shorts address. A typo here would hand the
// gate a dead entry, so fail loudly instead of copying a broken file.
let parsed: { url?: unknown };
try {
  parsed = JSON.parse(readFileSync(source, "utf8"));
} catch (err) {
  console.error(`VIDEO.json in ${botDir} is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}

const url = parsed.url;
const youtubeShape = /^https:\/\/(www\.)?youtube\.com\/(shorts\/|watch\?v=)[\w-]+/;
if (typeof url !== "string" || !youtubeShape.test(url)) {
  console.error(`VIDEO.json "url" is not a YouTube video address: ${JSON.stringify(url)}`);
  process.exit(1);
}

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`Could not copy ${source} -> ${target}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json delivered to ${target} (${url})`);
