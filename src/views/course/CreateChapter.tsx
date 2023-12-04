// components/form/DyanamicForm.tsx
import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const DyanamicForm: React.FC = () => (
  <>
    <Stack
      sx={{
        p: 2,
        border: '1px solid #D0D0D0',
        borderRadius: '8px',
        mt: 2,
      }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h6" color="primary.main">
        অধ্যায় যোগ করুন
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        startIcon={<Add />}
      >
        অধ্যায় যোগ করুন
      </Button>
    </Stack>
  </>
);

export default DyanamicForm;
