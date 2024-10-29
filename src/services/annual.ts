import { AxiosError, AxiosResponse } from 'axios';
import axiosAuth from '../utils/axiosAuth';
import { handleAxiosError } from '../utils/errorHandler';
import { AnnualLeaveType, ErrorResponse, RequestStatus } from '../types/types';

export async function getAnnualLeaves(
  id: string
): Promise<AnnualLeaveType[] | undefined> {
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

export async function getCurrentAnnual(
  id: string
): Promise<number | undefined> {
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

export async function deleteLeaveRequest(requestId: number) {
  try {
    await axiosAuth.delete('/annual', { params: { requestId } });
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function updateLeaveRequest(
  requestId: number,
  status: RequestStatus
) {
  try {
    await axiosAuth.put('/annual', { requestId, status });
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}

export async function getStaffAnnualRequests(
  managerId: number
): Promise<AnnualLeaveType[] | undefined> {
  try {
    const response: AxiosResponse<AnnualLeaveType[]> = await axiosAuth.get(
      'annual',
      { params: { managerId } }
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    throw new Error('Unreachable');
  }
}
