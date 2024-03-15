/* eslint-disable @next/next/no-img-element */
'use client';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { INavigationItem } from '../../interfaces/main';
import { Disclosure } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { status } = useSession();

  let FavoritePage: INavigationItem = {
    name: '',
    href: '/',
    current: false,
    extraData: undefined,
    active: false
  };

  if (status === 'authenticated') {
    FavoritePage = {
      name: 'Favorite',
      href: '/favorite',
      current: false,
      extraData: undefined,
      active: false
    };
  }
  const navigation: INavigationItem[] = [
    { name: 'Books', href: '/', current: false, extraData: undefined, active: false },
    FavoritePage
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div data-testid="book-menus" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div
                data-testid="swapi-displayer"
                className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
              >
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white capitalize',
                          'rounded-md px-3 py-2 text-sm font-medium capitalize'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {status == 'authenticated' ? (
                  <Link className="text-red-600 font-bold" href="/api/auth/signout?callbackUrl=/">
                    Logout
                  </Link>
                ) : (
                  <Link className="text-blue-600 font-bold" href="/api/auth/signin">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
