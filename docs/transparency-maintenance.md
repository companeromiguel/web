# Maintaining Transparency documents

The four pages use `lib/transparency-documents.json`. Approved descriptions are stored separately in `lib/transparency-approved-copy.json`. The 15 documents covered by the outstanding decisions in [the wording review](transparency-wording-review.md) still use filenames without summaries.

## Source documents

- Import source: `D:\tmcwd-website\public`.
- 34 input PDFs, 33 unique files after SHA-256 deduplication.
- Published file location: `public/documents/transparency/` (about 118.3 MiB).
- Each manifest record contains its source paths, hash, page count, size and category.
- Charter duplicates share one entry on Citizen's Charter. Transparency Seal links to its ARTA section.
- Approved titles/summaries are applied only when their recorded SHA-256 matches the current PDF; other documents display original filenames. A filename year is an archive sort key, not verification of the document's fiscal year.
- Document links include a content-hash query to refresh browser caches after a replacement and re-import.

## Replacing documents

From the project folder:

```powershell
node scripts/import-transparency.mjs "D:/tmcwd-website/public"
npm run build
```

Review the manifest diff and `docs/transparency-wording-review.md` before publishing. The import script does not delete old files or approve descriptions; review removed/renamed source files and any old public artifacts explicitly. A static deployment must be rebuilt and redeployed for new PDFs to reach visitors.

## PDF previews

The preview component and PDF.js load after a visitor selects Preview. Canvas previews are generated from that same PDF; there are no stored preview images. Only the current and adjacent pages have canvases. Closing a preview destroys its PDF loading task. Each document section allows one open preview.

PDF.js is pinned in package.json. `predev` and `prebuild` copy the matching worker, decoders, fonts and character maps into ignored `public/pdfjs/<version>/`. This avoids worker/library version mismatch and third-party CDN dependencies. If a dev server was already running during setup, run `node scripts/prepare-pdfjs.mjs` once or restart it with `npm run dev`.

The viewer uses range requests where hosting supports them and limits automatic fetching. Hosts without range support may transfer the whole PDF after Preview. Rendering is capped at 1400 pixels wide. Open PDF and Download remain available if JavaScript, the viewer or PDF decoding fails.

The canvas preview is a visual aid, not a replacement for a tagged, accessible original PDF. Source documents have not been altered or remediated.

## Review and verification

- All source files parsed; every copied PDF hash matched its source.
- The static production build and TypeScript checks passed.
- Browser checks cover deferred fetching, touch swiping, page selection, first/last boundaries, bounded canvas count, preview close, mobile overflow, all PDF links, submenu navigation and failed-PDF fallback.
- The temporary local test/audit outputs are ignored by Git; no rendered page images are added to public.
- Nothing is committed or deployed by the import/build scripts.
