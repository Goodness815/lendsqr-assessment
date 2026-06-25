import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import s from "./Table.module.scss";

export interface Column<T> {
  key: Extract<keyof T, string>;
  label: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (key: Extract<keyof T, string>) => void;
  renderRow: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  onResetFilter?: () => void;
  total?: number;
}

export function Table<T>({
  columns,
  data,
  sortBy,
  sortOrder,
  onSort,
  renderRow,
  isLoading,
  emptyMessage = "No records found.",
  onResetFilter,
  total,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className={s.tableWrap}>
        <table className={s.skeletonTable} aria-label="Loading data" aria-busy="true">
          {/* <caption className="sr-only">Loading data, please wait</caption> */}
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={String(col.key)} scope="col" className={s.skeletonTh}>
                  <div className={s.skeletonThPill} style={{ width: 60 + (i * 10) }} />
                </th>
              ))}
              <th scope="col" className={s.skeletonTh}>
                <div className={s.skeletonThPill} style={{ width: 40 }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((_, colIdx) => (
                  <td key={colIdx} className={s.skeletonTd}>
                    <div
                      className={s.skeletonCell}
                      style={{
                        width: 70 + (colIdx % 3) * 20,
                        animationDelay: `${rowIdx * 0.07 + colIdx * 0.04}s`,
                      }}
                    />
                  </td>
                ))}
                <td className={s.skeletonTd}>
                  <div className={s.skeletonCircle} style={{ animationDelay: `${rowIdx * 0.07 + 0.24}s` }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={s.tableWrap}>
      <table className={s.table} aria-label="Data table" aria-rowcount={total}>
        {total !== undefined && (
          <caption className="sr-only">
            List — {total.toLocaleString()} records total. Use column headers to sort.
          </caption>
        )}
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th key={String(key)} scope="col" className={s.th}>
                <button
                  className={`${s.thInner} ${sortBy === key ? (sortOrder === "asc" ? s.sortAsc : s.sortDesc) : ""
                    }`}
                  type="button"
                  onClick={() => onSort(key)}
                  data-testid={`sort-${String(key)}`}
                  aria-label={`Sort by ${label}${sortBy === key ? `, currently ${sortOrder}ending` : ""
                    }`}
                  aria-sort={
                    sortBy === key ? (sortOrder === "asc" ? "ascending" : "descending") : "none"
                  }
                >
                  <span>{label}</span>
                  <span className={s.sortIcon}>
                    <ArrowUp
                      size={10}
                      style={{
                        opacity: sortBy === key && sortOrder === "asc" ? 1 : 0.28,
                        display: "block",
                      }}
                    />
                    <ArrowDown
                      size={10}
                      style={{
                        opacity: sortBy === key && sortOrder === "desc" ? 1 : 0.28,
                        display: "block",
                      }}
                    />
                  </span>
                </button>
              </th>
            ))}
            <th scope="col" className={s.th}>
              <span className="sr-only"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className={s.emptyState}>
                  <p>{emptyMessage}</p>
                  {onResetFilter && (
                    <button type="button" onClick={onResetFilter}>
                      Reset filters
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => renderRow(item, index))
          )}
        </tbody>
      </table>
    </div>
  );
}
