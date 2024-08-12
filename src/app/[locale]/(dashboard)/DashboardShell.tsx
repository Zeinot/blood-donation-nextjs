import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { headers } from "next/headers";
import { classNames } from "@/utils/utils";
import NavLink from "./NavLink";
import MobileNavLink from "./NavLinkMobile";
import DashboardShellHeading from "./DashboardShellHeading";
import { getLocale } from "next-intl/server";
export default async function DashboardShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let dashboardName: string;
  let createName: string;

  const locale = await getLocale();

  if (locale === "fr") {
    dashboardName = "Tableau de bord";
    createName = "Créer";
  } else if (locale === "ar") {
    dashboardName = "لوحة القيادة";
    createName = "إنشاء";
  } else {
    dashboardName = "Dashboard";
    createName = "Dashboard";
  }
  let navigation = [
    { name: dashboardName, href: `/${locale}/dashboard` },
    { name: createName, href: `/${locale}/dashboard/create` },
  ];
 

  return (
    <div className="h-full bg-gray-100">
      <div className="h-full">
        <div className="min-h-full">
          <div className="bg-gray-800 pb-32">
            <Disclosure as="nav" className="bg-gray-800">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link href="/">
                          {" "}
                          <img
                            alt="Blood Donation"
                            src="/logo.svg"
                            className="h-8 w-8"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <NavLink key={item.name} item={item}></NavLink>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon
                          aria-hidden="true"
                          className="block h-6 w-6 group-data-[open]:hidden"
                        />
                        <XMarkIcon
                          aria-hidden="true"
                          className="hidden h-6 w-6 group-data-[open]:block"
                        />
                      </DisclosureButton>
                    </div>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="border-b border-gray-700 md:hidden">
                <div className="space-y-1 px-2 py-3 sm:px-3">
                  {navigation.map((item) => (
                    <MobileNavLink key={item.name} item={item}></MobileNavLink>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
            <header className="py-10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  <DashboardShellHeading />
                </h1>
              </div>
            </header>
          </div>

          <main className="-mt-32">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
