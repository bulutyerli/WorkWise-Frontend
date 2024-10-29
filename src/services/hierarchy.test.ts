import { mockHierarchyData } from '../__mocks__/mockData';
import axiosAuth from '../utils/axiosAuth';
import { getHierarchy } from './hierarchy';
import { handleAxiosError } from '../utils/errorHandler'; // Add this import
import { AxiosError } from 'axios';

vi.mock('../utils/axiosAuth');
vi.mock('../utils/errorHandler');
const mockAxiosAuth = axiosAuth;

describe('getHierarchy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the correct API endpoint and return data on success', async () => {
    vi.mocked(mockAxiosAuth.get).mockResolvedValueOnce({
      data: mockHierarchyData,
    });

    const response = await getHierarchy();

    expect(mockAxiosAuth.get).toHaveBeenCalledWith('/hierarchy');
    expect(response).toEqual(mockHierarchyData);
  });

  it('should call handleAxiosError and throw an error if the request fails', async () => {
    const mockError = new Error('Network Error') as AxiosError;

    vi.mocked(mockAxiosAuth.get).mockRejectedValueOnce(mockError);
    const mockHandleAxiosError = vi.mocked(handleAxiosError);

    await expect(getHierarchy()).rejects.toThrow('Unreachable');
    expect(mockHandleAxiosError).toHaveBeenCalledWith(mockError);
  });
});
