import {
  getIncomeTotal,
  getIncomeByCategory,
  getIncomeByYear,
  getIncomeByMonth,
  getAllIncome,
} from './income';
import axiosAuth from '../utils/axiosAuth';
import {
  mockFinanceData,
  mockFinanceByCategory,
  mockByCategoryData,
  mockByMonthData,
  mockFinanceListType,
} from '../__mocks__/mockData';

vi.mock('../utils/axiosAuth');
vi.mock('../utils/errorHandler');
const mockAxios = axiosAuth;

describe('Income API Call Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should getIncomeTotal call the correct API endpoint and return data on success', async () => {
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockFinanceData,
    });

    const result = await getIncomeTotal();

    expect(result).toEqual(mockFinanceData);
    expect(mockAxios.get).toHaveBeenCalledWith('/income-total');
  });

  it('should getIncomeByCategory call correct API endpoint and return data on success', async () => {
    const category = 1;
    const params = new URLSearchParams({ category: category.toString() });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockFinanceByCategory,
    });

    const result = await getIncomeByCategory(category);
    expect(result).toEqual(mockFinanceByCategory);
    expect(mockAxios.get).toHaveBeenCalledWith('/income-category', {
      params,
    });
  });

  it('should call getIncomeByYear API and return data on success', async () => {
    const year = 2024;
    const params = new URLSearchParams({ year: year.toString() });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockByCategoryData,
    });

    const result = await getIncomeByYear(year);
    expect(mockAxios.get).toHaveBeenCalledWith('/income-year', {
      params,
    });
    expect(result).toEqual(mockByCategoryData);
  });

  it('should call getIncomeByMonth API and return data on success', async () => {
    const year = 2024;
    const category = 2;
    const params = new URLSearchParams({
      category: category.toString(),
      year: year.toString(),
    });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockByMonthData,
    });

    const result = await getIncomeByMonth(year, category);
    expect(mockAxios.get).toHaveBeenCalledWith('/income-month', {
      params,
    });
    expect(result).toEqual(mockByMonthData);
  });

  it('should call getAllIncome API and return data on success', async () => {
    const page = 2;
    const category = 5;
    const sortFilters = { order: 'date' as const, direction: 'asc' as const };
    const params = new URLSearchParams({
      page: page.toString(),
      category: category.toString(),
      order: sortFilters.order,
      direction: sortFilters.direction,
    });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockFinanceListType,
    });

    const result = await getAllIncome(page, category, sortFilters);
    expect(mockAxios.get).toHaveBeenCalledWith('/income', {
      params,
    });
    expect(result).toEqual(mockFinanceListType);
  });
});
