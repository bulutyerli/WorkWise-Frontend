import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/_authenticated')({
  beforeLoad: async ({ context }) => {
    const auth = context.auth.isAuthenticated;

    if (!auth) {
      throw redirect({
        to: '/app/auth/sign-in',
      });
    }
  },
});
