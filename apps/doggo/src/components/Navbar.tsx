/* This Navbar requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import GithubIcon from './GithubIcon';

type NavbarProps = {};

function getNavStyles(route: string, match: string) {
  return clsx(
    route === match
      ? 'border-green-500 text-gray-900'
      : 'border-transparent text-grey-500',
    'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
    'hover:border-gray-300 hover:text-gray-700',
  );
}

export default function Navbar({}: NavbarProps) {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <Disclosure as="nav" className={clsx('bg-white shadow')}>
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-3xl">🐶</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href="/">
                    <a className={getNavStyles(router.asPath, '/')}>Dog log</a>
                  </Link>
                  <Link href="/calendar">
                    <a className={getNavStyles(router.asPath, '/calendar')}>
                      Calendar
                    </a>
                  </Link>
                  {status === 'authenticated' && (
                    <Link href="/profile">
                      <a className={getNavStyles(router.asPath, '/profile')}>
                        Profile
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              <div className="sm:ml-6">
                <Menu as="div" className="ml-3 relative mt-4">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      {data?.user?.image ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={data.user.image}
                          alt=""
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {data?.user && (
                        <Menu.Item disabled>
                          <div className="px-4 py-2 text-sm text-gray-700 w-full text-left flex border-b">
                            <div>
                              <img
                                src={data?.user?.image}
                                className="w-5 h-5 rounded-full mr-2 mt-1"
                              />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Signed in as
                              </p>
                              <a>{data.user?.name}</a>
                            </div>
                          </div>
                        </Menu.Item>
                      )}
                      {status === 'authenticated' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/profile">
                              <a
                                className={clsx(
                                  active ? 'bg-gray-100' : 'hover:bg-gray-100',
                                  'px-4 py-2 text-sm text-gray-700 w-full text-left flex items-center',
                                )}
                              >
                                Profile
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              if (status === 'authenticated') {
                                signOut({
                                  callbackUrl: '/',
                                });
                              } else {
                                signIn('github');
                              }
                            }}
                            className={clsx(
                              active ? 'bg-gray-100' : '',
                              'px-4 py-2 text-sm text-gray-700 w-full text-left flex items-center',
                            )}
                          >
                            {status !== 'authenticated' && (
                              <GithubIcon className="w-4 h-4 text-gray-500 mr-1" />
                            )}
                            {status === 'authenticated'
                              ? 'Sign out'
                              : 'Sign in with Github'}
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
