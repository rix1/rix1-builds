import { ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Breadcrumb = {
  name: string;
  href: string;
  current: boolean;
};

type NavbarProps = {
  cta?: { href: string; children: React.ReactNode } | null;
  activeRoute?: string;
  breadcrumbs?: Breadcrumb[];
};

const defaultCTA = { href: '/book', children: 'Ny booking' };

const Navbar = ({
  cta = defaultCTA,
  activeRoute,
  breadcrumbs = [],
}: NavbarProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm lg:static lg:overflow-y-visible mb-6">
      <div className="relative flex justify-start lg:gap-8">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center py-4">
            <a href="/">
              <span className="text-4xl">🏡</span>
            </a>
          </div>
        </div>

        <nav className="flex ml-5" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <Link href="/">
                <a
                  className={clsx(
                    'text-sm font-medium',
                    activeRoute === '/'
                      ? 'text-gray-500 hover:text-gray-700'
                      : 'text-gray-400 hover:text-gray-500',
                  )}
                >
                  Oversikt
                </a>
              </Link>
            </li>
            {breadcrumbs.map((page) => (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <a
                    href={page.href}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {page.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        {cta && (
          <Link href={cta.href}>
            <a className="ml-auto self-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {cta.children}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
