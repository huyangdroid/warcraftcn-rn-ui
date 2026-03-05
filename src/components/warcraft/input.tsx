import React from "react";
import { TextInput, View, Text } from "rn-primitives";

export interface WarcraftInputProps {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

export function WarcraftInput({
  label,
  description,
  error,
  className,
  inputClassName,
  value,
  placeholder,
  onChangeText,
  secureTextEntry
}: WarcraftInputProps) {
  const showError = Boolean(error);

  return (
    <View className={["gap-y-1", className ?? ""].filter(Boolean).join(" ")}>
      {label ? (
        <Text className="text-wcText text-xs uppercase tracking-wide">{label}</Text>
      ) : null}

      <View
        className={[
          "border rounded-sm px-3 py-2 bg-black/40",
          showError ? "border-red-500" : "border-wcBorderDark"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          className={[
            "text-wcText text-sm",
            "placeholder:text-wcTextMuted",
            inputClassName ?? ""
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </View>

      {description && !showError ? (
        <Text className="text-wcTextMuted text-xs">{description}</Text>
      ) : null}

      {showError ? <Text className="text-red-400 text-xs">{error}</Text> : null}
    </View>
  );
}
