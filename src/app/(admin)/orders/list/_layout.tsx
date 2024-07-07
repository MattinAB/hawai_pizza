import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform, SafeAreaView, StyleSheet } from "react-native";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);
export default function OrdersList() {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "Active" }} />
      </TopTabs>
    </SafeAreaView>
  );
}

// edges={["top"]} is not supported in react-native its deprecated
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "White",
    paddingTop:Platform.OS === "android" ? 50 : 0,  // paddingTop: 50 is not supported in react-native  
  },
});
