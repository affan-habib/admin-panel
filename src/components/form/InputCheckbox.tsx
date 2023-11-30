// InputCheckBox.tsx

import React from "react";
import { useField } from "formik";
import { FormControlLabel, Checkbox } from "@mui/material";

type InputCheckbox = {
  name: string;
  label: string;
};

const InputCheckBox: React.FC<InputCheckbox> = ({ name, label }) => {
  const [field, meta] = useField(name);

  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} />}
      label={label}
    />
  );
};

export default InputCheckBox;
