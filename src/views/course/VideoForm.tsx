// VideoForm.tsx
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

const validationSchemaVideo = Yup.object().shape({
  videoTitle: Yup.string().required('Video title is required'),
  videoUrl: Yup.string().url('Invalid URL').required('Video URL is required'),
});

interface VideoFormProps {
  onClose: () => void;
  onSubmit: (values: { videoTitle: string; videoUrl: string }) => void;
  initialValues?: { videoTitle: string; videoUrl: string };
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || { videoTitle: '', videoUrl: '' },
    validationSchema: validationSchemaVideo,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Add Video</DialogTitle>
      <DialogContent>
        <TextField
          id="videoTitle"
          name="videoTitle"
          label="Video Title"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          {...formik.getFieldProps('videoTitle')}
          error={formik.touched.videoTitle && Boolean(formik.errors.videoTitle)}
          helperText={formik.touched.videoTitle && formik.errors.videoTitle}
        />

        <TextField
          id="videoUrl"
          name="videoUrl"
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
