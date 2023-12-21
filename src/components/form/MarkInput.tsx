import React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MarkInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const {t} = useTranslation()

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="gray"
        justifyContent="space-between"
        maxWidth={200}
      >
        <Typography align="center" sx={{ color: 'white', px: 2, width: 100 }}>
          {t('giveMark')}
        </Typography>
        <input
          type="number"
          {...field}
          {...props}
          style={{ padding: '10px', width: '100px' }}
          placeholder="---"
        />
      </Stack>
      {meta.touched && meta.error && (
        <Typography component="span" style={{ color: 'red', fontSize: 12 }}>
          {meta.error}
        </Typography>
      )}
    </>
  );
};

export default MarkInput;
