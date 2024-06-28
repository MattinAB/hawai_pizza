import React, { useState } from "react";
import { ActivityIndicator, Button, Image, Pressable, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { View, Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";

import { FontAwesome } from "@expo/vector-icons";
import { useProductId } from "@/src/api/product";

export default function ProductDetailsScreen() {
  const { id:idString } = useLocalSearchParams();
  const id = parseFloat( typeof idString === 'string' ? idString : idString?.[0] ?? "" );  

const { data:product, error, isLoading } = useProductId( id);


if (isLoading) return <ActivityIndicator />;

if (error || !product) return <Text>Failed to fetch product</Text>;


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Details",
          headerRight: () => (
            <Link href={`/(admin)/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image style={styles.image} source={{ uri: product?.image ?? undefined}} />
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
