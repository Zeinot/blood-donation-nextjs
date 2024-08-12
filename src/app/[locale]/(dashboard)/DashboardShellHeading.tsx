"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function DashboardShellHeading() {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  let heading: string;
  if (pathname.includes("/dashboard/create") ) heading = t("Create Post") ;
  else if (pathname.includes("/dashboard/edit")) heading = t("Edit Post");
  else heading = t("headingDashboard");
  return <div>{heading}</div>;
}
