import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

// Find static output directory from Nitro or prerender
const candidates = [
  path.join(root, ".vercel", "output", "static"),
  path.join(root, ".output", "public"),
];

let sourceDir = null;
for (const dir of candidates) {
  if (fs.existsSync(dir) && fs.existsSync(path.join(dir, "index.html"))) {
    sourceDir = dir;
    break;
  }
}

if (!sourceDir) {
  // If index.html is anywhere in output candidates
  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      sourceDir = dir;
      break;
    }
  }
}

if (sourceDir) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(sourceDir, distDir, { recursive: true });
  console.log(`[postbuild] Copied ${sourceDir} -> ${distDir} successfully.`);
} else {
  console.warn("[postbuild] Warning: No static build directory found to copy to dist.");
}
