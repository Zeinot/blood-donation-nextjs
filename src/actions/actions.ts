"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { postSchema } from "@/zod/Schemas";
import { revalidatePath } from "next/cache";

export async function createPost(data: unknown) {
  const session = await auth();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parseResult = postSchema.safeParse(data);

  if (parseResult.success) {
    const date = new Date(parseResult.data.date).toISOString();
    const post = await prisma.post.create({
      data: { ...parseResult.data, date, userId: session!.user!.id as string },
    });

    revalidatePath("/dashboard");
    return "success";
  }

  return parseResult.error?.issues;
}

export async function updatePost(data: unknown, id: string) {
  const session = await auth();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parseResult = postSchema.safeParse(data);

  if (parseResult.success) {
    const date = new Date(parseResult.data.date).toISOString();
    const post = await prisma.post.update({
      where: { id },
      data: { ...parseResult.data, date, userId: session!.user!.id as string },
    });

    revalidatePath("/dashboard");
    return "success";
  }

  return parseResult.error?.issues;
}

export async function deletePost(id: string) {
  const post = await prisma.post.delete({
    where: { id },
  });
  revalidatePath("/dashboard");
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({ include: { user: true } });
  const _posts = posts.map((post) => ({ ...post, date: `${post.date}` }));
  return _posts;
}

export async function getSinglePostWithUserEmail(postId: string) {
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  return post;
}
export type TgetSinglePostWithUserEmail = Awaited<
  ReturnType<typeof getSinglePostWithUserEmail>
>;

export async function deleteAction(id: string) {
  await deletePost(id);
}
