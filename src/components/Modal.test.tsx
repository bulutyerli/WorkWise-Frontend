// Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from './Modal';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: string; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Modal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnClick.mockClear();
  });

  it('should render correctly when open', () => {
    render(
      <Modal
        title="Test Modal"
        description="This is a test description."
        buttonText="Confirm"
        onClick={mockOnClick}
        onClose={mockOnClose}
        isOpen={true}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(
      <Modal
        title="Test Modal"
        description="This is a test description."
        buttonText="Confirm"
        onClick={mockOnClick}
        onClose={mockOnClose}
        isOpen={false}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Modal
        title="Test Modal"
        description="This is a test description."
        buttonText="Confirm"
        onClick={mockOnClick}
        onClose={mockOnClose}
        isOpen={true}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when confirm button is clicked', () => {
    render(
      <Modal
        title="Test Modal"
        description="This is a test description."
        buttonText="Confirm"
        onClick={mockOnClick}
        onClose={mockOnClose}
        isOpen={true}
      />
    );

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
