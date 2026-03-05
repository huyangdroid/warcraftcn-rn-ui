import React from "react";
import { View, ViewProps } from "rn-primitives";

export interface WarcraftSkeletonProps extends ViewProps {}

export function WarcraftSkeleton({ className, ...props }: WarcraftSkeletonProps) {
  return (
    <View
      data-slot="skeleton"
      className={[
        "rounded-md bg-wcPanel/60 animate-pulse",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
