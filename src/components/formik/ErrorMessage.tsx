import React from "react";
import { Text } from "react-native";

export default function ErrorMessage({
  error,
  visible,
}: {
  error: string;
  visible: boolean;
}) {
  if (!error || !visible) return null;
  return <Text  style={{ color: "red" }}>{error}</Text>;
} // src/components/formik/ErrorMessage.tsx
