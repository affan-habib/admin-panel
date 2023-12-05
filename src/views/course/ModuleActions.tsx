// components/form/ModuleActions.tsx
import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditChapterDialog from './EditChapterDialog'; // Corrected import path

interface ModuleActionsProps {
  module: any;
}

const ModuleActions: React.FC<ModuleActionsProps> = ({ module }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add logic for delete action if needed
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <Box ml="auto">
        <IconButton
          aria-label="Edit"
          size="small"
          color="primary"
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Delete"
          size="small"
          color="secondary"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* EditChapterDialog component */}
      <EditChapterDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        module={module} // Pass the module as props to the modal
      />
    </>
  );
};

export default ModuleActions;
