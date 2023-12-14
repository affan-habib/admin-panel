// CourseList.tsx
import React, { useState } from 'react';
import { Container, IconButton, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import useCourses from 'hooks/useCourses';
import { useQueryClient } from 'react-query';
import { apiBaseUrl } from 'config';
import { useDeleteModal } from 'context/DeleteModalContext';
import useDebounce from 'hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import InteractiveTable from 'components/tables/InteractiveTable';

const CourseList: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);
  const queryClient = useQueryClient();
  const { openModal } = useDeleteModal();
  const { t } = useTranslation();
  const language = localStorage.getItem('language');
  const { data: courses } = useCourses({
    itemsPerPage: pageSize,
    page: currentPage, // Adjusted to use 1-based index for the API
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
  console.log(courses?.data);
  const columns = [
    { Header: '#', accessor: (row: any, index: any) => index + 1 },
    { Header: t('code'), accessor: 'code' },
    { Header: t('name'), accessor: `name_${language}` },
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

      {courses?.data && (
        <InteractiveTable
          columns={columns}
          rightButton={{
            title: t('addCurriculum'),
            onClick: () => navigate('/create-course'),
          }}
          data={courses?.data}
          totalCount={courses?.meta?.total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
        />
      )}
    </Container>
  );
};

export default CourseList;
