"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const CONCERN_OPTIONS = [
  { value: "billing",       label: "Billing & Account" },
  { value: "leak",          label: "Leak / Water Supply Concern" },
  { value: "application",   label: "New Water Application" },
  { value: "disconnection", label: "Disconnection / Reconnection" },
  { value: "other",         label: "Other" },
];

const inputClass =
  "w-full rounded-xl border border-[#C4DAE7] bg-white px-4 py-2.5 text-sm text-[#2A2A29] placeholder-[#2A2A29]/30 outline-none transition-colors focus:border-[#0591D4] focus:ring-2 focus:ring-[#0591D4]/20";

const labelClass = "block text-xs font-semibold text-[#294C61] mb-1.5";

export default function ContactForm() {
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      const json = await res.json() as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#C4DAE7] bg-white p-8 shadow-[0_8px_24px_rgba(35,82,110,0.10)] text-center">
        {/* Check icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DEEEFA]">
          <svg className="h-7 w-7 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-lg font-semibold text-[#087FB8] mb-2">
          Message sent!
        </h3>
        <p className="text-sm text-[#52616B] leading-relaxed max-w-xs mx-auto">
          We received your inquiry and will get back to you as soon as possible during office hours (Mon–Fri, 8 AM–5 PM).
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-semibold text-[#0591D4] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#C4DAE7] bg-white p-6 shadow-[0_8px_24px_rgba(35,82,110,0.10)] sm:p-8">
      <h2 className="font-heading text-xl font-semibold text-[#087FB8] mb-1">
        Send us a message
      </h2>
      <p className="text-sm text-[#52616B] mb-6">
        Fill in the form and we'll get back to you during office hours.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {/* Honeypot — hidden from humans, traps bots */}
        <input
          type="text"
          name="honeypot"
          defaultValue=""
          aria-hidden="true"
          tabIndex={-1}
          className="absolute -left-[9999px] opacity-0 pointer-events-none"
          autoComplete="off"
        />

        {/* Name */}
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Full Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Juan dela Cruz"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email Address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            onBlur={(e) => {
              const val = e.target.value.trim();
              if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                e.target.setCustomValidity("Please enter a valid email address with @.");
                e.target.reportValidity();
              } else {
                e.target.setCustomValidity("");
              }
            }}
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          />
        </div>

        {/* Account number */}
        <div>
          <label htmlFor="cf-account" className={labelClass}>
            Account Number <span className="text-[#52616B]/50 font-normal">(optional)</span>
          </label>
          <input
            id="cf-account"
            name="accountNumber"
            type="text"
            autoComplete="off"
            placeholder="e.g. 01-0001-00"
            className={inputClass}
          />
        </div>

        {/* Concern type */}
        <div>
          <label htmlFor="cf-concern" className={labelClass}>
            Concern Type <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="cf-concern"
            name="concernType"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>Select a concern…</option>
            {CONCERN_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="cf-message" className={labelClass}>
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="Describe your concern in detail…"
            className={`${inputClass} resize-y min-h-[120px]`}
          />
        </div>

        {/* Error banner */}
        {status === "error" && errorMsg && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-[#0591D4] hover:bg-[#0480bc] disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0591D4] focus-visible:ring-offset-2"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Sending…
            </span>
          ) : (
            "Send Message"
          )}
        </button>

        <p className="text-[11px] text-[#52616B]/50 text-center leading-relaxed">
          For urgent concerns, call us directly at{" "}
          <a href="tel:+63464192664" className="text-[#0591D4] hover:underline">(046) 419-2664</a>
          {" "}or{" "}
          <a href="tel:+639178050391" className="text-[#0591D4] hover:underline">0917-805-0391</a>.
        </p>
      </form>
    </div>
  );
}
