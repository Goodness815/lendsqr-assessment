import { useState, useEffect } from 'react';
import { UserRecord } from '../types/user';

export function useUsers() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Serve from localStorage cache if available
        const cached = localStorage.getItem('mockUsers');
        if (cached) {
          setUsers(JSON.parse(cached));
          setLoading(false);
          return;
        }

        // Generate 500 dummy records
        const data: UserRecord[] = Array.from({ length: 500 }).map((_, i) => ({
          id: String(i + 1),
          orgName: `Org ${i + 1}`,
          userName: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          phoneNumber: `+234 800 000 ${String(i).padStart(4, '0')}`,
          createdAt: new Date().toISOString(),
          status: ['Active', 'Inactive', 'Pending', 'Blacklisted'][Math.floor(Math.random() * 4)] as UserRecord['status']
        }));

        localStorage.setItem('mockUsers', JSON.stringify(data));
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
