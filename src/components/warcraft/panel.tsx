import React from "react";
import { View, Text } from "rn-primitives";

export interface WarcraftPanelProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function WarcraftPanel({ title, children, className }: WarcraftPanelProps) {
  return (
    <View className={`border border-wcBorderDark bg-black/30 rounded-sm ${className ?? ""}`}>
      {title ? (
        <View className="px-3 py-2 border-b border-wcBorderDark bg-black/40">
          <Text className="text-wcAccent text-xs uppercase tracking-wide">{title}</Text>
        </View>
      ) : null}
      <View className="px-3 py-2">{children}</View>
    </View>
  );
}
