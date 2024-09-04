"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionProvider";
import { logoutAction } from "@/features/auth/actions/logout-action";
import Link from "next/link";

function HomePage() {
  const { user, session } = useSession();

  if (!session || !user) {
    return (
      <div>
        Not signed in
        <div>
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isVerified = user.emailVerified !== null;

  return (
    <div>
      <p> Signed in as {user.email}</p>
      <p>{isVerified ? "Email verified" : "Email not verified"}</p>
      <form action={logoutAction}>
        <Button>Logout</Button>
      </form>
    </div>
  );
}

export default HomePage;
