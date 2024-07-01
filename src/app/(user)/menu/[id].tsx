import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { View, Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/app/provider/CartContext";
import { PizzaSize } from "@/assets/types";
import { useRouter } from "expo-router";
import { useProductId } from "@/src/api/product";
import RemoteImage from "@/src/components/remoteImage";
import { defaultPizzaImage } from "@/src/components/ProductListItem";

export default function ProductDetailsScreen() {
  const [selectedSize, setSelectedSize] = useState("M");
  const route = useRouter();

  const { AddItem } = useCart();

  const { id } = useLocalSearchParams();

  const {
    data: product,
    error,
    isLoading,
  } = useProductId(parseInt(typeof id === "string" ? id : id[0]));

  if (isLoading) return <ActivityIndicator />;

  if (error || !product) return <Text>Failed to fetch product</Text>;

  const sizes = ["S", "M", "L", "XL"];

  const AddToCart = () => {
    if (!product) return null;
    AddItem(product, selectedSize as PizzaSize);
    route.push("/Cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />

      <RemoteImage
        style={styles.image}
        fallback={defaultPizzaImage}
        path={product?.image || defaultPizzaImage}
        resizeMode="contain"
      />

      <Text style={styles.price}>${product?.price}</Text>
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size as PizzaSize)}
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
                { color: selectedSize === size ? "black" : "gray" },
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
