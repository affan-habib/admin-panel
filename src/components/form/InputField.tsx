// InputField.tsx

import React, { useState } from 'react';
import { useField, FieldHookConfig } from 'formik';
import { IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardInput from 'components/common/KeyboardInput';
// ... (existing imports)

type InputFieldProps = FieldHookConfig<string | number> & {
  label?: string;
  rows?: number;
  placeholder?: string;
  fieldWidth?: number;
  required?: boolean;
  type?: 'text' | 'number'; // New optional type prop
  withKeyboard?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  rows = 1,
  placeholder = '',
  required,
  type = 'text', // Default type is text
  withKeyboard = false,
  ...props
}) => {
  const [openKeyboard, toggleKeyboard] = useState(false);
  const [field, meta, helpers] = useField(props);

  const inputType = type === 'number' ? 'number' : 'text';
  let parsedValue =
    type === 'number' ? parseFloat(field.value as string) || null : field.value;

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
        InputProps={{
          endAdornment: withKeyboard ? (
            <InputAdornment position="end">
              <IconButton 
                aria-label="toggle keyboard"
                onClick={() => {
                  toggleKeyboard(!openKeyboard);
                }}
                onMouseDown={() => {}}
                edge="end">
                <KeyboardIcon />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
      />
      { openKeyboard && <KeyboardInput setValue={(val) => {helpers.setValue(val)}} /> }
    </>
  );
};

export default InputField;
