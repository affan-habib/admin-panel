// InputFile.tsx
import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import {
  Grid,
  InputLabel,
  TextField,
  Typography,
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
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '16px',
      }}
    >
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
      <div
        style={{
          flex: 1,
          width: `${fieldWidth}px`,
          marginLeft: label ? '8px' : '0',
        }}
      >
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
      </div>
    </div>
  );
};

export default InputFile;
