export interface StaffType {
  success: boolean;
  totalPages: number;
  totalStaff: number;
  hasMore: boolean;
  data: StaffData[];
}

export interface StaffData {
  id: number;
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  salary: number;
  join_date: Date;
  annual_leave: number;
  sickness_leave: number;
  department: string;
  office: string;
  role: string;
  shift: string;
  email: string;
}

export interface CategoryType {
  name: string;
}

export interface AllCategoriesType {
  data: {
    offices: CategoryType[];
    roles: CategoryType[];
    departments: CategoryType[];
    shifts: CategoryType[];
  };
}
