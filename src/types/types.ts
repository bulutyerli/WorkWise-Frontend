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

export interface HierarchyData {
  id: number;
  name: string;
  surname: string;
  role_name: string;
  parentId: number | null;
  shift?: string | null;
  office?: string | null;
  department: string;
  children?: HierarchyData[] | null;
  _directSubordinates?: string;
  _totalSubordinates: string;
}

export interface HierarchyType {
  data: HierarchyData[];
}

export interface HierarchyMap {
  [key: number]: HierarchyData;
}

export type OrderType = 'name' | 'email' | 'role' | 'department' | 'id';

export interface IncomeData {
  id: number;
  description: string;
  amount: string;
  date: Date;
  created_at: string;
  category: string;
}

export interface IncomeType {
  data: IncomeData[];
}

export interface FinanceData {
  year: number;
  amount?: string;
  income?: string;
  expense?: string;
}

export interface FinanceType {
  data: FinanceData[];
}

export interface ByCategoryData {
  year: number;
  amount: string;
  category: string;
  id: number;
}

export interface ByYearData {
  data: ByCategoryData[];
}

export interface CategoriesData {
  id: number;
  category: string;
}

export interface FinanceByCategoryType {
  data: { valuesData: ByCategoryData[]; categoryData: CategoriesData[] };
}
