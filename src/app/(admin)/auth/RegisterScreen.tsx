import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Button from "@/src/components/Button";
import { Formik } from "formik";
import FormField from "@/src/components/formik/FormFeild";
import * as Yup from "yup";
import { Link } from "expo-router";

export default function RegisterScreen() {
  const validationShema = Yup.object().shape({
    username: Yup.string().required().min(6).label("Username"),
    password: Yup.string().required().min(6).label("Password"),
    name: Yup.string().required().label("Name"),
  }); // This is the validation schema for the form

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/HawaiPizzaLogo.jpg")}
      />
      <Formik
        initialValues={{ username: "", password: "", name: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
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

            <Button onPress={handleSubmit} title="Register" />
          </View>
        )}
      </Formik>
      <Link href={"/LoginScreen/"} asChild>
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
    bottom: 40,
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
