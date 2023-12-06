// InputSelect.tsx
import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

type InputSelectProps = FieldHookConfig<string> & {
  label: string;
  options: { value: any; label: string }[];
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
    <div>
      {label && (
        <React.Fragment>
          <div>
            <InputLabel
              sx={{
                minWidth: 200,
                color: 'black',
                marginY: 1,
                marginTop: 1,
                fontWeight: 500,
              }}
            >
              {label}
            </InputLabel>
          </div>
        </React.Fragment>
      )}
      <div
        style={{
          flex: 1,
          width: `${fieldWidth}px`,
        }}
      >
        <Select
          size="small"
          fullWidth
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
