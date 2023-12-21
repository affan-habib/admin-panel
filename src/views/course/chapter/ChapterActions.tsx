import { Box, Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditChapterDialog from './EditChapterDialog';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import RemoveIcon from '@mui/icons-material/Remove';
const ChapterActions: React.FC<any> = ({
  module,
  setVisibleAddTopicId,
  visibleAddTopicId,
}) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const { t } = useTranslation();
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
        {visibleAddTopicId != module.id ? (
          <Button
            endIcon={<Add />}
            variant="contained"
            sx={{ mr: 2, alignSelf: 'center' }}
            size="small"
            onClick={() => setVisibleAddTopicId(module.id)}
          >
            {t('addTopic')}
          </Button>
        ) : (
          <Button
            endIcon={<RemoveIcon />}
            variant="contained"
            sx={{ mr: 2, alignSelf: 'center' }}
            size="small"
            onClick={() => setVisibleAddTopicId(null)}
          >
            {t('addTopic')}
          </Button>
        )}

        <IconButton
          aria-label="Edit"
          size="small"
          color="primary"
          onClick={handleEditClick}
        >
          <BorderColorOutlinedIcon />
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

export default ChapterActions;
