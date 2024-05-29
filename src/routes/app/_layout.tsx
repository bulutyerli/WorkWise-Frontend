import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createFileRoute, Link } from '@tanstack/react-router';
import logo from '/app-logo.svg';
import { GiExpense, GiMoneyStack, GiIsland } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { FaChartPie } from 'react-icons/fa';
import { TbHierarchy } from 'react-icons/tb';
import { VscRequestChanges } from 'react-icons/vsc';
import MobileMenu from '../../components/MobileMenu';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { GiExitDoor } from 'react-icons/gi';
import { useAuth } from '../../providers/AuthProvider';
import { useState } from 'react';
import Modal from '../../components/Modal';

export const Route = createFileRoute('/app/_layout')({
  component: LayoutComponent,
});

const queryClient = new QueryClient();

function LayoutComponent() {
  const auth = useAuth();
  const [modal, setModal] = useState<boolean>(false);

  const appMenuRoutes = [
    { name: 'Staff List', href: '/app/staff', icon: <IoIosPeople /> },
    {
      name: 'Company Hierarchy',
      href: '/app/hierarchy',
      icon: <TbHierarchy />,
    },
    {
      name: 'Finance Charts',
      href: '/app/finance-charts',
      icon: <FaChartPie />,
    },
    { name: 'Income Report', href: '/app/income', icon: <GiMoneyStack /> },
    { name: 'Expense Report', href: '/app/expense', icon: <GiExpense /> },
    { name: 'Annual Leave', href: '/app/annual-leave', icon: <GiIsland /> },
  ];

  const AppMenu = () => {
    return appMenuRoutes.map(
      (route: { name: string; href: string; icon: React.ReactNode }) => {
        return (
          <li className="text-neutral-200 text-nowrap" key={route.href}>
            <Link
              to={route.href}
              className="flex items-center gap-5"
              activeProps={{
                style: {
                  textDecoration: 'underline',
                },
              }}
            >
              <div className="text-3xl">{route.icon}</div>
              <span>{route.name}</span>
            </Link>
          </li>
        );
      }
    );
  };

  const handleSignOut = () => {
    auth.logout();
    setModal(false);
  };

  return (
    <aside className="flex flex-col lg:flex-row lg:min-h-screen relative">
      <nav className="hidden bg-red-700 lg:flex flex-col pl-5 pr-20">
        <Link to="/app">
          <img
            src={logo}
            alt="Nuvola Airlines Logo"
            className="w-24 pt-5 pb-10"
          />
        </Link>
        <ul className="flex flex-col gap-5">
          {auth.isAuthenticated && (
            <span className="text-indigo-100">
              Welcome {auth?.user?.fullname}
            </span>
          )}
          {!auth.isAuthenticated ? (
            <li className="flex items-center gap-5 text-indigo-200">
              <div className="text-3xl">
                <CiLogin />
              </div>
              <Link to="/app/auth/sign-in">Sign In</Link>
            </li>
          ) : (
            <li className="flex items-center gap-5 text-indigo-200">
              <div className="text-3xl">
                <CiLogout />
              </div>
              <button onClick={() => setModal(true)}>Sign Out</button>
            </li>
          )}
          <AppMenu />

          {auth.user?.isManager && (
            <li className="text-neutral-200 ">
              <Link
                to="/app/staff/staff-requests"
                className="flex items-center gap-5"
                activeProps={{
                  style: {
                    textDecoration: 'underline',
                  },
                }}
              >
                <div className="text-3xl">
                  <VscRequestChanges />
                </div>
                <span>Staff Requests</span>
              </Link>
            </li>
          )}
          <li>
            <Link to="/" className="flex items-center gap-5 text-indigo-200">
              <div className="text-3xl">
                <GiExitDoor />
              </div>
              <span>Exit App</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="bg-red-700 w-full flex items-center p-4 lg:hidden">
        <Link to="/app">
          <img src={logo} alt="WorkWise Logo" className="w-16" />
        </Link>
        <MobileMenu routes={appMenuRoutes} app={true} />
      </div>
      <div className="w-full xl:px-2">
        <QueryClientProvider client={queryClient}>
          <div className="h-full py-5  flex flex-col w-full">
            <Outlet />
          </div>
        </QueryClientProvider>
      </div>
      <div className="hidden lg:block border-red-700 border-r-4"></div>
      {modal && (
        <Modal
          isOpen={modal}
          onClick={handleSignOut}
          onClose={() => setModal(false)}
          title="Sign Out"
          description="Are you sure you want to sign out?"
          buttonText="Yes"
        />
      )}
    </aside>
  );
}
