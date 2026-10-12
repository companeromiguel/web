import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Water Quality",
  description:
    "TMCWD monitors water quality and reports results annually through the Consumer Confidence Report.",
};

export default function WaterQualityPage() {
  return (
    <>
      <PageHeader
        title="Water Quality"
        description="TMCWD monitors water quality and reports results annually through the Consumer Confidence Report."
      >
        <Breadcrumb current="Water Quality" />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">

          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#DEEEFA] mb-6">
            <svg className="w-10 h-10 text-[#0591D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.5-1.175 2.096a3 3 0 0 1-2.6 1.404H7.975a3 3 0 0 1-2.6-1.404L4.2 15M5 14.5l-1.175.523" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-2xl font-bold text-[#2A2A29] mb-3">
            Water Quality Reports Coming Soon
          </h2>

          {/* Description */}
          <p className="text-sm text-[#2A2A29]/60 leading-relaxed mb-8">
            We are preparing our Consumer Confidence Reports and latest water quality test results
            for publication. This page will display bacteriological and physical-chemical
            parameters tested in accordance with water quality standards.
          </p>

          {/* Contact note */}
          <p className="text-xs text-[#2A2A29]/45 leading-relaxed">
            For water quality concerns, contact us at{" "}
            <a href="mailto:tmcwd@yahoo.com" className="text-[#0591D4] hover:underline">
              tmcwd@yahoo.com
            </a>{" "}
            or call{" "}
            <a href="tel:+63917805039" className="text-[#0591D4] hover:underline">
              +63 917 805 0391
            </a>.
          </p>

        </div>
      </div>
    </>
  );
}
