import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/app/provider/AuthContext";

export default function AuthLayout() {
  const { sessions } = useAuth();

  if (sessions) return <Redirect href={"/"} />;

  return <Stack >
    <Stack.Screen name="RegisterScreen" options={{headerShown:false}}/>
    <Stack.Screen name="LoginScreen" options={{headerShown:false}}/>
  </Stack>;
}
