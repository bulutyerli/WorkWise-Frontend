import { OrderType, StaffType } from '../types/types';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FaSort } from 'react-icons/fa6';

export default function StaffListTable({
  data,
  sortFilterChange,
}: {
  data: StaffType;
  sortFilterChange: (order: OrderType, direction: 'asc' | 'desc') => void;
}) {
  const { data: staffData } = data;
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

  const handleSortChange = (order: OrderType) => {
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
              ID
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
            <span className="flex items-center gap-1">
              Name
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('name')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            <span className="flex items-center gap-1">
              Email
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('email')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            <span className="flex items-center gap-1">
              Role
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('role')}
              />
            </span>
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            <span className="flex items-center gap-1">
              Department
              <FaSort
                className="cursor-pointer"
                onClick={() => handleSortChange('department')}
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {staffData.map((staff) => (
          <tr key={staff.id}>
            <td className="px-1 py-4 text-sm text-gray-500 lg:table-cell">
              {staff.id}
            </td>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
              <Link
                to="/staff/$staffId"
                params={{ staffId: String(staff.id) }}
                className="text-orange-800 hover:text-orange-950"
              >
                {staff.name} {staff.surname}
              </Link>
              <Link
                to={`mailto:${staff.email}`}
                className="mt-1 truncate text-gray-500 lg:hidden font-normal"
              >
                {staff.email}
              </Link>
            </td>

            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              <Link to={`mailto:${staff.email}`}> {staff.email}</Link>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              {staff.role}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              {staff.department}
              <dl className="font-normal ">
                <dd className="mt-1 truncate text-gray-500 lg:hidden">
                  {staff.role}
                </dd>
              </dl>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
