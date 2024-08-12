import { Button } from "primereact/button";
import BrowseTable from "./BrowseTable";
import Footer from "@/app/_HomePageComponents/Footer";
import Link from "next/link";

import { getLocale } from "next-intl/server";
import DivBrowse from "../DivBrowse";
export default async function page() {
  const locale = await getLocale();
  return (
    <div className="m-5 flex flex-col gap-3">
      <div className="surface-0 p-4 shadow-2 border-round">
        <DivBrowse />
        {/* <div className="font-medium text-500 mb-3">
          Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.
        </div> */}

        <BrowseTable locale={locale} />
      </div>
      <div className="mt-10">
        <Footer locale={locale} />
      </div>
    </div>
  );
}
