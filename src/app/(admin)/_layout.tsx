import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/src/app/provider/AuthContext";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Redirect href={"/"} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,

        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: "menu",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "orders",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="list-status"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-tie-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="create" options={{ href: null }} />
    </Tabs>
  );
}
