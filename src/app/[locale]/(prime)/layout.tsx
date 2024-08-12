import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { StyleClass } from "primereact/styleclass";
import "./prime.css";
export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
