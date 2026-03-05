import React from "react";
import { Pressable, Text } from "rn-primitives";

export interface WarcraftButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export function WarcraftButton({ children, className, disabled, onPress }: WarcraftButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`px-4 py-2 rounded-sm border border-wcBorderDark bg-black/40 active:bg-black/60 ${
        disabled ? "opacity-50" : ""
      } ${className ?? ""}`}
    >
      <Text className="text-wcAccent text-sm tracking-wide uppercase">{children}</Text>
    </Pressable>
  );
}
