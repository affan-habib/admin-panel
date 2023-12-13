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
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface FileInputProps {
  label: string;
  name: string;
}

// ... (imports and other code)

const CroppedImgInput: React.FC<FileInputProps> = ({ label, name }) => {
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
    if (image) {
      setOpenModal(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleActualCropSubmit = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();

      canvasScaled.toBlob((blob: any) => {
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
      <input
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      {image && (
        <>
          <Button color="primary" onClick={handleCropSubmit}>
            Crop Image
          </Button>
          <Dialog open={openModal} onClose={handleModalClose}>
            <DialogTitle>Resize Image</DialogTitle>
            <DialogContent>
              <AvatarEditor
                ref={(ref: any) => {
                  if (ref) {
                    editorRef.current = ref;
                  }
                }}
                image={image}
                width={250}
                height={250}
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
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={handleActualCropSubmit} color="primary">
                Crop Image
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CroppedImgInput;

