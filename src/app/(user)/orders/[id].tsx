import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import OrderDetailsCard from "@/components/OrderDetailsCard";
import OrderListItem from "@/components/OrderListItem";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubcription } from "@/api/orders/Subscription";

export default function OrderDetails() {
  const { id: isString } = useLocalSearchParams();
  const id = parseFloat(
    typeof isString === "string" ? isString : isString?.[0] || ""
  );
  useUpdateOrderSubcription(id);

  const { data: order, error, isLoading } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderDetailsCard item={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
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
