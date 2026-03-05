import React from "react";
import { View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WarcraftFrame } from "../src/components/warcraft/frame";
import { WarcraftPanel } from "../src/components/warcraft/panel";
import { WarcraftButton } from "../src/components/warcraft/button";
import { Text } from "rn-primitives";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-wcBackground">
      <ImageBackground
        source={require("../assets/images/wc-background.png")}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 px-4 py-6">
          <WarcraftFrame>
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-wcBorderDark bg-black/40">
              <Text className="text-wcAccent font-wc text-lg tracking-wide">
                WarcraftCN UI · React Native
              </Text>
              <Text className="text-wcTextMuted text-xs">v0.0.1 · Prototype</Text>
            </View>

            <View className="px-4 py-4 gap-y-4">
              <Text className="text-wcText text-base leading-snug">
                A collection of accessible, retro-inspired UI components for React Native,
                drawing from classic Warcraft III RTS aesthetics.
              </Text>

              <View className="mt-2 flex-row gap-x-3">
                <WarcraftPanel title="Components" className="flex-1">
                  <Text className="text-wcText text-sm mt-1">
                    Buttons, frames, panels, tabs, overlays and more.
                  </Text>
                </WarcraftPanel>

                <WarcraftPanel title="Platforms" className="flex-1">
                  <Text className="text-wcText text-sm mt-1">
                    iOS, Android, and web via React Native Web.
                  </Text>
                </WarcraftPanel>
              </View>

              <View className="mt-4 flex-row gap-x-3">
                <WarcraftButton>Open components</WarcraftButton>
                <WarcraftButton className="bg-black/20 border-wcBorder">
                  View on GitHub
                </WarcraftButton>
              </View>
            </View>
          </WarcraftFrame>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
