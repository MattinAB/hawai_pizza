import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useFormikContext, FormikTouched } from "formik";
import ErrorMessage from "./ErrorMessage";

interface Props {
  name: string;
  [key: string]: any;
}

export default function FormField({ name, ...props }: Props) {
  const { handleChange, handleBlur, errors, touched, values } =
    useFormikContext() as any;

  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={values[name]}
          placeholder={name}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          {...props}
        />
      </View>
      <ErrorMessage
        error={errors[name as keyof typeof errors]}
        visible={touched[name as keyof FormikTouched<unknown>]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginVertical: 10,
  },
});
