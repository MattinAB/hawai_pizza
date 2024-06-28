import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from "react-native";
import Button from "@/src/components/Button";
import { Formik } from "formik";
import FormField from "@/src/components/formik/FormFeild";
import * as Yup from "yup";
import { Link, Redirect } from "expo-router";
import Submit from "@/src/components/formik/Submit";
import { supabase } from "@/src/app/lib/Subabase";
import { useAuth } from "../provider/AuthContext";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false); // This is the state for the loading spinner
  const { fetchSession } = useAuth();
  const validationShema = Yup.object().shape({
    username: Yup.string().required().min(6).label("Username"),
    password: Yup.string().required().min(6).label("Password"),
  }); // This is the validation schema for the form

  const onSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.username,
      password: values.password,
    });
    if (error) {
      alert(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
    if (data.user) {
      resetForm();
      fetchSession(); // This is the function to fetch the session
    }
   
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/HawaiPizzaLogo.jpg")}
      />
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validfatyionSchema={validationShema} // This is the validation schema for the form
      >
        {({ handleSubmit }) => (
          <View>
            <Text>Username</Text>
            <FormField name="username" />
            <Text>Password</Text>
            <FormField
              name="password"
              secureTextEntry={true}
              keybordType="password"
            />
            <Submit
              disabled={isLoading}
              onPress={(e: GestureResponderEvent) => handleSubmit()}
              text={isLoading ? "Signing......" : "Sign In"}
            />
          </View>
        )}
      </Formik>
      <Link href={"/auth/RegisterScreen/"} asChild>
        <Button title="Register" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 40,
  },
});
