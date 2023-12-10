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
import { apiBaseUrl } from 'config';
import { useDeleteModal } from 'context/DeleteModalContext';
import useDebounce from 'hooks/useDebounce';
import { useTranslation } from 'react-i18next';

// Import the ConfirmModal component

const CourseList: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);
  const queryClient = useQueryClient();
  const { openModal } = useDeleteModal();
  const {t} = useTranslation();

  const { data: courses } = useCourses({
    itemsPerPage: pageSize,
    page: currentPage + 1, // Adjusted to use 1-based index for the API
    search: search,
  });
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleDeleteClick = async (videoId: any) => {
    const apiUrl = `${apiBaseUrl}/course/${videoId}`;
    try {
      const response = await fetch(apiUrl, { method: 'DELETE' });

      if (response.ok) {
        queryClient.invalidateQueries('courses');
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns = [
    { Header: t('id'), accessor: 'id' },
    { Header: t('code'), accessor: 'code' },
    { Header: t('name'), accessor: 'name_bn' },
    // { Header: 'Short Description', accessor: 'short_desc_bn' },
    { Header: t('numberOfModule'), accessor: 'course_modules_count' },
    {
      Header: t('action'),
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
            <VisibilityIcon />
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
            onClick={() =>
              openModal(() => handleDeleteClick(cell.row.original.id))
            }
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
        {t('curriculumList')}
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
            placeholder= {t('searchList')}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Button variant="outlined" startIcon={<FilterList />} sx={{ mr: 2 }}>
            {t('filterList')}
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mr: 2 }}
            onClick={() => navigate('/create-course')}
          >
            {t('addCurriculum')}
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
    </Container>
  );
};

export default CourseList;
