// RichTextInput.tsx

import React, { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useField, FieldHookConfig } from 'formik';
import { InputLabel, Typography } from '@mui/material';

type RichTextInputProps = FieldHookConfig<string> & {
  label?: string;
  modules?: Record<string, any>;
  formats?: string[];
};

const RichTextInput: React.FC<RichTextInputProps> = ({
  label,
  modules,
  formats,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = useCallback(
    (value: string) => {
      helpers.setValue(value);
    },
    [helpers],
  );

  return (
    <>
      {label && (
        <div>
          <InputLabel
            sx={{
              minWidth: 200,
              color: 'black',
              my: 1,
              fontWeight: 500,
            }}
          >
            {label}
          </InputLabel>
        </div>
      )}

      <ReactQuill
        value={field.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ backgroundColor: 'white', width: '100%', height: '200px' }}
      />

      {meta.touched && meta.error && (
        <Typography variant="caption" color="error">
          {meta.error}
        </Typography>
      )}
    </>
  );
};

export default RichTextInput;
