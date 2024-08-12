import { Button } from "primereact/button";
import BrowseTable from "./BrowseTable";
import Footer from "@/app/_HomePageComponents/Footer";
import Link from "next/link";
export default function page() {
  return (
    <div className="m-5 flex flex-col gap-3">
      <div className="surface-0 p-4 shadow-2 border-round">
        <div className="text-3xl font-medium text-900 mb-3">Browse Posts</div>
        <div className="font-medium text-500 mb-3">
          Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.
        </div>

        <BrowseTable />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
