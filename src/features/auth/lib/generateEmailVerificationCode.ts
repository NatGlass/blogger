import prisma from "@/lib/prisma";
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  await prisma.emailVerificationCode.deleteMany({
    where: { userId },
  });

  const code = generateRandomString(8, alphabet("0-9"));

  await prisma.emailVerificationCode.create({
    data: {
      userId: userId,
      email,
      code,
      expiresAt: createDate(new TimeSpan(15, "m")),
    },
  });

  return code;
}
