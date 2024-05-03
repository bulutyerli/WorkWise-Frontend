import axios, { AxiosResponse } from 'axios';
import { FinanceType } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getExpenses(): Promise<FinanceType> {
  const url = `${API_URL}/expenses`;

  const response: AxiosResponse<FinanceType> = await axios.get(url);
  return response.data;
}
