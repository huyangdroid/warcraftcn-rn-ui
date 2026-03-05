import React from "react";
import { View, Text } from "rn-primitives";

type WarcraftBadgeVariant = "info" | "success" | "warning";

export interface WarcraftBadgeProps {
  children?: React.ReactNode;
  variant?: WarcraftBadgeVariant;
  className?: string;
}

const variantClasses: Record<WarcraftBadgeVariant, string> = {
  info: "bg-blue-900/60 border-blue-400 text-blue-100",
  success: "bg-emerald-900/60 border-emerald-400 text-emerald-100",
  warning: "bg-amber-900/60 border-amber-400 text-amber-100"
};

export function WarcraftBadge({ children, variant = "info", className }: WarcraftBadgeProps) {
  return (
    <View
      className={[
        "px-2 py-[2px] rounded-sm border text-[10px] uppercase tracking-wide",
        variantClasses[variant],
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Text>{children}</Text>
    </View>
  );
}
