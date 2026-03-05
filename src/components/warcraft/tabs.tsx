import React, { createContext, useContext, useState, ReactNode } from "react";
import { Pressable, View, Text } from "rn-primitives";

type TabsValue = string;

interface TabsContextValue {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return ctx;
}

export interface TabsProps {
  defaultValue: TabsValue;
  value?: TabsValue;
  onValueChange?: (value: TabsValue) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState<TabsValue>(defaultValue);
  const currentValue = value ?? internalValue;

  const handleChange = (next: TabsValue) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue: handleChange }}>
      <View className={className}>{children}</View>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <View
      className={[
        "flex-row gap-x-2 border-b border-wcBorderDark bg-black/40 px-2 py-1",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </View>
  );
}

export interface TabsTriggerProps {
  value: TabsValue;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { value: currentValue, setValue } = useTabsContext();
  const active = currentValue === value;

  return (
    <Pressable
      onPress={() => setValue(value)}
      className={[
        "px-3 py-1 rounded-t-[3px] border-x border-t text-xs uppercase tracking-wide",
        active
          ? "border-wcBorder bg-wcPanel text-wcAccent"
          : "border-transparent bg-transparent text-wcTextMuted",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

export interface TabsContentProps {
  value: TabsValue;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: currentValue } = useTabsContext();
  if (currentValue !== value) return null;

  return (
    <View
      className={[
        "border border-wcBorderDark bg-black/35 rounded-b-[3px] px-3 py-3",
        className ?? ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </View>
  );
}
