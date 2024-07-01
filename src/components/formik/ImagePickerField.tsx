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
import * as FileSystem from "expo-file-system"; // Add this import
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/app/lib/Subabase";
import { decode } from "base64-arraybuffer";

interface Props {
  name: string;
}

export default function ImagePickerField({ name }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);
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
        allowsEditing: true,
        aspect: [4, 3], // 4:3
        quality: 1,
      });

      if (!result.canceled) {
        const imagePath = await uploadImage(result.assets[0].uri);
        // @ts-ignore
        setFieldValue(name, imagePath);
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error To Read Image");
    }
  };

  const uploadImage = async (image: string) => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
    if (error) {
      Alert.alert("Error To Upload Image");
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
            source={{ uri: imageUri ?? undefined }}
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
