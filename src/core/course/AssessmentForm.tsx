// AssessmentForm.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Checkbox,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import CustomTextField from 'components/form/CustomTextField';

interface AssessmentFormProps {
  onClose: () => void;
  onSubmit: (values: { assessmentName: string; options: string[]; }) => void;
  initialValues?: { assessmentName: string; options: string[]; };
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onClose, onSubmit, initialValues }) => {
  const [options, setOptions] = useState<string[]>(initialValues?.options || ['', '']);

  const formik = useFormik({
    initialValues: initialValues || { assessmentName: '', options: [''] },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
    validationSchema: Yup.object().shape({
      assessmentName: Yup.string().required('Assessment name is required'),
    }),
  });

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Add Assessment</DialogTitle>
      <DialogContent>
        <CustomTextField
          id="assessmentName"
          variant="outlined"
          label="Assessment Name"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...formik.getFieldProps('assessmentName')}
          error={formik.touched.assessmentName && Boolean(formik.errors.assessmentName)}
          helperText={formik.touched.assessmentName && formik.errors.assessmentName}
        />

        {options.map((option, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
            <Checkbox
              checked={false} // You can manage the checkbox state here if needed
              onChange={() => { /* Handle checkbox change if needed */ }}
            />
            <CustomTextField
              id={`option-${index}`}
              variant="outlined"
              fullWidth
              value={option}
              onChange={(e: any) => handleOptionChange(index, e.target.value)}
            />
            <IconButton onClick={() => handleRemoveOption(index)}>
              <Delete />
            </IconButton>
          </Stack>
        ))}

        <Button onClick={handleAddOption} variant='outlined'>
          Add new option
        </Button>
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

export default AssessmentForm;
