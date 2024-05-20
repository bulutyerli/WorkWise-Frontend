import { AxiosError } from 'axios';
import axiosAuth from '../utils/axiosAuth';
import { handleAxiosError } from '../utils/errorHandler';
import { ErrorResponse } from '../types/types';

export async function getAnnualLeaves(id: number) {
  try {
    const response = await axiosAuth.get(`/annual-current/${id}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getCurrentAnnual(id: number) {
  try {
    const response = await axiosAuth.get(`/annual-current/${id}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}
