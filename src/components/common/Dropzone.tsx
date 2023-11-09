import React, { FC, SyntheticEvent, useCallback, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Container,
} from '@mui/material';
import { CloudArrowUpIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface FileWithPreview extends File {
  preview?: string;
}

interface ImageDropzoneProps {
  onFileUpload: (files: FileWithPreview[]) => void;
  onFileRemove: (file: FileWithPreview) => void;
}

export const Dropzone: FC<ImageDropzoneProps> = ({
  onFileUpload,
  onFileRemove,
}) => {
  const [selectedImgs, setSelectedImgs] = useState<FileWithPreview[]>([]);

  const readImages = (
    files: FileList,
    callback: (files: FileWithPreview[]) => void,
  ) => {
    const imgs: FileWithPreview[] = [...selectedImgs];
    const readers: FileReader[] = [];
    const filesArray = Array.from(files);
    const fileUploaded = files[0];
    for (let i = 0; i < filesArray.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        (fileUploaded as FileWithPreview).preview = reader.result as string;

        imgs.push(fileUploaded);
        if (readers.every((r) => r.readyState === 2)) {
          callback(imgs);
          onFileUpload(imgs);
        }
      };

      reader.readAsDataURL(filesArray[i]);
      readers.push(reader);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      readImages(files, setSelectedImgs);
    },
    [selectedImgs],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readImages(e.target.files, setSelectedImgs);
    }
  };

  const removeImage = (index: number) => {
    const imgs = [...selectedImgs];
    const removedFile = imgs.splice(index, 1)[0];
    setSelectedImgs(imgs);
    onFileRemove(removedFile);
  };

  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          border: '2px dashed grey',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'auto',
          marginTop: '20px',
          padding: '20px',
          minHeight: '150px',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImgs.length === 0 && (
          <Typography>Drag and Drop to Add Product Images Here</Typography>
        )}
        <Grid container spacing={1}>
          {selectedImgs.map((img, index) => (
            <Grid item xs={3} md={2} key={img.name}>
              <Box
                sx={{ position: 'relative', ':hover .overlay': { opacity: 1 } }}
              >
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 6,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    opacity: 0,
                    transition: '0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                  }}
                >
                  <IconButton color="error" onClick={() => removeImage(index)}>
                    <XCircleIcon height={24} width={24} />
                  </IconButton>
                </Box>
                <Box
                  component="img"
                  src={img.preview}
                  alt="preview"
                  sx={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudArrowUpIcon height={24} width={24} />}
        >
          Upload File
          <input type="file" hidden multiple onChange={handleUploadChange} />
        </Button>
      </Box>
    </Container>
  );
};
