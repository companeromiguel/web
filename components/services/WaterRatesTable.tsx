/**
 * WaterRatesTable — uses TableScrollWrap for mobile scroll hint + fade.
 */
import TableScrollWrap from "@/components/services/TableScrollWrap";

interface RateRow {
  category: string;
  size: string;
  minCharge: string;
  p1120: string;
  p2130: string;
  p3140: string;
  p41up: string;
}

const rows: RateRow[] = [
  { category: "Commercial 1/2",            size: "1/2", minCharge: "340",      p1120: "36.5",  p2130: "39.1",  p3140: "41.8",  p41up: "47"    },
  { category: "Commercial-A 1",            size: "1",   minCharge: "952.00",   p1120: "31.9",  p2130: "34.2",  p3140: "36.55", p41up: "41.1"  },
  { category: "Commercial-A 1/2",          size: "1/2", minCharge: "297.5",    p1120: "31.9",  p2130: "34.2",  p3140: "36.55", p41up: "41.1"  },
  { category: "Commercial-A 2",            size: "2",   minCharge: "5,950.00", p1120: "31.9",  p2130: "34.2",  p3140: "36.55", p41up: "41.1"  },
  { category: "Commercial-A 3/4",          size: "3/4", minCharge: "476",      p1120: "31.9",  p2130: "34.2",  p3140: "36.55", p41up: "41.1"  },
  { category: "Commercial-B 1",            size: "1",   minCharge: "816",      p1120: "27.35", p2130: "29.3",  p3140: "31.35", p41up: "35.25" },
  { category: "Commercial-B 1/2",          size: "1/2", minCharge: "255",      p1120: "27.35", p2130: "29.3",  p3140: "31.35", p41up: "35.25" },
  { category: "Commercial-C 1",            size: "1",   minCharge: "680",      p1120: "22.8",  p2130: "24.4",  p3140: "26.1",  p41up: "29.35" },
  { category: "Commercial-C 1/2",          size: "1/2", minCharge: "212.5",    p1120: "22.8",  p2130: "24.4",  p3140: "26.1",  p41up: "29.35" },
  { category: "Commercial-C 2",            size: "2",   minCharge: "4,250.00", p1120: "22.8",  p2130: "24.4",  p3140: "26.1",  p41up: "29.35" },
  { category: "Commercial-C 3",            size: "3",   minCharge: "7,650.00", p1120: "22.8",  p2130: "24.4",  p3140: "26.1",  p41up: "29.35" },
  { category: "Commercial/Industrial 1",   size: "1",   minCharge: "1,088.00", p1120: "36.5",  p2130: "39.1",  p3140: "41.8",  p41up: "47"    },
  { category: "Commercial/Industrial 1/2", size: "1/2", minCharge: "340",      p1120: "36.5",  p2130: "39.1",  p3140: "41.8",  p41up: "47"    },
  { category: "Government 1/2",            size: "1/2", minCharge: "170",      p1120: "18.25", p2130: "19.55", p3140: "20.9",  p41up: "23.5"  },
  { category: "Government-A 2",            size: "2",   minCharge: "6,800.00", p1120: "18.25", p2130: "19.55", p3140: "20.9",  p41up: "23.5"  },
  { category: "Government-B 1",            size: "1",   minCharge: "544",      p1120: "18.25", p2130: "19.55", p3140: "20.9",  p41up: "23.5"  },
  { category: "Residential 1/2",           size: "1/2", minCharge: "170",      p1120: "18.25", p2130: "19.55", p3140: "20.9",  p41up: "23.5"  },
];

export default function WaterRatesTable() {
  return (
    <TableScrollWrap hint="Scroll left or right to see all rate columns">
      <table className="charter-table">
        <caption>TABLE 1. Schedule of Water Rates</caption>

        <thead>
          {/* ── Row 1: Category / Size / Min Charge span 2 rows; price group spans 4 ── */}
          <tr className="charter-thead-primary">
            <th
              scope="col"
              rowSpan={2}
              className="sticky-col text-center align-middle"
            >
              Category
            </th>
            <th scope="col" rowSpan={2} className="text-center align-middle">
              Size
            </th>
            <th scope="col" rowSpan={2} className="num-center align-middle">
              Minimum Charge<br />(0 - 10)
            </th>
            {/*
              colSpan={4} scope="col" — correct for a <th> spanning multiple columns.
              scope="colgroup" is only valid on <col> elements inside <colgroup>.
            */}
            <th scope="col" colSpan={4} className="text-center">
              Price per cubic meter
            </th>
          </tr>

          {/* ── Row 2: four range sub-headers ── */}
          <tr className="charter-thead-secondary">
            <th scope="col" className="num-center">11-20</th>
            <th scope="col" className="num-center">21-30</th>
            <th scope="col" className="num-center">31-40</th>
            <th scope="col" className="num-center">41-up</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.category}>
              {/*
                Category is the row identifier → <th scope="row">.
                sticky-col keeps it visible while scrolling horizontally.
                font-normal overrides the bold from th[scope=row] rule since
                category names read better at normal weight in data context.
              */}
              <th scope="row" className="sticky-col font-normal text-center">
                {row.category}
              </th>
              <td className="text-center">{row.size}</td>
              <td className="num-center">{row.minCharge}</td>
              <td className="num-center">{row.p1120}</td>
              <td className="num-center">{row.p2130}</td>
              <td className="num-center">{row.p3140}</td>
              <td className="num-center">{row.p41up}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableScrollWrap>
  );
}
