// InputSelect.tsx

import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

type InputSelectProps = FieldHookConfig<string> & {
  label: string;
  options: { value: string; label: string }[];
};

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <Grid container spacing={1} alignItems="flex-start" mb={2}>
      <Grid item>
        <InputLabel sx={{ minWidth: 200, color: 'black' }}>{label}</InputLabel>
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={{ marginX: 1, marginTop: 1 }}>
          :
        </Typography>
      </Grid>
      <Grid item>
        <Select
          sx={{ minWidth: 400 }}
          size="small"
          {...field}
          label=""
          variant="outlined"
          error={meta.touched && !!meta.error}
        >
          <MenuItem value="" disabled>
            Select Language
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default InputSelect;
