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

interface CreateVideoDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateVideoDialog: React.FC<CreateVideoDialogProps> = ({
  open,
  onClose,
}) => {
  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course/material/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('API Response:', response.data);
    } catch (error) {
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
          initialValues={{
            type: 'video',
            course_id: 9,
            course_module_id: 3,
            title: 'ss',
            url: null,
            transcript: 'Some Transcript',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              name="title"
              label="ভিডিওর নাম"
              placeholder="ভিডিওর নাম লিখুন"
            />
            <InputFile name="url" label="ভিডিও আপলোড করুন" />

            <InputField
              name="transcript"
              label="ভিডিওর প্রতিলিপি"
              placeholder="ভিডিওর প্রতিলিপি লিখুন"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVideoDialog;
