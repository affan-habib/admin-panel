import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PhotoIcon from '@mui/icons-material/Photo';
import { IconButton, InputLabel, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface ImageUploadBoxProps {
  name: string;
  label?: string;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);

        const response = await fetch('http://103.209.40.89/api/clms/dev/upload-file', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          helpers.setValue(responseData.data);
          helpers.setTouched(true);
        } else {
          // Handle error if needed
          console.error('Failed to upload image');
        }
      } catch (error) {
        // Handle error if needed
        console.error('Error uploading image', error);
      }
    },
    [helpers]
  );

  const removeFile = () => {
    helpers.setValue(null);
    helpers.setTouched(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const isImageObject = typeof field.value === 'string' && field.value.startsWith('quiz/image-');

  return (
    <>
      {label && (
        <div>
          <InputLabel
            sx={{
              minWidth: 200,
              color: 'black',
              my: 1,
              fontWeight: 500,
            }}
          >
            {label}
          </InputLabel>
        </div>
      )}
      <Box p={3} border={1} borderColor="#ccc" borderRadius={2} mb={2}>
        <Box
          {...getRootProps()}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 150,
            border: '2px dashed #ccc',
            backgroundColor: '#f5f5f7',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          {isImageObject ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div>
                <Typography variant="subtitle1">
                  <strong>{field.value}</strong> -{' '}
                  <IconButton onClick={removeFile}>
                    <Delete />
                  </IconButton>
                </Typography>
              </div>
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <IconButton sx={{ bgcolor: '#DEEEC6', mb: 2 }}>
                <PhotoIcon sx={{ width: 30, height: 30 }} color="primary" />
              </IconButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  sx={{ color: '#1976D2', cursor: 'pointer' }}
                >
                  Click to upload
                </Typography>
                <Typography variant="body1"> or drag and drop</Typography>
              </Stack>
            </Box>
          )}
          {meta.touched && meta.error && (
            <Typography variant="body2" color="red" mt={1}>
              {meta.error}
            </Typography>
          )}
          <input {...getInputProps()} />
        </Box>
      </Box>
    </>
  );
};

export default ImageUploadBox;
