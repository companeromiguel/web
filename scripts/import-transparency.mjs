import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// Run manually when replacing source PDFs. Page summaries require editorial review.
const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/import-transparency.mjs <source-public-directory>");
const groups = {
  "CITIZEN CHARTER": "Citizen's Charter",
  arta: "Related ARTA documents",
  budget: "Budgets",
  "financial statements": "Financial statements",
  FOI: "FOI documents",
  procurement: "Annual procurement plans",
  ranking: "Rankings",
  saln: "SALN certifications",
};
const records = [], seen = new Map();
for (const [folder, group] of Object.entries(groups)) {
  for (const filename of fs.readdirSync(path.join(source, folder)).filter(file => /\.pdf$/i.test(file)).sort()) {
    const data = fs.readFileSync(path.join(source, folder, filename));
    const sha256 = createHash("sha256").update(data).digest("hex");
    const sourceName = folder + "/" + filename;
    if (seen.has(sha256)) { seen.get(sha256).sources.push(sourceName); continue; }
    const id = (folder + "-" + filename.replace(/\.pdf$/i, "")).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
    const relative = "documents/transparency/" + id + ".pdf";
    fs.mkdirSync(path.dirname(path.join("public", relative)), { recursive: true });
    fs.writeFileSync(path.join("public", relative), data);
    const task = getDocument({ data: new Uint8Array(data) });
    const pdf = await task.promise;
    const record = {
      id, filename, url: "/" + relative + "?v=" + sha256.slice(0, 12),
      pages: pdf.numPages, bytes: data.length, sha256,
      group: folder === "FOI" && /certification/i.test(filename) ? "Certifications" : group,
      year: Number(filename.match(/20\d{2}/)?.[0] ?? 0), sources: [sourceName],
    };
    records.push(record); seen.set(sha256, record);
    await task.destroy();
  }
}
fs.writeFileSync("lib/transparency-documents.json", JSON.stringify(records, null, 2) + "\n");
console.log("Imported", records.length, "unique PDFs. Review docs/transparency-wording-review.md before adding descriptions.");
