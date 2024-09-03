"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateEmailVerificationCode } from "../lib/generateEmailVerificationCode";
import { sendVerificationCode } from "../lib/sendVerificationCode";
import { type RegisterUserSchemaType, registerUserSchema } from "../schema";

export async function registerAction(
  credentials: RegisterUserSchemaType
): Promise<{ error: string }> {
  try {
    const { name, username, email, password } =
      registerUserSchema.parse(credentials);

    // https://thecopenhagenbook.com/password-authentication#password-storage
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return {
        error: "Username already in use",
      };
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return {
        error: "Email already in use",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        name,
        username,
        email,
        passwordHash,
        emailVerified: null,
      },
    });

    const verificationCode = await generateEmailVerificationCode(userId, email);

    await sendVerificationCode(email, verificationCode);

    const session = await lucia.createSession(userId, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/auth/verify-email");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
}
