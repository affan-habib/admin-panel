import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface ChapterProps {
  chapter: { chapterName: string; chapterCode: string };
  onRemove: () => void;
  onAddVideo: () => void;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, onRemove, onAddVideo }) => (
  <Accordion>
    <AccordionSummary expandIcon={<Delete/>}>
      <Typography>{chapter.chapterName}</Typography>
      <IconButton onClick={onRemove} style={{ marginLeft: 'auto' }}>
        <Delete />
      </IconButton>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Chapter Code: {chapter.chapterCode}</Typography>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: '10px' }}
      >
        Add Assessment
      </Button>
      <Button variant="outlined" color="primary" onClick={onAddVideo}>
        Add Video
      </Button>
    </AccordionDetails>
  </Accordion>
);
export default Chapter;
