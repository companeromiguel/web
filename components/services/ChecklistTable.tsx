/**
 * ChecklistTable
 * Two-column table: CHECKLIST OF REQUIREMENTS / WHERE TO SECURE.
 *
 * Styling: charter-table / charter-table-wrap classes (globals.css).
 * Header row class: charter-thead-primary → brand-blue background.
 */
export interface ChecklistRow {
  requirement: string;
  whereToSecure: string;
}

interface ChecklistTableProps {
  rows: ChecklistRow[];
  /** Screen-reader caption. Defaults to "Checklist of Requirements". */
  caption?: string;
}

export default function ChecklistTable({
  rows,
  caption = "Checklist of Requirements",
}: ChecklistTableProps) {
  return (
    <div className="charter-table-wrap">
      <table className="charter-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="charter-thead-primary">
            <th scope="col" className="w-1/2 text-left">
              CHECKLIST OF REQUIREMENTS
            </th>
            <th scope="col" className="w-1/2 text-left">
              WHERE TO SECURE
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.requirement}</td>
              <td>{row.whereToSecure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
