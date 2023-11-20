// InputFile.tsx
import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Grid, InputLabel, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { UploadRounded } from '@mui/icons-material';

type InputFileProps = FieldHookConfig<File> & {
  label: string;
};

const InputFile: React.FC<InputFileProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Grid container spacing={1} alignItems="flex-start" mb={2}>
      <Grid item>
        <InputLabel sx={{ minWidth: 200, color: 'black', marginX: 1, marginTop: 1, fontWeight: 600 }}>
          {label}
        </InputLabel>
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={{ marginX: 1, marginTop: 1 }}>
          :
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          sx={{ minWidth: 690, bgcolor: 'white' }}
          size="small"
          {...field}
          label=""
          type="file"
          fullWidth
          variant="outlined"
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton component="span">
                  <UploadRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default InputFile;
