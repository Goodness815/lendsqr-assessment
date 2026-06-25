import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Eye, UserX, UserCheck, MoreVertical } from "lucide-react";

import { useUsers } from "../../hooks/useUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { Table } from "../../components/ui/table/Table";
import { Pagination } from "../../components/ui/pagination/Pagination";
import { TableFilter } from "../../components/ui/table-filter/TableFilter";
import { COLUMNS, STAT_CARDS, EMPTY_FILTER } from "../../utils/users-data";
import type { FilterState } from "../../components/ui/table-filter/TableFilter";
import { StatusBadge } from "../../components/ui/status-badge/StatusBadge";
import { ActionMenu } from "../../components/ui/action-menu/ActionMenu";

import type { UserRecord } from "../../types/user";
import s from "./Users.module.scss";
import { formatDate } from "../../utils/helpers";
import MOCK_USERS from "../../utils/mock-users-data.json";



export default function Users() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState<FilterState>(EMPTY_FILTER);
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(EMPTY_FILTER);

  const [sortBy, setSortBy] = useState<keyof UserRecord | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Extract unique organizations for the filter dropdown
  const uniqueOrgs = Array.from(new Set(MOCK_USERS.map((u) => u.orgName))).sort();

  // Fetch from the mock API with parameters
  const { users, totalRecords, loading, error } = useUsers({
    page,
    limit,
    search,
    filters: appliedFilter,
    sortBy,
    sortOrder
  });

  // Portal menu state
  const [menuState, setMenuState] = useState<{ id: string; top: number; right: number; } | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const debouncedSearchInput = useDebounce(searchInput, 1000);

  useEffect(() => {
    setSearch(debouncedSearchInput.trim());
    setPage(1);
  }, [debouncedSearchInput]);

  // Click outside to close filter/menu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      setMenuState(null); // Any click closes menu
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSort = (key: string) => {
    const typedKey = key as keyof UserRecord;
    if (sortBy === typedKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(typedKey);
      setSortOrder("asc");
    }
  };

  const resetFilter = () => {
    setPendingFilter(EMPTY_FILTER);
    setAppliedFilter(EMPTY_FILTER);
    setSearch("");
    setSearchInput("");
    setPage(1);
    setFilterOpen(false);
  };

  const totalPages = Math.ceil((totalRecords || 0) / limit);

  // Scroll table to top when page changes
  useEffect(() => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  // Formatting date helper


  return (
    <div>
      <h1 className={s.heading}>Users</h1>

      {/* Stats Grid */}
      <div className={s.statsGrid}>
        {STAT_CARDS.map((stat, i) => (
          <div key={i} className={s.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={s.statIcon} style={{ background: `${stat.color}1A` }}>
              <img src={stat.icon} alt={stat.label} />
            </div>
            <div className={s.statLabel}>{stat.label}</div>
            <div className={s.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className={s.tableCard}>
        <div className={s.toolbar}>
          <div className={s.searchBox}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search users"
            />
            <span className={s.searchIcon} aria-hidden="true"><Search size={16} /></span>
          </div>

          <div className={s.filterPanelWrap} ref={filterRef}>
            <button
              className={`${s.filterBtn} ${filterOpen ? s.active : ""}`}
              onClick={() => setFilterOpen(!filterOpen)}
              aria-expanded={filterOpen}
            >
              <SlidersHorizontal size={14} /> Filter
            </button>

            {filterOpen && (
              <TableFilter
                organizations={uniqueOrgs}
                filters={pendingFilter}
                onChange={setPendingFilter}
                onFilter={() => {
                  setAppliedFilter(pendingFilter);
                  setPage(1);
                  setFilterOpen(false);
                }}
                onReset={resetFilter}
              />
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.entries(appliedFilter).some(([_, val]) => val) && (
          <div className={s.activeFilters}>
            {Object.entries(appliedFilter).map(([key, val]) => {
              if (!val) return null;
              return (
                <span key={key} className={s.filterPill}>
                  {key}: {val}
                  <button
                    onClick={() => {
                      const newFilter = { ...appliedFilter, [key]: "" };
                      setAppliedFilter(newFilter);
                      setPendingFilter(newFilter);
                      setPage(1);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
            <button className={s.clearAllBtn} onClick={resetFilter}>Clear All</button>
          </div>
        )}

        {error ? (
          <div className={s.errorState}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={s.tableScrollWrap} ref={tableScrollRef}>
            <Table
              columns={COLUMNS}
              data={users}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              isLoading={loading}
              renderRow={(user, idx) => (
                <tr key={user.id} className={s.tr} data-testid={`row-user-${user.id}`} style={{ animationDelay: `${idx * 0.03}s` }}>
                  <td className={s.td}>{user.orgName}</td>
                  <td className={s.td}>{user.userName}</td>
                  <td className={s.td}>{user.email}</td>
                  <td className={s.td}>{user.phoneNumber}</td>
                  <td className={s.td}>{formatDate(user.createdAt)}</td>
                  <td className={s.td}>
                    <StatusBadge status={user.status} />
                  </td>
                  <td className={`${s.td} ${s.actionCell}`}>
                    <button
                      className={s.menuBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (menuState?.id === user.id) {
                          setMenuState(null);
                        } else {
                          const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                          setMenuState({
                            id: user.id,
                            top: rect.bottom + 4,
                            right: window.innerWidth - rect.right,
                          });
                        }
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              )}
            />
          </div>
        )}

        {/* Action Menu Portal */}
        {menuState && (
          <ActionMenu
            id={menuState.id}
            top={menuState.top}
            right={menuState.right}
          >
            <button className={s.dropItem} onClick={() => navigate(`/users/${menuState.id}`)}>
              <Eye size={14} /> View Details
            </button>
            <button className={s.dropItem}>
              <UserX size={14} /> Blacklist User
            </button>
            <button className={s.dropItem}>
              <UserCheck size={14} /> Activate User
            </button>
          </ActionMenu>
        )}
      </div>

      {!loading && !error && users && users.length > 0 && (
        <Pagination
          total={totalRecords}
          page={page}
          limit={limit}
          totalPages={totalPages}
          onPageChange={setPage}
          onLimitChange={(l) => { setLimit(l); setPage(1); }}
        />
      )}
    </div>
  );
}
