import React from "react";
import { Pressable, View } from "rn-primitives";

export interface WarcraftToggleProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function WarcraftToggle({ checked, onCheckedChange, className }: WarcraftToggleProps) {
  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      className={[
        "w-10 h-5 rounded-full border bg-black/50 flex-row items-center px-[2px]",
        checked ? "border-wcAccent bg-wcAccent/30" : "border-wcBorderDark",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <View
        className={[
          "w-4 h-4 rounded-full bg-wcPanel shadow-md",
          checked ? "ml-auto bg-wcAccent" : "mr-auto bg-wcPanel"
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </Pressable>
  );
}
