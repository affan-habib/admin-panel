import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Form, Formik, FormikHelpers } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import RichTextInput from 'components/form/RichTextInput';
import { useSnackbar } from 'context/SnackbarContext';
import VideoUploadBox from 'components/form/VideoUploadBox';
import { useTranslation } from 'react-i18next';

interface CreateVideoDialogProps {
  open: boolean;
  moduleId: any;
  onClose: () => void;
}

const CreateVideoDialog: React.FC<CreateVideoDialogProps> = ({
  open,
  moduleId,
  onClose,
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course/video/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      showSnackbar(response.data.message, 'success');

      // Invalidate the query coursedetails using React Query
      queryClient.invalidateQueries('courseDetails');

      // Close the dialog after successful submission
      onClose();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      showSnackbar(error.response.data.message, 'error');
    } finally {
      // Ensure to set submitting to false even if an error occurs
      setSubmitting(false);
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
          {t('addChapter')}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
        <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={{
            type: 'video',
            course_id: id,
            course_module_id: moduleId,
            title_en: '',
            url: null,
            status: 1,
            transcript_en: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              name="title_en"
              label={t('videoName')}
              placeholder={t('videoName')}
            />
            <VideoUploadBox name="url" label={t('uploadVideo')} />
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
              <InputField name='url_link' label={t('videoLink')} placeholder={t('writeVideolink')}/> 
            <RichTextInput label={t('videoTransacript')} name="transcript_en" />
            
            <Button type="submit" variant="contained" sx={{ float: 'right'}}>
            {t('submit')}
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVideoDialog;
