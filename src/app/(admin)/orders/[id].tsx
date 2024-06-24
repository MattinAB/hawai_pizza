import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import OrderDetailsCard from "@/src/components/OrderDetailsCard";
import Orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { OrderStatusList } from "@/assets/types";

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
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
