// InputSelect.tsx

import React from "react";
import { useField, FieldHookConfig } from "formik";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type InputSelectProps = FieldHookConfig<string> & {
  label: string;
  options: any[]; // Accept any array
  valueKey: string; // Custom value key
  labelKey: string; // Custom label key
};

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  valueKey,
  labelKey,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl
      fullWidth
      variant="filled"
      error={meta.touched && !!meta.error}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        label={label}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
