// AccordionItem.tsx
import React from 'react';
import { Accordion, AccordionSummary, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete, Edit, VideoFile } from '@mui/icons-material';

interface AccordionItemProps {
  chapter: {
    chapterName: string;
    chapterCode: string;
    video?: any;
  };
  onRemoveChapter: () => void;
  onAddVideo: () => void;
  onEditVideo: () => void;
  onRemoveVideo: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  chapter,
  onRemoveChapter,
  onAddVideo,
  onEditVideo,
  onRemoveVideo,
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
      <Button
        size='small'
        variant="outlined"
        color="primary"
        onClick={onAddVideo}
      >
        {chapter.video ? 'Edit Video' : 'Add Video'}
      </Button>
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
    </Box>
  </Accordion>
);

export default AccordionItem;
