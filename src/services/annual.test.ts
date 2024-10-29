import axiosAuth from '../utils/axiosAuth';
import {
  getCurrentAnnual,
  newAnnualRequest,
  deleteLeaveRequest,
  updateLeaveRequest,
  getStaffAnnualRequests,
} from './annual';
import { RequestStatus } from '../types/types';
import { vi } from 'vitest';
import { sampleAnnualLeave } from '../__mocks__/mockData';
import { AxiosError } from 'axios';
import { handleAxiosError } from '../utils/errorHandler';

vi.mock('../utils/axiosAuth');
vi.mock('../utils/errorHandler');

const mockAxios = axiosAuth;
const mockHandleAxiosError = vi.mocked(handleAxiosError);

describe('Annual API call tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentAnnual', () => {
    it('should get current annual data', async () => {
      vi.mocked(mockAxios.get).mockResolvedValueOnce({ data: 15 });

      const response = await getCurrentAnnual('123');
      expect(response).toBe(15);
      expect(mockAxios.get).toHaveBeenCalledWith('/annual-current/123');
    });

    it('should call handleAxiosError and throw an error if the request fails', async () => {
      const mockError = new Error('Network Error') as AxiosError;

      vi.mocked(mockAxios.get).mockRejectedValueOnce(mockError);

      await expect(getCurrentAnnual('123')).rejects.toThrow('Unreachable');
      expect(mockHandleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('newAnnualRequest', () => {
    it('should create a new annual request', async () => {
      const responseMock = { data: sampleAnnualLeave };
      vi.mocked(mockAxios.post).mockResolvedValueOnce(responseMock);

      const response = await newAnnualRequest(sampleAnnualLeave);
      expect(response).toEqual(sampleAnnualLeave);
      expect(mockAxios.post).toHaveBeenCalledWith(
        '/new-annual',
        sampleAnnualLeave
      );
    });

    it('should call handleAxiosError and throw an error if the request fails', async () => {
      const mockError = new AxiosError('Network Error');
      vi.mocked(mockAxios.post).mockRejectedValueOnce(mockError);

      await expect(newAnnualRequest(sampleAnnualLeave)).rejects.toThrow(
        'Unreachable'
      );
      expect(mockHandleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteLeaveRequest', () => {
    it('should delete a leave request', async () => {
      vi.mocked(mockAxios.delete).mockResolvedValueOnce({});

      await deleteLeaveRequest(1);
      expect(mockAxios.delete).toHaveBeenCalledWith('/annual', {
        params: { requestId: 1 },
      });
    });

    it('should call handleAxiosError and throw an error if the request fails', async () => {
      const mockError = new AxiosError('Network Error');
      vi.mocked(mockAxios.delete).mockRejectedValueOnce(mockError);

      await expect(deleteLeaveRequest(1)).rejects.toThrow('Unreachable');
      expect(mockHandleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateLeaveRequest', () => {
    it('should update a leave request status', async () => {
      const status: RequestStatus = 'approved';
      vi.mocked(mockAxios.put).mockResolvedValueOnce({});

      await updateLeaveRequest(1, status);
      expect(mockAxios.put).toHaveBeenCalledWith('/annual', {
        requestId: 1,
        status,
      });
    });

    it('should call handleAxiosError and throw an error if the request fails', async () => {
      const status: RequestStatus = 'approved';

      const mockError = new AxiosError('Network Error');
      vi.mocked(mockAxios.put).mockRejectedValueOnce(mockError);

      await expect(updateLeaveRequest(1, status)).rejects.toThrow(
        'Unreachable'
      );
      expect(mockHandleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getStaffAnnualRequests', () => {
    it('should get staff annual requests', async () => {
      vi.mocked(mockAxios.get).mockResolvedValueOnce({
        data: [sampleAnnualLeave],
      });

      const response = await getStaffAnnualRequests(123);
      expect(response).toEqual([sampleAnnualLeave]);
      expect(mockAxios.get).toHaveBeenCalledWith('annual', {
        params: { managerId: 123 },
      });
    });

    it('should call handleAxiosError and throw an error if the request fails', async () => {
      const mockError = new AxiosError('Network Error');
      vi.mocked(mockAxios.get).mockRejectedValueOnce(mockError);

      await expect(getStaffAnnualRequests(123)).rejects.toThrow('Unreachable');
      expect(mockHandleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });
});
