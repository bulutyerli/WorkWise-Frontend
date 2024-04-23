import { StaffType } from '../types/types';
import { Link } from '@tanstack/react-router';

export default function StaffListTable({ data }: { data: StaffType }) {
  const { data: staffData } = data;
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Name
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Email
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Department
          </th>

          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Details</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {staffData.map((staff) => (
          <tr key={staff.id}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
              {staff.name} {staff.surname}
              <dl className="font-normal lg:hidden">
                <dd className="mt-1 truncate text-gray-500 lg:hidden">
                  {staff.email}
                </dd>
              </dl>
            </td>

            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              {staff.email}
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
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <Link
                to="/app/staff/$staffId"
                params={{ staffId: String(staff.id) }}
                className="text-purple-800 hover:text-purple-950"
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
