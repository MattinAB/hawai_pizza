import React from "react";
import { View, StyleSheet } from "react-native";

import { Link } from "expo-router";
import Colors from "../constants/Colors";
import Button from "../components/Button";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button title="User" />
      </Link>
      <Link href={"/LoginScreen/"} asChild>
        <Button title="Admin" />
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    margin: 10,
    borderRadius: 25,
  },
});
