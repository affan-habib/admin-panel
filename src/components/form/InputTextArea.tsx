import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, FormControl, FormHelperText } from '@mui/material';

interface TextAreaProps {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
}

const InputTextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  rows = 4,
  placeholder = '',
}) => {
  return (
    <FormControl fullWidth>
      <Field
        as={TextField} // Use TextField from Material-UI
        multiline
        rows={rows}
        label={label}
        name={name}
        placeholder={placeholder}
        fullWidth
      />
      <ErrorMessage name={name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </FormControl>
  );
};

export default InputTextArea;
