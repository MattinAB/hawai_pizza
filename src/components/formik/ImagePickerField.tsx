import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

interface Props {
  name: string;
}

export default function ImagePickerField({ name }: Props) {
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: string;
  }>();
  const handlePress = () => {
    if (name) {
      selectImage();
    } else {
      // @ts-ignore
      setFieldValue(name, null);
    }
  };

  const selectImage = async () => {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        aspect: [4, 3], // 4:3
        quality: 1,
      });

      if (!result.canceled) {
        // @ts-ignore
        setFieldValue(name, result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error To Read Image");
    }
  };

  return (
    <TouchableOpacity
      style={{ alignItems: "center", marginBottom: 20 }}
      onPress={handlePress}
    >
      <View style={styles.container}>
        {values[name] ? (
          <Image
            source={{ uri: values[name] }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <MaterialCommunityIcons name="camera" size={80} color="gray" />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    alignItems: "center",
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: "hidden",

    justifyContent: "center",
  },
});
