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
import { Close } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { apiBaseUrl } from 'config';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


interface CreateChapterDialogProps {
  open: boolean;
  onClose: () => void;
  module: any;
}

const EditChapterDialog: React.FC<CreateChapterDialogProps> = ({
  open,
  onClose,
  module,
}) => {
  const queryClient = useQueryClient();

  const handleSubmit = async (values: any) => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.put(
        `${apiBaseUrl}/course-module/${values.id}`,
        values,
      );

      // Handle the response or perform actions as needed
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
          border:'none'
        }}
      >
        <Typography color="primary" variant="h6">
          অধ্যায় আপডেট করুন
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
        <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{marginTop:'0px'}}>
        <Formik initialValues={module} onSubmit={handleSubmit}>
          <Form>
            <Grid container>
            <InputField
              name="module_code"
              label="অধ্যায়ের কোড"
              placeholder="অধ্যায়ের কোড লিখুন"
            />
            <InputField
              name="module_name_bn"
              label="অধ্যায়ের নাম"
              placeholder="অধ্যায়ের নাম লিখুন"
            />
            <InputField
              name="module_name_en"
              label="Chapter Name (English)"
              placeholder="Chapter Name"
            />
            </Grid>
            <Button type="submit" variant="contained" sx={{float: 'right', mt: 2,width:'120px' }}>
              Submit
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapterDialog;
