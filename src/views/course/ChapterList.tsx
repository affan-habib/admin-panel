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
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import {
  Add,
  DragHandle,
  OpenWith,
  PlayArrowOutlined,
} from '@mui/icons-material';
import { useDeleteModal } from 'context/DeleteModalContext';
import { useSnackbar } from 'context/SnackbarContext';
import CustomButton from './CustomButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { useTranslation } from 'react-i18next';
import CreateAssignmentDialog from './CreateAssignmentDialog';
import CreateAssesmentDialog from './CreateAssesmentDialog';
import EditAssignmentDialog from './EditAssignmentDialog';

const Chapters: React.FC<any> = ({ modules }) => {
  console.log(modules);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const { openModal } = useDeleteModal();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedAssignment, setselectedAssignment] = useState<any>(null);
  const [visibleAddTopicId, setVisibleAddTopicId] = useState<any>('');
  const [moduleId, setModuleId] = useState();

  //assesment modal state
  const [isAssesmentDialogOpen, setAssesmentDialogOpen] = useState(false);

  //assesment modal handling function
  const handleAssesmentDialogOpen = (module_id: any) => {
    setModuleId(module_id);
    setAssesmentDialogOpen(true);
  };
  const handleAssesmentDialogClose = () => {
    setAssesmentDialogOpen(false)
  }

  const handleDialogOpen = (module_id: any) => {
    setModuleId(module_id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleEditDialogOpen = (video: any) => {
    setSelectedVideo(video);
    setEditDialogOpen(true);
  };
  const handleDeleteClick = (id: any, type: string) => {
    let apiEndpoint;
  
    if (type === 'video') {
      apiEndpoint = `${apiBaseUrl}/course/video/delete/${id}?type=video`;
    } else if (type === 'assignment') {
      apiEndpoint = `${apiBaseUrl}/course/assignment/delete/${id}?type=assignment`;
    } else {
      // Handle other types or show an error
      console.error('Invalid deletion type:', type);
      return;
    }
  
    fetch(apiEndpoint, {
      method: 'DELETE',
    })
      .then((response: any) => {
        if (response.status === 200) {
          // Handle successful deletion (e.g., update state, UI, etc.)
          console.log(response.data.message, 'ssssssssss');
          showSnackbar(response.data.message, 'success');
          queryClient.invalidateQueries('courseDetails');
          console.log(`${type} deleted successfully`);
          window.location.reload();
        } else {
          showSnackbar(`Failed to delete ${type}`, 'error');
          console.error(`Failed to delete ${type}`);
        }
      })
      .catch((error) => {
        console.error(`Error occurred while deleting ${type}:`, error);
      });
  };
  

  const handleEditDialogClose = () => setEditDialogOpen(false);

    // Assignment dialog start
  const [isAssignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const handleAssignmentDialogOpen = (module_id: any) => {
    setModuleId(module_id);
    setAssignmentDialogOpen(true);
  };
  const handleAssignmentDialogClose = () => {
    setAssignmentDialogOpen(false)
  }
  const [isEditAssignmentDialogOpen, setEditAssignmentDialogOpen] = useState(false);
  const handleEditAssignmentDialogOpen = (assignment: any) => {
    setselectedAssignment(assignment);
    setEditAssignmentDialogOpen(true);
  };
  const handleEditAssignmentDialogClose = () => {
    setEditAssignmentDialogOpen(false)
  }
   // Assignment dialog End
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
              // justifyContent: 'space-around',
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
            <ModuleActions
              module={chapter}
              setVisibleAddTopicId={setVisibleAddTopicId}
              visibleAddTopicId={visibleAddTopicId}
            />
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
                      onClick={() => openModal(() => handleDeleteClick(el.id,'video'))}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </div>

                ))}

                {/* Assignment Data Start */}
              {chapter.course_assignments.length > 0 &&
                chapter.course_assignments.map((assignment: any) => (
                  <div
                    key={assignment.assignment_id}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {/* Assignment details */}
                    <AssignmentOutlinedIcon sx={{ marginRight: 1 }} />
                    <Typography sx={{ flexGrow: 1 }}>{assignment.title_en}</Typography>
                    <IconButton
                      aria-label="Edit Assignment"
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAssignmentDialogOpen(assignment);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete Assignment"
                      size="small"
                      color="error"
                      onClick={() => openModal(() => handleDeleteClick(assignment.id, 'assignment'))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
                {/* Assignment Data End */}

              {chapter.id === visibleAddTopicId && (
                <Stack width="100%" alignItems="center">
                  <Typography mt={2}>{t('selectTopic')}</Typography>
                  <Stack direction="row" spacing={2} mt={2}>
                    <CustomButton
                      onClick={() => handleDialogOpen(chapter.id)}
                      title={t('vdo')}
                      icon={<PlayCircleFilledIcon />}
                    />
                    <CustomButton
                      onClick={() => { handleAssignmentDialogOpen(chapter.id) }}
                      title={t('assigmnment')}
                      disabled={false}
                      icon={<AssignmentIcon />}
                    />
                    <CustomButton
                      onClick={() => { }}
                      title={t('vdoWithQuiz')}
                      disabled={true}
                      icon={<AssignmentIcon />}
                    />
                    <CustomButton
                      onClick={() => handleAssesmentDialogOpen(chapter.id)}
                      title={t('assesment')}
                      icon={<QuizIcon />}
                    />
                  </Stack>
                </Stack>
              )}
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

      {/* Create assesment dialog */}
      <CreateAssesmentDialog
        open={isAssesmentDialogOpen}
        onClose={handleAssesmentDialogClose}
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

      {/* Assignment Dialog */}
      <CreateAssignmentDialog
        open={isAssignmentDialogOpen}
        onClose={handleAssignmentDialogClose}
        moduleId={moduleId}
      />
      

       {/* Edit Assignment Dialog */}
      {selectedAssignment && (
        <EditAssignmentDialog
          open={isEditAssignmentDialogOpen}
          onClose={handleEditAssignmentDialogClose}
          initialData={selectedAssignment}
       
        />
      )}
    </>
  );
};

export default Chapters;
