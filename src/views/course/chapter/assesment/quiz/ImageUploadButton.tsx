import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Delete, FileUpload } from '@mui/icons-material';
import { useSnackbar } from 'context/SnackbarContext';

interface ImageUploadIconProps {
    name: string;
    label?: string;
}

const ImageUploadIcon: React.FC<ImageUploadIconProps> = ({ name, label }) => {
    const [field, meta, helpers] = useField(name);
    const { showSnackbar } = useSnackbar();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            try {
                const formData = new FormData();
                formData.append('image', acceptedFiles[0]);

                const response = await fetch(
                    'http://103.209.40.89/api/clms/dev/upload-file',
                    {
                        method: 'POST',
                        body: formData,
                    },
                );

                if (response.ok) {
                    const responseData = await response.json();
                    helpers.setValue(responseData.data);
                    helpers.setTouched(true);
                    showSnackbar(responseData.message, 'success');
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image', error);
            }
        },
        [helpers, showSnackbar],
    );

    const removeFile = () => {
        helpers.setValue(null);
        helpers.setTouched(false);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            <Box
                {...getRootProps()}
                sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                <IconButton style={{ color: field.value !== "" ? "green" : "inherit" }}>
                    <FileUpload />
                </IconButton>

                {/* {field.value && (
          <IconButton onClick={removeFile}>
            <Delete />
          </IconButton>
        )} */}
            </Box>
            {meta.touched && meta.error && (
                <Typography variant="body2" color="red" mt={1}>
                    {meta.error}
                </Typography>
            )}
        </>
    );
};

export default ImageUploadIcon;