import {
  mockByCategoryData,
  mockByMonthData,
  mockFinanceByCategory,
  mockFinanceData,
  mockFinanceListType,
} from '../__mocks__/mockData';
import axiosAuth from '../utils/axiosAuth';

import {
  getAllExpenses,
  getExpenseByMonth,
  getExpensesByCategory,
  getExpensesByYear,
  getExpensesTotal,
} from './expenses';

vi.mock('../utils/axiosAuth');
vi.mock('../utils/errorHandler');
const mockAxios = axiosAuth;

describe('Expenses API Call Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should getExpensesTotal call the correct API endpoint and return data on success', async () => {
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockFinanceData,
    });

    const result = await getExpensesTotal();

    expect(result).toEqual(mockFinanceData);
    expect(mockAxios.get).toHaveBeenCalledWith('/expenses-total');
  });

  it('should getExpensesByCategory call correct API endpoint and return data on success', async () => {
    const category = 1;
    const params = new URLSearchParams({ category: category.toString() });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockFinanceByCategory,
    });

    const result = await getExpensesByCategory(category);
    expect(result).toEqual(mockFinanceByCategory);
    expect(mockAxios.get).toHaveBeenCalledWith('/expenses-category', {
      params,
    });
  });

  it('should call getExpensesByYear API and return data on success', async () => {
    const year = 2024;
    const params = new URLSearchParams({ year: year.toString() });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockByCategoryData,
    });

    const result = await getExpensesByYear(year);
    expect(mockAxios.get).toHaveBeenCalledWith('/expense-year', {
      params,
    });
    expect(result).toEqual(mockByCategoryData);
  });

  it('should call getExpenseByMonth API and return data on success', async () => {
    const year = 2024;
    const category = 2;
    const params = new URLSearchParams({
      category: category.toString(),
      year: year.toString(),
    });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockByMonthData,
    });

    const result = await getExpenseByMonth(year, category);
    expect(mockAxios.get).toHaveBeenCalledWith('/expense-month', {
      params,
    });
    expect(result).toEqual(mockByMonthData);
  });

  it('should call getAllExpenses API and return data on success', async () => {
    const page = 2;
    const category = 5;
    const params = new URLSearchParams({
      page: page.toString(),
      category: category.toString(),
    });
    vi.mocked(mockAxios.get).mockResolvedValueOnce({
      data: mockFinanceListType,
    });

    const result = await getAllExpenses(page, category);
    expect(mockAxios.get).toHaveBeenCalledWith('/expenses', {
      params,
    });
    expect(result).toEqual(mockFinanceListType);
  });
});
