import React from "react";
import s from "./TableFilter.module.scss";

export type FilterState = {
  organization: string;
  username: string;
  email: string;
  phone: string;
  date: string;
  status: string;
};

interface TableFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onFilter: () => void;
  onReset: () => void;
}

export function TableFilter({ filters, onChange, onFilter, onReset }: TableFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter();
  };

  return (
    <form
      className={s.filterPanel}
      onSubmit={handleSubmit}
      aria-label="Filter records"
      data-testid="filter-form"
    >
      <div className={s.filterGrid}>
        <div className={s.filterField}>
          <label htmlFor="f-org">Organization</label>
          <select
            id="f-org"
            name="organization"
            value={filters.organization}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="Irorun">Irorun</option>
            <option value="Lendstar">Lendstar</option>
          </select>
        </div>

        <div className={s.filterField}>
          <label htmlFor="f-user">Username</label>
          <input
            id="f-user"
            name="username"
            type="text"
            placeholder="User"
            value={filters.username}
            onChange={handleChange}
          />
        </div>

        <div className={s.filterField}>
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            name="email"
            type="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleChange}
          />
        </div>

        <div className={s.filterField}>
          <label htmlFor="f-date">Date</label>
          <input
            id="f-date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChange}
          />
        </div>

        <div className={s.filterField}>
          <label htmlFor="f-phone">Phone Number</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={filters.phone}
            onChange={handleChange}
          />
        </div>

        <div className={s.filterField}>
          <label htmlFor="f-status">Status</label>
          <select
            id="f-status"
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>

      <div className={s.filterActions}>
        <button type="button" className={s.resetBtn} onClick={onReset}>
          Reset
        </button>
        <button type="submit" className={s.applyBtn} data-testid="button-apply-filter">
          Filter
        </button>
      </div>
    </form>
  );
}
