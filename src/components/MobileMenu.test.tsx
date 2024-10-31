import { render, screen } from '@testing-library/react';
import MobileMenu from './MobileMenu';
import userEvent from '@testing-library/user-event';

const routes = [
  {
    name: 'Company Hierarchy',
    href: '/hierarchy',
  },
  {
    name: 'Finance Charts',
    href: '/finance-charts',
  },
  { name: 'Income Report', href: '/income' },
  { name: 'Expense Report', href: '/expense' },
  { name: 'Annual Leave', href: '/annual-leave' },
];

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: string; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const mockUseAuth = vi.fn();

vi.mock('../providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

const handleModal = vi.fn();

describe('MobileMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
  });
  it('renders the routes when menu is open and not when its closed', async () => {
    const user = userEvent.setup();
    render(<MobileMenu routes={routes} isModal={() => vi.fn()} />);

    const menuButton = screen.getByTestId('menu-button');

    routes.forEach((route) => {
      expect(screen.queryByText(route.name)).not.toBeInTheDocument();
    });

    await user.click(menuButton);

    routes.forEach((route) => {
      expect(screen.getByText(route.name)).toBeInTheDocument();
    });
  });

  it('should render correct content based on Auth status', async () => {
    const user = userEvent.setup();
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    const { rerender } = render(
      <MobileMenu routes={routes} isModal={handleModal} />
    );

    const menuButton = screen.getByTestId('menu-button');

    await user.click(menuButton);

    const signIn = screen.getByText('Sign In');

    expect(signIn).toBeInTheDocument();

    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    rerender(<MobileMenu routes={routes} isModal={handleModal} />);

    const signOut = screen.getByRole('button', { name: 'Sign Out' });
    expect(signOut).toBeInTheDocument();

    await user.click(signOut);

    expect(handleModal).toHaveBeenCalledOnce();
  });
});
