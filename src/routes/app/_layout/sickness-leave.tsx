import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/sickness-leave')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/app/auth/sign-in' });
    }
  },
  component: SicknessLeave,
});

function SicknessLeave() {
  return <div></div>;
}
