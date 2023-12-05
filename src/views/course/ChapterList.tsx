import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import CreateVideoDialog from './CreateVideoDialog';
import EditVideoDialog from './EditVideoDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import ModuleActions from './ModuleActions';

// ... (other imports)

const Chapters: React.FC<any> = ({ modules }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [moduleId, setModuleId] = useState();

  const handleDialogOpen = (module_id: any) => {
    setModuleId(module_id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleEditDialogOpen = (video: any) => {
    setSelectedVideo(video);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => setEditDialogOpen(false);

  return (
    <>
      {modules?.map((chapter: any) => (
        <Accordion disableGutters key={chapter.module_id} sx={{ my: 1 }}>
          <AccordionSummary
            sx={{
              height: 50,
              display: 'flex',
              justifyContent: 'space-around',
              backgroundColor: '#DEEEC6',
            }}
          >
            <Typography mt={1}>{chapter.module_name}</Typography>
            <ModuleActions module={chapter} />
          </AccordionSummary>
          <>
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
                        e.stopPropagation();
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
              <Button onClick={() => handleDialogOpen(chapter.id)}>
                Add Video
              </Button>
            </AccordionDetails>
          </>
        </Accordion>
      ))}

      {/* Create Video Dialog */}
      <CreateVideoDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        moduleId={moduleId}
      />

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
