// components/form/InputRadio.tsx
import React from 'react';
import { useField } from 'formik';
import { Radio, FormControlLabel } from '@mui/material';

interface InputRadioProps {
  label: string;
  name: string;
  value: any;
}

const InputRadio: React.FC<InputRadioProps> = ({ label, name, value }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControlLabel
      control={
        <Radio
          {...field}
          checked={field.value === value}
          onChange={() => helpers.setValue(value)}
        />
      }
      label={label}
    />
  );
};

export default InputRadio;
