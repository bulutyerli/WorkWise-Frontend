import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/hierarchy')({
  component: Hierarchy,
});

function Hierarchy() {
  return <div>hierarchy</div>;
}
