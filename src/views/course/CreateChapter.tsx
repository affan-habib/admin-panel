// components/form/DyanamicForm.tsx
import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateChapterDialog from './CreateChapterDialog';
import Chapters from './ChapterList';

const DyanamicForm: React.FC<any> = ({ modules }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
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
          onClick={handleDialogOpen}
          startIcon={<Add />}
        >
          অধ্যায় যোগ করুন
        </Button>
      </Stack>

      <CreateChapterDialog open={isDialogOpen} onClose={handleDialogClose} />

      <Chapters modules={modules} />
    </>
  );
};

export default DyanamicForm;
