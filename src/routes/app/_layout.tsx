import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createFileRoute, Link } from '@tanstack/react-router';
import logo from '/app-logo.svg';
import { GiExpense, GiMoneyStack } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { FaRegHospital } from 'react-icons/fa';
import { GiIsland } from 'react-icons/gi';
import { TbHierarchy } from 'react-icons/tb';
import MobileMenu from '../../components/MobileMenu';

export const Route = createFileRoute('/app/_layout')({
  component: LayoutComponent,
});

const queryClient = new QueryClient();

function LayoutComponent() {
  const appMenuRoutes = [
    { name: 'Staff List', href: '/app/staff', icon: <IoIosPeople /> },
    { name: 'Income Report', href: '/app/income', icon: <GiMoneyStack /> },
    { name: 'Expense Report', href: '/app/expense', icon: <GiExpense /> },
    { name: 'Annual Leave', href: '/app/annual-leave', icon: <GiIsland /> },
    {
      name: 'Sickness Leave',
      href: '/app/sickness-leave',
      icon: <FaRegHospital />,
    },
    {
      name: 'Company Hierarchy',
      href: '/app/hierarchy',
      icon: <TbHierarchy />,
    },
  ];

  const AppMenu = () => {
    return appMenuRoutes.map(
      (route: { name: string; href: string; icon: React.ReactNode }) => {
        return (
          <li className="text-neutral-200 " key={route.href}>
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

  return (
    <aside className="flex flex-col lg:flex-row lg:min-h-screen relative">
      <nav className="hidden bg-red-700 lg:flex flex-col pl-5 pr-20">
        <Link to="/">
          <img src={logo} alt="WorkWise Logo" className="w-24 pt-5 pb-10" />
        </Link>
        <ul className="flex flex-col gap-5">
          <AppMenu />
        </ul>
      </nav>
      <div className="bg-red-700 w-full flex items-center p-4 lg:hidden">
        <Link to="/">
          <img src={logo} alt="WorkWise Logo" className="w-16" />
        </Link>
        <MobileMenu routes={appMenuRoutes} app={true} />
      </div>
      <div className="w-full xl:px-16">
        <QueryClientProvider client={queryClient}>
          <div className="py-5 flex flex-col w-full mt-12">
            <Outlet />
          </div>
        </QueryClientProvider>
      </div>
      <div className="hidden lg:block border-red-700 border-r-4"></div>
    </aside>
  );
}
