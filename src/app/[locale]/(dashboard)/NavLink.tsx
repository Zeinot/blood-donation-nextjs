"use client";

import { classNames } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props: {
  item: {
    name: string;
    href: string;
    current?: boolean;
  };
}) {
  const pathname = usePathname();
  const { item } = props;

  if (pathname === item.href) item.current = true;
  else item.current = false;
  return (
    <Link
      href={props.item.href}
      aria-current={props.item.current ? "page" : undefined}
      className={classNames(
        props.item.current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "rounded-md px-3 py-2 text-sm font-medium",
      )}
    >
      {props.item.name}
    </Link>
  );
}
