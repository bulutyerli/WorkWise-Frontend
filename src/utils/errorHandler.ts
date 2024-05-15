import { AxiosError } from 'axios';
import { ErrorResponse } from '../types/types';

export const handleAxiosError = (error: AxiosError<ErrorResponse>): void => {
  if (error.response && error.response.data && error.response.data.error) {
    throw new Error(error.response.data.error);
  } else {
    throw new Error('Something went wrong');
  }
};
