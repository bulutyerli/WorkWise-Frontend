import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/app/_layout/_authenticated/sickness-leave'
)({
  component: SicknessLeave,
});

function SicknessLeave() {
  return <div></div>;
}
