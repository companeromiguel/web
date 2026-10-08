import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Extra content rendered below the description (e.g. section pill nav) */
  children?: React.ReactNode;
}

/**
 * Shared minimal page header used on all inner pages.
 * Uses blue page titles on a white background.
 */
export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E8EEF2] pt-[80px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-[#0591D4] tracking-tight leading-tight">
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

/** Reusable breadcrumb — place inside or above PageHeader.
 *  `items` is an optional list of intermediate { label, href } links between
 *  Home and the current (active) page.
 */
export function Breadcrumb({
  current,
  items,
}: {
  current: string;
  items?: { label: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs text-[#2A2A29]/45 list-none p-0">
        <li>
          <Link href="/" className="hover:text-[#0591D4] transition-colors">
            Home
          </Link>
        </li>
        {items?.map(({ label, href }) => (
          <>
            <li aria-hidden="true" key={`sep-${href}`}>/</li>
            <li key={href}>
              <Link href={href} className="hover:text-[#0591D4] transition-colors">
                {label}
              </Link>
            </li>
          </>
        ))}
        <li aria-hidden="true">/</li>
        <li className="text-[#2A2A29]/70">{current}</li>
      </ol>
    </nav>
  );
}
