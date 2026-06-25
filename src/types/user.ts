export type UserRecord = {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}
