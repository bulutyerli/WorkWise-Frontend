import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders loading spinner', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});
