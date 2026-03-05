import React from "react";
import { View } from "rn-primitives";

export interface WarcraftFrameProps {
  children?: React.ReactNode;
  className?: string;
}

export function WarcraftFrame({ children, className }: WarcraftFrameProps) {
  // Outer Warcraft-style frame with gold border and dark background
  return (
    <View className={`border-2 border-wcBorder bg-wcPanel/80 rounded-md shadow-lg ${className ?? ""}`}>
      {children}
    </View>
  );
}
