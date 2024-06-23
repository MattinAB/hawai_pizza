import { Link, Stack } from "expo-router";
import { Button, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";

export default function orders() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "orders",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Order Details",
        }}
      />
    </Stack>
  );
}
