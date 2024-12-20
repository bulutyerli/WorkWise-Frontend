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
    <table className="w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="text-left text-sm font-semibold text-gray-900 "
          >
            <span className="flex items-center gap-1">
              Id
              <button
                aria-label="sort id"
                className="cursor-pointer"
                onClick={() => handleSortChange('id')}
              >
                <FaSort />
              </button>
            </span>
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            <span className="flex items-center gap-1 ">
              Description
              <button
                aria-label="sort description"
                className="cursor-pointer"
                onClick={() => handleSortChange('description')}
              >
                <FaSort />
              </button>
            </span>
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            <span className="flex items-center gap-1">
              Amount
              <button
                aria-label="sort amount"
                className="cursor-pointer"
                onClick={() => handleSortChange('amount')}
              >
                <FaSort />
              </button>
            </span>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <span className="flex items-center gap-1">
              Date
              <button
                aria-label="sort date"
                className="cursor-pointer"
                onClick={() => handleSortChange('date')}
              >
                <FaSort />
              </button>
            </span>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <span className="hidden lg:flex items-center gap-1">
              Category
              <button
                aria-label="sort category"
                className="cursor-pointer"
                onClick={() => handleSortChange('category')}
              >
                <FaSort />
              </button>
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((item) => {
          const date = new Date(item.date);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();

          const newDate = `${month}-${day}-${year}`;

          const amount = `${addCommasToMillion(item.amount)}`;
          return (
            <tr key={item.id}>
              <td className="px-1 py-4 text-sm text-gray-500 lg:table-cell">
                {item.id}
              </td>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:w-auto sm:max-w-none">
                {item.description}
              </td>
              <td
                className={`w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none ${amountColor}`}
              >
                {amount}
              </td>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:w-auto sm:max-w-none">
                {newDate}
              </td>
              <td className="hidden lg:block w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:w-auto sm:max-w-none">
                {item.category}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
