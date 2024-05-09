import axios, { AxiosResponse } from 'axios';
import {
  ByCategoryData,
  FinanceByCategoryType,
  FinanceListResponseType,
  FinanceOrderType,
  FinanceType,
} from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getExpensesTotal(): Promise<FinanceType> {
  const url = `${API_URL}/expenses-total`;

  const response: AxiosResponse<FinanceType> = await axios.get(url);
  return response.data;
}

export async function getExpensesByCategory(
  category?: number
): Promise<FinanceByCategoryType> {
  const url = `${API_URL}/expenses-category`;

  const params = new URLSearchParams();

  if (category) {
    params.append('category', category.toString());
  }

  const response: AxiosResponse<FinanceByCategoryType> = await axios.get(url, {
    params: params,
  });

  return response.data;
}

export async function getExpensesByYear(
  year?: number
): Promise<ByCategoryData> {
  const url = `${API_URL}/expense-year`;

  const params = new URLSearchParams();

  if (year) {
    params.append('year', year.toString());
  }

  const response: AxiosResponse<ByCategoryData> = await axios.get(url, {
    params: params,
  });

  return response.data;
}

export async function getExpenseByMonth(
  year?: number,
  category?: number
): Promise<ByCategoryData> {
  const url = `${API_URL}/expense-month`;

  const params = new URLSearchParams();

  if (category) {
    params.append('category', category.toString());
  }

  if (year) {
    params.append('year', year.toString());
  }

  const response: AxiosResponse<ByCategoryData> = await axios.get(url, {
    params: params,
  });

  return response.data;
}

export async function getAllExpenses(
  page?: number,
  category?: number,
  sortFilters?: { order: FinanceOrderType; direction: 'asc' | 'desc' }
): Promise<FinanceListResponseType> {
  const url = `${API_URL}/expenses`;

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
