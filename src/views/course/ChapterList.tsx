import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import CreateVideoDialog from './CreateVideoDialog';
import EditVideoDialog from './EditVideoDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import ModuleActions from './ModuleActions';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import { DragHandle, OpenWith } from '@mui/icons-material';
import { useDeleteModal } from 'context/DeleteModalContext';
import { useSnackbar } from 'context/SnackbarContext';

// ... (other imports)

const Chapters: React.FC<any> = ({ modules }) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { openModal } = useDeleteModal();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [moduleId, setModuleId] = useState();

  const handleDialogOpen = (module_id: any) => {
    setModuleId(module_id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleEditDialogOpen = (video: any) => {
    setSelectedVideo(video);
    setEditDialogOpen(true);
  };
  const handleDeleteClick = (id: any) => {
    fetch(`${apiBaseUrl}/course/material/delete/${id}?type=video`, {
      method: 'DELETE',
    })
      .then((response: any) => {
        if (response.status === 200) {
          // Handle successful deletion (e.g., update state, UI, etc.)
          console.log(response.data.message, 'ssssssssss');
          showSnackbar(response.data.message, 'success');
          queryClient.invalidateQueries('courseDetails');
          console.log('Module deleted successfully');
        } else {
          showSnackbar('Successfully Deleted', 'success');
          // Handle deletion failure (e.g., show an error message)
          console.error('Failed to delete module');
        }
      })
      .catch((error) => {
        console.error('Error occurred while deleting module:', error);
      });
  };

  const handleEditDialogClose = () => setEditDialogOpen(false);

  return (
    <>
      <div className="max-w-xs bg-white shadow-md p-4 mb-4">
        <p className="text-lg font-semibold">Card 1</p>
        <p>Card 1 content goes here...</p>
      </div>
    </>
  );
};

export default Chapters;
