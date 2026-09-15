"use client";

import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

const assetRoot = `/pdfjs/${version}/`;
GlobalWorkerOptions.workerSrc = assetRoot + "pdf.worker.min.mjs";

function PdfPage({ pdf, number, width }: { pdf: PDFDocumentProxy; number: number; width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("Loading page…");
  useEffect(() => {
    let cancelled = false;
    let render: RenderTask | undefined;
    async function draw() {
      try {
        const page = await pdf.getPage(number);
        if (cancelled || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const base = page.getViewport({ scale: 1 });
        const pixels = Math.min(width * Math.min(window.devicePixelRatio || 1, 2), 1400);
        const viewport = page.getViewport({ scale: pixels / base.width });
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        render = page.render({ canvas, viewport });
        await render.promise;
        if (!cancelled) setStatus("");
      } catch {
        if (!cancelled) setStatus("This page could not be previewed. Use Open PDF to view the original.");
      }
    }
    void draw();
    return () => { cancelled = true; render?.cancel(); };
  }, [pdf, number, width]);
  return <div className="min-h-40 bg-white">
    {status && <p role="status" className="p-4 text-sm text-[#2A2A29]/65">{status}</p>}
    <canvas ref={canvasRef} role="img" aria-label={`Document page ${number}. Use Open PDF above to read the original document.`} className="block h-auto w-full" />
  </div>;
}

export default function PdfViewer({ url, title }: { url: string; title: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(600);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    let disposed = false;
    const task = getDocument({
      url,
      cMapUrl: assetRoot + "cmaps/",
      cMapPacked: true,
      standardFontDataUrl: assetRoot + "standard_fonts/",
      wasmUrl: assetRoot + "wasm/",
      iccUrl: assetRoot + "iccs/",
      disableAutoFetch: true,
      disableStream: true,

    });
    task.promise.then((document) => { if (!disposed) setPdf(document); })
      .catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; void task.destroy(); };
  }, [url]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      setWidth(Math.max(1, element.clientWidth - 16));
      element.scrollLeft = activeRef.current * element.clientWidth;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [pdf]);

  function goTo(index: number) {
    if (!pdf || !track.current) return;
    const next = Math.max(0, Math.min(index, pdf.numPages - 1));
    track.current.scrollTo({ left: next * track.current.clientWidth, behavior: "instant" });
    activeRef.current = next;
    setActive(next);
  }

  if (failed) return <p role="alert" className="border-t border-[#E8EEF2] p-5 text-sm">Preview unavailable. Please use Open PDF or Download above.</p>;
  if (!pdf) return <p role="status" className="border-t border-[#E8EEF2] p-5 text-sm">Loading document…</p>;
  return <div className="border-t border-[#E8EEF2] bg-[#F7FAFB] py-4">
    <div className="mb-3 flex flex-wrap items-center justify-center gap-3 px-4">
      <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} className="min-h-11 rounded border border-[#E8EEF2] bg-white px-4 text-sm disabled:opacity-40">Previous</button>
      <label className="text-sm">Page <select aria-label="Choose document page" value={active} onChange={(event) => goTo(Number(event.target.value))} className="min-h-11 rounded border border-[#E8EEF2] bg-white px-2">
        {Array.from({ length: pdf.numPages }, (_, i) => <option key={i} value={i}>{i + 1}</option>)}
      </select> of {pdf.numPages}</label>
      <button type="button" onClick={() => goTo(active + 1)} disabled={active === pdf.numPages - 1} className="min-h-11 rounded border border-[#E8EEF2] bg-white px-4 text-sm disabled:opacity-40">Next</button>
    </div>
    <p className="mb-3 px-4 text-center text-xs text-[#2A2A29]/60">Swipe left or right, or use the page controls. Open PDF for a larger view.</p>
    <p className="sr-only" aria-live="polite">Page {active + 1} of {pdf.numPages}</p>
    <div ref={track} role="region" aria-label={`Pages of ${title}`} tabIndex={0}
      className="flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-[#0591D4]"
      onScroll={(event) => { const el = event.currentTarget; const index = Math.max(0, Math.min(pdf.numPages - 1, Math.round(el.scrollLeft / el.clientWidth))); activeRef.current = index; setActive(index); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); goTo(active + (event.key === "ArrowRight" ? 1 : -1)); }
      }}>
      {Array.from({ length: pdf.numPages }, (_, i) => <div key={i} className="w-full min-w-0 shrink-0 snap-start px-2">
        {Math.abs(i - active) <= 1
          ? <PdfPage key={width} pdf={pdf} number={i + 1} width={width} />
          : <div aria-hidden="true" className="aspect-[0.707] bg-white" />}
      </div>)}
    </div>
  </div>;
}
