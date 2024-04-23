import workwiseLogo from '/workwise.svg';
import { Link } from '@tanstack/react-router';
import MobileMenu from './MobileMenu';

export default function Header() {
  const routes = [
    {
      name: 'About Us',
      href: '/about',
    },
    {
      name: 'App Demo',
      href: '/app',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <header className="flex justify-between items-center p-4">
      <Link to="/">
        <img src={workwiseLogo} alt="WorkWise Logo" className="w-20 sm:w-32" />
      </Link>
      <nav>
        <ul className="gap-10 hidden sm:flex">
          {routes.map((route) => (
            <li key={route.name}>
              <Link to={route.href}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu routes={routes} />
    </header>
  );
}
