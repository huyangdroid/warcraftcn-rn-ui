import React from "react";
import { ScrollView, ScrollViewProps, View } from "react-native";

export interface WarcraftScrollAreaProps extends ScrollViewProps {
  /**
   * Optional fixed height; otherwise rely on parent layout.
   */
  height?: number;
}

export function WarcraftScrollArea({ height, style, children, ...props }: WarcraftScrollAreaProps) {
  return (
    <View
      data-slot="scroll-area"
      style={[{ position: "relative", height }, style]}
    >
      <ScrollView
        data-slot="scroll-area-viewport"
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingRight: 8 }}
        {...props}
      >
        {children}
      </ScrollView>
    </View>
  );
}
