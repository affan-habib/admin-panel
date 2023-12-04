// components/dialog/CreateChapterDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from 'components/form/CustomTextField';

interface CreateChapterDialogProps {
  open: boolean;
  onClose: () => void;
  onChapterAdded: (chapterName: string) => void;
}

interface FormValues {
  chapterName: string;
  chapterNameBn: string;
  chapterCode: string;
}

const validationSchema = Yup.object().shape({
  chapterName: Yup.string().required('Chapter Name is required'),
  chapterNameBn: Yup.string().required('অধ্যায়ের নাম প্রয়োজন'),
  chapterCode: Yup.string().required('Chapter Code is required'),
});

const CreateChapterDialog: React.FC<CreateChapterDialogProps> = ({
  open,
  onClose,
  onChapterAdded,
}) => {
  const formik = useFormik({
    initialValues: {
      chapterName: '',
      chapterNameBn: '',
      chapterCode: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      formik.resetForm();
      onChapterAdded(values.chapterName);
      onClose();
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            fullWidth
            id="chapterName"
            name="chapterName"
            label="Chapter Name (English)"
            placeholder="Enter chapter name in English"
            value={formik.values.chapterName}
            onChange={formik.handleChange}
            error={
              formik.touched.chapterName && Boolean(formik.errors.chapterName)
            }
            helperText={formik.touched.chapterName && formik.errors.chapterName}
          />
          <CustomTextField
            fullWidth
            id="chapterNameBn"
            name="chapterNameBn"
            label="অধ্যায়ের নাম (বাংলা)"
            placeholder="বাংলায় অধ্যায়ের নাম লিখুন"
            value={formik.values.chapterNameBn}
            onChange={formik.handleChange}
            error={
              formik.touched.chapterNameBn &&
              Boolean(formik.errors.chapterNameBn)
            }
            helperText={
              formik.touched.chapterNameBn && formik.errors.chapterNameBn
            }
          />
          <CustomTextField
            fullWidth
            id="chapterCode"
            name="chapterCode"
            label="Chapter Code"
            placeholder="Enter chapter code"
            value={formik.values.chapterCode}
            onChange={formik.handleChange}
            error={
              formik.touched.chapterCode && Boolean(formik.errors.chapterCode)
            }
            helperText={formik.touched.chapterCode && formik.errors.chapterCode}
          />
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChapterDialog;
