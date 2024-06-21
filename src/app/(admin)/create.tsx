import { Formik } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import * as yup from "yup"; // for everything
import FormField from "@/src/components/formik/FormFeild";
import ImagePickerField from "@/src/components/formik/ImagePickerField";

export default function Create() {
  const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    price: yup.number().required().label("Price"),
    image: yup.string().required().label("Image"), // This is the line that needs to be changed
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          price: "",
          image: null, // This is the line that needs to be changed
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <ImagePickerField name="image" />
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
