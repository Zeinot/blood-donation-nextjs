import { auth } from "@/auth";
import prisma from "@/db";
import PostsTable from "./PostsTable";
export const dynamic = "force-dynamic";

export default async function page() {
  const session = await auth();

  const posts = await prisma.post.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <>
      <PostsTable posts={posts} />
    </>
  );
}
