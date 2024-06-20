import { Stack } from "expo-router";

export default function MenuList() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "menu" }} />
    </Stack>
  );
}
