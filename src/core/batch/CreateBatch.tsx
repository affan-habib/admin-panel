import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  Grid,
} from '@mui/material';
import InputSelect from 'components/form/InputSelect';
import { useTranslation } from 'react-i18next';
import InputDate from 'components/form/InputDate';
import InputField from 'components/form/InputField';
import { useSnackbar } from 'context/SnackbarContext';

const CreateBatch: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar()
  const initialValues = {
    batchName: '',
    startDate: new Date(),
    status: 1,
  };

  const validationSchema = Yup.object({
    batchName: Yup.string().required('English field is required'),
    // Add more validations as needed
  });


  const handleSubmit = (values: any, actions: any) => {
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
    showSnackbar(JSON.stringify(values), 'success')
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
            <Grid item xs={6} md={4}>
              <InputField name="batchName" label="Batch Name" placeholder='Enter batch Name' required/>
            </Grid>
            <Grid item xs={6} md={4}>
              <InputDate name="startDate" label="Timeline"/>
            </Grid>
            <Grid item xs={6} md={4}>
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
            <Grid item xs={6} md={4}>
              <Button type='submit' variant='contained'>Submit</Button >
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default CreateBatch;
