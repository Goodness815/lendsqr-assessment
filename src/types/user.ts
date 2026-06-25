export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export type UserRecord = {
  id: string;
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate: string;
  
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
  };
  
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
  };
  
  accountBalance: string;
  accountNumber: string;
  
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  
  // Status is not provided by the API so it is assigned on the client
  status: UserStatus;
}
