import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import { TextField, MenuItem } from "@mui/material";

interface AutoSelectProps {
  name: string;
  label: string;
  valueKey: string;
  labelKey: string;
  options: Array<{ [key: string]: any }>;
}

const AutoSelect: React.FC<AutoSelectProps> = ({
  name,
  label,
  valueKey,
  labelKey,
  options,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div>
      <Field
        name={name}
        as={TextField}
        select
        label={label}
        fullWidth
        variant="outlined"
        margin="normal"
        helperText={<ErrorMessage name={name} />}
        onChange={(event: any) => setFieldValue(name, event.target.value)}
        value={values[name]}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option[valueKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Field>
    </div>
  );
};

export default AutoSelect;
