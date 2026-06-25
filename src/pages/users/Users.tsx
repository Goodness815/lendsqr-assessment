import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Eye, UserX, UserCheck, MoreVertical } from "lucide-react";

import { useUsers } from "../../hooks/useUsers";
import { Table } from "../../components/ui/table/Table";
import type { Column } from "../../components/ui/table/Table";
import { Pagination } from "../../components/ui/pagination/Pagination";
import { TableFilter } from "../../components/ui/table-filter/TableFilter";
import type { FilterState } from "../../components/ui/table-filter/TableFilter";
import { StatusBadge } from "../../components/ui/status-badge/StatusBadge";
import { ActionMenu } from "../../components/ui/action-menu/ActionMenu";

import type { UserRecord } from "../../types/user";
import s from "./Users.module.scss";

// ── Stat cards ─────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: "USERS", value: "2,453",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#DF18FF" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    label: "ACTIVE USERS", value: "2,453",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#5718FF" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    label: "USERS WITH LOANS", value: "12,453",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F55F44" aria-hidden="true">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
  },
  {
    label: "USERS WITH SAVINGS", value: "102,453",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF3366" aria-hidden="true">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
  },
];

const COLUMNS: Column<UserRecord>[] = [
  { key: "orgName", label: "Organization" },
  { key: "userName", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "createdAt", label: "Date Joined" },
  { key: "status", label: "Status" },
];

const EMPTY_FILTER: FilterState = {
  organization: "", username: "", email: "",
  phone: "", date: "", status: "",
};

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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

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

  // Formatting date helper
  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true
    }).format(d);
  };

  return (
    <div>
      <h1 className={s.heading}>Users</h1>

      {/* Stats Grid */}
      <div className={s.statsGrid}>
        {STAT_CARDS.map((stat, i) => (
          <div key={i} className={s.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={s.statIcon} style={{ background: stat.icon.props.fill ? `${stat.icon.props.fill}1A` : 'rgba(0,0,0,0.1)' }}>
              {stat.icon}
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
          <div className={s.tableScrollWrap}>
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
            onClose={() => setMenuState(null)}
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
