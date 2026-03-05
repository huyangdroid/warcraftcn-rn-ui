import React from "react";
import { View, Text } from "rn-primitives";

export interface WarcraftTagProps {
  children?: React.ReactNode;
  className?: string;
}

export function WarcraftTag({ children, className }: WarcraftTagProps) {
  return (
    <View
      className={[
        "px-2 py-[2px] rounded-full bg-black/40 border border-wcBorderDark",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Text className="text-wcTextMuted text-[11px]">{children}</Text>
    </View>
  );
}
