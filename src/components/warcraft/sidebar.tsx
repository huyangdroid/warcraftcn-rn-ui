import React, { createContext, useContext, useMemo, useState } from "react";
import { Pressable, View, Text } from "rn-primitives";

export type SidebarState = "expanded" | "collapsed";

interface SidebarContextValue {
  state: SidebarState;
  setState: (state: SidebarState) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("Sidebar components must be used within <SidebarProvider>");
  return ctx;
}

export interface SidebarProviderProps {
  defaultState?: SidebarState;
  state?: SidebarState;
  onStateChange?: (state: SidebarState) => void;
  children: React.ReactNode;
}

export function SidebarProvider({
  defaultState = "expanded",
  state: controlledState,
  onStateChange,
  children,
}: SidebarProviderProps) {
  const [internalState, setInternalState] = useState<SidebarState>(defaultState);
  const actualState = controlledState ?? internalState;

  const value = useMemo<SidebarContextValue>(
    () => ({
      state: actualState,
      setState(next) {
        if (controlledState === undefined) setInternalState(next);
        onStateChange?.(next);
      },
    }),
    [actualState, controlledState, onStateChange]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const { state } = useSidebarContext();
  const widthClass = state === "expanded" ? "w-64" : "w-12";

  return (
    <View className={`${widthClass} bg-black/60 border-r border-wcBorderDark`}>{children}</View>
  );
}

export interface SidebarHeaderProps {
  children: React.ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <View className="px-3 py-2 border-b border-wcBorderDark">{children}</View>;
}

export interface SidebarFooterProps {
  children: React.ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return <View className="px-3 py-2 border-t border-wcBorderDark">{children}</View>;
}

export interface SidebarToggleProps {
  label?: string;
}

export function SidebarToggle({ label = "Toggle" }: SidebarToggleProps) {
  const { state, setState } = useSidebarContext();
  const next = state === "expanded" ? "collapsed" : "expanded";

  return (
    <Pressable
      onPress={() => setState(next)}
      className="px-2 py-1 flex-row items-center gap-x-1"
    >
      <Text className="text-xs text-wcTextMuted">{label}</Text>
    </Pressable>
  );
}
