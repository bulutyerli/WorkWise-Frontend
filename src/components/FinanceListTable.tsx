import { FinanceListType, FinanceOrderType } from '../types/types';
import { useState } from 'react';
import { FaSort } from 'react-icons/fa6';
import addCommasToMillion from '../utils/addCommasToMillion';

export default function FinanceListTable({
  data,
  sortFilterChange,
  amountColor,
}: {
  data: FinanceListType[];
  sortFilterChange: (
    order: FinanceOrderType,
    direction: 'asc' | 'desc'
  ) => void;
  amountColor: string;
}) {
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

  const handleSortChange = (order: FinanceOrderType) => {
    setDirection(direction === 'asc' ? 'desc' : 'asc');
    sortFilterChange(order, direction);
  };

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            <span className="flex items-center gap-1">
              Id
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('id')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            <span className="flex items-center gap-1 ">
              Description
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('description')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            <span className="flex items-center gap-1">
              Amount
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('amount')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <span className="flex items-center gap-1">
              Date
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('date')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <span className="hidden lg:flex items-center gap-1">
              Category
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('category')}
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((item) => {
          const newDate = new Date(item.date).toLocaleDateString();
          const amount = `${addCommasToMillion(item.amount)}`;
          return (
            <tr key={item.id}>
              <td className="px-1 py-4 text-sm text-gray-500 lg:table-cell">
                {item.id}
              </td>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:w-auto sm:max-w-none sm:pl-0">
                {item.description}
              </td>
              <td
                className={`w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0 ${amountColor}`}
              >
                {amount}
              </td>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:w-auto sm:max-w-none sm:pl-0">
                {newDate}
              </td>
              <td className="hidden lg:block w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:w-auto sm:max-w-none sm:pl-0">
                {item.category}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
