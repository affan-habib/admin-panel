import React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MarkInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { t } = useTranslation();

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="gray"
        justifyContent="space-between"
        maxWidth={200}
        borderRadius="4px"
        border="1px solid #D0D0D0"
      >
        <Typography align="center" sx={{ color: 'white', px: 2, width: 100 }}>
          {t('giveMark')}
        </Typography>
        <input
          type="number"
          {...field}
          {...props}
          style={{
            padding: '10px',
            width: '100px',
            borderBottomRightRadius: '4px',
            borderTopRightRadius: '4px',
            border: 0,
          }}
          placeholder="---"
        />
      </Stack>
      {meta.touched && meta.error && (
        <Typography component="span" style={{ color: 'red', fontSize: 12 }}>
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default MarkInput;
