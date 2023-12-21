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
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'context/SnackbarContext';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { apiBaseUrl } from 'config';
import axios from 'axios';

interface CreateAssesmentDialogProps {
  open: boolean;
  moduleId: any;
  onClose: () => void;
}

const CreateAssesmentDialog: React.FC<CreateAssesmentDialogProps> = ({
  open,
  moduleId,
  onClose,
}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const handleSubmit = async (values: any) => {
    if (typeof values.url === 'string') {
      delete values.url;
    }
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course-assessments`,
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
          initialValues={{
            course_id: id,
            // mark: '',
            // passMark: '',
            // negativeMark: '',
            // time: '',
            course_module_id: moduleId,
            url: null,
            status: 1,
            module_id: moduleId,
            assessment_title: '',
            total_mark: '',
            pass_mark: '',
            positive_mark: 15,
            negative_mark: '',
            total_time: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              name="assessment_title"
              label={t('assesmentName')}
              placeholder={t('assesmentNo')}
            />
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

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" variant="contained" sx={{ mt: 1 }}>
                {t('submit')}
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssesmentDialog;