"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
