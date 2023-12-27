import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Grid,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Box,
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
import RichTextInput from 'components/form/RichTextInput';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
interface EditAssignmentProps {
  open: boolean;
  initialData: any;
  onClose: () => void;
  name: any;
}

const EditAssignmentDialog: React.FC<EditAssignmentProps> = ({
  open,
  initialData,
  onClose,
  name
}) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  console.log(initialData);
  const handleSubmit = async (values: any) => {
    // Remove the "url" key if the value is a string
    if (typeof values.supporting_doc === 'string') {
      delete values.supporting_doc;
    }

    const formPayload = { ...values, _method: 'PUT', type: 'video' };

    try {
      const formData = new FormData();

      Object.keys(formPayload).forEach((key) => {
        formData.append(key, formPayload[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course/assignment/update/${values.id}`,
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

      >
        <Grid sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography color="primary" variant="h6">
            {t('editAssignment')} ({name})
          </Typography>
          <IconButton aria-label="close" onClick={onClose} color="error">
            <HighlightOffIcon />
          </IconButton>
        </Grid>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          {t('time')} <FiberManualRecordIcon sx={{ fontSize: '10px', margin: '8px', color: 'rgba(100, 100, 100, 1)' }} /> {initialData.total_time} {t('minute')}
        </Typography>

      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={initialData}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Grid>
                <InputField
                  name="title_en"
                  label={t('assignmentName')}
                  placeholder={t('assignmentname')}
                />
              </Grid>
              <RichTextInput label={t('assignmentInstruct')} name="instructions_en" />
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <div
                    style={{
                      borderBottom: '1px dashed rgba(208, 208, 208, 1)',
                      width: '100%',
                      textAlign: 'center',
                      margin: '10px 0 20px',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        backgroundColor: '#fff',
                        padding: '0 10px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {t('or')}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{}}>
                <InputFile
                  name="supporting_doc"
                  label={t('assignmentUploadDoc')}
                  acceptedFileTypes=".doc, .docx, .ppt"
                  limit={t('supDocLimit')}
                  value={values.supporting_doc} // Pass the value directly
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
                    name="pass_mark"
                    label={t('assignmentPassMark')}
                    placeholder={t('assignmentpassMarkPlace')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    name="total_time"
                    label={t('assignDuration')}
                    placeholder={t('assignDutrationPlace')}
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
                  {t('save')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssignmentDialog;
