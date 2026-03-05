import React, { createContext, useContext, useMemo, useState } from "react";
import { Pressable, View, Text } from "rn-primitives";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenu components must be used within <DropdownMenu>");
  return ctx;
}

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function DropdownMenu({ open, defaultOpen, onOpenChange, children }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false);
  const actualOpen = open ?? internalOpen;

  const value = useMemo<DropdownMenuContextValue>(
    () => ({
      open: actualOpen,
      setOpen(next) {
        if (open === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
    }),
    [actualOpen, open, onOpenChange]
  );

  return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>;
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenuContext();
  return (
    <Pressable
      onPress={() => setOpen(!open)}
      className="data-[slot=dropdown-menu-trigger]"
    >
      {children}
    </Pressable>
  );
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
}

export function DropdownMenuContent({ children }: DropdownMenuContentProps) {
  const { open } = useDropdownMenuContext();
  if (!open) return null;

  return (
    <View className="mt-1 min-w-40 rounded-md border border-wcBorderDark bg-black/80 p-1 shadow-lg">
      {children}
    </View>
  );
}

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}

export function DropdownMenuItem({ children, onSelect, disabled }: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext();

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        onSelect?.();
        setOpen(false);
      }}
      className="px-2 py-1 rounded-sm flex-row items-center justify-between active:bg-wcPanel/60 disabled:opacity-50"
    >
      <Text className="text-sm text-wcText">{children}</Text>
    </Pressable>
  );
}

export interface DropdownMenuLabelProps {
  children: React.ReactNode;
}

export function DropdownMenuLabel({ children }: DropdownMenuLabelProps) {
  return (
    <Text className="px-2 py-1 text-xs font-semibold text-wcTextMuted uppercase tracking-wide">
      {children}
    </Text>
  );
}

export interface DropdownMenuSeparatorProps {}

export function DropdownMenuSeparator(_: DropdownMenuSeparatorProps) {
  return <View className="my-1 h-px bg-wcBorderDark" />;
}
