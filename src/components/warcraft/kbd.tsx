import React from "react";
import { Text, View, ViewProps, TextProps } from "rn-primitives";

export interface WarcraftKbdProps extends TextProps {}

export function WarcraftKbd({ children, className, ...props }: WarcraftKbdProps) {
  return (
    <Text
      data-slot="kbd"
      className={[
        "inline-flex h-5 min-w-5 px-1 items-center justify-center gap-1 rounded-sm bg-black/40 text-xs font-medium text-wcTextMuted",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Text>
  );
}

export interface WarcraftKbdGroupProps extends ViewProps {}

export function WarcraftKbdGroup({ children, className, ...props }: WarcraftKbdGroupProps) {
  return (
    <View
      data-slot="kbd-group"
      className={["inline-flex flex-row items-center gap-1", className ?? ""].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </View>
  );
}
