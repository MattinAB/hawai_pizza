import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="RegisterScreen" />
    </Stack>
  );
}
