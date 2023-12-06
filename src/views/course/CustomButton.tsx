import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const CustomBox = () => {
  return (
    <Box
      border="1px solid #D0D0D0"
      borderRadius={0}
      width="100px"
      height="100px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        style={{ width: '100%', borderRadius: 0 }}
        variant="outlined"
        startIcon={<Add />}
      >
        {/* Icon */}
        <Add fontSize="small" />
        {/* Title */}
        <Typography variant="subtitle2">Button Title</Typography>
      </Button>
    </Box>
  );
};

export default CustomBox;
