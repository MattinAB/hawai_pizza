import { Link, Stack } from "expo-router";
import { Button, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
export default function MenuList() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "menu",
          headerRight: () => (
            <Link href="/Cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Details",
          headerRight: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
