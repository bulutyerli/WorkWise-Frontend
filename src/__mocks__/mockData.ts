import {
  AnnualLeaveType,
  BirthdayDataType,
  FinanceData,
  FinanceType,
} from '../types/types';

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

import {
  StaffType,
  StaffData,
  StaffDatesType,
  NewStaffType,
  AllCategoriesType,
} from '../types/types';

export const mockStaffData: StaffData = {
  id: 1,
  name: 'John',
  surname: 'Doe',
  birthday: '1980-01-01',
  phone: '123-456-7890',
  salary: 50000,
  join_date: '2020-01-01',
  department: 'Engineering',
  department_id: 2,
  manager_id: 1,
  office: 'Main Office',
  office_id: 1,
  role: 'Software Engineer',
  role_id: 3,
  shift: 'Day',
  shift_id: 1,
  email: 'john.doe@example.com',
};

export const mockStaffList: StaffType = {
  success: true,
  totalPages: 1,
  totalStaff: 1,
  hasMore: false,
  data: [mockStaffData],
};

export const mockNewStaffData: NewStaffType = {
  ...mockStaffData,
  password: 'password123',
  repassword: 'password123',
};

export const mockStaffDates: StaffDatesType = {
  birthdays: [
    {
      birthday: '1980-01-01',
      department: 'Engineering',
      id: 1,
      name: 'John',
      surname: 'Doe',
      office: 'Main Office',
      role: 'Software Engineer',
    },
  ],
  newJoins: [
    {
      id: 1,
      join_date: new Date('2020-01-01'),
      name: 'John',
      surname: 'Doe',
      role: 'Software Engineer',
      department: 'Engineering',
      office: 'Main Office',
    },
  ],
};

export const mockCategories: AllCategoriesType = {
  data: {
    offices: [{ name: 'Main Office', id: 1 }],
    roles: [{ name: 'Software Engineer', id: 3 }],
    departments: [{ name: 'Engineering', id: 2 }],
    shifts: [{ name: 'Day', id: 1 }],
    managers: [
      {
        name: 'Jane',
        surname: 'Smith',
        role_name: 'Manager',
        shift: 'Day',
        id: 1,
        office: 'Main Office',
      },
    ],
  },
};

export const mockBirthdayData: BirthdayDataType = {
  birthday: '01-12-2024',
  department: 'Technic',
  id: 2,
  name: 'John',
  surname: 'Doe',
  office: 'New York',
  role: 'Manager',
};
