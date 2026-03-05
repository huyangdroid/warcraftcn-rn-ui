import React, { createContext, useContext, useMemo, useState } from "react";
import { Pressable, View } from "rn-primitives";

export type SheetSide = "left" | "right" | "top" | "bottom";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: SheetSide;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("Sheet components must be used within <Sheet>");
  return ctx;
}

export interface SheetProps {
  side?: SheetSide;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ side = "right", open, defaultOpen, onOpenChange, children }: SheetProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false);
  const actualOpen = open ?? internalOpen;

  const value = useMemo<SheetContextValue>(
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

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export interface SheetTriggerProps {
  children: React.ReactNode;
}

export function SheetTrigger({ children }: SheetTriggerProps) {
  const { open, setOpen } = useSheetContext();
  return (
    <Pressable onPress={() => setOpen(!open)} className="data-[slot=sheet-trigger]">
      {children}
    </Pressable>
  );
}

export interface SheetOverlayProps {
  children?: React.ReactNode;
}

export function SheetOverlay({ children }: SheetOverlayProps) {
  const { open, setOpen } = useSheetContext();
  if (!open) return null;

  return (
    <Pressable
      onPress={() => setOpen(false)}
      className="data-[slot=sheet-overlay] bg-black/50 absolute inset-0 z-40"
    >
      {children}
    </Pressable>
  );
}

export interface SheetContentProps {
  children: React.ReactNode;
}

export function SheetContent({ children }: SheetContentProps) {
  const { open, side } = useSheetContext();
  if (!open) return null;

  const base = "absolute z-50 bg-wcPanel border-wcBorderDark";
  const fromSide =
    side === "right"
      ? "right-0 top-0 bottom-0 border-l w-3/4 max-w-sm"
      : side === "left"
        ? "left-0 top-0 bottom-0 border-r w-3/4 max-w-sm"
        : side === "top"
          ? "left-0 right-0 top-0 border-b"
          : "left-0 right-0 bottom-0 border-t";

  return (
    <View className={`${base} ${fromSide}`}>
      <View className="p-4">{children}</View>
    </View>
  );
}

export interface SheetHeaderProps {
  children: React.ReactNode;
}

export function SheetHeader({ children }: SheetHeaderProps) {
  return <View className="mb-2">{children}</View>;
}

export interface SheetFooterProps {
  children: React.ReactNode;
}

export function SheetFooter({ children }: SheetFooterProps) {
  return <View className="mt-3 flex-row justify-end gap-x-2">{children}</View>;
}

export interface SheetCloseProps {
  children: React.ReactNode;
}

export function SheetClose({ children }: SheetCloseProps) {
  const { setOpen } = useSheetContext();
  return (
    <Pressable onPress={() => setOpen(false)} className="data-[slot=sheet-close]">
      {children}
    </Pressable>
  );
}
