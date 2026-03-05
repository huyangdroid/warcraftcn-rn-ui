import React, { createContext, useContext, useMemo, useState } from "react";
import { Pressable, View, Text } from "rn-primitives";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used within <Dialog>");
  return ctx;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false);

  const actualOpen = open ?? internalOpen;

  const value = useMemo<DialogContextValue>(
    () => ({
      open: actualOpen,
      setOpen(next) {
        if (open === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
    }),
    [actualOpen, open, onOpenChange]
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export interface DialogTriggerProps {
  children: React.ReactNode;
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  const { setOpen } = useDialogContext();
  return (
    <Pressable onPress={() => setOpen(true)} className="data-[slot=dialog-trigger]">
      {children}
    </Pressable>
  );
}

export interface DialogOverlayProps {
  children?: React.ReactNode;
}

export function DialogOverlay({ children }: DialogOverlayProps) {
  const { open, setOpen } = useDialogContext();
  if (!open) return null;

  return (
    <Pressable
      onPress={() => setOpen(false)}
      className="data-[slot=dialog-overlay] bg-black/50 absolute inset-0 z-40"
    >
      {children}
    </Pressable>
  );
}

export interface DialogContentProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export function DialogContent({ children, showCloseButton = true }: DialogContentProps) {
  const { open, setOpen } = useDialogContext();
  if (!open) return null;

  return (
    <View className="absolute inset-0 z-50 items-center justify-center">
      <View className="bg-wcPanel border border-wcBorderDark rounded-md px-4 py-3 w-[90%] max-w-md">
        {showCloseButton ? (
          <View className="items-end mb-2">
            <Pressable onPress={() => setOpen(false)} className="px-2 py-1">
              <Text className="text-wcTextMuted text-xs uppercase">Close</Text>
            </Pressable>
          </View>
        ) : null}
        {children}
      </View>
    </View>
  );
}

export interface DialogHeaderProps {
  children: React.ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <View className="mb-2">{children}</View>;
}

export interface DialogTitleProps {
  children: React.ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <Text className="text-base font-semibold text-wcText mb-1">{children}</Text>;
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return <Text className="text-sm text-wcTextMuted">{children}</Text>;
}

export interface DialogFooterProps {
  children: React.ReactNode;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return <View className="mt-3 flex-row justify-end gap-x-2">{children}</View>;
}

export interface DialogCloseProps {
  children: React.ReactNode;
}

export function DialogClose({ children }: DialogCloseProps) {
  const { setOpen } = useDialogContext();
  return (
    <Pressable onPress={() => setOpen(false)} className="data-[slot=dialog-close]">
      {children}
    </Pressable>
  );
}
