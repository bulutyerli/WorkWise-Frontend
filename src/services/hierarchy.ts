import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse, HierarchyType } from '../types/types';
import { handleAxiosError } from '../utils/errorHandler';
import axiosAuth from '../utils/axiosAuth';

export async function getHierarchy(): Promise<HierarchyType> {
  try {
    const response: AxiosResponse<HierarchyType> =
      await axiosAuth.get('/hierarchy');
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}
