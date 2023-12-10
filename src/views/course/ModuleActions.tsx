import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditChapterDialog from './EditChapterDialog';
import axios from 'axios'; // Import Axios
import { useQueryClient } from 'react-query';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';

interface ModuleActionsProps {
  module: any;
}

const ModuleActions: React.FC<ModuleActionsProps> = ({ module }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(
        `${apiBaseUrl}/course-module/${module.id}`,
      );

      if (response.status === 200) {
        showSnackbar(response.data.data.message, 'error');
        queryClient.invalidateQueries('courseDetails');
        console.log('Module deleted successfully');
      } else {
        console.error('Failed to delete module');
      }
    } catch (error) {
      console.error('Error occurred while deleting module:', error);
    }
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
          color="error"
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
