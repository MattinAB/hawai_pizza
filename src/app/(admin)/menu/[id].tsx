import React, { useState } from "react";
import { Button, Image, Pressable, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { View, Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";

import { useRouter } from "expo-router";

export default function ProductDetailsScreen() {
  const route = useRouter();

  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    <Text>Product not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />
      <Image style={styles.image} source={{ uri: product?.image }} />
      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 20,
  },
});
