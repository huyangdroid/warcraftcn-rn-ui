import React from "react";
import { View, ViewProps } from "react-native";
import { tw } from "uniwind";

export interface WarcraftSeparatorProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
}

export function WarcraftSeparator({
  orientation = "horizontal",
  style,
  ...props
}: WarcraftSeparatorProps) {
  const base = tw("bg-wcBorder");
  const dimensional =
    orientation === "horizontal"
      ? tw("h-px w-full")
      : tw("w-px h-full");

  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="separator"
      // @ts-expect-error - non-standard prop for potential web interop
      data-orientation={orientation}
      style={[base, dimensional, style]}
      {...props}
    />
  );
}
