// components/form/DyanamicForm.tsx
import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateChapterDialog from './CreateChapterDialog';

interface Chapter {
  chapterName: string;
  chapterNameBn: string;
  chapterCode: string;
}

const DyanamicForm: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleChapterAdded = (chapter: Chapter) => {
    setChapters((prevChapters) => [...prevChapters, chapter]);
  };

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

      <CreateChapterDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onChapterAdded={handleChapterAdded}
      />

      {chapters.map((chapter, index) => (
        <Accordion key={index} disableGutters>
          <AccordionSummary sx={{ height: 50 }}>
            <Typography>{chapter.chapterName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default DyanamicForm;
