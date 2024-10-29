import { AnnualLeaveType, FinanceData, FinanceType } from '../types/types';

export const sampleAnnualLeave: AnnualLeaveType = {
  end_date: '2024-30-01',
  starting_date: '2024-15-01',
  firebase_id: 'test_id',
  user_id: 123,
  status: 'approved',
  id: 1,
  name: 'john',
  surname: 'doe',
};

export const mockFinanceData: FinanceData[] = [
  { year: 2024, amount: '1000', income: '500', expense: '500' },
  { year: 2023, amount: '2000', income: '1500', expense: '500' },
];

export const mockFinance: FinanceType = {
  data: mockFinanceData,
};

export const mockByCategoryData = {
  year: 2024,
  amount: 500,
  category: 'advertisements',
  id: 33,
};

export const mockByMonthData = {
  year: 2024,
  amount: 500,
  category: 'advertisements',
  id: 33,
  month: 10,
};

export const mockCategoriesData = {
  id: 1,
  category: 'advertisements',
};

export const mockFinanceByCategory = {
  data: {
    valuesData: [mockByCategoryData],
    categoryData: [mockCategoriesData],
  },
};

export const mockFinanceListType = {
  description: 'test_desc',
  amount: 5000,
  date: '10-12-2024',
  category_id: 2,
  category: 'test_cat',
  id: 1,
};

export const mockHierarchyData = {
  id: 2,
  name: 'John',
  surname: 'Doe',
  role_name: 'Manager',
  parentId: 5,
  shift: null,
  office: 'New York',
  department: 'Technic',
  children: [
    {
      id: 6,
      name: 'Jane',
      surname: 'Doe',
      role_name: 'Chief',
      parentId: 2,
      shift: 'B',
      office: 'New York',
      department: 'Technic',
      children: null,
      _directSubordinates: 8,
      _totalSubordinates: 15,
    },
  ],
  _directSubordinates: 3,
  _totalSubordinates: 12,
};
