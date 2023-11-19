// InputField.tsx

import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Grid, InputLabel, TextField, Typography } from '@mui/material';

type InputFieldProps = FieldHookConfig<string | number> & {
  label: string;
  rows?: number;
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  rows = 1,
  placeholder = '',
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputType =
    props.type === 'number' || typeof field.value === 'number'
      ? 'number'
      : 'text';

  return (
    <Grid container spacing={1} alignItems="flex-start" mb={2}>
      <Grid item>
        <InputLabel sx={{ minWidth: 200, color: 'black', marginX: 1, marginTop: 1, fontWeight: 600 }}>{label}</InputLabel>
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={{ marginX: 1, marginTop: 1 }}>
          :
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder={placeholder}
          sx={{ minWidth: 690, bgcolor: 'white' }}
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
      </Grid>
    </Grid>
  );
};

export default InputField;
