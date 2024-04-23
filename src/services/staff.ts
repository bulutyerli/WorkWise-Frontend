import axios, { AxiosResponse } from 'axios';
import { AllCategoriesType, StaffData, StaffType } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getStaffList(page: number): Promise<StaffType> {
  const response: AxiosResponse<StaffType> = await axios.get(
    `${API_URL}/staff/?page=${page}`
  );
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
