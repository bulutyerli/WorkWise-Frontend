import { render, screen } from '@testing-library/react';
import LeaveTable from './LeaveTable';
import { sampleAnnualLeave } from '../__mocks__/mockData';
import { getDateDifference } from '../utils/getDateDifference';
import dateFormat from '../utils/dateFormat';
import userEvent from '@testing-library/user-event';
import CustomButton from './CustomButton';

const deleteHandler = vi.fn();
const approveHandler = vi.fn();
const rejectHandler = vi.fn();

CustomButton;
vi.mock('./CustomButton', () => {
  return {
    default: ({ onClick, text }: { onClick: () => void; text: string }) => (
      <button onClick={onClick}>{text}</button>
    ),
  };
});

vi.mock('../utils/getDateDifference', () => ({
  getDateDifference: vi.fn(() => 5),
}));
vi.mock('../utils/dateFormat', () => ({
  default: vi.fn(() => '01/01/2024'),
}));

describe('LeaveTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table elements correctly without crashing', () => {
    render(<LeaveTable data={[sampleAnnualLeave]} managerTable={false} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText(/from/i)).toBeInTheDocument();
    expect(screen.getByText(/to/i)).toBeInTheDocument();
    expect(screen.getByText(/days/i)).toBeInTheDocument();
    expect(screen.getByTestId('test-difference')).toBeInTheDocument();
  });

  it('should render manager special table content', () => {
    render(<LeaveTable data={[sampleAnnualLeave]} managerTable={true} />);

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it('should hide elements for non-managers', () => {
    render(<LeaveTable data={[sampleAnnualLeave]} managerTable={false} />);

    expect(screen.queryByText(/Name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });

  it('should call the deleteHandler function onClick', async () => {
    const user = userEvent.setup();
    render(
      <LeaveTable
        data={[sampleAnnualLeave]}
        managerTable={false}
        deleteHandler={deleteHandler}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    await user.click(deleteButton);

    expect(deleteHandler).toHaveBeenCalledWith(1);
  });

  it('should call the rejectHandler function onClick', async () => {
    const user = userEvent.setup();
    render(
      <LeaveTable
        data={[sampleAnnualLeave]}
        managerTable={false}
        rejectHandler={rejectHandler}
        approveHandler={approveHandler}
      />
    );

    const rejectButton = screen.getByRole('button', { name: 'Reject' });

    await user.click(rejectButton);

    expect(rejectHandler).toHaveBeenCalledWith(1);
  });

  it('should call the approveHandler function onClick', async () => {
    const user = userEvent.setup();
    render(
      <LeaveTable
        data={[sampleAnnualLeave]}
        managerTable={false}
        rejectHandler={rejectHandler}
        approveHandler={approveHandler}
      />
    );

    const approveButton = screen.getByRole('button', { name: 'Approve' });

    await user.click(approveButton);

    expect(approveHandler).toHaveBeenCalledWith(1);
  });
});
