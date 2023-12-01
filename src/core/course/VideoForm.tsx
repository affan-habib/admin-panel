// VideoForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CustomTextField from 'components/form/CustomTextField';

interface VideoFormProps {
  onClose: () => void;
  onSubmit: (values: { videoName: string; videoUrl: string }) => void;
  initialValues?: { videoName: string; videoUrl: string };
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || { videoName: '', videoUrl: '' },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
    validationSchema: Yup.object().shape({
      videoName: Yup.string().required('Video name is required'),
      videoUrl: Yup.string().required('Video URL is required'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Add Video</DialogTitle>
      <DialogContent>
        <CustomTextField
          id="videoName"
          label="Video Name"
          placeholder="Video Name"
          sx={{ marginBottom: 2 }}
          {...formik.getFieldProps('videoName')}
          error={formik.touched.videoName && Boolean(formik.errors.videoName)}
          helperText={formik.touched.videoName && formik.errors.videoName}
        />
        <CustomTextField
          id="videoUrl"
          label="Video URL"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          {...formik.getFieldProps('videoUrl')}
          error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
          helperText={formik.touched.videoUrl && formik.errors.videoUrl}
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

export default VideoForm;
