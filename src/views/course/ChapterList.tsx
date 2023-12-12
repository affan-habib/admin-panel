import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
} from '@mui/material';
import CreateVideoDialog from './CreateVideoDialog';
import EditVideoDialog from './EditVideoDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import ModuleActions from './ModuleActions';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import { DragHandle, OpenWith, PlayArrowOutlined } from '@mui/icons-material';
import { useDeleteModal } from 'context/DeleteModalContext';
import { useSnackbar } from 'context/SnackbarContext';
import CustomButton from './CustomButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { useTranslation } from 'react-i18next';
const Chapters: React.FC<any> = ({ modules }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const { openModal } = useDeleteModal();
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
      .then((response: any) => {
        if (response.status === 200) {
          // Handle successful deletion (e.g., update state, UI, etc.)
          console.log(response.data.message, 'ssssssssss');
          showSnackbar(response.data.message, 'success');
          queryClient.invalidateQueries('courseDetails');
          console.log('Module deleted successfully');
        } else {
          showSnackbar('Successfully Deleted', 'success');
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
              alignItems: 'center',
              backgroundColor: '#DEEEC6',
            }}
          >
            <Box mt={1} mr={2}>
              <OpenWith />
            </Box>
            <Typography mt={1}>
              {chapter.module_code} : {chapter.module_name_bn}
            </Typography>
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
                      color="error"
                      onClick={() => openModal(() => handleDeleteClick(el.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              <Stack width="100%" alignItems="center">
                <Typography mt={2}>{t('selectTopic')}</Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <CustomButton
                    onClick={() => handleDialogOpen(chapter.id)}
                    title={t('vdo')}
                    icon={<PlayCircleFilledIcon />}
                  />
                  <CustomButton
                    onClick={() => {}}
                    title={t('assigmnment')}
                    disabled={true}
                    icon={<AssignmentIcon />}
                  />
                  <CustomButton
                    onClick={() => {}}
                    title={t('vdoWithQuiz')}
                    disabled={true}
                    icon={<AssignmentIcon />}
                  />
                  <CustomButton
                    disabled={true}
                    onClick={() => {}}
                    title={t('assesment')}
                    icon={<QuizIcon />}
                  />
                </Stack>
              </Stack>
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
