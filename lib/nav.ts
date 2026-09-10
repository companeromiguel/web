export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Home",               href: "/" },
  { label: "Water Quality",      href: "/water-quality/" },
  { label: "Transparency",       href: "/transparency/" },
  { label: "Board & Meetings",   href: "/board-meetings/" },
  { label: "News",               href: "/news/" },
  { label: "Contact",            href: "/contact/" },
];
