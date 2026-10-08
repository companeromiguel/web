import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Statement of Account – TMCWD",
  description:
    "Online statement of account for TMCWD water district subscribers.",
};

export default function SoaPage() {
  return (
    <>
      <PageHeader
        title="Statement of Account"
        description="View and download your Statement of Account online."
      >
        <Breadcrumb
          items={[{ label: "Online Bill Inquiry", href: "/online-bill-inquiry/" }]}
          current="SOA"
        />
      </PageHeader>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#EDF6FB] mb-6">
          <svg
            className="size-8 text-[#0591D4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
        <h2 className="font-heading text-xl font-semibold text-[#2A2A29] mb-3">
          Contents will be added soon
        </h2>
        <p className="text-sm text-[#2A2A29]/60 max-w-md mx-auto">
          This section is currently being prepared. Please check back later or
          contact the office for assistance with your Statement of Account.
        </p>
      </div>
    </>
  );
}
