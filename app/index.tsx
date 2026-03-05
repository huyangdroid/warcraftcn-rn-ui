import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-wcBackground">
      <ImageBackground
        source={require("../assets/images/wc-background.png")}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 px-4 py-6">
          <View className="border-2 border-wcBorder bg-wcPanel/80 rounded-md shadow-lg">
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
                <View className="flex-1 border border-wcBorderDark bg-black/30 px-3 py-2 rounded-sm">
                  <Text className="text-wcAccent text-xs uppercase tracking-wide">
                    Components
                  </Text>
                  <Text className="text-wcText text-sm mt-1">
                    Buttons, frames, panels, tabs, overlays and more.
                  </Text>
                </View>
                <View className="flex-1 border border-wcBorderDark bg-black/30 px-3 py-2 rounded-sm">
                  <Text className="text-wcAccent text-xs uppercase tracking-wide">
                    Platforms
                  </Text>
                  <Text className="text-wcText text-sm mt-1">
                    iOS, Android, and web via React Native Web.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
