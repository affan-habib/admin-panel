// InputField.tsx

import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { InputLabel, TextField, Typography } from '@mui/material';

type InputFieldProps = FieldHookConfig<string | number> & {
  label?: string;
  rows?: number;
  placeholder?: string;
  fieldWidth?: number; // New prop for field width
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  rows = 1,
  placeholder = '',
  fieldWidth = 690, // Default width
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputType =
    props.type === 'number' || typeof field.value === 'number'
      ? 'number'
      : 'text';

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
      {label && (
        <React.Fragment>
          <div>
            <InputLabel
              sx={{
                minWidth: 200,
                color: 'black',
                marginX: 1,
                marginTop: 1,
                fontWeight: 600,
              }}
            >
              {label}
            </InputLabel>
          </div>
          <div>
            <Typography variant="body1" sx={{ marginX: 1, marginTop: 1 }}>
              :
            </Typography>
          </div>
        </React.Fragment>
      )}
      <div style={{ flex: 1, width: `${fieldWidth}px`, marginLeft: label ? '8px' : '0' }}>
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
      </div>
    </div>
  );
};

export default InputField;
