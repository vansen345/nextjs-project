"use client";

import { store } from "@/store";
import { StyleProvider } from "@ant-design/cssinjs";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        {children}
      </StyleProvider>
    </Provider>
  );
}