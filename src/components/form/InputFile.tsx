// FileUpload.js
import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { InputLabel, TextField } from '@mui/material';

const FileUpload: React.FC<{ label: string } & FieldHookConfig<any>> = ({
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    helpers.setValue(file);
  };

  return (
    <div>
      <InputLabel
        sx={{
          minWidth: 200,
          color: 'black',
          my: 1,
          fontWeight: 500,
        }}
        htmlFor={field.name}
      >
        {label} Upload:
      </InputLabel>
      <TextField
        fullWidth
        id={field.name}
        name={field.name}
        type="file"
        onChange={handleChange}
        onBlur={field.onBlur}
      />
    </div>
  );
};

export default FileUpload;
