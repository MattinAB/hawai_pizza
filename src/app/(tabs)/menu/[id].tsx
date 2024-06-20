import React, { useState } from "react";
import { Button, Image, Pressable, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { View, Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";

export default function ProductDetailsScreen() {
  const [selectedSize, setSelectedSize] = useState();
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id.toString() === id);
  const sizes = ["S", "M", "L", "XL"];

  if (!product) {
    <Text>Product not found!</Text>;
  }
  const AddToCart = () => {
    alert("Added to Cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />
      <Image style={styles.image} source={{ uri: product?.image }} />
      <Text style={styles.price}>${product?.price}</Text>
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.sizeContainer,
              {
                backgroundColor:
                  selectedSize === size ? Colors.light.tint : "#fff",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.textSize,
                { color: selectedSize === size ? "gray" : "black" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.CartButton}>
        <Button title="Add To Cart" color="#fff" onPress={() => AddToCart()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  CartButton: {
    backgroundColor: Colors.light.tint, // Colors.light.tint export it from Colors.ts
    width: "70%",
    borderRadius: 25,
    alignSelf: "center",

    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textSize: {
    fontWeight: "bold",
    fontSize: 20,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  sizeContainer: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "gainsboro",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    justifyContent: "center",
    width: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
