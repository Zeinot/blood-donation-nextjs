import prisma from "@/db";
import UpdatePostForm from "./UpdatePostForm";

export default async function page({ params }: { params: { postId: string } }) {
  const post = await prisma.post.findFirst({ where: { id: params.postId } });
  if (post)
    return (
      <div>
        <UpdatePostForm post={post} />
      </div>
    );
}
