"use server";

import { validateRequest } from "@/auth";
import { type CreatePostSchemaType, createPostSchema } from "../schema";
import prisma from "@/lib/prisma";

export async function CreatePostAction(data: CreatePostSchemaType) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { title, content } = createPostSchema.parse({
    title: data.title,
    content: data.content,
  });

  await prisma.post.create({
    data: {
        title,
        content,
        userId: user.id
    }
  })
}
