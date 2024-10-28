import { AxiosError } from 'axios';
import axiosAuth from '../utils/axiosAuth';
import { handleAxiosError } from '../utils/errorHandler';
import {
  getCurrentAnnual,
  newAnnualRequest,
  deleteLeaveRequest,
  updateLeaveRequest,
  getStaffAnnualRequests,
} from './annual';
import { AnnualLeaveType, RequestStatus } from '../types/types';
import { vi } from 'vitest';

vi.mock('../utils/axiosAuth');
vi.mock('../utils/errorHandler');

const mockAxios = axiosAuth;
const mockHandleAxiosError = handleAxiosError;

const sampleAnnualLeave: AnnualLeaveType = {
  end_date: '2024-30-01',
  starting_date: '2024-15-01',
  firebase_id: 'test_id',
  user_id: 123,
  status: 'approved',
  id: 1,
  name: 'john',
  surname: 'doe',
};

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

    it('should handle errors in getCurrentAnnual', async () => {
      const error = new AxiosError('Not Found');
      vi.mocked(mockAxios.get).mockRejectedValueOnce(error);
      vi.mocked(mockHandleAxiosError).mockImplementationOnce(() => {});

      await expect(getCurrentAnnual('123')).resolves.toBeUndefined();
      expect(mockHandleAxiosError).toHaveBeenCalledWith(error);
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

    it('should handle errors in newAnnualRequest', async () => {
      const error = new AxiosError('Error creating request');
      vi.mocked(mockAxios.post).mockRejectedValueOnce(error);
      vi.mocked(mockHandleAxiosError).mockImplementationOnce(() => {});

      await expect(
        newAnnualRequest(sampleAnnualLeave)
      ).resolves.toBeUndefined();
      expect(mockHandleAxiosError).toHaveBeenCalledWith(error);
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

    it('should handle errors in deleteLeaveRequest', async () => {
      const error = new AxiosError('Error deleting request');
      vi.mocked(mockAxios.delete).mockRejectedValueOnce(error);
      vi.mocked(mockHandleAxiosError).mockImplementationOnce(() => {});

      await expect(deleteLeaveRequest(1)).resolves.toBeUndefined();
      expect(mockHandleAxiosError).toHaveBeenCalledWith(error);
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

    it('should handle errors in updateLeaveRequest', async () => {
      const error = new AxiosError('Error updating request');
      vi.mocked(mockAxios.put).mockRejectedValueOnce(error);
      vi.mocked(mockHandleAxiosError).mockImplementationOnce(() => {});

      await expect(updateLeaveRequest(1, 'approved')).resolves.toBeUndefined();
      expect(mockHandleAxiosError).toHaveBeenCalledWith(error);
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

    it('should handle errors in getStaffAnnualRequests', async () => {
      const error = new AxiosError('Error fetching staff requests');
      vi.mocked(mockAxios.get).mockRejectedValueOnce(error);
      vi.mocked(mockHandleAxiosError).mockImplementationOnce(() => {});

      await expect(getStaffAnnualRequests(123)).resolves.toBeUndefined();
      expect(mockHandleAxiosError).toHaveBeenCalledWith(error);
    });
  });
});
