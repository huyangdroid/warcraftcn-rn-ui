import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WarcraftUniwindProvider } from "../src/uniwind/UniwindProvider";

export default function RootLayout() {
  return (
    <WarcraftUniwindProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#050609" }
        }}
      />
    </WarcraftUniwindProvider>
  );
}
