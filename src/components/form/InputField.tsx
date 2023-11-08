// InputField.tsx

import React from "react";
import { useField, FieldHookConfig } from "formik";
import { TextField } from "@mui/material";

type InputFieldProps = FieldHookConfig<string | number> & {
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputType =
    props.type === "number" || typeof field.value === "number"
      ? "number"
      : "text";

  return (
    <TextField
      {...field}
      label={label}
      type={inputType}
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};

export default InputField;
