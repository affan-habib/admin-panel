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
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'context/SnackbarContext';

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
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (values : any) =>{
    console.log('Form values:', values);
  }

  // const handleSubmit = async (
  //   values: any,
  //   { setSubmitting }: FormikHelpers<any>,
  // ) => {
  //   try {
  //     const formData = new FormData();

  //     Object.keys(values).forEach((key) => {
  //       formData.append(key, values[key]);
  //     });

  //     const response = await axios.post(
  //       `${apiBaseUrl}/course/material/create`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );
  //     showSnackbar(response.data.message, 'success');

  //     console.log('API Response:', response.data);

  //     // Invalidate the query coursedetails using React Query
  //     queryClient.invalidateQueries('courseDetails');

  //     // Close the dialog after successful submission
  //     onClose();
  //   } catch (error: any) {
  //     console.error('Error submitting form:', error);
  //     showSnackbar(error.response.data.message, 'error');
  //   } finally {
  //     // Ensure to set submitting to false even if an error occurs
  //     setSubmitting(false);
  //   }
  // };

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
          এসেসমেন্ট যোগ করুন (কারবালা প্রান্তর)
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Formik
          initialValues={{
            assesmentTitle: '',
            course_id: id,
            mark:'',
            passMark:'',
            negativeMark:'',
            time:'',
            course_module_id: moduleId,
            url: null,
            status: 1,
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              name="assesmentTitle"
              label="এসেসমেন্টের নাম"
              placeholder="এসেসমেন্ট ১"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputField
                  name="mark"
                  label="মার্ক ইনপুট দিন"
                  placeholder="১"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  name="passMark"
                  label="পাস মার্ক ইনপুট দিন"
                  placeholder="১"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputField
                  name="negativeMark"
                  label="নেগেটিভ মার্ক ইনপুট দিন"
                  placeholder="১"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  name="time"
                  label="সময় ইনপুট দিন"
                  placeholder="১"
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssesmentDialog;
