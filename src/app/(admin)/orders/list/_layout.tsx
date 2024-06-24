import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);
export default function OrdersList() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "White" }}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "Active" }} />
      </TopTabs>
    </SafeAreaView>
  );
}

// edges={["top"]} is not supported in react-native its deprecated
