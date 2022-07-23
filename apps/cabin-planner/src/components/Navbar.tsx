import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type NavbarProps = {
  cta?: { href: string; children: React.ReactNode } | null;
  activeRoute?: string;
};

const defaultCTA = { href: '/book', children: 'Ny booking' };

const Navbar = ({ cta = defaultCTA, activeRoute }: NavbarProps) => {
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
        <Link href="/">
          <a
            className={clsx(
              'text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium ml-4 md:ml-0',
              activeRoute === '/' && 'border-indigo-500 border-b-2',
            )}
          >
            Dashboard
          </a>
        </Link>
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
