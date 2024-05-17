import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/_authenticated/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome App!</h3>
    </div>
  );
}
