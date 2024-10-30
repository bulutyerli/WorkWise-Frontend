import { render } from '@testing-library/react';
import CustomButton from './CustomButton';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

vi.mock('./LoadingSpinner', () => ({
  default: () => <div>Spinner</div>,
}));

const mockOnClick = vi.fn();
const icon = <svg>icon</svg>;
const color = 'primary';
const text = 'test';

describe('CustomButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct text if loading or not', () => {
    const { rerender } = render(
      <CustomButton
        onClick={mockOnClick}
        icon={icon}
        color={color}
        text={text}
        isLoading={false}
      />
    );

    const button = screen.getByRole('button', {
      name: /test/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-orange-600 hover:bg-orange-500');
    expect(screen.queryByText('Spinner')).not.toBeInTheDocument();

    rerender(
      <CustomButton
        onClick={mockOnClick}
        icon={icon}
        color={color}
        text={text}
        isLoading={true}
      />
    );

    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.getByText('Spinner')).toBeInTheDocument();
  });

  it('should call onClick function on click', async () => {
    const user = userEvent.setup();

    render(
      <CustomButton
        onClick={mockOnClick}
        icon={icon}
        color={color}
        text={text}
        isLoading={false}
      />
    );
    const button = screen.getByRole('button', { name: /test/i });
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalledOnce();
  });
});
