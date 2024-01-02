// components/form/DyanamicForm.tsx
import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import CreateChapterDialog from './CreateChapterDialog';
import Chapters from './ChapterList';
import { useTranslation } from 'react-i18next';

const DyanamicForm: React.FC<any> = ({ modules, highlight = '' }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <Grid
        sx={{ p: 2, border: '1px solid #D0D0D0', borderRadius: '8px', mt: 2 }}
        className={`${highlight}`}
      >
        <Grid
          container
          justifyContent="space-between" // Adjust the alignment as needed
          alignItems="center" // Adjust the alignment as needed
          sx={{
            display: 'flex', // Set display to flex
            flexDirection: 'row', // Horizontal flex direction
            borderBottom: `${modules && modules.length > 0 ? '1px solid #D0D0D0' : ''}`,
            mb: `${modules && modules.length > 0 ? 2 : 0}`,
          }}
        >
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ marginBottom: '6px' }}
          >
            {t('addChapter')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
            sx={{ width: 30, marginBottom: '6px' }}
          >
            <AddCircleOutline />
          </Button>
        </Grid>
        <Grid>
          <Chapters modules={modules} />
        </Grid>
      </Grid>

      <CreateChapterDialog open={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default DyanamicForm;
