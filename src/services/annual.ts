import { AxiosError, AxiosResponse } from 'axios';
import axiosAuth from '../utils/axiosAuth';
import { handleAxiosError } from '../utils/errorHandler';
import { AnnualLeaveType, ErrorResponse } from '../types/types';

export async function getAnnualLeaves(id: string): Promise<AnnualLeaveType[]> {
  try {
    const response: AxiosResponse<AnnualLeaveType[]> = await axiosAuth.get(
      `/annual-leaves/${id}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getCurrentAnnual(id: string): Promise<number> {
  try {
    const response: AxiosResponse<number> = await axiosAuth.get(
      `/annual-current/${id}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function newAnnualRequest(data: AnnualLeaveType) {
  try {
    const response = await axiosAuth.post('/new-annual', data);

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}
