export const mockAccounts = [
  {
    id: 'cust-001',
    phoneNumber: '9876543210',
    otpCode: '1234',
    name: 'Priya Sharma',
    tier: 'Gold Member',
  },
  {
    id: 'cust-002',
    phoneNumber: '9123456789',
    otpCode: '4321',
    name: 'Aarav Mehta',
    tier: 'Platinum Member',
  },
];

const defaultMockAccount = {
  id: 'guest-001',
  phoneNumber: '',
  otpCode: '1111',
  name: 'Guest Shopper',
  tier: 'New Member',
};

export function findMockAccountByPhone(phoneNumber) {
  return (
    mockAccounts.find(account => account.phoneNumber === phoneNumber) ||
    {
      ...defaultMockAccount,
      phoneNumber,
    }
  );
}
