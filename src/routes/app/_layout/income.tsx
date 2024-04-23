import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/income')({
  component: Income,
});

function Income() {
  return <div>income</div>;
}
