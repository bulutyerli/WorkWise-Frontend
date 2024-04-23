import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Route = createRootRoute({
  component: RootRoute,
});

function RootRoute() {
  const location = useRouterState().location.pathname;
  const isAppRoute = location.startsWith('/app');

  return (
    <>
      {!isAppRoute && <Header />}
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      {!isAppRoute && <Footer />}
    </>
  );
}
