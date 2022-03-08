import { useTable } from "react-table";
import classNames from "classnames";

import "./react-table.scss";

/* export type ColumnType = {
  header: string;
  accessor: string;
};
 */
export type ReactTableProps = {
  columns: any[];
  data: any[];
  className?: string;
};
// This custom hook used by React-Table accepts a table instance and inserts an array of rowSpanHeaders for each column for which we have enabled row-span. RowSpanHeader contains column id and top cell value and top cell index if row-span is enabled on the column definition array.

function useInstance(instance) {
  const { allColumns } = instance;

  let rowSpanHeaders: any[] = [];

  allColumns.forEach((column, i) => {
    const { id, enableRowSpan } = column;
    // if (enableRowSpan) is not defined/set in the column definition, we would not add rowSpanHeader for the column. If it were set to true or false, we would reset the topCell value and index to null and 0 respectively.

    if (enableRowSpan === true) {
      rowSpanHeaders = [
        ...rowSpanHeaders,
        { id, topCellValue: null, topCellIndex: 0 },
      ];
    }
  });
  Object.assign(instance, { rowSpanHeaders });
}

const ReactTable = ({ columns, data, className }: ReactTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    rowSpanHeaders,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns
          .filter((col: any) => col.show === false)
          .map((col) => col.accessor) as any,
      },
    },
    (hooks) => {
      hooks.useInstance.push(useInstance);
    }
  );

  const reactTableClasses = classNames("react-table", className);

  return (
    <table className={reactTableClasses} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, hIndex) => (
          <tr key={hIndex} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, cIndex) => (
              <th key={cIndex} {...column.getHeaderProps()}>
                {column.render("header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          for (let j = 0; j < row.allCells.length; j++) {
            const cell = row.allCells[j];
            const rowSpanHeader = rowSpanHeaders.find(
              (x) => x.id === cell.column.id
            );

            if (rowSpanHeader !== undefined) {
              // The following logic maintains topCellValue and index for spanned columns. This logic only works if the spanned column is sorted.
              if (
                rowSpanHeader.topCellValue === null ||
                rowSpanHeader.topCellValue !== cell.value
              ) {
                cell.isRowSpanned = false;
                rowSpanHeader.topCellValue = cell.value;
                rowSpanHeader.topCellIndex = i;
                cell.rowSpan = 1;
              } else {
                rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                cell.isRowSpanned = true;
              }
            }
          }
          return null;
        })}
        {rows.map((row, index) => {
          return (
            <tr
              key={index}
              {...row.getRowProps()}
              className={row.original.active ? "active" : ""}
            >
              {row.cells.map((cell) => {
                if (cell.isRowSpanned) return null;
                else
                  return (
                    <td
                      rowSpan={cell.rowSpan}
                      className={cell.rowSpan > 1 ? "span-divider" : ""}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
