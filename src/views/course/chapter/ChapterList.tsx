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
import CreateVideoDialog from './video/CreateVideoDialog';
import EditVideoDialog from './video/EditVideoDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import ChapterActions from './ChapterActions';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { OpenWith } from '@mui/icons-material';
import { useDeleteModal } from 'context/DeleteModalContext';
import { useSnackbar } from 'context/SnackbarContext';
import CustomButton from './CustomButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { useTranslation } from 'react-i18next';
import CreateAssignmentDialog from './assignment/CreateAssignmentDialog';
import CreateAssesmentDialog from './assesment/CreateAssesmentDialog';
import EditAssignmentDialog from './assignment/EditAssignmentDialog';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import axios from 'axios';
import EditAssessmentDialog from './assesment/EditAssessmentDialog';
import AssesmentCreateButtons from './assesment/AssesmentCreateButtons';

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
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [visibleAddTopicId, setVisibleAddTopicId] = useState<any>('');
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

  const handleDeleteClick = (id: any, type: string) => {
    let apiEndpoint;

    if (type === 'video') {
      apiEndpoint = `${apiBaseUrl}/course/video/delete/${id}`;
    } else if (type === 'assignment') {
      apiEndpoint = `${apiBaseUrl}/course/assignment/delete/${id}`;
    }
    //handling assessment delete
    else if (type === 'assessment') {
      apiEndpoint = `${apiBaseUrl}/course-assessments/${id}`;
    } else {
      // Handle other types or show an error
      console.error('Invalid deletion type:', type);
      return;
    }

    axios
      .delete(apiEndpoint)
      .then((response: any) => {
        if (response.status === 200) {
          showSnackbar(response.data.message, 'success');
          queryClient.invalidateQueries('courseDetails');
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
  const [assignmentName, setAssinmentName] =useState('');
  const handleAssignmentDialogOpen = (module_id: any, module_name:any) => {
    setModuleId(module_id);
    setAssinmentName(module_name);
    setAssignmentDialogOpen(true);
  };
  const handleAssignmentDialogClose = () => {
    setAssignmentDialogOpen(false);
  };
  const [isEditAssignmentDialogOpen, setEditAssignmentDialogOpen] =
    useState(false);
  const handleEditAssignmentDialogOpen = (assignment: any) => {
    setselectedAssignment(assignment);
    setEditAssignmentDialogOpen(true);
  };
  const handleEditAssignmentDialogClose = () => {
    setEditAssignmentDialogOpen(false);
  };
  // Assignment dialog End

  //Assessment Dialog
  const [isAssesmentDialogOpen, setAssesmentDialogOpen] = useState(false);
  const [assessmentName,setAssessmentName] = useState('');

  const handleAssesmentDialogOpen = (module_id: any,module_name:any) => {
    setModuleId(module_id);
    setAssessmentName(module_name);
    setAssesmentDialogOpen(true);
  };
  const handleAssesmentDialogClose = () => {
    setAssesmentDialogOpen(false);
  };

  //Edit assessment
  const [isEditAssessmentDialogOpen, setEditAssessmentDialogOpen] =
    useState(false);
  const handleEditAssessmentDialogOpen = (assessment: any) => {
    setSelectedAssessment(assessment);
    setEditAssessmentDialogOpen(true);
  };
  const handleEditAssessmentDialogClose = () => {
    setEditAssessmentDialogOpen(false);
  };

  //Assesssment Category
  const [selectedId, setSelectedId] = useState(-1);
  const toggleAssessmentSection = (id: any) => {
    if (selectedId != id) {
      setSelectedId(id);
    } else {
      setSelectedId(-1);
    }
  };
  return (
    <>
      {modules?.map((chapter: any) => (
        <Accordion
          disableGutters
          key={chapter.module_id}
          sx={{
            border: '1px solid #D0D0D0',
            borderRadius: '4px',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginBottom: '15px',
          }}
          expanded
        >
          <AccordionSummary
            sx={{
              height: 50,
              display: 'flex',
              // justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: '#DEEEC6',
              borderBottom: '1px solid #D0D0D0',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
            }}
          >
            <Box mt={1} mr={2}>
              <OpenWith />
            </Box>
            <Typography mt={1}>
              {chapter.module_code} : {chapter.module_name_bn}
            </Typography>
            <ChapterActions
              module={chapter}
              setVisibleAddTopicId={setVisibleAddTopicId}
              visibleAddTopicId={visibleAddTopicId}
            />
          </AccordionSummary>
          <>
            <AccordionDetails sx={{}}>
              {chapter.course_videos.length > 0 &&
                chapter.course_videos.map((el: any) => (
                  <div
                    key={el.video_id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid #D0D0D0',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    }}
                  >
                    <SmartDisplayOutlinedIcon
                      color="primary"
                      sx={{ marginLeft: 2 }}
                    />
                    <Typography sx={{ flexGrow: 1, marginLeft: 2 }}>
                      {el.title_en}
                    </Typography>
                    <IconButton
                      style={{
                        border: '1px solid rgba(208, 208, 208, 1)',
                        borderRadius: '5px',
                        margin: '4px',
                      }}
                      aria-label="Edit"
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDialogOpen(el);
                      }}
                    >
                      <BorderColorOutlinedIcon />
                    </IconButton>
                    <IconButton
                      style={{
                        border: '1px solid rgba(208, 208, 208, 1)',
                        borderRadius: '5px',
                        margin: '4px',
                      }}
                      aria-label="Delete"
                      size="small"
                      color="error"
                      onClick={() =>
                        openModal(() => handleDeleteClick(el.id, 'video'))
                      }
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
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid #D0D0D0',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    }}
                  >
                    {/* Assignment details */}
                    <AssignmentOutlinedIcon
                      color="primary"
                      sx={{ marginLeft: 2 }}
                    />
                    <Typography sx={{ flexGrow: 1, marginLeft: 2 }}>
                      {assignment.title_en}
                    </Typography>
                    <IconButton
                      style={{
                        border: '1px solid rgba(208, 208, 208, 1)',
                        borderRadius: '5px',
                        margin: '4px',
                      }}
                      aria-label="Edit Assignment"
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAssignmentDialogOpen(assignment);
                      }}
                    >
                      <BorderColorOutlinedIcon />
                    </IconButton>
                    <IconButton
                      style={{
                        border: '1px solid rgba(208, 208, 208, 1)',
                        borderRadius: '5px',
                        margin: '4px',
                      }}
                      aria-label="Delete Assignment"
                      size="small"
                      color="error"
                      onClick={() =>
                        openModal(() =>
                          handleDeleteClick(assignment.id, 'assignment'),
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}

              {/* Assignment Data End */}

              {/* Assesment section start */}

              {chapter.course_assessments.length > 0 &&
                chapter.course_assessments.map((assessment: any) => (
                  <>
                    <div
                      key={assessment.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #D0D0D0',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                      }}
                    >
                      <QuizOutlinedIcon
                        color="primary"
                        sx={{ marginLeft: 2 }}
                      />
                      <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                      <Typography >
                        Assessment {assessment.id} :{' '}
                        {assessment.assessment_title}
                      </Typography>
                      <Typography >
                        {assessment.assessment_title}
                      </Typography>
                      </Box>
                     
                      <Button
                        style={{
                          border: '1px solid rgba(208, 208, 208, 1)',
                          borderRadius: '5px',
                          margin: '4px',
                        }}
                        aria-label="Add Assessment"
                        size="small"
                        onClick={() => toggleAssessmentSection(assessment.id)}
                        variant="contained"
                      >
                        {t('addContent')}
                        {selectedId === assessment.id ? (
                          <RemoveOutlinedIcon />
                        ) : (
                          <AddOutlinedIcon />
                        )}
                      </Button>
                      <IconButton
                        style={{
                          border: '1px solid rgba(208, 208, 208, 1)',
                          borderRadius: '5px',
                          margin: '4px',
                        }}
                        aria-label="Add Assessment"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAssessmentDialogOpen(assessment);
                        }}
                      >
                        <BorderColorOutlinedIcon />
                      </IconButton>
                      <IconButton
                        style={{
                          border: '1px solid rgba(208, 208, 208, 1)',
                          borderRadius: '5px',
                          margin: '4px',
                        }}
                        aria-label="Delete Assignment"
                        size="small"
                        color="error"
                        onClick={() =>
                          openModal(() =>
                            handleDeleteClick(assessment.id, 'assessment'),
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    {selectedId === assessment.id && (
                      <div
                      key={assessment.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        border: '1px dashed #000',
                      }}
                    >
                      <AssesmentCreateButtons
                        assessmentId={assessment.id}
                        moduleId={chapter.id}
                      />
                      <Box alignItems='start' px={1} sx={{marginBottom:'20px'}}>
                        <ClearIcon color='error' style={{cursor:'pointer'}} onClick={toggleAssessmentSection} />
                      </Box>
                    </div>
                    )}
                  </>
                ))}

              {/* Assesment section end  */}

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
                      onClick={() => {
                        handleAssignmentDialogOpen(chapter.id,chapter.module_name_bn);
                      }}
                      title={t('assigmnment')}
                      disabled={false}
                      icon={<AssignmentIcon />}
                    />
                    <CustomButton
                      onClick={() => {}}
                      title={t('vdoWithQuiz')}
                      disabled={true}
                      icon={<AssignmentIcon />}
                    />
                    <CustomButton
                      onClick={() => handleAssesmentDialogOpen(chapter.id,chapter.module_name_bn)}
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
        name={assessmentName}
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
        name={assignmentName}
      />

      {/* Edit Assignment Dialog */}
      {selectedAssignment && (
        <EditAssignmentDialog
          open={isEditAssignmentDialogOpen}
          onClose={handleEditAssignmentDialogClose}
          initialData={selectedAssignment}
          
        />
      )}

      {/* Edit Assessment Dialog */}
      {selectedAssessment && (
        <EditAssessmentDialog
          open={isEditAssessmentDialogOpen}
          onClose={handleEditAssessmentDialogClose}
          initialData={selectedAssessment}
        />
      )}
    </>
  );
};

export default Chapters;
