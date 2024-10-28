import axiosAuth from '../utils/axiosAuth';
import { handleAxiosError } from '../utils/errorHandler';
import { getUserRole } from './auth';

vi.mock('../utils/errorHandler');
vi.mock('../utils/axiosAuth');

const mockHandleAxiosError = handleAxiosError;
const mockedAxiosAuth = axiosAuth;

describe('getUserRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user role', async () => {
    vi.mocked(mockedAxiosAuth.get).mockResolvedValue({
      data: 'admin',
    });

    const result = await getUserRole('123');
    expect(result).toBe('admin');
    expect(mockedAxiosAuth.get).toHaveBeenCalledWith('/user-role', {
      params: { firebaseId: '123' },
    });
  });

  it('should return error', async () => {
    const error = new Error('Network Error');

    vi.mocked(mockedAxiosAuth.get).mockRejectedValueOnce(error);

    vi.mocked(mockHandleAxiosError).mockImplementation(() => {});

    await getUserRole('123');
    expect(mockHandleAxiosError).toHaveBeenCalledWith(error);
  });
});
