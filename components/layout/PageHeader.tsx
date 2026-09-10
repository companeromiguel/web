import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Extra content rendered below the description (e.g. section pill nav) */
  children?: React.ReactNode;
}

/**
 * Shared minimal page header used on all inner pages.
 * Replaces the heavy indigo full-bleed block with a clean
 * white-background treatment with a single indigo left accent.
 */
export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E8EEF2] pt-[80px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-[#370A77] tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-sm text-[#2A2A29]/65 max-w-xl leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </div>
  );
}

/** Reusable breadcrumb — place inside or above PageHeader */
export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs text-[#2A2A29]/45 list-none p-0">
        <li>
          <Link href="/" className="hover:text-[#0591D4] transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-[#2A2A29]/70">{current}</li>
      </ol>
    </nav>
  );
}
