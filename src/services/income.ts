import axios, { AxiosResponse } from 'axios';
import { ByYearData, FinanceByCategoryType, FinanceType } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getIncome(): Promise<FinanceType> {
  const url = `${API_URL}/income`;

  const response: AxiosResponse<FinanceType> = await axios.get(url);
  return response.data;
}

export async function getIncomeByCategory(
  category?: number
): Promise<FinanceByCategoryType> {
  const url = `${API_URL}/income-category`;

  const params = new URLSearchParams();

  if (category) {
    params.append('category', category.toString());
  }

  const response: AxiosResponse<FinanceByCategoryType> = await axios.get(url, {
    params: params,
  });

  return response.data;
}

export async function getIncomeByYear(year?: number): Promise<ByYearData> {
  const url = `${API_URL}/income-year`;

  const params = new URLSearchParams();

  if (year) {
    params.append('year', year.toString());
  }

  const response: AxiosResponse<ByYearData> = await axios.get(url, {
    params: params,
  });

  return response.data;
}
