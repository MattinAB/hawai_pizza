import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import OrderDetailsCard from "@/src/components/OrderDetailsCard";
import Orders from "@/assets/data/orders";

export default function OrderDetails() {
  const { id } = useLocalSearchParams();

  const order = Orders.find((o) => o.id.toString() === id);

  if (!order) return <Text>Order not found</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderDetailsCard item={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
