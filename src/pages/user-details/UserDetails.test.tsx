// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserDetails } from './UserDetails';
import { useUser } from '../../hooks/useUsers';
import type { UserRecord } from '../../types/user';

// Mock the hook
vi.mock('../../hooks/useUsers');

describe('UserDetails Page', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders user information when loaded', () => {
    const mockUser: UserRecord = {
      id: "93",
      orgName: "Test Org",
      userName: "TestUser",
      email: "test@example.com",
      phoneNumber: "12345",
      createdAt: "2026-06-25T14:39:42.644Z",
      lastActiveDate: "2026-06-25T14:39:42.644Z",
      status: "Active",
      accountBalance: "520.36",
      accountNumber: "FOIAMSC1",
      profile: {
        firstName: "Wilmer",
        lastName: "Collins",
        avatar: "",
        phoneNumber: "123",
        gender: "Male",
        bvn: "123",
        address: "123 St",
        currency: "NGN"
      },
      guarantor: {
        firstName: "Logan",
        lastName: "Mayert",
        phoneNumber: "123",
        gender: "Male",
        address: "123 St"
      },
      socials: {
        facebook: "@test",
        instagram: "@test",
        twitter: "@test"
      },
      education: {
        level: "Bsc",
        employmentStatus: "Employed",
        sector: "IT",
        duration: "2 Years",
        officeEmail: "test@office.com",
        monthlyIncome: ["100", "200"],
        loanRepayment: "50"
      }
    };

    vi.mocked(useUser).mockReturnValue({
      setUser: vi.fn(),
      user: mockUser,
      loading: false,
      error: null
    });

    render(
      <MemoryRouter initialEntries={['/users/93']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify basic info is rendered
    expect(screen.getAllByText(/Wilmer Collins/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/₦520.36/i)).toBeInTheDocument();
    expect(screen.getAllByText(/FOIAMSC1/i)[0]).toBeInTheDocument();
  });
});
