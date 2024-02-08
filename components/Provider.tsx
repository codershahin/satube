"use client";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export default Provider;
