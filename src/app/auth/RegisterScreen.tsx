import React from "react";
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
import { Link } from "expo-router";
import { supabase } from "@/src/app/lib/Subabase";
import Submit from "@/src/components/formik/Submit";
import { useAuth } from "../provider/AuthContext";

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { fetchSession } = useAuth(); // This is the function to fetch the session

  const validationShema = Yup.object().shape({
    username: Yup.string().required().min(6).label("Username"),
    password: Yup.string().required().min(6).label("Password"),
    name: Yup.string().required().label("Name"),
  }); // This is the validation schema for the form

  const onSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: values.username,
      password: values.password,
    });

    if (error) return alert(error.message);
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
        initialValues={{ username: "", password: "", name: "" }}
        onSubmit={onSubmit}
        validfatyionSchema={validationShema} // This is the validation schema for the form
      >
        {({ handleSubmit }) => (
          <View>
            <Text>Name *</Text>
            <FormField name="name" />
            <Text>Username *</Text>
            <FormField name="username" />
            <Text>Password *</Text>
            <FormField
              name="password"
              secureTextEntry={true}
              keybordType="password"
            />

            <Submit
              disabled={isLoading}
              onPress={(e: GestureResponderEvent) => handleSubmit()}
              text={isLoading ? "Creating ..." : "Register"}
            />
          </View>
        )}
      </Formik>
      <Link href={"/(user)/profile"} asChild>
        <Button style={styles.button} title="Back" />
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
  button: {
    width: "70%",
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    marginTop: "auto",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 40,
  },
});
