import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getAllCategories, getStaffList } from '../../../../services/staff';
import { useState } from 'react';
import StaffListTable from '../../../../components/StaffListTable';
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6';
import SelectBox from '../../../../components/SelectBox';
import { Transition } from '@headlessui/react';
import { OrderType } from '../../../../types/types';
import Pagination from '../../../../components/Pagination';
import LoadingSpinner from '../../../../components/LoadingSpinner';

export const Route = createFileRoute('/app/_layout/staff/')({
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

  if (staffQuery.isPending) {
    return <LoadingSpinner size="8" />;
  }

  if (staffQuery.isError) {
    return (
      <span className="text-red-800 text-xl">
        Error: {staffQuery.error.message}
      </span>
    );
  }

  if (categoryQuery.isPending) {
    return <LoadingSpinner size="8" />;
  }

  if (categoryQuery.isError) {
    return (
      <span className="text-red-800 text-xl">
        Error: {categoryQuery.error.message}
      </span>
    );
  }

  return (
    <main className="min-w-full">
      <div className="items-center mb-6">
        <h1 className="text-red-700 text-2xl">Staff List</h1>
        <h2 className="text-slate-500 text-sm">
          Explore the full list of company staff. Click on a name for more
          details
        </h2>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        onClick={() => setFiltersOn(!filtersOn)}
      >
        Filters
        <FaFilter />
      </button>
      {Object.keys(filters).length > 0 && (
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-orange-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ml-5"
          onClick={() => setFilters({})}
        >
          Reset All
          <FaFilterCircleXmark />
        </button>
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
          <LoadingSpinner size="8" />
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
