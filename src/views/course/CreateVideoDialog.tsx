import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import InputFile from 'components/form/InputFile';
import { apiBaseUrl } from 'config';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import RichTextInput from 'components/form/RichTextInput';
import { useSnackbar } from 'context/SnackbarContext';
import VideoUploadBox from 'components/form/VideoUploadBox';

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

      console.log('API Response:', response.data);

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
          অধ্যায় যোগ করুন
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={{
            type: 'video',
            course_id: id,
            course_module_id: moduleId,
            title: '',
            url: null,
            status: 1,
            transcript: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              name="title"
              label="ভিডিওর নাম"
              placeholder="ভিডিওর নাম লিখুন"
            />
            <VideoUploadBox name="url" label="ভিডিও আপলোড করুন" />
            <RichTextInput label="ভিডিওর প্রতিলিপি" name="transcript" />
            <Button type="submit" variant="contained" sx={{ float: 'right' }}>
              Submit
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVideoDialog;
