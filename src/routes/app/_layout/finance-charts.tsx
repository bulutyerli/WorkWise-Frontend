import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  getIncome,
  getIncomeByCategory,
  getIncomeByYear,
} from '../../../services/income';
import {
  getExpenses,
  getExpensesByCategory,
  getExpensesByYear,
} from '../../../services/expenses';
import FinanceLineChart from '../../../components/charts/FinanceLineChart';
import { useState } from 'react';
import { CategoriesData } from '../../../types/types';
import createCategoryData from '../../../utils/createCategoryData';
import CategoryFilter from '../../../components/CategoryFilter';
import LoadingSpinner from '../../../components/LoadingSpinner';
import FinancePieChart from '../../../components/charts/FinancePieChart';

export const Route = createFileRoute('/app/_layout/finance-charts')({
  component: FinanceCharts,
});

export default function FinanceCharts() {
  const [selectedIncomeCat, setSelectedIncomeCat] = useState<CategoriesData>({
    id: 1,
    category: 'Ticket Sales',
  });
  const [selectedExpenseCat, setSelectedExpenseCat] = useState<CategoriesData>({
    id: 1,
    category: 'Salary',
  });
  const [selectedIncomeYear, setSelectedIncomeYear] = useState<number>(2023);
  const [selectedExpenseYear, setSelectedExpenseYear] = useState<number>(2023);

  const [
    incomeQuery,
    expensesQuery,
    incomeCatQuery,
    expenseCatQuery,
    incomeYearQuery,
    expenseYearQuery,
  ] = useQueries({
    queries: [
      { queryKey: ['income'], queryFn: () => getIncome() },
      { queryKey: ['expenses'], queryFn: () => getExpenses() },
      {
        queryKey: ['income_by_category', selectedIncomeCat],
        queryFn: () => getIncomeByCategory(selectedIncomeCat.id),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['expenses_by_category', selectedExpenseCat],
        queryFn: () => getExpensesByCategory(selectedExpenseCat.id),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['income_by_year', selectedIncomeYear],
        queryFn: () => getIncomeByYear(selectedIncomeYear),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['expenses_by_year', selectedExpenseYear],
        queryFn: () => getExpensesByYear(selectedExpenseYear),
        placeholderData: keepPreviousData,
      },
    ],
  });

  if (incomeQuery.isLoading || expensesQuery.isLoading)
    return <LoadingSpinner />;
  if (
    incomeQuery.error ||
    expensesQuery.error ||
    incomeCatQuery.error ||
    expenseCatQuery.error
  )
    return 'An error has occured';

  const incomeData = incomeQuery.data?.data || [];
  const expensesData = expensesQuery.data?.data || [];
  const incomeCategories = incomeCatQuery?.data?.data.categoryData || [];
  const incomeCategoryData = createCategoryData(
    incomeCatQuery?.data?.data.valuesData || []
  );

  const expenseCategories = expenseCatQuery.data?.data.categoryData || [];
  const expenseCategoryData = createCategoryData(
    expenseCatQuery?.data?.data.valuesData || []
  );
  const incomePieData = incomeYearQuery.data?.data || [];
  const expensePieData = expenseYearQuery.data?.data || [];

  const handleIncomeCatFilter = (e: string) => {
    if (e) {
      const selectedCategory = incomeCategories.find(
        (cat) => cat.id === parseInt(e)
      );
      if (selectedCategory) {
        setSelectedIncomeCat(selectedCategory);
      }
    }
  };

  const handleExpensesCatFilter = (e: string) => {
    if (e) {
      const selectedCategory = expenseCategories.find(
        (cat) => cat.id === parseInt(e)
      );
      if (selectedCategory) {
        setSelectedExpenseCat(selectedCategory);
      }
    }
  };

  const incomeAndExpenseData = incomeData.map((income) => ({
    year: income.year,
    income: income.amount,
    expense: expensesData.find((expense) => expense.year === income.year)
      ?.amount,
  }));

  console.log(incomePieData);

  return (
    <div className="w-full h-full text-xs lg:text-base px-2">
      <section>
        <div className="mb-12">
          <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
            Company Income and Expense By Years
          </h2>
          <FinanceLineChart
            data={incomeAndExpenseData}
            dataKeys={['income', 'expense']}
            colors={['#15803d', '#b91c1c']}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:gap-10">
          <div className="mb-12 w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Annual Income Trends
            </h2>
            {incomeCatQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div className="flex flex-col">
                <CategoryFilter
                  onFilterSelect={handleIncomeCatFilter}
                  selectedCategory={selectedIncomeCat}
                  categories={incomeCategories}
                />
                <FinanceLineChart
                  data={incomeCategoryData}
                  dataKeys={[selectedIncomeCat.category]}
                  colors={['#15803d']}
                />
              </div>
            )}
          </div>
          <div className="mb-12 w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Annual Expense Trends
            </h2>
            {expenseCatQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div>
                <CategoryFilter
                  onFilterSelect={handleExpensesCatFilter}
                  selectedCategory={selectedExpenseCat}
                  categories={expenseCategories}
                />
                <FinanceLineChart
                  data={expenseCategoryData}
                  dataKeys={[selectedExpenseCat.category]}
                  colors={['#b91c1c']}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:gap-10">
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Income Distribution By Category
            </h2>
            {incomeYearQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div>
                <FinancePieChart data={incomePieData} />
              </div>
            )}
          </div>
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Expense Distribution By Category
            </h2>
            {expenseYearQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div>
                <FinancePieChart data={expensePieData} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
