"use client";

import { useSession } from "@/contexts/SessionProvider";
import UserButton from "@/features/auth/components/user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchField from "./search-field";

function Header() {
  const { user } = useSession();

  return (
    <header>
      <div className="container py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-semibold">Blogger</span>
        </Link>

        <SearchField />
        <UserButton />
        {!user && (
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
