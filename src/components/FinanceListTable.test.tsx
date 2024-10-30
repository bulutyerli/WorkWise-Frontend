import { render, screen } from '@testing-library/react';
import { mockFinanceList } from '../__mocks__/mockData';
import FinanceListTable from './FinanceListTable';
import userEvent from '@testing-library/user-event';

const mockFilterChange = vi.fn();

vi.mock('../utils/addCommasToMillion', () => ({
  default: vi.fn((amount) => ` ${amount}`),
}));

describe('FinanceListTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <FinanceListTable
        data={mockFinanceList}
        sortFilterChange={mockFilterChange}
        amountColor="text-green-200"
      />
    );
  });
  it('should render table with correct data', () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    mockFinanceList.forEach((item) => {
      expect(screen.getByText(item.id)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(`${item.amount}`)).toBeInTheDocument();
      expect(screen.getByText(item.date)).toBeInTheDocument();
      expect(screen.getByText(item.category)).toBeInTheDocument();
    });
  });

  it('should call sortFilterChange on sort button clicks', async () => {
    const user = userEvent.setup();
    const idButton = screen.getByLabelText('sort id');
    const descButton = screen.getByLabelText('sort description');
    const amountButton = screen.getByLabelText('sort amount');
    const dateButton = screen.getByLabelText('sort date');
    const categoryButton = screen.getByLabelText('sort category');

    // Test sorting by ID
    await user.click(idButton);
    expect(mockFilterChange).toHaveBeenCalledWith('id', 'asc');
    await user.click(idButton);
    expect(mockFilterChange).toHaveBeenCalledWith('id', 'desc');

    // Test sorting by Description
    await user.click(descButton);
    expect(mockFilterChange).toHaveBeenCalledWith('description', 'asc');
    await user.click(descButton);
    expect(mockFilterChange).toHaveBeenCalledWith('description', 'desc');

    // Test sorting by Amount
    await user.click(amountButton);
    expect(mockFilterChange).toHaveBeenCalledWith('amount', 'asc');
    await user.click(amountButton);
    expect(mockFilterChange).toHaveBeenCalledWith('amount', 'desc');

    // Test sorting by Date
    await user.click(dateButton);
    expect(mockFilterChange).toHaveBeenCalledWith('date', 'asc');
    await user.click(dateButton);
    expect(mockFilterChange).toHaveBeenCalledWith('date', 'desc');

    // Test sorting by Category
    await user.click(categoryButton);
    expect(mockFilterChange).toHaveBeenCalledWith('category', 'asc');
    await user.click(categoryButton);
    expect(mockFilterChange).toHaveBeenCalledWith('category', 'desc');
  });
});
