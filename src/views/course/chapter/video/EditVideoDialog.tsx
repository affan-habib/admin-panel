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
  FormControl,
  Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import RichTextInput from 'components/form/RichTextInput';
import { useSnackbar } from 'context/SnackbarContext';
import VideoUploadBox from 'components/form/VideoUploadBox';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import AttachFileIcon from '@mui/icons-material/AttachFile';
interface CreateVideoDialogProps {
  open: boolean;
  initialData: any;
  onClose: () => void;
}

const CreateVideoDialog: React.FC<CreateVideoDialogProps> = ({
  open,
  onClose,
  initialData,
}) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSubmit = async (values: any) => {
    // Remove the "url" key if the value is a string
    if (typeof values.url === 'string') {
      delete values.url;
    }

    const formPayload = { ...values, _method: 'PUT', type: 'video' };

    try {
      const formData = new FormData();

      Object.keys(formPayload).forEach((key) => {
        formData.append(key, formPayload[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course/video/update/${values.id}`,
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
          border:'none'
        }}
      >
        <Typography color="primary" variant="h6">
          {t('updateVedio')}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
        <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: isSmallScreen ? '100%' : 600, marginTop: '0px' }}>
        <Formik
          initialValues={initialData}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
          <InputField
              name="title_en"
              label={t('videoName')}
              placeholder={t('WritevideoName')}
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
              <InputLabel htmlFor="url_link">{t('videoLink')}</InputLabel>
            <FormControl fullWidth size="small">
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    display: 'flex',
                    border: '1px solid rgba(208, 208, 208, 1)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <input
                    style={{
                      flex: 1,
                      padding: '14.5px',
                      border: 'none',
                      backgroundColor: 'rgba(245, 247, 248, 1)',
                      borderLeft: 'none'
                    }}
                    name='url_link' placeholder={t('writeVideolink')}
                    // label={t('videoLink')}
                  />
                  <Box 
                    sx={{
                      p: '10px',
                      borderRight: 'none',
                      backgroundColor: 'rgba(0, 106, 78, 1)',
                      flexShrink: 0,
                    }}
                  >
                    <Typography align="center" sx={{ color: 'white' }} p={0}>
                      <AttachFileIcon />
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </FormControl> 
            <RichTextInput label={t('videotranscript')} name="transcript_en" />
            <Box p={2} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" variant="contained" sx={{ width: '120px' }}>
                {t('submit')}
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVideoDialog;
