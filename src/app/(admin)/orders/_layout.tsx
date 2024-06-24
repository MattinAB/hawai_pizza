import { Stack } from "expo-router";
export default function orders() {
  return (
    <Stack>
      <Stack.Screen
        name="list"
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
