// InputField.tsx

import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { InputLabel, TextField, Typography } from '@mui/material';

type InputFieldProps = FieldHookConfig<string | number> & {
  label?: string;
  rows?: number;
  placeholder?: string;
  fieldWidth?: number; // New prop for field width
  required?: boolean; // New prop for field width
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  rows = 1,
  placeholder = '',
  required,
  fieldWidth = 690, // Default width
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputType =
    props.type === 'number' || typeof field.value === 'number'
      ? 'number'
      : 'text';

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
        sx={{ bgcolor: 'white' }} // Use the fieldWidth prop
        size="small"
        {...field}
        label=""
        type={inputType}
        fullWidth
        multiline // Enable multiline
        rows={rows}
        variant="outlined"
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};

export default InputField;
