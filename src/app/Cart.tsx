import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "@/src/components/Themed";
import { StatusBar } from "expo-status-bar";
import { Button, Platform } from "react-native";
import { useCart } from "@/src/app/provider/CartContext";
import { FlatList } from "react-native";
import CartListItem from "../components/CartListItem";
import Colors from "../constants/Colors";

export default function Cart() {
  const { items, total } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      {total > 0 && <Text style={styles.total}>Total:{total}</Text>}
      <View style={styles.checkoutButton}>
        {total > 0 && (
          <Button title="Checkout" color="#fff" onPress={() => {}} />
        )}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
const styles = StyleSheet.create({
  checkoutButton: {
    alignSelf: "center",
    // padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    width: "70%",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text, // Use the light text color
    marginVertical: 10,
  },
});
