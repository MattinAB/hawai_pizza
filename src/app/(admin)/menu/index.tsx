import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import ProductListItem from "../../../components/ProductListItem";
import { MonoText } from "../../../components/StyledText";
import { useProductList } from "../../../api/product";

export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch products</Text>;

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
