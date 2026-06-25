import { useState, useEffect } from 'react';
import type { UserRecord } from '../types/user';
import type { FilterState } from '../components/ui/table-filter/TableFilter';

import mockData from '../utils/mock-users-data.json';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface UseUsersOptions {
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
        
        let data = [...(mockData as UserRecord[])];

        if (options.search) {
          const q = options.search.toLowerCase();
          data = data.filter(u =>
            u.userName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.orgName.toLowerCase().includes(q)
          );
        }

        if (options.filters) {
          if (options.filters.organization) {
            data = data.filter(u => u.orgName.toLowerCase().includes(options.filters!.organization.toLowerCase()));
          }
          if (options.filters.username) {
            data = data.filter(u => u.userName.toLowerCase().includes(options.filters!.username.toLowerCase()));
          }
          if (options.filters.email) {
            data = data.filter(u => u.email.toLowerCase().includes(options.filters!.email.toLowerCase()));
          }
          if (options.filters.phone) {
            data = data.filter(u => String(u.phoneNumber).includes(options.filters!.phone));
          }
          if (options.filters.status) {
            data = data.filter(u => u.status === options.filters!.status);
          }
          if (options.filters.date) {
            data = data.filter(u => String(u.createdAt).startsWith(options.filters!.date));
          }
        }

        if (options.sortBy) {
          data.sort((a, b) => {
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
