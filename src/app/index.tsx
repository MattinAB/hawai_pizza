import React from "react";
import { View} from "react-native";
import { Link, Redirect } from "expo-router";
import Button from "../components/Button";
import { useAuth } from "@/src/app/provider/AuthContext";
import { ActivityIndicator } from "react-native-paper";

const index = () => {
  const { isAdmin, loading} = useAuth();


  if (loading) {
    <ActivityIndicator />;
  }


  if (!isAdmin) return  <Redirect href={"/(user)"} />

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button title="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button title="Admin" />
      </Link>
    </View>
  );
};

export default index;
