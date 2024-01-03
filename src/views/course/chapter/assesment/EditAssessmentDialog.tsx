import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'context/SnackbarContext';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface EditAssessmentDialogProps {
  open: boolean;
  initialData: any;
  onClose: () => void;
  assessment: any
}

const EditAssessmentDialog: React.FC<EditAssessmentDialogProps> = ({
  open,
  initialData,
  onClose,
  assessment
}) => {
  console.log(assessment);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (values: any) => {
    if (typeof values.url === 'string') {
      delete values.url;
    }

    const formPayload = { ...values, _method: 'PATCH', type: 'assessment' };

    try {
      const formData = new FormData();

      Object.keys(formPayload).forEach((key) => {
        formData.append(key, formPayload[key]);
      });

      const response = await axios.patch(
        `${apiBaseUrl}/course-assessments/${values.id}`,
        values,
        // {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // },
      );
      showSnackbar(response.data.message, 'success');

      queryClient.invalidateQueries('courseDetails');
      onClose();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };
  console.log(initialData);
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
          {t('editAssesment')} ({assessment})
          {/* {t('editAssesment')} {initialData.assessment_title} {assessment} */}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600, padding: '0px' }}>
        <Formik
          initialValues={initialData}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>

            <Grid px={2}>
              <InputField
                name="assessment_title_bn"
                label={t('assesmentName')}
                placeholder={t('assesmentNo')}
              />
            </Grid>

            <Grid px={2}>
              <InputField
                name="assessment_title_en"
                // label={t('assesmentName')}
                label="Assessment Name (English)"
                placeholder={t('assesmentNo')}
              />
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: '2px' }} px={2}>
              <Grid item xs={6} >
                <InputField
                  type="number"
                  name="total_mark"
                  label={t('markInput')}
                  placeholder={t('placeHolderNumber')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  name="pass_mark"
                  label={t('passmarkInput')}
                  placeholder={t('placeHolderNumber')}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              marginBottom={1}
              sx={{ marginTop: '2px' }}
              px={2}
            >
              <Grid item xs={6}>
                <InputField
                  type="number"
                  name="negative_mark"
                  label={t('negativeMarkInput')}
                  placeholder={t('placeHolderNumber')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  type="number"
                  name="total_time"
                  label={t('enterTime')}
                  placeholder={t('placeHolderNumber')}
                />
              </Grid>
            </Grid>

            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                borderBottom="1px solid rgba(208, 208, 208, 1)"
                width="100%"
                sx={{ my: 2 }}
              />
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'end' }} p={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '120px', height: '40px', borderRadius: '8px', }}
              >
                <span style={{ marginTop: '5px' }}>{t('submit')}</span>
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssessmentDialog;
