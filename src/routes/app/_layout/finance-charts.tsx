import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  getIncomeTotal,
  getIncomeByCategory,
  getIncomeByYear,
  getIncomeByMonth,
} from '../../../services/income';
import {
  getExpensesTotal,
  getExpensesByCategory,
  getExpensesByYear,
  getExpenseByMonth,
} from '../../../services/expenses';
import FinanceLineChart from '../../../components/charts/FinanceLineChart';
import { useState } from 'react';
import { CategoriesData, FinanceData } from '../../../types/types';
import createCategoryData from '../../../utils/createCategoryData';
import CategoryFilter from '../../../components/CategoryFilter';
import LoadingSpinner from '../../../components/LoadingSpinner';
import FinancePieChart from '../../../components/charts/FinancePieChart';
import FinanceBarChart from '../../../components/charts/FinanceBarChart';

export const Route = createFileRoute('/app/_layout/finance-charts')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/app/auth/sign-in' });
    }
  },
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
  const [selectedYearMonthIncome, setSelectedYearMonthIncome] =
    useState<number>(2023);
  const [selectedCategoryMonthIncome, setSelectedCategoryMonthIncome] =
    useState<CategoriesData>({
      id: 1,
      category: 'Ticket Sales',
    });
  const [selectedYearMonthExpense, setSelectedYearMonthExpense] =
    useState<number>(2023);
  const [selectedCategoryMonthExpense, setSelectedCategoryMonthExpense] =
    useState<CategoriesData>({
      id: 1,
      category: 'Salary',
    });

  const [
    incomeQuery,
    expensesQuery,
    incomeCatQuery,
    expenseCatQuery,
    incomeYearQuery,
    expenseYearQuery,
    incomeMonthQuery,
    expenseMonthQuery,
  ] = useQueries({
    queries: [
      { queryKey: ['income-total'], queryFn: () => getIncomeTotal() },
      { queryKey: ['expenses-total'], queryFn: () => getExpensesTotal() },
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
      {
        queryKey: [
          'income-month',
          selectedCategoryMonthIncome,
          selectedYearMonthIncome,
        ],
        queryFn: () =>
          getIncomeByMonth(
            selectedYearMonthIncome,
            selectedCategoryMonthIncome.id
          ),
      },
      {
        queryKey: [
          'expense-month',
          selectedCategoryMonthExpense,
          selectedYearMonthExpense,
        ],
        queryFn: () =>
          getExpenseByMonth(
            selectedYearMonthExpense,
            selectedCategoryMonthExpense.id
          ),
      },
    ],
  });

  if (incomeQuery.isPending || expensesQuery.isPending)
    return <LoadingSpinner />;
  if (
    incomeQuery.error ||
    expensesQuery.error ||
    incomeCatQuery.error ||
    expenseCatQuery.error
  )
    return 'An error has occured';

  const incomeData = incomeQuery.data?.data ?? [];
  const expensesData = expensesQuery.data?.data ?? [];
  const incomeCategories = incomeCatQuery?.data?.data.categoryData ?? [];
  const incomeCategoryData = createCategoryData(
    incomeCatQuery?.data?.data.valuesData ?? []
  );

  const expenseCategories = expenseCatQuery.data?.data.categoryData ?? [];
  const expenseCategoryData = createCategoryData(
    expenseCatQuery?.data?.data.valuesData || []
  );
  const incomePieData = incomeYearQuery.data?.data ?? [];
  const expensePieData = expenseYearQuery.data?.data ?? [];
  const incomeMonthData = incomeMonthQuery.data?.data ?? [];
  const expenseMonthData = expenseMonthQuery.data?.data ?? [];

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

  const handleIncomeYearFilter = (e: string) => {
    if (e) {
      const selectedYear = availableYears.find((year) => year === parseInt(e));

      if (selectedYear) {
        setSelectedIncomeYear(selectedYear);
      }
    }
  };

  const handleExpenseYearFilter = (e: string) => {
    if (e) {
      const selectedYear = availableYears.find((year) => year === parseInt(e));

      if (selectedYear) {
        setSelectedExpenseYear(selectedYear);
      }
    }
  };

  const handleExpenseMonthFilter = (e: string) => {
    if (e) {
      const selectedYear = availableYears.find((year) => year === parseInt(e));
      if (selectedYear) {
        setSelectedYearMonthExpense(selectedYear);
      }
    }
  };

  const handleExpenseMonthFilterCat = (e: string) => {
    if (e) {
      const selectedCategory = expenseCategories.find(
        (cat) => cat.id === parseInt(e)
      );
      if (selectedCategory) {
        setSelectedCategoryMonthExpense(selectedCategory);
      }
    }
  };

  const handleIncomeMonthFilter = (e: string) => {
    if (e) {
      const selectedYear = availableYears.find((year) => year === parseInt(e));
      if (selectedYear) {
        setSelectedYearMonthIncome(selectedYear);
      }
    }
  };

  const handleIncomeMonthFilterCat = (e: string) => {
    if (e) {
      const selectedCategory = incomeCategories.find(
        (cat) => cat.id === parseInt(e)
      );
      if (selectedCategory) {
        setSelectedCategoryMonthIncome(selectedCategory);
      }
    }
  };

  const incomeAndExpenseData: FinanceData[] = incomeData.map((income) => ({
    year: income.year,
    income: income.amount,
    expense: expensesData.find((expense) => expense.year === income.year)
      ?.amount,
  }));

  const availableYears = incomeData.map((year) => year.year);

  return (
    <div className="w-full h-full text-xs lg:text-base px-2">
      <section>
        <div>
          <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
            Company Income and Expense By Years
          </h2>
          <FinanceLineChart<FinanceData>
            data={incomeAndExpenseData}
            dataKeys={['income', 'expense']}
            colors={['#15803d', '#b91c1c']}
          />
        </div>
        <div className="border-b-2 min-w-full border-slate-100 my-12"></div>
        <div className="flex flex-col lg:flex-row justify-between lg:gap-10">
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Annual Income Trends
            </h2>
            {incomeCatQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div className="flex flex-col">
                <CategoryFilter<CategoriesData>
                  onFilterSelect={handleIncomeCatFilter}
                  selectedCategory={selectedIncomeCat}
                  categories={incomeCategories}
                  keyCreator={(category) => category.id}
                  option={(category) => category.category}
                  title="Category:"
                />
                <FinanceLineChart
                  data={incomeCategoryData}
                  dataKeys={[selectedIncomeCat.category]}
                  colors={['#15803d']}
                />
              </div>
            )}
          </div>
          <div className="hidden lg:block border-l-2 min-h-full border-slate-100"></div>
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Annual Expense Trends
            </h2>
            {expenseCatQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div>
                <CategoryFilter<CategoriesData>
                  onFilterSelect={handleExpensesCatFilter}
                  selectedCategory={selectedExpenseCat}
                  categories={expenseCategories}
                  keyCreator={(category) => category.id}
                  option={(category) => category.category}
                  title="Category:"
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
        <div className="border-b-2 min-w-full border-slate-100 my-12"></div>
        <div className="flex flex-col lg:flex-row justify-between gap-10 px-2">
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Income Distribution By Category
            </h2>
            {incomeYearQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div>
                <CategoryFilter<number>
                  onFilterSelect={handleIncomeYearFilter}
                  selectedCategory={selectedIncomeYear}
                  categories={availableYears}
                  keyCreator={(year) => year}
                  option={(year) => year}
                  title="Year:"
                />
                <FinancePieChart data={incomePieData} />
              </div>
            )}
          </div>
          <div className="hidden lg:block border-l-2 min-h-full border-slate-100"></div>
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Expense Distribution By Category
            </h2>
            {expenseYearQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div>
                <CategoryFilter<number>
                  onFilterSelect={handleExpenseYearFilter}
                  selectedCategory={selectedExpenseYear}
                  categories={availableYears}
                  keyCreator={(year) => year}
                  option={(year) => year}
                  title="Year:"
                />
                <FinancePieChart data={expensePieData} />
              </div>
            )}
          </div>
        </div>
        <div className="border-b-2 min-w-full border-slate-100 my-12"></div>
        <div className="flex flex-col gap-10 lg:flex-row justify-between px-2">
          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Monthly Income BarChart
            </h2>
            <div className="flex gap-10 pb-2 justify-end">
              <CategoryFilter<CategoriesData>
                onFilterSelect={handleIncomeMonthFilterCat}
                selectedCategory={selectedCategoryMonthIncome}
                categories={incomeCategories}
                keyCreator={(category) => category.id}
                option={(category) => category.category}
                title="Category:"
              />
              <CategoryFilter<number>
                onFilterSelect={handleIncomeMonthFilter}
                selectedCategory={selectedYearMonthIncome}
                categories={availableYears}
                keyCreator={(year) => year}
                option={(year) => year}
                title="Year:"
              />
            </div>
            <FinanceBarChart
              data={incomeMonthData}
              color="#15803d"
              label="Income"
            />
          </div>
          <div className="hidden lg:block border-l-2 min-h-full border-slate-100"></div>

          <div className="w-full">
            <h2 className="text-lg lg:text-xl text-slate-700 text-start mb-5 ml-2">
              Monthly Expense BarChart
            </h2>
            <div className="flex gap-10 pb-2 justify-end">
              <CategoryFilter<CategoriesData>
                onFilterSelect={handleExpenseMonthFilterCat}
                selectedCategory={selectedCategoryMonthExpense}
                categories={expenseCategories}
                keyCreator={(category) => category.id}
                option={(category) => category.category}
                title="Category:"
              />
              <CategoryFilter<number>
                onFilterSelect={handleExpenseMonthFilter}
                selectedCategory={selectedYearMonthExpense}
                categories={availableYears}
                keyCreator={(year) => year}
                option={(year) => year}
                title="Year:"
              />
            </div>
            <FinanceBarChart
              data={expenseMonthData}
              color="#b91c1c"
              label="Expense"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
