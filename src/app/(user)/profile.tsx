import { Pressable, StyleSheet } from "react-native";
import { Image, Button } from "react-native";
import { Text, View } from "../../components/Themed";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import * as imagePicker from "expo-image-picker";
import Colors from "../../constants/Colors";
import { useAuth } from "../../app/provider/AuthContext";
import LoginScreen from "../../app/auth/LoginScreen";
import { supabase } from "../../app/lib/Subabase";
import { Link} from "expo-router";

export default function TabTwoScreen() {
  const [imageUri, setImageUri] = React.useState("");
  const { sessions, setProfile, isAdmin } = useAuth();

  const ImageRequest = async () => {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  if (!sessions) {
    return (
      <View style={styles.loginContainer}>
        <LoginScreen />
      </View>
    );
  }
  // if (!profile) return <Redirect href={"/"} />;
  // if (isAdmin) return <Redirect href={"/"} />;

  const onLogout = () => {
    supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.image} onPress={ImageRequest}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <MaterialCommunityIcons
            name="account-tie-outline"
            size={90}
            color="gray-opacity-50"
          />
        )}
      </Pressable>
      <Text style={styles.title}>{sessions?.user.email}</Text>
      <Pressable style={styles.signOut} onPress={onLogout}>
        <FontAwesome
          name="sign-out"
          size={40}
          color={Colors.light.tabIconSelected}
        />
      </Pressable>

      {isAdmin && (
        <Link style={{ fontSize: 20, color: Colors.light.tint }} href={"/"}>
          Admin
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.light.light,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: Colors.light.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  signOut: {
    borderColor: Colors.light.tint, // border color
    borderWidth: 0.5, // border width
    alignItems: "center",
    backgroundColor: Colors.light.light,
    height: 70,
    justifyContent: "center",
    width: 70,
    borderRadius: 35,
    marginTop: 50,
    marginBottom: 20,
  },
});
