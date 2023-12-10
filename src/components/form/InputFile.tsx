// FileUpload.js
import React from 'react';
import { useField } from 'formik';
import { InputLabel, TextField } from '@mui/material';
import { ProductionQuantityLimitsRounded } from '@mui/icons-material';

const FileUpload: React.FC<any> = ({ label, limit, acceptedFileTypes, ...props }) => {
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
        {label}
      </InputLabel>
      <TextField
        size="small"
        fullWidth
        id={field.name}
        name={field.name}
        type="file"
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        inputProps={{
          accept: acceptedFileTypes || '*', // Set accepted file types
        }}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
      {limit && <span style={{ fontSize: '13px', color: 'grey' }}>{limit}</span>}
    </div>
  );
};

export default FileUpload;
