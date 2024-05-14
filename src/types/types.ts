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
export type FinanceOrderType =
  | 'id'
  | 'description'
  | 'amount'
  | 'date'
  | 'category'
  | 'category_id';

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
  amount: number;
  category: string;
  id: number;
}

export interface ByMonthData extends ByCategoryData {
  month: number;
}

export interface CategoriesData {
  id: number;
  category: string;
}

export interface FinanceByCategoryType {
  data: { valuesData: ByCategoryData[]; categoryData: CategoriesData[] };
}

export interface FinanceListType {
  description: string;
  amount: number;
  date: Date;
  category_id: number;
  category: string;
  id: number;
}

export interface FinanceListResponseType {
  success: boolean;
  totalPages: number;
  totalStaff: number;
  hasMore: boolean;
  categories: CategoriesData[];
  data: FinanceListType[];
}

export interface ButtonType {
  onClick: () => void;
  icon?: React.ReactElement;
  color: 'primary' | 'secondary' | 'neutral';
  text: string;
}
