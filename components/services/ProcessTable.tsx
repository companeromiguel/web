/**
 * ProcessTable
 * Five-column charter process table.
 *
 * CLIENT STEPS | AGENCY ACTIONS | FEES TO BE PAID | PROCESSING TIME | PERSON RESPONSIBLE
 *
 * Uses TableScrollWrap (client component) for the mobile scroll hint + fade.
 * Sticky thead keeps column headers visible while scrolling down long tables.
 */

import TableScrollWrap from "@/components/services/TableScrollWrap";

export interface ProcessRow {
  /**
   * Text for the CLIENT STEPS cell.
   * null on sub-rows whose cell is covered by a rowspan from above.
   */
  clientStep: string | null;
  /** Rows this client-step cell spans. Set only on the first row of a group. */
  clientStepRowspan?: number;
  agencyAction: string;
  feesToBePaid: string;
  processingTime: string;
  personResponsible: string;
}

export interface ProcessTableProps {
  rows: ProcessRow[];
  /** TOTAL row — fees column (e.g. "Estimated amount of Php5,000 and above"). */
  totalFees: string;
  /** TOTAL row — time column (e.g. "10 hours and 54 minutes"). */
  totalTime: string;
  /** Screen-reader caption naming this process. */
  caption: string;
}

export default function ProcessTable({
  rows,
  totalFees,
  totalTime,
  caption,
}: ProcessTableProps) {
  /*
   * Compute a logical group index for each row so that all sub-rows belonging
   * to the same client-step group share the same even/odd stripe class.
   * A new group starts whenever clientStep is not null.
   */
  let groupIndex = -1;
  const groupIndices = rows.map((row) => {
    if (row.clientStep !== null) groupIndex++;
    return groupIndex;
  });

  return (
    <TableScrollWrap hint="Scroll left or right to see all columns">
      <table className="charter-table">
        <caption className="sr-only">{caption}</caption>

        <thead>
          <tr className="charter-thead-primary">
            <th scope="col" className="w-[18%] text-center">CLIENT STEPS</th>
            <th scope="col" className="text-center">AGENCY ACTIONS</th>
            <th scope="col" className="w-[14%] text-center">FEES TO BE PAID</th>
            <th scope="col" className="w-[13%] text-center">PROCESSING TIME</th>
            <th scope="col" className="w-[16%] text-center">PERSON RESPONSIBLE</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => {
            const isEven = groupIndices[i] % 2 === 0;
            return (
              <tr
                key={i}
                className={isEven
                  ? "bg-white"
                  : "[background-color:#f4f9fd]"}
              >
                {row.clientStep !== null && (
                  <td rowSpan={row.clientStepRowspan ?? 1} className="align-top">
                    {row.clientStep}
                  </td>
                )}
                <td className="align-top">
                  {row.agencyAction || <span aria-hidden="true">—</span>}
                </td>
                <td className="num-center align-top">
                  {row.feesToBePaid || <span className="sr-only">none</span>}
                </td>
                <td className="num-center align-top">
                  {row.processingTime || <span className="sr-only">not listed</span>}
                </td>
                <td className="align-top text-center italic">
                  {row.personResponsible || <span className="sr-only">not listed</span>}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <th scope="row" colSpan={2} className="text-right font-bold">TOTAL</th>
            <td className="num-center font-semibold">{totalFees}</td>
            <td className="num-center font-semibold">{totalTime}</td>
            <td aria-hidden="true" />
          </tr>
          <tr>
            <td colSpan={5} className="text-center font-bold tracking-wide">
              END OF TRANSACTION
            </td>
          </tr>
        </tfoot>
      </table>
    </TableScrollWrap>
  );
}
