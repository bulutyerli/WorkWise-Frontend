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

vi.mock('../utils/axiosAuth');
vi.mock('../utils/errorHandler');

const mockAxios = axiosAuth;

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
  });

  describe('deleteLeaveRequest', () => {
    it('should delete a leave request', async () => {
      vi.mocked(mockAxios.delete).mockResolvedValueOnce({});

      await deleteLeaveRequest(1);
      expect(mockAxios.delete).toHaveBeenCalledWith('/annual', {
        params: { requestId: 1 },
      });
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
  });
});
