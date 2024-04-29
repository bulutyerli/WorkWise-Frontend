import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
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
      {!isAppRoute && <Footer />}
    </>
  );
}
