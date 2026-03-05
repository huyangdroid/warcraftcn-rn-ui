import React, { createContext, useContext, useMemo, useState } from "react";
import { Pressable, View, Text } from "rn-primitives";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("Tooltip components must be used within <Tooltip>");
  return ctx;
}

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Tooltip({ open, defaultOpen, onOpenChange, children }: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false);
  const actualOpen = open ?? internalOpen;

  const value = useMemo<TooltipContextValue>(
    () => ({
      open: actualOpen,
      setOpen(next) {
        if (open === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
    }),
    [actualOpen, open, onOpenChange]
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

export interface TooltipTriggerProps {
  children: React.ReactNode;
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  const { setOpen } = useTooltipContext();

  return (
    <Pressable
      onPressIn={() => setOpen(true)}
      onPressOut={() => setOpen(false)}
      className="data-[slot=tooltip-trigger]"
    >
      {children}
    </Pressable>
  );
}

export interface TooltipContentProps {
  children: React.ReactNode;
}

export function TooltipContent({ children }: TooltipContentProps) {
  const { open } = useTooltipContext();
  if (!open) return null;

  return (
    <View className="absolute z-50 -mt-2 rounded-md bg-wcText px-2 py-1">
      <Text className="text-xs text-black">{children}</Text>
    </View>
  );
}
