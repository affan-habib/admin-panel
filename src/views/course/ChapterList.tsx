// components/form/Chapters.tsx
import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import useCourseModules from 'hooks/useCourseModules';
import CreateVideoDialog from './CreateVideoDialog';

const Chapters: React.FC = () => {
  const { data } = useCourseModules(9);
  const [isDialogOpen, setDialogOpen] = useState(false);
  console.log(data, 'sss');
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  return (
    <>
      {data?.data.map((chapter: any) => (
        <Accordion disableGutters>
          <AccordionSummary sx={{ height: 50 }}>
            <Typography>{chapter.module_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <button onClick={handleDialogOpen}>add Video</button>
            <button>add Video</button>
            <button>add Video</button>
          </AccordionDetails>
        </Accordion>
      ))}
      <CreateVideoDialog open={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default Chapters;
