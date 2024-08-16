import prisma from "@/db";
import UpdatePostForm from "./UpdatePostForm";
import { getLocale } from "next-intl/server";

export default async function page({ params }: { params: { postId: string } }) {
  const post = await prisma.post.findFirst({ where: { id: params.postId } });
  const locale = await getLocale();
  if (post)
    return (
      <div>
        <UpdatePostForm locale={locale} post={post} />
      </div>
    );
}
