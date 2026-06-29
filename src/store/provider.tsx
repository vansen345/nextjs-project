"use client";

import { store } from "@/store";
import { StyleProvider } from "@ant-design/cssinjs";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={60} refetchOnWindowFocus={true}>
      <Provider store={store}>
        <StyleProvider hashPriority="high">
          {children}
        </StyleProvider>
      </Provider>
    </SessionProvider>
  );
}