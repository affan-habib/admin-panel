// ChapterForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface ChapterFormProps {
  onClose: () => void;
  onSubmit: (values: { chapterName: string; chapterCode: string }) => void;
  initialValues?: { chapterName: string; chapterCode: string };
}

const ChapterForm: React.FC<ChapterFormProps> = ({ onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || { chapterName: '', chapterCode: '' },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
    validationSchema: Yup.object().shape({
      chapterName: Yup.string().required('Chapter name is required'),
      chapterCode: Yup.string().required('Chapter code is required'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Add Chapter</DialogTitle>
      <DialogContent>
        <TextField
          id="chapterName"
          label="Chapter Name"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          {...formik.getFieldProps('chapterName')}
          error={formik.touched.chapterName && Boolean(formik.errors.chapterName)}
          helperText={formik.touched.chapterName && formik.errors.chapterName}
        />
        <TextField
          id="chapterCode"
          label="Chapter Code"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          {...formik.getFieldProps('chapterCode')}
          error={formik.touched.chapterCode && Boolean(formik.errors.chapterCode)}
          helperText={formik.touched.chapterCode && formik.errors.chapterCode}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </form>
  );
};

export default ChapterForm;
