import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { AuthContext } from '../providers/AuthProvider';
import Error from '../components/Error';

export interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootRoute,
  errorComponent: () => {
    return <Error />;
  },
});

function RootRoute() {
  return (
    <>
      <Outlet />
    </>
  );
}
