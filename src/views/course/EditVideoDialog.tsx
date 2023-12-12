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
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import InputFile from 'components/form/InputFile';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import RichTextInput from 'components/form/RichTextInput';
import { useSnackbar } from 'context/SnackbarContext';
import VideoUploadBox from 'components/form/VideoUploadBox';

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
        `${apiBaseUrl}/course/material/update/${values.id}`,
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
      console.log('API Response:', response.data);
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
          অধ্যায় যোগ করুন
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={initialData}
          onSubmit={handleSubmit}
          enableReinitialize
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
