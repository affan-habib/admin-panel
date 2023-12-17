// FileInput.tsx

import React, { useCallback, useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useField } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface FileInputProps {
  label: string;
  name: string;
  limit?: string;
  height?: number;
  width?: number;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, limit, height = 250, width = 250 }) => {
  const [, , helpers] = useField(name);
  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setImage(file);
        setOpenModal(true);
      }
    },
    [],
  );

  const handleScaleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setScale(parseFloat(e.target.value));
    },
    [],
  );

  const handleCropSubmit = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();

      canvasScaled.toBlob((blob) => {
        if (blob) {
          helpers.setValue(blob);
        }
      }, 'image/jpeg');
    }

    setOpenModal(false);
  };

  return (
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
      <TextField
        fullWidth
        size="small"
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        inputProps={{
          accept: "image/*", // Set accepted file types
        }}
      />
      {limit && <span style={{ fontSize: '13px', color: 'grey' }}>{limit}</span>}
      {image && (
        <>
          {/* <IconButton color="primary" onClick={() => setOpenModal(true)}>
            <PhotoCameraIcon />
          </IconButton> */}
          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle>Resize Image</DialogTitle>
            <DialogContent>
              <AvatarEditor
                ref={(ref) => {
                  if (ref) {
                    editorRef.current = ref;
                  }
                }}
                image={image}
                width={width}
                height={height}
                border={50}
                scale={scale}
              />
              <div>
                <label>Scale:</label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={handleScaleChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button onClick={handleCropSubmit} color="primary">
                Crop Image
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default FileInput;
