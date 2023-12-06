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
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { apiBaseUrl } from 'config';

interface CreateChapterDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateChapterDialog: React.FC<CreateChapterDialogProps> = ({
  open,
  onClose,
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const handleSubmit = async (values: any) => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(`${apiBaseUrl}/course-module`, values);

      // Handle the response or perform actions as needed
      console.log('API Response:', response.data);
      queryClient.invalidateQueries('courseDetails');
      onClose();
    } catch (error) {
      // Handle error, log it, or display a message to the user
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
            course_id: id,
            module_code: '',
            module_code_bn: '',
            module_name: '',
            module_name_bn: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              name="module_code_bn"
              label="অধ্যায়ের কোড"
              placeholder="অধ্যায়ের কোড লিখুন"
            />
            <InputField
              name="module_code"
              label="Module Code"
              placeholder="Chapter Name (English)"
            />
            <InputField
              name="module_name_bn"
              label="অধ্যায়ের নাম"
              placeholder="অধ্যায়ের নাম লিখুন"
            />
            <InputField
              name="module_name"
              label="Chapter Name (English)"
              placeholder="Chapter Name"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChapterDialog;
