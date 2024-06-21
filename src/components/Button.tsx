import React from "react";
import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

type Props = {
  onPress?: () => void;
  title: string;
  style?: ViewStyle;
};

export default function ButtonComponent({
  onPress,
  title,
  style,
  ...otherProps
}: Props) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
