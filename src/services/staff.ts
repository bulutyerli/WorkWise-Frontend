import { AxiosError, AxiosResponse } from 'axios';
import {
  AllCategoriesType,
  ErrorResponse,
  NewStaffType,
  OrderType,
  StaffData,
  StaffType,
} from '../types/types';
import { handleAxiosError } from '../utils/errorHandler';
import axiosAuth from '../utils/axiosAuth';

export async function getStaffList(
  page: number,
  filters: Record<string, string | null>,
  sortFilters?: { order: OrderType; direction: 'asc' | 'desc' }
): Promise<StaffType> {
  const params = new URLSearchParams();
  params.append('page', page.toString());

  // Append filters to params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null) {
      params.append(key, value);
    }
  });

  // Append sort filters to params
  if (sortFilters) {
    params.append('order', sortFilters.order);
    params.append('direction', sortFilters.direction);
  }

  try {
    const response: AxiosResponse<StaffType> = await axiosAuth.get('/staff', {
      params,
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getStaffById(id: number): Promise<StaffData> {
  try {
    const response: AxiosResponse<StaffData> = await axiosAuth.get(
      `/staff/${id}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getAllCategories(): Promise<AllCategoriesType> {
  try {
    const response: AxiosResponse<AllCategoriesType> =
      await axiosAuth.get(`/categories`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function createNewStaff(data: NewStaffType) {
  try {
    const response = await axiosAuth.post(`/staff/`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function deleteStaff(id: number) {
  try {
    const response = await axiosAuth.delete(`/staff/${id}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}
