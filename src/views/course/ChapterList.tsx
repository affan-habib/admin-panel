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
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';

// ... (other imports)

const Chapters: React.FC<any> = ({ modules }) => {
  const queryClient = useQueryClient();

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
  const handleDeleteClick = (id: any) => {
    fetch(`${apiBaseUrl}/course/material/delete/${id}?type=video`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful deletion (e.g., update state, UI, etc.)
          queryClient.invalidateQueries('courseDetails');
          console.log('Module deleted successfully');
        } else {
          // Handle deletion failure (e.g., show an error message)
          console.error('Failed to delete module');
        }
      })
      .catch((error) => {
        console.error('Error occurred while deleting module:', error);
      });
  };

  const handleEditDialogClose = () => setEditDialogOpen(false);

  return (
    <>
      {modules?.map((chapter: any) => (
        <Accordion
          disableGutters
          key={chapter.module_id}
          sx={{ my: 1 }}
          expanded
        >
          <AccordionSummary
            sx={{
              height: 50,
              display: 'flex',
              justifyContent: 'space-around',
              backgroundColor: '#DEEEC6',
            }}
          >
            <Typography mt={1}>{chapter.module_name_bn}</Typography>
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
                      onClick={() => handleDeleteClick(el.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              <Button
                onClick={() => handleDialogOpen(chapter.id)}
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
              >
                Add Video
              </Button>
              <Button
                variant="contained"
                disabled
                size="small"
                sx={{ mt: 2, ml: 2 }}
              >
                Add Assignment
              </Button>
              {/* <Button
                variant="contained"
                disabled
                size="small"
                sx={{ ml: 2, mt: 2 }}
              >
                Add Quiz
              </Button> */}
              <Button
                variant="contained"
                disabled
                size="small"
                sx={{ mt: 2, ml: 2 }}
              >
                Add Assesnment
              </Button>
              <Button
                disabled
                variant="contained"
                size="small"
                sx={{ ml: 2, mt: 2 }}
              >
                Add Quiz
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
