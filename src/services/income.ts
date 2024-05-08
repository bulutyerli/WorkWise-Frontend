import axios, { AxiosResponse } from 'axios';
import {
  ByCategoryData,
  FinanceByCategoryType,
  FinanceListResponseType,
  FinanceOrderType,
  FinanceType,
} from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getIncomeTotal(): Promise<FinanceType> {
  const url = `${API_URL}/income-total`;

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

export async function getIncomeByYear(year?: number): Promise<ByCategoryData> {
  const url = `${API_URL}/income-year`;

  const params = new URLSearchParams();

  if (year) {
    params.append('year', year.toString());
  }

  const response: AxiosResponse<ByCategoryData> = await axios.get(url, {
    params: params,
  });

  return response.data;
}

export async function getAllIncome(
  page?: number,
  category?: number,
  sortFilters?: { order: FinanceOrderType; direction: 'asc' | 'desc' }
): Promise<FinanceListResponseType> {
  const url = `${API_URL}/income`;

  const params = new URLSearchParams();

  if (page) {
    params.append('page', page.toString());
  }
  if (category) {
    params.append('category', category.toString());
  }

  if (sortFilters) {
    params.append('order', sortFilters.order);
    params.append('direction', sortFilters.direction);
  }

  const response: AxiosResponse<FinanceListResponseType> = await axios.get(
    url,
    {
      params,
    }
  );

  return response.data;
}
