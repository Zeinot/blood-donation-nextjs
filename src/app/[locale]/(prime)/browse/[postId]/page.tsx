import prisma from "@/db";
import PostCard from "./PostCard";
import { getSinglePostWithUserEmail } from "@/actions/actions";
import { getLocale } from "next-intl/server";
export default async function page({ params }: { params: { postId: string } }) {
  const post = await getSinglePostWithUserEmail(params.postId);
  const locale = await getLocale();
  return (
    <div className="flex justify-center">
      <PostCard post={post} locale={locale}/>
    </div>
  );
}
