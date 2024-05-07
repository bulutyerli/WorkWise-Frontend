import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../../../services/expenses';

export const Route = createFileRoute('/app/_layout/expense')({
  component: Income,
});

function Income() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getExpenses(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-full h-full text-xs lg:text-base">
      <section>
        <h2 className="text-lg lg:text-xl text-purple-700 text-center mb-5">
          Total Company Expenses By Year
        </h2>
      </section>
    </div>
  );
}
