import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';
import userEvent from '@testing-library/user-event';
import { getDateDifference } from '../utils/getDateDifference';

vi.mock('../utils/getDateDifference');

const mockGetDateDifference = getDateDifference;

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render current month', () => {
    render(<DatePicker handleSubmit={() => {}} />);

    const currentMonth = new Date().toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    expect(screen.getByText(currentMonth)).toBeInTheDocument();
  });

  it('should move to the previous month when the left icon is clicked', async () => {
    const user = userEvent.setup();

    render(<DatePicker handleSubmit={() => {}} />);

    const previousButton = screen.getByTestId('back-button');

    await user.click(previousButton);

    const previousMonth = new Date();
    previousMonth.setDate(1); // Set to the first of the month to avoid overflow issues
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const expectedMonthText = previousMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    console.log(expectedMonthText);

    expect(screen.getByText(expectedMonthText)).toBeInTheDocument();
  });

  it('should move to the next month when the right icon is clicked', async () => {
    const user = userEvent.setup();

    render(<DatePicker handleSubmit={() => {}} />);

    const nextButton = screen.getByTestId('next-button');

    await user.click(nextButton);

    const nextMonth = new Date();

    nextMonth.setDate(1);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const expectedMonthText = nextMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    expect(screen.getByText(expectedMonthText)).toBeInTheDocument();
  });

  it('should select dates, call parent func with dates and display total days correctly', async () => {
    const user = userEvent.setup();
    const submit = vi.fn();

    render(<DatePicker handleSubmit={submit} />);

    const startDate = screen.getAllByRole('button', { name: /1/i })[0];
    const endDate = screen.getAllByRole('button', {
      name: /10/i,
    })[0];

    await user.click(startDate);
    await user.click(endDate);

    expect(screen.getByRole('heading', { name: /from:/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /to:/i })).toBeInTheDocument();

    expect(screen.getByText(/Total Days:/i)).toBeInTheDocument();

    expect(mockGetDateDifference).toHaveBeenCalledTimes(2);
  });
});
