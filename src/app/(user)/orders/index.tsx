import { StyleSheet, FlatList, Platform, SafeAreaView } from "react-native";
import { Text } from "@/src/components/Themed";
import OrderCard from "@/src/components/orderCard";
import { useMyOrders } from "@/src/api/orders";
import { ActivityIndicator } from "react-native-paper";

export default function TabTwoScreen() {
  const { data: orders, isLoading, error } = useMyOrders();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error To Fetching Orders.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Oreders</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
