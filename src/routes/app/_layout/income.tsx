import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getIncome } from '../../../services/income';

export const Route = createFileRoute('/app/_layout/income')({
  component: Income,
});

function Income() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['income'],
    queryFn: () => getIncome(),
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
          Total Company Income By Year
        </h2>
      </section>
    </div>
  );
}
