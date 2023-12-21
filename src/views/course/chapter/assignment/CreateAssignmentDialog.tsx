import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  InputLabel,
} from '@mui/material';
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import InputFile from 'components/form/InputFile';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'context/SnackbarContext';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useParams } from 'react-router-dom';
interface CreateAssignmentDialogProps {
  open: boolean;
  moduleId: any;
  onClose: () => void;
  name:any;
}

const CreateAssignmentDialog: React.FC<CreateAssignmentDialogProps> = ({
  open,
  onClose,
  moduleId,
  name
  
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (values: any) => {
    // Remove the "url" key if the value is a string
    if (typeof values.url === 'string') {
      delete values.url;
    }

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course/assignment/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      showSnackbar(response.data.message, 'success');

      queryClient.invalidateQueries('courseDetails');
      onClose();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography color="primary" variant="h6">
          {t('addAssignment')} {name}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={{
            course_id: id,
            course_module_id: moduleId,
            title_en: '',
            instructions_en: '',
            supporting_doc: '',
            mark: '',
            total_time: '',
            status: 1,
            submission_type: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Grid>
                <InputField
                  name="title_en"
                  label={t('addAssignment')}
                  placeholder={t('assignmentname')}
                />
              </Grid>
              <Grid sx={{ marginTop: '15px' }}>
                <InputField
                  name="instructions_en"
                  label={t('assignmentInstruct')}
                  placeholder={t('instruction')}
                />
              </Grid>
              <Grid sx={{ marginTop: '15px' }}>
                <InputFile
                  name="supporting_doc"
                  label="Add Document"
                  acceptedFileTypes=".doc, .docx, .ppt"
                  limit={t('supDocLimit')}
                />
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{ display: 'flex', marginTop: '3px' }}
              >
                <Grid item xs={6}>
                  <InputField
                    name="mark"
                    label={t('assignmentMark')}
                    placeholder={t('assignMarkPlace')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    name="total_time"
                    label={t('assignDuration')}
                    placeholder={t('assignDurationPlace')}
                    type="number"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ borderBottom: '1px solid grey', marginTop: 1 }}
              >
                <Grid item sx={{ marginBottom: '20px' }}>
                  <InputLabel
                    sx={{
                      minWidth: 200,
                      color: 'black',
                      my: 1,
                      fontWeight: 500,
                    }}
                  >
                    {t('assignSubmissionType')}
                  </InputLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.submission_type === 'written'}
                        onChange={() =>
                          setFieldValue('submission_type', 'written')
                        }
                        name="writtenSubmission"
                      />
                    }
                    label={t('assignCheckboxOne')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.submission_type === 'upload'}
                        onChange={() =>
                          setFieldValue('submission_type', 'upload')
                        }
                        name="uploadFile"
                      />
                    }
                    label={t('assignCheckboxTwo')}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {t('submit')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
