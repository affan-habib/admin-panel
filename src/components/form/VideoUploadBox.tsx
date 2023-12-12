import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { InputLabel } from '@mui/material';

interface VideoUploadBoxProps {
  name: string;
  label?: string;
}

const VideoUploadBox: React.FC<VideoUploadBoxProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      helpers.setValue(acceptedFiles[0]);
      helpers.setTouched(true);
    },
    [helpers],
  );

  const removeFile = () => {
    helpers.setValue(null);
    helpers.setTouched(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const isFileObject = field.value instanceof File;

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
      <Box p={4} border={1} borderColor="#ccc" borderRadius={2} mb={2}>
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
          {isFileObject ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography variant="subtitle1">
                <strong>{field.value.name}</strong> -{' '}
                {Math.round(field.value.size / 1024)} KB
              </Typography>
              <Button type="button" onClick={removeFile} variant="outlined">
                Remove
              </Button>
            </Box>
          ) : typeof field.value != 'string' ? (
            <Box
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <OndemandVideoIcon sx={{ width: 50, height: 50 }} />
              <Typography
                variant="body1"
                color="#1976D2"
                sx={{ color: '#1976D2', cursor: 'pointer' }}
              >
                Click to upload
              </Typography>
              <Typography variant="body1">or drag and drop</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography variant="subtitle1">
                <strong>{field.value}</strong> -{' '}
              </Typography>
              <Button type="button" variant="outlined">
                Replace
              </Button>
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

export default VideoUploadBox;
