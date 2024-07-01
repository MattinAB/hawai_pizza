import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { View, Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/src/constants/Colors";
import Buttton from "@/src/components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { useDeleteProduct, useProductId } from "@/src/api/product";
import RemoteImage from "@/src/components/remoteImage";
import { defaultPizzaImage } from "@/src/components/ProductListItem";

export default function ProductDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0] ?? ""
  );

  const router = useRouter();

  const { mutate: deleteProduct } = useDeleteProduct();

  const { data: product, error, isLoading } = useProductId(id);

  if (isLoading) return <ActivityIndicator />;

  if (error || !product) return <Text>Failed to fetch product</Text>;

  const hadleDelete = () => {
    Alert.alert("Delete", "ARE YOU SURE YOU WANT TO DELETE ?", [
      { text: "No", onPress: () => null },
      {
        text: "Yes",
        onPress: () => {
          deleteProduct(id), router.back();
        },
        style: "destructive",
      },
    ]);
  };

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
      <RemoteImage
        style={styles.image}
        fallback={defaultPizzaImage}
        path={product?.image || defaultPizzaImage}
        resizeMode="contain"
      />

      {/* <Image
        style={styles.image}
        source={{ uri: product?.image ?? undefined }}
      /> */}
      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
      <Buttton
        style={styles.deleteButton}
        title="Delete"
        onPress={hadleDelete}
      />
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
  deleteButton: {
    marginTop: 50,
  },
});
