/* This Navbar requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { User, Users } from "../utils/eventTypes";

type NavbarProps = {
  currentUser?: User;
  users: Users;
  userIds: readonly string[];
  onClick: (userId: string) => void;
};

export default function Navbar({
  currentUser,
  users,
  userIds,
  onClick,
}: NavbarProps) {
  return (
    <Disclosure as="nav" className="bg-white shadow">
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
                  <a
                    href="#"
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Calendar
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Team
                  </a>
                </div>
              </div>
              <div className="sm:ml-6">
                <Menu as="div" className="ml-3 relative mt-4">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      {currentUser && (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={currentUser.image}
                          alt=""
                        />
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
                      {userIds.map((userId) => {
                        const user = users[userId];
                        if (!user) {
                          return null;
                        }
                        return (
                          <Menu.Item key={user.id}>
                            {({ active }) => (
                              <button
                                onClick={() => onClick(user.id)}
                                className={clsx(
                                  currentUser?.id === user.id
                                    ? "bg-gray-100"
                                    : "",
                                  "flex px-4 py-2 text-sm text-gray-700 w-full text-left"
                                )}
                              >
                                <img
                                  src={user.image}
                                  className="w-5 h-5 rounded-full mr-2"
                                />
                                {user.name}
                              </button>
                            )}
                          </Menu.Item>
                        );
                      })}
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item> */}
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
