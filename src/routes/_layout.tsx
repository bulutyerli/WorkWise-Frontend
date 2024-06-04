import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createFileRoute, Link } from '@tanstack/react-router';
import logo from '/app-logo.svg';
import { GiExpense, GiMoneyStack, GiIsland } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { FaChartPie } from 'react-icons/fa';
import { TbHierarchy } from 'react-icons/tb';
import { VscRequestChanges } from 'react-icons/vsc';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import MobileMenu from '../components/MobileMenu';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

const queryClient = new QueryClient();

function LayoutComponent() {
  const auth = useAuth();
  const [modal, setModal] = useState<boolean>(false);

  const appMenuRoutes = [
    { name: 'Staff List', href: '/staff', icon: <IoIosPeople /> },
    {
      name: 'Company Hierarchy',
      href: '/hierarchy',
      icon: <TbHierarchy />,
    },
    {
      name: 'Finance Charts',
      href: '/finance-charts',
      icon: <FaChartPie />,
    },
    { name: 'Income Report', href: '/income', icon: <GiMoneyStack /> },
    { name: 'Expense Report', href: '/expense', icon: <GiExpense /> },
    { name: 'Annual Leave', href: '/annual-leave', icon: <GiIsland /> },
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

  const handleMobile = () => {
    setModal(true);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="hidden lg:block sticky top-0 h-screen bg-red-700 px-5 py-2">
        <Link to="/">
          <img
            src={logo}
            alt="Nuvola Airlines Logo"
            className="w-24 pt-5 pb-10"
          />
        </Link>
        <ul className="flex flex-col gap-5 text-nowrap">
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
              <Link to="/auth/sign-in">Sign In</Link>
            </li>
          ) : (
            <li className="flex items-center gap-5 text-indigo-200">
              <div className="text-3xl">
                <CiLogout />
              </div>
              <button onClick={() => setModal(true)}>Sign Out</button>
            </li>
          )}
          {auth.isAuthenticated && <AppMenu />}

          {auth.user?.isManager && (
            <li className="text-neutral-200 ">
              <Link
                to="/staff/staff-requests"
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
        </ul>
      </aside>

      <div className="bg-red-700 w-full flex items-center p-4 lg:hidden">
        <Link to="/">
          <img src={logo} alt="WorkWise Logo" className="w-16" />
        </Link>
        <MobileMenu routes={appMenuRoutes} app={true} isModal={handleMobile} />
      </div>
      <div className="w-full xl:px-2 min-h-screen">
        <QueryClientProvider client={queryClient}>
          <div className="h-full min-h-screen py-5 flex flex-col w-full  justify-between gap-9">
            <Outlet />
            <Footer />
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
    </div>
  );
}
