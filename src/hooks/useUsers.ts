import { useState, useEffect } from 'react';
import type { UserRecord } from '../types/user';
import type { FilterState } from '../components/ui/table-filter/TableFilter';

import mockData from '../utils/mock-users-data.json';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export type UseUsersOptions = {
  page: number;
  limit: number;
  search?: string;
  filters?: FilterState;
  sortBy?: keyof UserRecord | "";
  sortOrder?: "asc" | "desc";
}

export function useUsers(options?: UseUsersOptions) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterDeps = JSON.stringify(options?.filters);

  useEffect(() => {
    if (!options) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        await delay(500);

        let data = mockData as UserRecord[];

        const hasSearch = !!options.search;
        const hasFilters = options.filters && Object.values(options.filters).some(v => v);

        // 1. Single-pass Filter
        if (hasSearch || hasFilters) {
          const q = options.search?.toLowerCase() || "";
          
          data = data.filter(u => {
            // Search criteria
            if (hasSearch) {
              const matchesSearch = 
                u.userName.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.orgName.toLowerCase().includes(q);
              
              if (!matchesSearch) return false;
            }

            // Filter criteria
            if (hasFilters) {
              const f = options.filters!;
              if (f.organization && !u.orgName.toLowerCase().includes(f.organization.toLowerCase())) return false;
              if (f.username && !u.userName.toLowerCase().includes(f.username.toLowerCase())) return false;
              if (f.email && !u.email.toLowerCase().includes(f.email.toLowerCase())) return false;
              if (f.phone && !String(u.phoneNumber).includes(f.phone)) return false;
              if (f.status && u.status !== f.status) return false;
              if (f.date && !String(u.createdAt).startsWith(f.date)) return false;
            }

            return true;
          });
        }

        // 2. Sort
        if (options.sortBy) {
          // Spread to avoid mutating the original mockData array or the filtered result
          data = [...data].sort((a, b) => {
            const valA = String(a[options.sortBy!]).toLowerCase();
            const valB = String(b[options.sortBy!]).toLowerCase();
            if (valA < valB) return options.sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return options.sortOrder === "asc" ? 1 : -1;
            return 0;
          });
        }

        setTotalRecords(data.length);
        const paginatedData = data.slice((options.page - 1) * options.limit, options.page * options.limit);
        setUsers(paginatedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch users');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options?.page,
    options?.limit,
    options?.search,
    options?.sortBy,
    options?.sortOrder,
    filterDeps
  ]);

  return { users, totalRecords, loading, error, setUsers };
}

export function useUser(id: string | undefined) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        await delay(500);

        const found = (mockData as UserRecord[]).find(u => String(u.id) === String(id));
        if (!found) throw new Error(`User not found`);

        setUser(found);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load user details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error, setUser };
}
