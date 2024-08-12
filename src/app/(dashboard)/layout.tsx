import { auth, signIn } from "@/auth";
import { SignIn } from "@/components/auth/server/signin-button-server";
import DashboardShell from "./DashboardShell";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    await signIn();
  } else {
    return <DashboardShell>{children}</DashboardShell>;
  }
}
