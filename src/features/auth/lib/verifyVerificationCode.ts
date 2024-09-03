import prisma from "@/lib/prisma";
import type { User } from "lucia";
import { isWithinExpirationDate } from "oslo";

export async function verifyVerificationCode(
  user: User,
  code: string
): Promise<boolean> {
  const databaseCode = await prisma.emailVerificationCode.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!databaseCode || databaseCode.code !== code) {
    return false;
  }

  await prisma.emailVerificationCode.delete({
    where: {
      id: databaseCode.id,
    },
  });

  if (!isWithinExpirationDate(databaseCode.expiresAt)) {
    return false;
  }

  if (databaseCode.email !== user.email) {
    return false;
  }

  return true;
}
