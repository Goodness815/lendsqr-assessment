import type { FilterState } from "../components/ui/table-filter/TableFilter";
import type { Column } from "../components/ui/table/Table";
import type { UserRecord } from "../types/user";

import usersPink from "../assets/icons/usersPink.svg";
import activeUsers from "../assets/icons/active-users.svg";
import usersWithLoans from "../assets/icons/usersWithLoans.svg";
import usersWithSavings from "../assets/icons/usersWithSavings.svg";


// ── Stat cards ─────────────────────────────────────────────────
export const STAT_CARDS = [
  {
    label: "USERS", value: "2,453",
    icon: usersPink,
    color: "#DF18FF"
  },
  {
    label: "ACTIVE USERS", value: "2,453",
    icon: activeUsers,
    color: "#5718FF"
  },
  {
    label: "USERS WITH LOANS", value: "12,453",
    icon: usersWithLoans,
    color: "#F55F44"
  },
  {
    label: "USERS WITH SAVINGS", value: "102,453",
    icon: usersWithSavings,
    color: "#FF3366"
  },
];

export const COLUMNS: Column<UserRecord>[] = [
  { key: "orgName", label: "Organization" },
  { key: "userName", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "createdAt", label: "Date Joined" },
  { key: "status", label: "Status" },
];

export const EMPTY_FILTER: FilterState = {
  organization: "", username: "", email: "",
  phone: "", date: "", status: "",
};