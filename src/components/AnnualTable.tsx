import { AnnualLeaveType } from '../types/types';
import dateFormat from '../utils/dateFormat';
import { getDateDifference } from '../utils/getDateDifference';
import CustomButton from './CustomButton';

export default function AnnualTable({
  data,
  isDelete,
  deleteHandler,
}: {
  data: AnnualLeaveType[];
  isDelete?: boolean;
  deleteHandler?: (requestId: number) => void;
}) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
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
          return (
            <tr key={item.id}>
              <td className="px-1 py-4 text-sm text-gray-500 lg:table-cell">
                {fromDate}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {toDate}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {difference}
              </td>

              {isDelete && deleteHandler && (
                <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  <CustomButton
                    text="Delete"
                    color="primary"
                    onClick={() => deleteHandler(item.id!)}
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
