import { AxiosError } from 'axios';
import axiosAuth from '../utils/axiosAuth';
import { handleAxiosError } from '../utils/errorHandler';
import { ErrorResponse } from '../types/types';

export async function getUserRole(firebaseId: string) {
  try {
    const response = await axiosAuth.get('/user-role', {
      params: { firebaseId },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
  }
}
