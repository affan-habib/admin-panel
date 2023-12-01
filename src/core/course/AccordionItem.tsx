// AccordionItem.tsx
import React from 'react';
import { Accordion, AccordionSummary, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete, VideoFile, Assignment } from '@mui/icons-material';

interface AccordionItemProps {
  chapter: {
    chapterName: string;
    chapterCode: string;
    video?: any;
    assessment?: any;
  };
  onRemoveChapter: () => void;
  onAddVideo: () => void;
  onEditVideo: () => void;
  onRemoveVideo: () => void;
  onAddAssessment: () => void;
  onEditAssessment: () => void;
  onRemoveAssessment: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  chapter,
  onRemoveChapter,
  onAddVideo,
  onEditVideo,
  onRemoveVideo,
  onAddAssessment,
  onEditAssessment,
  onRemoveAssessment,
}) => (
  <Accordion disableGutters defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: 50 }} >
      <Typography variant='h5' alignSelf='center'>{chapter.chapterName}</Typography>
      <IconButton
        onClick={onRemoveChapter}
        style={{ marginLeft: 'auto' }}
      >
        <Delete />
      </IconButton>
    </AccordionSummary>
    <Box p={2} border={1} borderColor='lightgrey'>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant={chapter.video ? 'outlined' : 'contained'}
          color="primary"
          onClick={chapter.video ? onEditVideo : onAddVideo}
          sx={{ marginRight: 2 }}
        >
          {chapter.video ? 'Edit Video' : 'Add Video'}
        </Button>

        <Button
          variant={chapter.assessment ? 'outlined' : 'contained'}
          color="secondary"
          onClick={chapter.assessment ? onEditAssessment : onAddAssessment}
        >
          {chapter.assessment ? 'Edit Assessment' : 'Add Assessment'}
        </Button>
      </Box>

      {chapter.video && (
        <div style={{ marginTop: '10px' }}>
          <Stack direction='row' alignItems='center'>
            <VideoFile />
            <Typography variant='subtitle1'>: {chapter.video.videoName}</Typography>
            <IconButton
              onClick={onRemoveVideo}
              style={{ marginLeft: 'auto' }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </div>
      )}

      {chapter.assessment && (
        <div style={{ marginTop: '10px' }}>
          <Stack direction='row' alignItems='center'>
            <Assignment />
            <Typography variant='subtitle1'>: {chapter.assessment.assessmentName}</Typography>
            <IconButton
              onClick={onRemoveAssessment}
              style={{ marginLeft: 'auto' }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </div>
      )}
    </Box>
  </Accordion>
);

export default AccordionItem;
