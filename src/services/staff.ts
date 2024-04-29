import axios, { AxiosResponse } from 'axios';
import { AllCategoriesType, StaffData, StaffType } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getStaffList(
  page: number,
  filters: Record<string, string | null>
): Promise<StaffType> {
  let url = `${API_URL}/staff/?page=${page}`;

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null) {
      params.append(key, value);
    }
  });

  if (params.toString() !== '') {
    // Adding filter params to url
    url += '&' + params.toString();
  }

  const response: AxiosResponse<StaffType> = await axios.get(url);
  return response.data;
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
