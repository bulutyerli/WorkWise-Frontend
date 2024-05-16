import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getHierarchy } from '../../../services/hierarchy';
import { HiearchyChart } from '../../../components/charts/HierarchyChart';
import LoadingSpinner from '../../../components/LoadingSpinner';

export const Route = createFileRoute('/app/_layout/hierarchy')({
  component: Hierarchy,
});

function Hierarchy() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['hierarchy'],
    queryFn: () => getHierarchy(),
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

  return (
    <section className="h-full">
      <h2 className="text-center text-red-700">Company Hierarchy Chart</h2>
      <HiearchyChart data={data.data} />
    </section>
  );
}
