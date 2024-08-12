import { auth } from "@/auth";
import prisma from "@/db";
import PostsTable from "./PostsTable";
import { getLocale } from "next-intl/server";
export const dynamic = "force-dynamic";

export default async function page() {
  const session = await auth();
  const locale = await getLocale();

  const posts = await prisma.post.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <>
      <PostsTable locale={locale} posts={posts} />
    </>
  );
}
