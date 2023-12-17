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
}

const EditAssessmentDialog: React.FC<EditAssessmentDialogProps> = ({
  open,
  initialData,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (values: any) => {
    if (typeof values.url === 'string') {
      delete values.url;
    }

    const formPayload = { ...values, _method: 'PUT', type: 'assessment' };

    try {
      const formData = new FormData();

      Object.keys(formPayload).forEach((key) => {
        formData.append(key, formPayload[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course-assessments/${values.id}`,
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
          {t('addAssesment')}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={initialData}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
            <Grid>
              <InputField
                name="assessment_title"
                label={t('assesmentName')}
                placeholder={t('assesmentNo')}
              />
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: '2px' }}>
              <Grid item xs={6}>
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
                  name="time"
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

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                {t('submit')}
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssessmentDialog;
