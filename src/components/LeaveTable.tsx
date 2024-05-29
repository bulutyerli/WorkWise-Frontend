import { AnnualLeaveType } from '../types/types';
import dateFormat from '../utils/dateFormat';
import { getDateDifference } from '../utils/getDateDifference';
import CustomButton from './CustomButton';

export default function LeaveTable({
  data,
  deleteHandler,
  managerTable,
  approveHandler,
  rejectHandler,
}: {
  data: AnnualLeaveType[];
  deleteHandler?: (requestId: number) => void;
  managerTable?: boolean;
  approveHandler?: (requestId: number) => void;
  rejectHandler?: (requestId: number) => void;
}) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {managerTable && (
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              <span className="flex items-center gap-1">Name</span>
            </th>
          )}
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            <span className="flex items-center gap-1">From</span>
          </th>

          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            <span className="flex items-center gap-1">To</span>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <span className="flex items-center gap-1">Days</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((item) => {
          const fromDate = dateFormat(item.starting_date);
          const toDate = dateFormat(item.end_date);
          const difference = getDateDifference(
            item.starting_date,
            item.end_date
          );
          const fullName = `${item.name} ${item.surname}`;
          return (
            <tr key={item.id}>
              {managerTable && (
                <td className="px-1 py-4 text-sm text-gray-500 lg:table-cell">
                  {fullName}
                </td>
              )}
              <td className="px-1 py-4 text-sm text-gray-500 lg:table-cell">
                {fromDate}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {toDate}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {difference}
              </td>

              {deleteHandler && !approveHandler && (
                <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell space-x-3">
                  <CustomButton
                    text="Delete"
                    color="primary"
                    onClick={() => deleteHandler(item.id!)}
                  />
                </td>
              )}
              {approveHandler && rejectHandler && (
                <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell space-x-3 items-center flex flex-col gap-2 md:flex-row">
                  <CustomButton
                    text="Reject"
                    color="primary"
                    onClick={() => rejectHandler(item.id!)}
                  />
                  <CustomButton
                    text="Approve"
                    color="secondary"
                    onClick={() => approveHandler(item.id!)}
                  />
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
