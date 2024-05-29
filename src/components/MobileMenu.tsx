import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { GiExitDoor } from 'react-icons/gi';

export default function MobileMenu({
  routes,
  app,
}: {
  routes: { name: string; href: string; icon?: React.ReactNode }[];
  app?: boolean;
}) {
  const [menu, setMenu] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileRef]);
  return (
    <>
      <RiMenu3Line
        size={24}
        onClick={() => setMenu(true)}
        className={`${app ? 'lg:hidden text-white' : 'sm:hidden'} absolute right-0 m-5`}
      />
      <Transition
        as={Fragment}
        show={menu}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <nav
          ref={mobileRef}
          className={`absolute top-0 right-0 bg-red-700 h-screen z-20 ${app ? 'w-fit' : 'w-[80%]'}`}
        >
          <ul className="flex flex-col items-end pt-10 pr-5 gap-10 text-gray-300 px-10">
            <RiCloseLine size={24} onClick={() => setMenu(false)} />
            {routes.map((route) => (
              <li onClick={() => setMenu(false)} key={route.name}>
                <Link
                  to={route.href}
                  activeProps={{
                    style: {
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {route.name}
                </Link>
              </li>
            ))}
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
      </Transition>
    </>
  );
}
