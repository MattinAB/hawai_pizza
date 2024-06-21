import { Formik } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import * as yup from "yup"; // for everything
import FormField from "@/src/components/formik/FormFeild";

export default function Create() {
  const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    price: yup.number().required().label("Price"),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          price: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, resetForm }) => (
          <>
            <FormField name="name" />
            <FormField name="price" keyboardType={"numeric"} />

            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
});
