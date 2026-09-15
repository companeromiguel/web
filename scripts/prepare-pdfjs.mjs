import { cpSync, mkdirSync, readFileSync, copyFileSync } from "node:fs";
import path from "node:path";
const source = path.resolve("node_modules/pdfjs-dist");
const { version } = JSON.parse(readFileSync(path.join(source, "package.json"), "utf8"));
const target = path.resolve("public/pdfjs", version);
mkdirSync(target, { recursive: true });
copyFileSync(path.join(source, "build/pdf.worker.min.mjs"), path.join(target, "pdf.worker.min.mjs"));
copyFileSync(path.join(source, "LICENSE"), path.join(target, "LICENSE"));
for (const folder of ["wasm", "cmaps", "standard_fonts", "iccs"]) {
  cpSync(path.join(source, folder), path.join(target, folder), { recursive: true });
}
console.log("Prepared local PDF.js assets:", version);
