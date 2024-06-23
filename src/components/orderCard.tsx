import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Order } from "@/assets/types";
import Colors from "../constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
type Props = {
  order: Order;
};

dayjs.extend(relativeTime);

export default function OrderCard({ order }: Props) {
  const segment = useSegments();

  return (
    <Link href={`/${segment[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.orederContainer}>
          <Text style={styles.title}>Order# {order.id}</Text>
          <Text style={styles.dateTime}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>
        <View>
          <Text style={styles.orderStatus}>{order.status}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.light.light,
    borderRadius: 25,
    flex: 1,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orederContainer: {
    marginVertical: 10,
  },
  dateTime: {
    color: "grey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  orderStatus: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
