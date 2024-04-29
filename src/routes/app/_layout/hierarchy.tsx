import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getHierarchy } from '../../../services/hierarchy';
import { HiearchyChart } from '../../../components/HierarchyChart';

export const Route = createFileRoute('/app/_layout/hierarchy')({
  component: Hierarchy,
});

function Hierarchy() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['hierarchy'],
    queryFn: () => getHierarchy(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="h-full">
      <h2 className="text-center text-red-700">Company Hierarchy Chart</h2>
      <HiearchyChart data={data.data} />
    </section>
  );
}
