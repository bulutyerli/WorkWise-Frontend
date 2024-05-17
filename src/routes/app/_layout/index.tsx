import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/app/auth/sign-in' });
    }
  },
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome App!</h3>
    </div>
  );
}
