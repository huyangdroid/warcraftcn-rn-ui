import React, { createContext, useContext, useMemo, useState } from "react";
import { Pressable, View } from "rn-primitives";

export type DrawerSide = "left" | "right" | "top" | "bottom";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer components must be used within <Drawer>");
  return ctx;
}

export interface DrawerProps {
  side?: DrawerSide;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Drawer({
  side = "bottom",
  open,
  defaultOpen,
  onOpenChange,
  children,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false);
  const actualOpen = open ?? internalOpen;

  const value = useMemo<DrawerContextValue>(
    () => ({
      open: actualOpen,
      side,
      setOpen(next) {
        if (open === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
    }),
    [actualOpen, side, open, onOpenChange]
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export interface DrawerTriggerProps {
  children: React.ReactNode;
}

export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const { setOpen } = useDrawerContext();
  return (
    <Pressable onPress={() => setOpen(true)} className="data-[slot=drawer-trigger]">
      {children}
    </Pressable>
  );
}

export interface DrawerOverlayProps {
  children?: React.ReactNode;
}

export function DrawerOverlay({ children }: DrawerOverlayProps) {
  const { open, setOpen } = useDrawerContext();
  if (!open) return null;

  return (
    <Pressable
      onPress={() => setOpen(false)}
      className="data-[slot=drawer-overlay] bg-black/50 absolute inset-0 z-40"
    >
      {children}
    </Pressable>
  );
}

export interface DrawerContentProps {
  children: React.ReactNode;
}

export function DrawerContent({ children }: DrawerContentProps) {
  const { open, side } = useDrawerContext();
  if (!open) return null;

  const base = "absolute z-50 bg-wcPanel border-wcBorderDark";
  const fromSide =
    side === "bottom"
      ? "left-0 right-0 bottom-0 border-t rounded-t-lg"
      : side === "top"
        ? "left-0 right-0 top-0 border-b rounded-b-lg"
        : side === "left"
          ? "left-0 top-0 bottom-0 border-r rounded-r-lg w-3/4 max-w-sm"
          : "right-0 top-0 bottom-0 border-l rounded-l-lg w-3/4 max-w-sm";

  const size = side === "bottom" || side === "top" ? "max-h-5/6" : "h-full";

  return (
    <View className={`${base} ${fromSide} ${size}`}>
      <View className="p-4">{children}</View>
    </View>
  );
}

export interface DrawerHeaderProps {
  children: React.ReactNode;
}

export function DrawerHeader({ children }: DrawerHeaderProps) {
  return <View className="mb-2">{children}</View>;
}

export interface DrawerFooterProps {
  children: React.ReactNode;
}

export function DrawerFooter({ children }: DrawerFooterProps) {
  return <View className="mt-3 flex-row justify-end gap-x-2">{children}</View>;
}

export interface DrawerCloseProps {
  children: React.ReactNode;
}

export function DrawerClose({ children }: DrawerCloseProps) {
  const { setOpen } = useDrawerContext();
  return (
    <Pressable onPress={() => setOpen(false)} className="data-[slot=drawer-close]">
      {children}
    </Pressable>
  );
}
