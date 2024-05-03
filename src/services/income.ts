import axios, { AxiosResponse } from 'axios';
import { FinanceType } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getIncome(): Promise<FinanceType> {
  const url = `${API_URL}/income`;

  const response: AxiosResponse<FinanceType> = await axios.get(url);
  return response.data;
}

export async function getIncomeByCategory(filter?: number) {
  const url = `${API_URL}/income-category`;

  const params = new URLSearchParams();

  if (filter) {
    params.append('filter', filter.toString());
  }

  const response: AxiosResponse<FinanceType> = await axios.get(url, {
    params: params,
  });
  return response.data;
}
