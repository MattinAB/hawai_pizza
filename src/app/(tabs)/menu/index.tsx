import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import ProductListItem from "@/src/components/ProductListItem";
import products from "@/assets/data/products";
import { MonoText } from "@/src/components/StyledText";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={({ id }) => id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <MonoText style={styles.title}>Pizzor</MonoText>
        )}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 0.5, backgroundColor: "#ccc" }} />
        )}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
