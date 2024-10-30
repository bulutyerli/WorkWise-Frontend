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
  birthday: string;
  phone: string;
  salary: number;
  join_date: string;
  department: string;
  department_id: number;
  manager_id: number;
  office: string;
  office_id: number;
  role: string;
  role_id: number;
  shift: string;
  shift_id: number;
  email: string;
}

export interface NewStaffType extends StaffData {
  password: string;
  repassword: string;
}

export interface CategoryType {
  name: string;
  id: number;
}

export interface ManagersType {
  name: string;
  surname: string;
  role_name: string;
  shift: string;
  id: number;
  office: string;
}

export interface AllCategoriesType {
  data: {
    offices: CategoryType[];
    roles: CategoryType[];
    departments: CategoryType[];
    shifts: CategoryType[];
    managers: ManagersType[];
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

export interface ByCategoryType {
  data: ByCategoryData[];
}

export interface ByMonthData extends ByCategoryData {
  month: number;
}

export interface ByMonthType {
  data: ByMonthData[];
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
  color: 'primary' | 'secondary' | 'neutral' | 'danger';
  text: string;
  isLoading?: boolean;
}

export interface NewStaffData {
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  salary: number;
  join_date: Date;
  department_id: number;
  office_id: number;
  role: number;
  shift_id: number;
  manager_id: number;
  firebase_id: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface SignInType {
  email: string;
  password: string;
}

export interface AnnualLeaveType {
  end_date: string;
  starting_date: string;
  firebase_id: string;
  user_id: number;
  status?: 'approved' | 'pending' | 'rejected';
  id?: number;
  name?: string;
  surname?: string;
}

export type RequestStatus = 'approved' | 'pending' | 'rejected';

export interface BirthdayDataType {
  birthday: string;
  department: string;
  id: number;
  name: string;
  surname: string;
  office: string;
  role: string;
}

export interface NewJoinTableType {
  id: number;
  join_date: Date;
  name: string;
  surname: string;
  role: string;
  department: string;
  office: string;
}

export interface StaffDatesType {
  birthdays: BirthdayDataType[];
  newJoins: NewJoinTableType[];
}
