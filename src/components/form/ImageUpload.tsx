import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { Button, Typography, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ImageUpload = ({ name }: { name: string }) => {
  const { setFieldValue, values } = useFormikContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      // Concatenate the new files with the existing ones
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
      event.target.value = ''; // Clear the input to allow selecting the same files again
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setFieldValue(name, updatedFiles);
  };

  return (
    <div>
      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor={name}>
        <Button variant="outlined" component="span">
          Upload Image(s)
        </Button>
      </label>
      <Grid container spacing={1}>
        {selectedFiles.map((file, index) => (
          <Grid item key={index}>
            <div>
              <img
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
              <IconButton onClick={() => handleRemoveImage(index)} aria-label="Remove Image">
                <RemoveIcon />
              </IconButton>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageUpload;
