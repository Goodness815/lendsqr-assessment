import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import s from "./Pagination.module.scss";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PAGE_SIZES = [10, 20, 50, 100];

function buildPageList(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const list: (number | "…")[] = [1, 2];
  if (page > 4) list.push("…");
  if (page > 2 && page < totalPages - 1) list.push(page);
  if (page < totalPages - 3) list.push("…");
  list.push(totalPages - 1, totalPages);
  return list.filter((v, i, arr) => arr.indexOf(v) === i);
}

export function Pagination({
  total,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  if (total === 0) return null;

  const pageList = buildPageList(page, totalPages);

  return (
    <div className={s.pagination}>
      <div className={s.pageInfo}>
        Showing
        <div className={s.pageSizeWrap}>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            aria-label="Items per page"
          >
            {PAGE_SIZES.map((sz) => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </div>
        out of {total.toLocaleString()}
      </div>

      <nav className={s.pageNav} aria-label="Pagination">
        <button
          className={`${s.pageBtn} ${s.arrow}`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pageList.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className={s.ellipsis} aria-hidden="true">…</span>
          ) : (
            <button
              key={p}
              className={`${s.pageBtn} ${page === p ? s.current : ""}`}
              onClick={() => onPageChange(p as number)}
              aria-current={page === p ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          className={`${s.pageBtn} ${s.arrow}`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
