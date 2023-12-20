import React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const MarkInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Box margin="20px">
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="gray"
        justifyContent="space-between"
        maxWidth={210}
      >
        <Typography align="center" sx={{ color: 'white', px: 2, width: 100 }}>
          মার্ক দিন
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
    </Box>
  );
};

export default MarkInput;
