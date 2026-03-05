import React from "react";
import { Pressable, View, Text } from "rn-primitives";

export interface WarcraftCheckboxProps {
  label?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function WarcraftCheckbox({
  label,
  checked,
  onCheckedChange,
  className
}: WarcraftCheckboxProps) {
  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      className={[
        "flex-row items-center gap-x-2",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <View
        className={[
          "w-4 h-4 border rounded-[2px] bg-black/40",
          checked ? "border-wcAccent bg-wcAccent/20" : "border-wcBorderDark"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {checked ? <View className="flex-1 m-[2px] bg-wcAccent" /> : null}
      </View>
      {label ? (
        <Text className="text-wcText text-sm leading-none">{label}</Text>
      ) : null}
    </Pressable>
  );
}
