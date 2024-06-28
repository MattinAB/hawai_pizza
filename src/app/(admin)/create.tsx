import { Formik } from "formik";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Button from "@/src/components/Button";
import * as yup from "yup"; // for everything
import FormField from "@/src/components/formik/FormFeild";
import ImagePickerField from "@/src/components/formik/ImagePickerField";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useInsertProduct, useUpdateProduct } from "@/src/api/product";

export default function Create() {
  const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    price: yup.number().required().label("Price"),
    image: yup.string().label("Image"), // This is the line that needs to be changed
  });
  const router = useRouter();
  const { mutate: inserProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const { id: isString } = useLocalSearchParams();
  const id = parseFloat( typeof isString === "string" ? isString : isString?.[0] || "");
  
  const isUpdated = !!isString as boolean; // This is the line that has been changed
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
          if (!isUpdated) {
            inserProduct({
              name: values.name,
              price: parseFloat(values.price),
              image: values.image,
            });
          } else {
            updateProduct({
              id,
              name: values.name,
              price: parseFloat(values.price),
              image: values.image,
            });
          }
          resetForm();
          router.back();
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
