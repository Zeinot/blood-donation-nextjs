import prisma from "@/db";
import PostCard from "./PostCard";
import { getSinglePostWithUserEmail } from "@/actions/actions";

export default async function page({ params }: { params: { postId: string } }) {
  const post = await getSinglePostWithUserEmail(params.postId);
  return (
    <div className="flex justify-center">
      <PostCard post={post} />
    </div>
  );
}
