import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth } from "./auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/solid";
import UserSearch from "./search/UserSearch";
import SearchResults from "./search/SearchResults";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");

  const logoutUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
  };

  return (
    <>
      <Disclosure as="nav" className="bg-cyan-800 z-20 border-b border-gray-300 relative">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4">
              <div className="relative flex items-center justify-between h-14">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <Link href="/">
                    <a className="focus:ring-1 focus:ring-white focus:outline-none p-1 rounded-sm">
                      <div className="flex-shrink-0 flex items-center">
                        <Image src="/favicon.ico" width={32} height={32} layout="fixed" />
                        <h1 className="ml-2 text-3xl text-gray-50 whitespace-nowrap font-black uppercase">
                          Eclinic HMS
                        </h1>
                      </div>
                    </a>
                  </Link>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <UserSearch name={name} setName={setName} />

                  <button className="p-2 rounded-full text-gray-50 hover:text-gray-200 menu-focus">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm rounded-full menu-focus">
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full bg-white">
                              <UserCircleIcon />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/users/profile">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/settings">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Settings
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/register">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      !user.isAdmin
                                        ? "opacity-40 bg-gray-50 pointer-events-none"
                                        : "pointer-events-auto",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Register user
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={logoutUser}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      {user && name && <SearchResults name={name} setName={setName} />}
    </>
  );
}
