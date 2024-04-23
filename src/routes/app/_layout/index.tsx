import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome App!</h3>
    </div>
  );
}