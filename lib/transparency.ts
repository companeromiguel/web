import inventory from "./transparency-documents.json";
import approvedCopy from "./transparency-approved-copy.json";

export interface TransparencyDocument {
  id: string;
  filename: string;
  title?: string;
  summary?: string;
  url: string;
  pages: number;
  bytes: number;
  sha256: string;
  group: string;
  year: number;
  sources: string[];
}
const approvedDocuments: Record<string, { sha256: string; title: string; summary: string }> = approvedCopy.documents;
export const sectionDescriptions: Record<string, string> = approvedCopy.sections;
export const documents: TransparencyDocument[] = inventory.map(doc => {
  const copy = approvedDocuments[doc.id];
  // A replacement PDF needs fresh wording approval, even if its filename is unchanged.
  return copy?.sha256 === doc.sha256 ? { ...doc, title: copy.title, summary: copy.summary } : doc;
});
export const transparencyPages = [
  { slug: "seal", title: "Transparency Seal", groups: ["Budgets", "Financial statements", "SALN certifications", "Rankings"] },
  { slug: "foi", title: "Freedom of Information", groups: ["FOI documents", "Certifications"] },
  { slug: "citizens-charter", title: "Citizen's Charter", groups: ["Citizen's Charter", "Related ARTA documents"] },
  { slug: "procurement", title: "Bidding & Procurement", groups: ["Annual procurement plans"] },
];
export function documentsFor(groups: string[]) {
  return documents.filter(doc => groups.includes(doc.group)).sort((a, b) => b.year - a.year || a.filename.localeCompare(b.filename));
}
