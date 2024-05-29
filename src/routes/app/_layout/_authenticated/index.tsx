import { Link, createFileRoute } from '@tanstack/react-router';
import { getStaffDates } from '../../../../services/staff';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import BirthdayCard from '../../../../components/BirthdayCard';
import { LuPartyPopper } from 'react-icons/lu';
import { FaBirthdayCake } from 'react-icons/fa';
import dateFormat from '../../../../utils/dateFormat';

export const Route = createFileRoute('/app/_layout/_authenticated/')({
  component: Index,
});

function Index() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['staff-dates'],
    queryFn: () => getStaffDates(),
  });

  if (isPending) {
    return (
      <div className="m-auto">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return (
      <span className="text-red-800 text-xl m-auto">
        Error: {error.message}
      </span>
    );
  }

  const birthdayData = data.birthdays;
  const newjoins = data.newJoins;
  const currentYear = new Date().getFullYear();

  console.log(newjoins);

  return (
    <div className="p-4 space-y-24 md:px-10 mx-auto w-full">
      {birthdayData.length > 0 && (
        <section className="space-y-10 relative bg-slate-100 shadow-lg p-5 md:p-20">
          <h3 className="text-base md:text-lg text-slate-700 text-center">
            Upcoming staff birthdays
          </h3>
          <div className="flex justify-center items-center gap-2">
            <FaBirthdayCake size={32} fill="purple" />
            <h4 className="text-center text-4xl font-birthday">
              Happy Birthday!
            </h4>
            <LuPartyPopper size={32} fill="red" />
          </div>
          <ul className="flex flex-wrap min-w-full items-center justify-center gap-2 ">
            {birthdayData.map((data) => (
              <div className=" min-w-fit mx-4" key={data.id}>
                <BirthdayCard data={data} />
              </div>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h3 className="text-lg md:text-2xl text-slate-700 pb-10 text-center">
          Meet Our Recently Joined Staff in {currentYear}
        </h3>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                <span className="flex items-center gap-1">Name</span>
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
              >
                <span className="flex items-center gap-1">Role</span>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                <span className="flex items-center gap-1">
                  Office / Department
                </span>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                <span className="flex items-center gap-1">Join Date</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {newjoins.map((staff) => {
              const joindate = dateFormat(staff.join_date.toString());
              return (
                <tr key={staff.id}>
                  <td className="w-1/4 py-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <Link
                      to="/app/staff/$staffId"
                      params={{ staffId: String(staff.id) }}
                      className="text-orange-800 hover:text-orange-950"
                    >
                      {staff.name} {staff.surname}
                    </Link>
                    <dl className="font-normal ">
                      <dd className="mt-1 truncate text-gray-500 md:hidden">
                        {staff.role}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {staff.role}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {staff.department}
                    <dl className="font-normal ">
                      <dd className="mt-1 truncate text-gray-500">
                        {staff.office}
                      </dd>
                    </dl>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {joindate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
