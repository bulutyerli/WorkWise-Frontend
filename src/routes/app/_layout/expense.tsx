import { createFileRoute, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import FinanceListTable from '../../../components/FinanceListTable';
import { useState } from 'react';
import { CategoriesData, FinanceOrderType } from '../../../types/types';
import Pagination from '../../../components/Pagination';
import CategoryFilter from '../../../components/CategoryFilter';
import { getAllExpenses } from '../../../services/expenses';
import LoadingSpinner from '../../../components/LoadingSpinner';

export const Route = createFileRoute('/app/_layout/expense')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/app/auth/sign-in' });
    }
  },
  component: Expense,
});

function Expense() {
  const [filter, setFilter] = useState<CategoriesData>({
    id: 0,
    category: 'All',
  });
  const [page, setPage] = useState<number>(1);
  const [sortFilter, setSortFilter] = useState<{
    order: FinanceOrderType;
    direction: 'asc' | 'desc';
  }>();
  const { isPending, isError, data, error, isPlaceholderData } = useQuery({
    queryKey: ['expense', page, filter, sortFilter],
    queryFn: () => getAllExpenses(page, filter?.id, sortFilter),
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

  const expenseList = data.data;

  const handleSortFilter = (
    order: FinanceOrderType,
    direction: 'asc' | 'desc'
  ) => {
    setSortFilter({ order, direction });
  };
  const handleFilterChange = (e: string) => {
    if (e) {
      const selectedCategory = data.categories.find(
        (cat) => cat.id === parseInt(e)
      );

      if (selectedCategory) {
        setFilter(selectedCategory);
      } else {
        setFilter({ id: 0, category: 'All' });
      }
    }
  };

  return (
    <div className="w-full h-full text-xs lg:text-base">
      <section>
        <h2 className="text-lg lg:text-xl text-slate-700 text-center mb-5">
          Expense Records
        </h2>
        <CategoryFilter<CategoriesData>
          onFilterSelect={handleFilterChange}
          selectedCategory={filter}
          categories={data.categories}
          keyCreator={(category) => category.id}
          option={(category) => category.category}
          title="Category:"
          addAll
        />
        <FinanceListTable
          data={expenseList}
          sortFilterChange={handleSortFilter}
          amountColor="text-red-700"
        />
        <Pagination
          currentPage={page}
          hasMore={data.hasMore}
          totalPages={data.totalPages}
          handlePage={(page) => setPage(page)}
          isPlaceHolder={isPlaceholderData}
        />
      </section>
    </div>
  );
}
