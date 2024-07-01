import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import OrderDetailsCard from "@/src/components/OrderDetailsCard";
import OrderListItem from "@/src/components/OrderListItem";
import { OrderStatusList } from "@/assets/types";
import { useOrderDetails } from "@/src/api/orders";
import { ActivityIndicator } from "react-native-paper";
import { useUpdateOrder } from "@/src/api/orderItems";

export default function OrderDetails() {
  const { id: isString } = useLocalSearchParams();

  const id = parseFloat(
    typeof isString === "string" ? isString : isString?.[0] || ""
  );
  const { mutate: updateOrder } = useUpdateOrder();
  const { data: order, error, isLoading } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;
  if (error || !order) return <Text>Failed To fetch !</Text>;

  const updateStatus = (status: string) => {
    updateOrder({ id, updatedField: { status } });
  };

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
                  onPress={() => updateStatus(status)}
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
