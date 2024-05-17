import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/annual-leave')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/app/auth/sign-in' });
    }
  },
  component: () => <div>Hello /app/_layout/annual-leave!</div>,
});
