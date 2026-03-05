import React from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";
import { tw } from "uniwind";

export interface WarcraftTextareaProps extends TextInputProps {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export function WarcraftTextarea({
  label,
  description,
  error,
  containerClassName,
  inputClassName,
  style,
  ...props
}: WarcraftTextareaProps) {
  const hasError = Boolean(error);

  return (
    <View style={[tw("gap-1 w-full"), containerClassName ? tw(containerClassName) : null]}>
      {label ? <Text style={tw("text-sm font-medium text-wcText")}>{label}</Text> : null}
      {description ? (
        <Text style={tw("text-xs text-wcTextMuted")}>{description}</Text>
      ) : null}
      <TextInput
        multiline
        textAlignVertical="top"
        placeholderTextColor={tw.color("wcTextMuted") ?? "#6b7280"}
        style={[
          tw(
            "min-h-24 w-full rounded-md border border-wcBorderDark bg-black/40 px-3 py-2 text-base text-wcText md:text-sm focus:border-wcAccent focus:ring-2 focus:ring-wcAccent/40"
          ),
          hasError && tw("border-red-500"),
          inputClassName ? tw(inputClassName) : null,
          style,
        ]}
        {...props}
      />
      {error ? <Text style={tw("text-xs text-red-400")}>{error}</Text> : null}
    </View>
  );
}
