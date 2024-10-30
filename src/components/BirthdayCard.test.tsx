import { render, screen } from '@testing-library/react';
import BirthdayCard from './BirthdayCard';
import { mockBirthdayData } from '../__mocks__/mockData';

describe('BirthdayCard Component', () => {
  beforeEach(() => {
    render(<BirthdayCard data={mockBirthdayData} />);
  });

  it('should render the correct birthday day and month', () => {
    const day = screen.getByTestId('birthday-day');
    const month = screen.getByTestId('birthday-month');

    expect(day).toHaveTextContent('12');
    expect(month).toHaveTextContent('Jan');
  });

  it('should render the full name correctly', () => {
    const fullName = screen.getByTestId('birthday-fullname');

    expect(fullName).toHaveTextContent('John Doe');
  });

  it('should render additional details correctly', () => {
    expect(screen.getByText('Manager')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });
});
