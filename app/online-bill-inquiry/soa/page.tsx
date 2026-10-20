import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";
import SoaImageHotspots from "@/components/SoaImageHotspots";

export const metadata: Metadata = {
  title: "Customer's Section – TMCWD",
  description: "Online statement of account for TMCWD water district subscribers.",
};

export default function SoaPage() {
  return (
    <>
      <PageHeader
        title="Customer's Section"
        description="Hover over each section of the Statement of Account to learn what it means."
      >
        <Breadcrumb
          items={[{ label: "Online Services", href: "/online-bill-inquiry/" }]}
          current="Customer's Section"
        />
      </PageHeader>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <SoaImageHotspots />
      </div>
    </>
  );
}
