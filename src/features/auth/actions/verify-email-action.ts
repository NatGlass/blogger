"use server";

import { lucia, validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyVerificationCode } from "../lib/verifyVerificationCode";
import {
  type EmailVerificationSchemaType,
  emailVerificationSchema,
} from "../schema";

export async function verifyEmailAction(
  credentials: EmailVerificationSchemaType
): Promise<{ error: string }> {
  const { code } = emailVerificationSchema.parse(credentials);
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Invalid session",
    };
  }

  const { user } = await lucia.validateSession(session.id);

  if (!user) {
    return {
      error: "Invalid user",
    };
  }

  const validCode = await verifyVerificationCode(user, code);

  if (!validCode) {
    return {
      error: "Invalid code",
    };
  }

  await lucia.invalidateUserSessions(user.id);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  const newSession = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(newSession.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}
