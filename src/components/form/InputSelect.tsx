// InputSelect.tsx
import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

type InputSelectProps = FieldHookConfig<string> & {
  label: string;
  options: { value: string; label: string }[];
  fieldWidth?: number; //
};

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
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
        <Select
          sx={{ minWidth: 400 }}
          size="small"
          {...field}
          label=""
          variant="outlined"
          error={meta.touched && !!meta.error}
        >
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default InputSelect;
