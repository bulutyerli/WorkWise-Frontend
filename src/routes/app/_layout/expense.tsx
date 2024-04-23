import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/expense')({
  component: Expense,
});

function Expense() {
  return <div>expense</div>;
}
