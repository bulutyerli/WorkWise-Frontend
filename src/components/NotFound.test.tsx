import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import userEvent from '@testing-library/user-event';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children: string; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('NotFound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', { name: /not found/i })
    ).toBeInTheDocument();
  });

  it('should navigate to home when "Go back home" button is clicked', async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const goBackHomeButton = screen.getByRole('link', {
      name: /go back home/i,
    });
    await user.click(goBackHomeButton);

    expect(goBackHomeButton).toHaveAttribute('href', '/');
  });
});
