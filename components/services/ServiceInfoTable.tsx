/**
 * ServiceInfoTable
 * Two-column key/value block: Office/Division · Classification ·
 * Type of Transaction · Who May Avail.
 *
 * Styling: charter-table / charter-table-wrap classes (globals.css).
 * Colors come from site CSS tokens — no bare hex.
 */
export interface ServiceInfo {
  officeDivision: string;
  classification: string;
  typeOfTransaction: string;
  whoMayAvail: string;
}

export default function ServiceInfoTable({ info }: { info: ServiceInfo }) {
  const rows: [string, string][] = [
    ["OFFICE/DIVISION:",     info.officeDivision],
    ["CLASSFICIATION:",      info.classification],
    ["TYPE OF TRANSACTION:", info.typeOfTransaction],
    ["WHO MAY AVAIL:",       info.whoMayAvail],
  ];

  return (
    <div className="charter-table-wrap">
      <table className="charter-table">
        <caption className="sr-only">Service information summary</caption>
        <tbody>
          {rows.map(([key, value]) => (
            <tr key={key}>
              {/*
                scope="row" — the key describes every value in its row.
                Styling via .charter-table th[scope="row"] in globals.css:
                brand-ice background, bold uppercase, brand-charcoal text.
              */}
              <th scope="row" className="w-32 sm:w-56">
                {key}
              </th>
              <td className="text-foreground">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
