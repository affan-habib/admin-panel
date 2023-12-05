// components/form/Chapters.tsx
import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
  Button,
  Collapse,
  Box,
} from '@mui/material';
import CreateVideoDialog from './CreateVideoDialog';
import EditVideoDialog from './EditVideoDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VideoIcon from '@mui/icons-material/VideoLibrary';

const Chapters: React.FC<any> = ({ modules }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleEditDialogOpen = (video: any) => {
    setSelectedVideo(video);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => setEditDialogOpen(false);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {modules?.map((chapter: any) => (
        <Accordion
          disableGutters
          key={chapter.module_id}
          expanded={expanded === `panel-${chapter.module_id}`}
          onChange={handleAccordionChange(`panel-${chapter.module_id}`)}
          sx={{ my: 1 }}
        >
          <AccordionSummary
            sx={{
              height: 50,
              display: 'flex',
              justifyContent: 'space-around',
              backgroundColor: '#DEEEC6',
            }}
            expandIcon={
              expanded === `panel-${chapter.module_id}` ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )
            }
          >
            <Typography mt={1}>{chapter.module_name}</Typography>
            <Box ml="auto">
              <IconButton
                aria-label="Edit"
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the accordion from expanding/collapsing
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                size="small"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the accordion from expanding/collapsing
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <Collapse
            in={expanded === `panel-${chapter.module_id}`}
            timeout="auto"
            unmountOnExit
          >
            <AccordionDetails>
              {chapter.course_videos.length > 0 &&
                chapter.course_videos.map((el: any) => (
                  <div
                    key={el.video_id}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <VideoIcon sx={{ marginRight: 1 }} />
                    <Typography sx={{ flexGrow: 1 }}>{el.title}</Typography>
                    <IconButton
                      aria-label="Edit"
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the accordion from expanding/collapsing
                        handleEditDialogOpen(el);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      size="small"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              <Button onClick={handleDialogOpen}>Add Video</Button>
            </AccordionDetails>
          </Collapse>
        </Accordion>
      ))}

      {/* Create Video Dialog */}
      <CreateVideoDialog open={isDialogOpen} onClose={handleDialogClose} />

      {/* Edit Video Dialog */}
      {selectedVideo && (
        <EditVideoDialog
          open={isEditDialogOpen}
          onClose={handleEditDialogClose}
          initialData={selectedVideo}
          // onEdit={handleVideoEdit}
        />
      )}
    </>
  );
};

export default Chapters;
