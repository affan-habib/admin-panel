import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Grid } from '@mui/material';
import InputSelect from 'components/form/InputSelect';
import { useTranslation } from 'react-i18next';
import InputDate from 'components/form/InputDate';
import InputField from 'components/form/InputField';
import { useSnackbar } from 'context/SnackbarContext';
import { apiBaseUrl } from 'config';
import { useNavigate } from 'react-router';
import axiosInstance from 'server/axiosInstance';

const CreateBatch: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const initialValues = {
    batchName: '',
    startDate: new Date(),
    status: 1,
  };

  const validationSchema = Yup.object({
    batchName: Yup.string().required('Batch Name is required'),
    // Add more validations as needed
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await axiosInstance.post(`${apiBaseUrl}/course`, values);
      showSnackbar(response.data.message, 'success');
      navigate(`/course/edit/${response.data.data.id}`);
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
    }
  };  

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <InputField name="batchName" label="Batch Name" placeholder="Enter batch Name" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputDate name="startDate" label="Timeline" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputSelect
                name="status"
                label={t('status')}
                options={[
                  { value: 1, label: 'Active' },
                  { value: 2, label: 'Inactive' },
                  { value: 3, label: 'Draft' },
                  { value: 4, label: 'On Hold' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default CreateBatch;
