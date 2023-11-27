// DynamicFieldArrayForm.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';

interface Field {
  id: string;
  type: string;
  value: string | boolean | FileList | null;
}

const initialValues = {
  fieldArray: [] as Field[],
  selectedType: 'text',
};

const DynamicFieldArrayForm: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('text');
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const addField = () => {
    formik.setValues({
      ...formik.values,
      fieldArray: [
        ...formik.values.fieldArray,
        { id: Date.now().toString(), type: selectedType, value: '' },
      ],
    });
  };

  const removeField = (id: string) => {
    const updatedFieldArray = formik.values.fieldArray.filter(
      (field) => field.id !== id,
    );
    formik.setValues({
      ...formik.values,
      fieldArray: updatedFieldArray,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl variant="outlined" fullWidth>
            <Select
              variant="outlined"
              size="small"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as string)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="file">File</MenuItem>
              {/* Add more input types as needed */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={9}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={addField}
            fullWidth
          >
            Add to Form
          </Button>
        </Grid>
      </Grid>

      <div style={{ marginTop: '10px' }}>
        {formik.values.fieldArray.map((field: Field) => (
          <div key={field.id} style={{ marginBottom: '10px' }}>
            {field.type === 'text' && (
              <TextField
                label="Text Input"
                variant="outlined"
                fullWidth
                value={field.value as string}
                onChange={(e) => {
                  const updatedFieldArray = formik.values.fieldArray.map((f) =>
                    f.id === field.id ? { ...f, value: e.target.value } : f,
                  );
                  formik.setValues({
                    ...formik.values,
                    fieldArray: updatedFieldArray,
                  });
                }}
              />
            )}

            {field.type === 'checkbox' && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value as boolean}
                    onChange={(e) => {
                      const updatedFieldArray = formik.values.fieldArray.map(
                        (f) =>
                          f.id === field.id
                            ? { ...f, value: e.target.checked }
                            : f,
                      );
                      formik.setValues({
                        ...formik.values,
                        fieldArray: updatedFieldArray,
                      });
                    }}
                  />
                }
                label="Checkbox"
              />
            )}

            {field.type === 'file' && (
              <input
                type="file"
                onChange={(e) => {
                  const updatedFieldArray = formik.values.fieldArray.map((f) =>
                    f.id === field.id ? { ...f, value: e.target.files } : f,
                  );
                  formik.setValues({
                    ...formik.values,
                    fieldArray: updatedFieldArray,
                  });
                }}
              />
            )}

            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={() => removeField(field.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default DynamicFieldArrayForm;
