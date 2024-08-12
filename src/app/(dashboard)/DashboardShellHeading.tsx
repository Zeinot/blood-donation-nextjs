"use client";

import { usePathname } from "next/navigation";

export default function DashboardShellHeading() {
  const pathname = usePathname();
  let heading: string;
  if (pathname === "/dashboard/create") heading = "Create Post";
  else if (pathname.includes("/dashboard/edit")) heading = "Edit Post";
  else heading = "Dashboard";
  return <div>{heading}</div>;
}
