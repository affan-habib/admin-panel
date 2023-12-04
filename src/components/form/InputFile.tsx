// InputFile.tsx
import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import {
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { UploadRounded } from '@mui/icons-material';

type InputFileProps = FieldHookConfig<File> & {
  label: string;
  fieldWidth?: number;
};

const InputFile: React.FC<InputFileProps> = ({
  label,
  fieldWidth,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      {label && (
        <InputLabel
          sx={{
            minWidth: 200,
            color: 'black',
            fontWeight: 500,
            my: 1,
          }}
        >
          {label}
        </InputLabel>
      )}
      <TextField
        sx={{ bgcolor: 'white' }}
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
    </div>
  );
};

export default InputFile;
