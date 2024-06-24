import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "@/src/components/Button";
import { Formik } from "formik";
import FormField from "@/src/components/formik/FormFeild";
import * as Yup from "yup";
import { Link } from "expo-router";

export default function LoginScreen() {
  const validationShema = Yup.object().shape({
    username: Yup.string().required().min(6).label("Username"),
    password: Yup.string().required().min(6).label("Password"),
  }); // This is the validation schema for the form

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/HawaiPizzaLogo.jpg")}
      />
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
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

            <Button onPress={handleSubmit} title="Sing In" />
          </View>
        )}
      </Formik>
      <Link href={"/RegisterScreen/"} asChild>
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
