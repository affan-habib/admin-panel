// components/form/DyanamicForm.tsx
import React, { useState } from 'react';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import {
  Add,
  AddCircle,
  AddCircleOutline,
  AddOutlined,
} from '@mui/icons-material';
import CreateChapterDialog from './CreateChapterDialog';
import Chapters from './ChapterList';
import { useTranslation } from 'react-i18next';

const DyanamicForm: React.FC<any> = ({ modules }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
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
          {t("addChapter")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{ width: 30 }}
        >
          <AddCircleOutline />
        </Button>
      </Stack>

      <CreateChapterDialog open={isDialogOpen} onClose={handleDialogClose} />

      <Chapters modules={modules} />
    </>
  );
};

export default DyanamicForm;
