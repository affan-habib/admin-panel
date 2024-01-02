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
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


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
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(`${apiBaseUrl}/course-module`, values);

      // Handle the response or perform actions as needed
      showSnackbar(response.data.message, 'success');

      queryClient.invalidateQueries('courseDetails');
      onClose();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
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
          border: 'none'
        }}
      >
        <Typography color="primary" variant="h6">
          {t('addChapter')}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ marginTop: '0px' }}>
        <Formik
          initialValues={{
            course_id: id,
            module_code: '',
            // module_code_bn: '',
            module_name_en: '',
            module_name_bn: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container >
              <InputField
                name="module_code"
                label={t('module_code')}
                placeholder="অধ্যায়ের কোড লিখুন"
              />
              <InputField
                name="module_name_bn"
                label={t('module_name_bn')}
                placeholder="অধ্যায়ের নাম লিখুন"
              />
              <InputField
                name="module_name_en"
                label={t('module_name_en')}
                placeholder="Chapter Name"
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ float: 'right', mt: 2, width: '120px' }}
            >
              {t('submit')}
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChapterDialog;
