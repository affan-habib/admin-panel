// OutlinedTextField.tsx
import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

interface OutlinedTextFieldProps {
  label?: string;
  // Other TextField props can be added here
}

const OutlinedTextField: React.FC<OutlinedTextFieldProps> = ({ label, ...textFieldProps }) => (
  <Box>
    {label && (
      <Typography variant="caption" sx={{ marginBottom: 1, display: 'block' }}>
        {label}
      </Typography>
    )}
    <TextField variant="outlined" fullWidth {...textFieldProps} />
  </Box>
);

export default OutlinedTextField;
