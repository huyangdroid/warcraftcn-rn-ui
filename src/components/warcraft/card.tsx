import React from "react";
import { View, ViewProps } from "react-native";
import { tw } from "uniwind";

export type WarcraftCardSize = "default" | "sm";

export interface WarcraftCardProps extends ViewProps {
  size?: WarcraftCardSize;
}

export function WarcraftCard({ size = "default", style, ...props }: WarcraftCardProps) {
  return (
    <View
      // data-slot equivalent for styling hooks if needed later
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card"
      // @ts-expect-error - non-standard prop for potential web interop
      data-size={size}
      style={[
        tw(
          "bg-wcPanel/80 border-2 border-wcBorder rounded-xl shadow-lg overflow-hidden flex flex-col gap-4 py-4 data-[size=sm]:py-3 data-[size=sm]:gap-3"
        ),
        style,
      ]}
      {...props}
    />
  );
}

export interface WarcraftCardSectionProps extends ViewProps {}

export function WarcraftCardHeader({ style, ...props }: WarcraftCardSectionProps) {
  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card-header"
      style={[tw("px-4 data-[size=sm]:px-3 gap-1"), style]}
      {...props}
    />
  );
}

export function WarcraftCardTitle({ style, ...props }: WarcraftCardSectionProps) {
  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card-title"
      style={[tw("text-base font-semibold data-[size=sm]:text-sm"), style]}
      {...props}
    />
  );
}

export function WarcraftCardDescription({ style, ...props }: WarcraftCardSectionProps) {
  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card-description"
      style={[tw("text-sm text-wcTextMuted"), style]}
      {...props}
    />
  );
}

export function WarcraftCardAction({ style, ...props }: WarcraftCardSectionProps) {
  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card-action"
      style={[tw("self-start justify-self-end"), style]}
      {...props}
    />
  );
}

export function WarcraftCardContent({ style, ...props }: WarcraftCardSectionProps) {
  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card-content"
      style={[tw("px-4 data-[size=sm]:px-3"), style]}
      {...props}
    />
  );
}

export function WarcraftCardFooter({ style, ...props }: WarcraftCardSectionProps) {
  return (
    <View
      // @ts-expect-error - non-standard prop for potential web interop
      data-slot="card-footer"
      style={[
        tw(
          "bg-black/40 border-t border-wcBorderDark rounded-b-xl px-4 py-3 flex-row items-center data-[size=sm]:px-3 data-[size=sm]:py-2"
        ),
        style,
      ]}
      {...props}
    />
  );
}
