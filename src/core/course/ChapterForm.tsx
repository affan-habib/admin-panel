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
  onSubmit: (values: {
    chapterName: string;
    chapterCode: string;
    videoName?: string;
    videoUrl?: string;
  }) => void;
  initialValues?: {
    chapterName: string;
    chapterCode: string;
    videoName?: string;
    videoUrl?: string;
  };
  isVideoForm?: boolean;
}

const ChapterForm: React.FC<ChapterFormProps> = ({
  onClose,
  onSubmit,
  initialValues,
  isVideoForm,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
      chapterName: '',
      chapterCode: '',
      videoName: '',
      videoUrl: '',
    },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>{isVideoForm ? 'Add/Edit Video' : 'Add Chapter'}</DialogTitle>
      <DialogContent>
        {!isVideoForm && <>

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
        </>
        }

        {isVideoForm && (
          <>

            <TextField
              id="videoName"
              label="Video Name"
              variant="outlined"
              sx={{ marginBottom: 2 }}
              {...formik.getFieldProps('videoName')}
              error={formik.touched.videoName && Boolean(formik.errors.videoName)}
              helperText={formik.touched.videoName && formik.errors.videoName}
            />

            <TextField
              id="videoUrl"
              label="Video URL"
              variant="outlined"
              sx={{ marginBottom: 2 }}
              {...formik.getFieldProps('videoUrl')}
              error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
              helperText={formik.touched.videoUrl && formik.errors.videoUrl}
            />
          </>
        )}
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
