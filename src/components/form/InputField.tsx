// InputField.tsx

import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { InputLabel, TextField, Typography } from '@mui/material';

// ... (existing imports)

type InputFieldProps = FieldHookConfig<string | number> & {
  label?: string;
  rows?: number;
  placeholder?: string;
  fieldWidth?: number;
  required?: boolean;
  type?: 'text' | 'number'; // New optional type prop
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  rows = 1,
  placeholder = '',
  required,
  type = 'text', // Default type is text
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputType = type === 'number' ? 'number' : 'text';
  const parsedValue =
    type === 'number' ? parseFloat(field.value as string) || 0 : field.value;

  return (
    <>
      {label && (
        <React.Fragment>
          <div>
            <InputLabel
              sx={{
                minWidth: 200,
                color: 'black',
                my: 1,
                fontWeight: 500,
              }}
            >
              {label} {required && <span style={{ color: 'red' }}>*</span>}
            </InputLabel>
          </div>
        </React.Fragment>
      )}

      <TextField
        placeholder={placeholder}
        sx={{ bgcolor: 'white'}} // Set field width
        size="small"
        {...field}
        label=""
        type={inputType}
        fullWidth
        multiline
        rows={rows}
        variant="outlined"
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        value={parsedValue} // Use parsedValue instead of field.value
      />
    </>
  );
};

export default InputField;
