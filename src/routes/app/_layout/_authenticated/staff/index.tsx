import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { Transition } from '@headlessui/react';
import { OrderType } from '../../../../../types/types';
import { getAllCategories, getStaffList } from '../../../../../services/staff';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import CustomButton from '../../../../../components/CustomButton';
import SelectBox from '../../../../../components/SelectBox';
import StaffListTable from '../../../../../components/StaffListTable';
import Pagination from '../../../../../components/Pagination';

export const Route = createFileRoute('/app/_layout/_authenticated/staff/')({
  component: StaffList,
});

function StaffList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string | null>>({});
  const [filtersOn, setFiltersOn] = useState<boolean>(false);
  const [sortFilter, setSortFilter] = useState<{
    order: OrderType;
    direction: 'asc' | 'desc';
  }>({ order: 'name', direction: 'asc' });
  const [staffQuery, categoryQuery] = useQueries({
    queries: [
      {
        queryKey: ['staff', page, filters, sortFilter],
        queryFn: () => getStaffList(page, filters, sortFilter),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['categories'],
        queryFn: () => getAllCategories(),
      },
    ],
  });

  const handleFilterChange = (
    selectedFilters: Record<string, string | null>
  ) => {
    setFilters((prev: Record<string, string | null>) => ({
      ...prev,
      ...selectedFilters,
    }));
  };

  const handleSortFilterChange = (
    order: OrderType,
    direction: 'asc' | 'desc'
  ) => {
    setSortFilter({ order, direction });
  };

  if (staffQuery.isPending || categoryQuery.isPending) {
    return (
      <div className="m-auto">
        <LoadingSpinner />
      </div>
    );
  }

  if (staffQuery.isError) {
    return (
      <span className="text-red-800 text-xl m-auto">
        Error: {staffQuery.error.message}
      </span>
    );
  }

  if (categoryQuery.isError) {
    return (
      <span className="text-red-800 text-xl m-auto">
        Error: {categoryQuery.error.message}
      </span>
    );
  }

  return (
    <main className="min-w-full px-2 md:px-11">
      <div className="items-center mb-6">
        <h1 className="text-red-700 text-2xl">Staff List</h1>
        <h2 className="text-slate-500 text-sm">
          Explore the full list of company staff. Click on a name for more
          details
        </h2>
      </div>
      <div className="flex justify-between">
        <CustomButton
          color="primary"
          icon={<FaFilter />}
          onClick={() => setFiltersOn(!filtersOn)}
          text="Filters"
        />
        <Link
          to="/app/staff/add-new"
          className="bg-purple-700 hover:bg-purple-500 inline-flex gap-x-2 items-center text-white text-sm font-semibold rounded-md px-2.5"
        >
          <span>New Staff</span>
          <IoPersonAdd />
        </Link>
      </div>
      {Object.keys(filters).length > 0 && (
        <div className="mt-2">
          <CustomButton
            onClick={() => setFilters({})}
            color="secondary"
            icon={<FaFilterCircleXmark />}
            text="Reset All"
          />
        </div>
      )}
      <Transition
        show={filtersOn}
        enter="ease-out duration-300 transform"
        enterFrom="opacity-0 translate-y-[-50%]"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-50%]"
      >
        <SelectBox
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categoryQuery.data}
        />
      </Transition>
      <StaffListTable
        sortFilterChange={handleSortFilterChange}
        data={staffQuery.data}
      />
      {staffQuery.isFetching ? (
        <span className="flex items-center text-xl gap-2 justify-center mt-4 text-slate-600">
          <LoadingSpinner />
        </span>
      ) : (
        <Pagination
          currentPage={page}
          hasMore={staffQuery.data.hasMore}
          totalPages={staffQuery.data.totalPages}
          handlePage={(page) => setPage(page)}
          isPlaceHolder={staffQuery.isPlaceholderData}
        />
      )}{' '}
      <span className="text-slate-500">
        Total Staff: {staffQuery.data.totalStaff}
      </span>
    </main>
  );
}
