import React from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import { Product } from "../../assets/types";
import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Link, useSegments } from "expo-router";

type Props = {
  product: Product;
  onPress?: () => void;
};

export default function ProductListItem({ product, onPress }: Props) {
  const segment = useSegments();

  return (
    <Link href={`/${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container} onPress={onPress}>
        <Image
          style={styles.image}
          source={{ uri: product.image ?? undefined }}
          resizeMode="contain"
        />
        <MonoText style={styles.product}>{product.name}</MonoText>
        <Text style={styles.prise}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    maxWidth: "50%", // 2 columns
  },
  image: {
    width: "100%",
    aspectRatio: 1, // 1:1 aspect ratio
  },
  prise: {
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  product: {
    fontWeight: "bold",
  },
});
