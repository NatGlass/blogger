import { validateRequest } from "@/auth";
import Header from "@/components/global/header";
import SessionProvider from "@/contexts/SessionProvider";
import type React from "react";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();

  return (
    <SessionProvider value={session}>
      <Header />
      {children}
    </SessionProvider>
  );
}

export default MainLayout;
