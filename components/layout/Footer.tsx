import Link from "next/link";
import Image from "next/image";
import { primaryNav } from "@/lib/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A2A29] text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                alt="TMCWD seal"
                width={28}
                height={28}
                className="size-7 shrink-0"
              />
              <span className="text-sm font-semibold text-white/90 tracking-tight">
                Trece Martires City Water District
              </span>
            </div>
            <p className="text-xs text-white/45 leading-relaxed max-w-xs">
              A government-owned and controlled corporation under Presidential
              Decree No. 198, serving Trece Martires City, Cavite.
            </p>
            <address className="mt-5 not-italic text-xs text-white/55 space-y-1.5">
              <p>[ADD: Street address], Trece Martires City, Cavite</p>
              <p>
                <a href="tel:+63464191234" className="hover:text-white transition-colors">
                  (046) 419-1234
                </a>
                {" · "}
                <a href="mailto:info@tmcwd.gov.ph" className="hover:text-white transition-colors">
                  info@tmcwd.gov.ph
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {primaryNav.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-white/55 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-4">
              Transparency
            </p>
            <ul className="space-y-2.5 text-xs text-white/55">
              {[
                ["Full Disclosure Policy",  "/transparency/#full-disclosure"],
                ["Freedom of Information",  "/transparency/#foi"],
                ["Procurement Plans",       "/transparency/#procurement"],
                ["Citizen's Charter",       "/transparency/#citizens-charter"],
                ["Financial Reports",       "/transparency/#financials"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-white/30">
          <p>&copy; {year} Trece Martires City Water District. All rights reserved.</p>
          <p className="text-white/40 font-medium">tmcwd.gov.ph</p>
        </div>
      </div>
    </footer>
  );
}
