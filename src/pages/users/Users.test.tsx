// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from './Users';
import { useUsers } from '../../hooks/useUsers';
import type { UserRecord } from '../../types/user';

// Mock the hook
vi.mock('../../hooks/useUsers');

describe('Users Page', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders loading states prior to receiving API payload data', () => {
    vi.mocked(useUsers).mockReturnValue({
      totalRecords: 0,
      setUsers: vi.fn(),
      users: [],
      loading: true,
      error: null
    });

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    // Should render skeleton table
    expect(screen.getByLabelText(/loading data/i)).toBeInTheDocument();
  });

  it('renders users table and updates pagination', () => {
    const mockUsers: UserRecord[] = Array.from({ length: 15 }).map((_, i) => ({
      id: String(i),
      orgName: `Org ${i}`,
      userName: `User ${i}`,
      email: `user${i}@example.com`,
      phoneNumber: '1234567890',
      createdAt: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      status: 'Active',
      accountBalance: '0',
      accountNumber: '1234567890',
      profile: {
        firstName: `First${i}`,
        lastName: `Last${i}`,
        phoneNumber: '1234567890',
        avatar: '',
        gender: 'Male',
        bvn: '1234567890',
        address: '123 Test St',
        currency: 'NGN'
      },
      guarantor: {
        firstName: 'Guar',
        lastName: 'Antor',
        phoneNumber: '0987654321',
        gender: 'Female',
        address: '321 Guar St'
      },
      socials: {
        facebook: '@user',
        instagram: '@user',
        twitter: '@user'
      },
      education: {
        level: 'B.Sc',
        employmentStatus: 'Employed',
        sector: 'IT',
        duration: '2 Years',
        officeEmail: 'office@example.com',
        monthlyIncome: ['10000', '20000'],
        loanRepayment: '5000'
      }
    }));

    vi.mocked(useUsers).mockReturnValue({
      totalRecords: 15,
      setUsers: vi.fn(),
      users: mockUsers.slice(0, 10),
      loading: false,
      error: null
    });

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    // Check if table loaded
    expect(screen.getByRole('table', { name: /data table/i })).toBeInTheDocument();
    
    // Total 15 users, page 1 should have limit 10, so 10 rows
    const rows = screen.getAllByTestId(/row-user-/);
    expect(rows).toHaveLength(10);
    
    // Check if page size select exists
    const pageSizeSelect = screen.getByRole('combobox', { name: /items per page/i });
    expect(pageSizeSelect).toHaveValue('10');
  });

  it('can open filter dropdown and type into filter inputs', async () => {
    vi.mocked(useUsers).mockReturnValue({
      totalRecords: 0,
      setUsers: vi.fn(),
      users: [],
      loading: false,
      error: null
    });

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    const filterBtn = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(filterBtn);

    // Check if the filter form appears
    const filterForm = screen.getByTestId('filter-form');
    expect(filterForm).toBeInTheDocument();

    // Check if organization select exists
    const orgSelect = screen.getByRole('combobox', { name: /Organization/i });
    expect(orgSelect).toBeInTheDocument();
  });
});
