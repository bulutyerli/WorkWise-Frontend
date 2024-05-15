import { AxiosError, AxiosResponse } from 'axios';
import {
  ByCategoryType,
  ByMonthType,
  ErrorResponse,
  FinanceByCategoryType,
  FinanceListResponseType,
  FinanceOrderType,
  FinanceType,
} from '../types/types';
import { handleAxiosError } from '../utils/errorHandler';
import axiosAuth from '../utils/axiosAuth';

export async function getIncomeTotal(): Promise<FinanceType> {
  try {
    const response: AxiosResponse<FinanceType> =
      await axiosAuth.get('/income-total');
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getIncomeByCategory(
  category?: number
): Promise<FinanceByCategoryType> {
  try {
    const params = new URLSearchParams();

    if (category) {
      params.append('category', category.toString());
    }

    const response: AxiosResponse<FinanceByCategoryType> = await axiosAuth.get(
      '/income-category',
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getIncomeByYear(year?: number): Promise<ByCategoryType> {
  try {
    const params = new URLSearchParams();

    if (year) {
      params.append('year', year.toString());
    }

    const response: AxiosResponse<ByCategoryType> = await axiosAuth.get(
      '/income-year',
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getIncomeByMonth(
  year?: number,
  category?: number
): Promise<ByMonthType> {
  try {
    const params = new URLSearchParams();

    if (category) {
      params.append('category', category.toString());
    }

    if (year) {
      params.append('year', year.toString());
    }

    const response: AxiosResponse<ByMonthType> = await axiosAuth.get(
      '/income-month',
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getAllIncome(
  page?: number,
  category?: number,
  sortFilters?: { order: FinanceOrderType; direction: 'asc' | 'desc' }
): Promise<FinanceListResponseType> {
  try {
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

    const response: AxiosResponse<FinanceListResponseType> =
      await axiosAuth.get('/income', {
        params,
      });

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}
