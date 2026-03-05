import React from "react";
import { UniwindProvider } from "uniwind";

export function WarcraftUniwindProvider({ children }: { children: React.ReactNode }) {
  return (
    <UniwindProvider configPath={require.resolve("../../uniwind.config")} mode="native">
      {children}
    </UniwindProvider>
  );
}
