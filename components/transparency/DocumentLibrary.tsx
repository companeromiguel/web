"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { TransparencyDocument } from "@/lib/transparency";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <p role="status" className="p-5 text-sm">Loading preview tools…</p>,
});
const linkStyle = "rounded border border-[#0591D4]/30 px-4 py-2 text-sm font-medium text-[#0591D4] hover:bg-[#0591D4]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0591D4]";

export default function DocumentLibrary({ documents }: { documents: TransparencyDocument[] }) {
  const [preview, setPreview] = useState<string | null>(null);
  return <div className="space-y-4">
    {documents.map((doc) => <article key={doc.id} id={doc.id} className="scroll-mt-24 border border-[#E8EEF2] bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="break-words font-heading text-base font-semibold text-[#2A2A29]">{doc.title ?? doc.filename}</h3>
          {doc.summary && <p className="mt-2 text-sm leading-relaxed text-[#2A2A29]/65">{doc.summary}</p>}
          <p className="mt-1 text-xs text-[#2A2A29]/60">PDF · {doc.pages} {doc.pages === 1 ? "page" : "pages"} · {(doc.bytes / 1024 / 1024).toFixed(1)} MB</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" className={linkStyle} aria-expanded={preview === doc.id} aria-controls={doc.id + "-preview"} onClick={() => setPreview(preview === doc.id ? null : doc.id)}>
            {preview === doc.id ? "Close preview" : "Preview"}<span className="sr-only"> {doc.filename}</span>
          </button>
          <a className={linkStyle} href={doc.url} target="_blank" rel="noopener noreferrer">Open PDF<span className="sr-only">: {doc.filename} (new tab)</span></a>
          <a className={linkStyle} href={doc.url} download={doc.filename}>Download<span className="sr-only"> {doc.filename}</span></a>
        </div>
      </div>
      <div id={doc.id + "-preview"}>
        {preview === doc.id && <PdfViewer key={doc.url} url={doc.url} title={doc.filename} />}
      </div>
    </article>)}
  </div>;
}
