import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const SRC_DIR = "./public";
const OUT_DIR = "./public/portfolio";
const SKIP = ["profile.jpg", "placeholder.svg", "favicon.ico", "robots.txt", "sitemap.xml"];

// Portfolio images: max width 1400px, 85% quality JPEG
// Perfect for web — retina-ready but not bloated
const MAX_WIDTH = 1400;
const QUALITY = 85;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(SRC_DIR).filter((f) => {
  const ext = extname(f).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp"].includes(ext) && !SKIP.includes(f);
});

console.log(`Found ${files.length} images to optimize...\n`);

let idx = 1;
const manifest = [];

for (const file of files) {
  const srcPath = join(SRC_DIR, file);
  const outName = `project-${String(idx).padStart(2, "0")}.jpg`;
  const outPath = join(OUT_DIR, outName);

  try {
    const meta = await sharp(srcPath).metadata();
    const originalW = meta.width || 0;
    const originalH = meta.height || 0;

    await sharp(srcPath)
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,  // don't upscale small images
        fit: "inside",
      })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toFile(outPath);

    const afterMeta = await sharp(outPath).metadata();
    console.log(
      `✓ ${outName} — ${originalW}x${originalH} → ${afterMeta.width}x${afterMeta.height} | src: ${file}`
    );

    manifest.push({ file: `/portfolio/${outName}`, original: file });
    idx++;
  } catch (e) {
    console.error(`✗ Failed: ${file} —`, e.message);
  }
}

console.log(`\n✅ Done! ${manifest.length} images saved to public/portfolio/`);
console.log("\nManifest for portfolioImages array:");
console.log(JSON.stringify(manifest.map((m) => m.file), null, 2));
