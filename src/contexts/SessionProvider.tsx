"use client";

import type { Session, User } from "lucia";
import { type PropsWithChildren, createContext, useContext } from "react";

interface SessionContextProps {
  user: User | null;
  session: Session | null;
}

const SessionContext = createContext<SessionContextProps | null>(null);

function SessionProvider({
  children,
  value,
}: PropsWithChildren<{ value: SessionContextProps }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export default SessionProvider;

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}