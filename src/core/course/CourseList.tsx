// CourseList.tsx
import React, { useState } from 'react';
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Import the ReactTable component
import ReactTable from 'components/tables/ReactTable';
import { Add, FilterList, SaveAlt, Search } from '@mui/icons-material';
import PageSizeSelect from 'components/tables/PageSizeSelect';
import { useNavigate } from 'react-router-dom';
import useCourses from 'hooks/useCourses';
import { useQueryClient } from 'react-query';
import ConfirmModal from 'components/common/ConfirmModal';
import { apiBaseUrl } from 'config';

// Import the ConfirmModal component

const CourseList: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();
  const { data: courses } = useCourses({
    itemsPerPage: pageSize,
    page: currentPage + 1, // Adjusted to use 1-based index for the API
    search: '',
  });
  const navigate = useNavigate();

  // State to handle the modal visibility
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // State to store the video ID to be deleted
  const [videoIdToDelete, setVideoIdToDelete] = useState<number | null>(null);

  // Function to open the confirm modal
  const openConfirmModal = (videoId: number) => {
    setVideoIdToDelete(videoId);
    setIsConfirmModalOpen(true);
  };

  // Function to close the confirm modal
  const closeConfirmModal = () => {
    setVideoIdToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleDeleteClick = async (videoId: any) => {
    // Open the confirm modal
    openConfirmModal(videoId);
  };

  const handleConfirmDelete = async () => {
    if (videoIdToDelete !== null) {
      const apiUrl = `${apiBaseUrl}/course/${videoIdToDelete}`;
      try {
        const response = await fetch(apiUrl, { method: 'DELETE' });

        if (response.ok) {
          queryClient.invalidateQueries('courses');
        } else {
          console.error(`Failed to delete video with ID ${videoIdToDelete}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      closeConfirmModal();
    }
  };

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'code', accessor: 'code' },
    { Header: 'Name', accessor: 'name_bn' },
    { Header: 'Short Description', accessor: 'short_desc_bn' },
    { Header: 'Number of Modules', accessor: 'course_modules_count' },
    {
      Header: 'Action',
      width: 200,
      Cell: (cell: any) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            disabled
            aria-label="view"
            size="small"
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '4px',
              border: '1px solid #D0D0D0',
            }}
          >
            <VisibilityIcon  />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '4px',
              border: '1px solid #D0D0D0',
            }}
            onClick={() => navigate(`/course/edit/${cell.row.original.id}`)}
          >
            <EditIcon sx={{ color: 'primary.main' }} />
          </IconButton>
          <IconButton
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '4px',
              border: '1px solid #D0D0D0',
            }}
            aria-label="Delete"
            size="small"
            color="error"
            onClick={() => handleDeleteClick(cell.row.original.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" color="primary.main" mb={2}>
        পাঠ্যক্রমের তালিকা
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <div>
          <PageSizeSelect
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
          <TextField
            variant="outlined"
            size="small"
            sx={{ width: 450 }}
            placeholder="অনুসন্ধান করুন..."
            InputProps={{
              startAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </div>
        <div>
          <Button variant="outlined" startIcon={<FilterList />} sx={{ mr: 2 }}>
            ফিল্টার করুন
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mr: 2 }}
            onClick={() => navigate('/create-course')}
          >
            পাঠ্যক্রমের যোগ করুন
          </Button>
          <IconButton
            size="small"
            style={{
              backgroundColor: '#FAFAFA',
              borderRadius: '4px',
              border: '1px solid #D0D0D0',
            }}
          >
            <SaveAlt />
          </IconButton>
        </div>
      </Stack>
      {courses?.data?.data && (
        <ReactTable
          columns={columns}
          data={courses?.data?.data}
          totalCount={courses?.data?.total || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmModal}
        message="Are you sure you want to delete this course?"
      />
    </Container>
  );
};

export default CourseList;
