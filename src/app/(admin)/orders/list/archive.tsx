import {
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import OrderCard from "@/src/components/orderCard";
import { useOrderList } from "@/src/api/orders";

export default function TabTwoScreen() {
  const { data: orders, error, isLoading } = useOrderList({ archived: true });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>{error.message}</Text>;

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
