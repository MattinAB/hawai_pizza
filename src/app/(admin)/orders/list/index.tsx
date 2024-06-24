import { StyleSheet, FlatList, Platform } from "react-native";
import { Text, View } from "@/src/components/Themed";
import orders from "@/assets/data/orders";
import OrderCard from "@/src/components/orderCard";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oreders</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
