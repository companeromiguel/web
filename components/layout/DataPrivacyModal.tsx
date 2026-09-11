"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "tmcwd_privacy_acknowledged";

export default function DataPrivacyModal() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't acknowledged before
    const already = localStorage.getItem(STORAGE_KEY);
    if (!already) {
      setVisible(true);
    }
    setMounted(true);
  }, []);

  function handleContinue() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!mounted || !visible) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      {/* Card */}
      <div className="relative w-full max-w-2xl max-h-[90dvh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-[#0591D4]">
          {/* Shield icon */}
          <svg
            className="shrink-0 size-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
          <h2
            id="privacy-modal-title"
            className="text-lg font-semibold text-white tracking-wide"
          >
            Data Privacy Notice
          </h2>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-gray-700 leading-relaxed flex-1">

          {/* Personal Information */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Personal Information</h3>
            <p>
              We collect personal information from you when you manually or electronically submit the
              following, but not limited to:
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-0.5 text-gray-600">
              <li>Full name</li>
              <li>Address</li>
              <li>Email address</li>
              <li>Contact details</li>
            </ul>
          </section>

          {/* Use */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Use</h3>
            <p>
              All information we collect shall be kept private and confidential by the TMCWD and shall
              be used solely for legal purposes as mandated by the Data Privacy Act and other relevant
              laws. Information that are matters of public interest, however, may be disclosed to the
              public subject to applicable laws, rules, and regulations. Pictures taken during any
              activity may also be used in TMCWD&apos;s promotional and publicity materials.
            </p>
          </section>

          {/* Measures */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Measures</h3>
            <p>
              Only authorized TMCWD personnel has access to these personal information, the exchange
              of which will be facilitated through email and hard copy. Storage shall be within a
              period as may be authorized by law. Physical records shall be disposed through
              shredding, while digital files shall be anonymized.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
            <p>
              You have the right to ask for a copy of any personal information we hold about you, as
              well as ask for correction. For data privacy concerns and/or feedback regarding this
              privacy notice, please fill out the Data Access, Alteration, and/or Complaint Form and
              file with the Data Protection Officer three (3) printed copies of the form enclosed in a
              sealed and labeled envelope (whether Access, Alteration, and/or Complaint). Kindly
              address it to:
            </p>
            <address className="not-italic mt-3 space-y-0.5 text-gray-600 border-l-2 border-[#0591D4] pl-4">
              <p className="font-medium text-gray-800">Data Protection Officer</p>
              <p>Trece Martires City Water District</p>
              <p>Provincial Capitol Compound, Trece Martires City, Cavite</p>
              <p>Region IV-A, Philippines, 4109</p>
              <p>
                Phone:{" "}
                <a href="tel:+63464192664" className="text-[#0591D4] hover:underline">
                  (046) 419-2664 loc. 110
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:tmcwd@yahoo.com" className="text-[#0591D4] hover:underline">
                  tmcwd@yahoo.com
                </a>
              </p>
            </address>
            <p className="mt-3">
              Rest assured that TMCWD implements strict security controls to protect personal
              information.
            </p>
          </section>
        </div>

        {/* Footer — checkbox + button */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Acknowledge checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-sm text-gray-700">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-gray-300 accent-[#0591D4] cursor-pointer"
            />
            I acknowledge that I have read and understood the Data Privacy Notice.
          </label>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!checked}
            className={[
              "shrink-0 px-6 py-2 rounded-lg text-sm font-semibold transition-colors",
              checked
                ? "bg-[#0591D4] text-white hover:bg-[#047ab5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0591D4]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed",
            ].join(" ")}
            aria-disabled={!checked}
          >
            Continue to Website
          </button>
        </div>
      </div>
    </div>
  );
}
