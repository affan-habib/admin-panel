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
  assessment: any;
}

const EditAssignmentDialog: React.FC<EditAssignmentProps> = ({
  open,
  initialData,
  onClose,
  name,
  assessment,
}) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const handleSubmit = async (values: any) => {
    if (!values.supporting_doc) {
      delete values.supporting_doc;
    }

    const formPayload = { ...values, _method: 'PUT', type: 'assignment' };

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
      <DialogTitle>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography color="primary" variant="h6">
            {t('editAssignment')} ({assessment})
          </Typography>
          <IconButton aria-label="close" onClick={onClose} color="error">
            <HighlightOffIcon />
          </IconButton>
        </Grid>
        <Typography
          sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
        >
          {t('time')}{' '}
          <FiberManualRecordIcon
            sx={{
              fontSize: '5px',
              color: 'rgba(100, 100, 100, 1)',
              marginLeft: '5px',
              marginRight: '5px',
            }}
          />{' '}
          {initialData.total_time} {t('minute')}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: '0px', marginTop: '0px' }}>
        <Formik
          initialValues={initialData}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Grid px={2}>
                <InputField
                  name="title_en"
                  label={t('assignmentName')}
                  placeholder={t('assignmentname')}
                />
              </Grid>
              <Grid px={2}>
                <RichTextInput
                  label={t('assignmentInstruct')}
                  name="instructions_en"
                />
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                px={2}
              >
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
              <Grid sx={{}} px={2}>
                <InputFile
                  name="supporting_doc"
                  label={t('assignmentUploadDoc')}
                  limit={t('supDocLimit')}
                  value={values.supporting_doc} // Pass the value directly
                />
              </Grid>
              <Grid
                px={2}
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
                px={2}
                container
                spacing={2}
                alignItems="center"
                sx={{
                  borderBottom: '1px solid rgba(208, 208, 208, 1)',
                  marginTop: 1,
                }}
              >
                <Grid item sx={{ marginBottom: '1px' }}>
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
              <Box p={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: '120px' }}
                >
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

export default EditAssignmentDialog;
