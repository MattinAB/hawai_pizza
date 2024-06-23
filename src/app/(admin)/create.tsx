import { Formik } from "formik";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Button from "@/src/components/Button";
import * as yup from "yup"; // for everything
import FormField from "@/src/components/formik/FormFeild";
import ImagePickerField from "@/src/components/formik/ImagePickerField";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Create() {
  const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    price: yup.number().required().label("Price"),
    image: yup.string().required().label("Image"), // This is the line that needs to be changed
  });

  const { id } = useLocalSearchParams();
  const isUpdated = !!id; // This is the line that needs to be changed
  const handleDelete = () => {
    console.log("Delete");
  };
  const onDelete = () => {
    Alert.alert("Delete", "Are You Sure You Want To Delete ?", [
      { text: "No", onPress: () => null },
      { text: "Yes", onPress: () => handleDelete(), style: "destructive" },
    ]);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdated ? "Update Product" : "Create Product",
        }}
      />
      <Formik
        initialValues={{
          name: "",
          price: "",
          image: null, // This is the line that needs to be changed
        }}
        onSubmit={(values, { resetForm }) => {
          if (isUpdated) {
            return;
          }
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
            <Button
              onPress={handleSubmit}
              title={isUpdated ? "Update" : "Submit"}
            />
            {isUpdated && <Button title="Delete" onPress={onDelete} />}
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
