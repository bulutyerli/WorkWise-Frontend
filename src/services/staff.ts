import axios, { AxiosResponse } from 'axios';
import {
  AllCategoriesType,
  OrderType,
  StaffData,
  StaffType,
} from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getStaffList(
  page: number,
  filters: Record<string, string | null>,
  sortFilters?: { order: OrderType; direction: 'asc' | 'desc' }
): Promise<StaffType> {
  const url = `${API_URL}/staff`;

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
    const response: AxiosResponse<StaffType> = await axios.get(url, {
      params: params,
    });

    return response.data;
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching staff list: ${error}`);
  }
}

export async function getStaffById(id: number): Promise<StaffData> {
  const response: AxiosResponse<StaffData> = await axios.get(
    `${API_URL}/staff/${id}`
  );
  return response.data;
}

export async function getAllCategories(): Promise<AllCategoriesType> {
  const response: AxiosResponse<AllCategoriesType> = await axios.get(
    `${API_URL}/categories`
  );
  return response.data;
}
