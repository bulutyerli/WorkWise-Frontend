import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const location = useRouterState().location.pathname;
  const isAppRoute = location.startsWith('/app');

  return (
    <>
      {!isAppRoute && <Header />}
      <Outlet />
      {!isAppRoute && <Footer />}
    </>
  );
}
