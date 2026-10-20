import type { Metadata } from "next";
import TransparencyHero from "@/components/transparency/TransparencyHero";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import SealContent from "@/components/transparency/SealContent";
import { documents } from "@/lib/transparency";

export const metadata: Metadata = {
  title: "Transparency Seal",
  description: "Browse TMCWD's budget, financial, SALN, procurement, and other transparency seal documents.",
};

function getDocs(group: string) {
  return documents
    .filter(d => d.group === group)
    .sort((a, b) => b.year - a.year || a.filename.localeCompare(b.filename));
}

export default function SealPage() {
  return (
    <>
      <TransparencyHero
        title="Transparency Seal"
        description="Browse the supplied budget, financial and operational, SALN, procurement, and ranking documents."
        sealHref="/transparency/seal/"
      />
      <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
        <TransparencyWaveBackground animated />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SealContent
            financialDocs={getDocs("Financial statements")}
            budgetDocs={getDocs("Budgets")}
            procurementDocs={getDocs("Annual procurement plans")}
            rankingDocs={getDocs("Rankings")}
            salnDocs={getDocs("SALN certifications")}
          />
        </div>
      </div>
    </>
  );
}
