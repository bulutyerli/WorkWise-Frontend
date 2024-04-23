import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getAllCategories, getStaffList } from '../../../../services/staff';
import { useState } from 'react';
import StaffListTable from '../../../../components/StaffListTable';
import {
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from 'react-icons/md';
import SelectBox from '../../../../components/SelectBox';

export const Route = createFileRoute('/app/_layout/staff/')({
  component: StaffList,
});

function StaffList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string | null>>({});
  const [staffQuery, categoryQuery] = useQueries({
    queries: [
      {
        queryKey: ['staff', page, filters],
        queryFn: () => getStaffList(page),
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

  if (staffQuery.isPending) {
    return <span>Loading...</span>;
  }

  if (staffQuery.isError) {
    return (
      <span className="text-red-800 text-xl">
        Error: {staffQuery.error.message}
      </span>
    );
  }

  if (categoryQuery.isPending) {
    return <span>Loading...</span>;
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-red-700 text-2xl">Staff List</h1>
      </div>
      <SelectBox
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categoryQuery.data}
      />
      <StaffListTable data={staffQuery.data} />
      {staffQuery.isFetching ? (
        <span className="flex items-center text-xl gap-2 justify-center mt-4 text-slate-600">
          Loading...
        </span>
      ) : (
        <div className="flex items-center text-lg gap-2 justify-center mt-4 text-slate-600 w-full">
          <button onClick={() => setPage(1)}>
            <MdOutlineSkipPrevious />
          </button>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 0}
          >
            <MdArrowBackIosNew />
          </button>
          <div>{page}</div>/<div>{staffQuery.data.totalPages}</div>
          <button
            onClick={() => {
              if (!staffQuery.isPlaceholderData && staffQuery.data.hasMore) {
                setPage((old) => old + 1);
              }
            }}
            disabled={staffQuery.isPlaceholderData || !staffQuery.data?.hasMore}
          >
            <MdArrowForwardIos />
          </button>
          <button onClick={() => setPage(staffQuery.data.totalPages)}>
            <MdOutlineSkipNext />
          </button>
        </div>
      )}{' '}
      <span className="text-slate-500">
        Total Staff: {staffQuery.data.totalStaff}
      </span>
    </main>
  );
}
