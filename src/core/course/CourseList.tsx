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

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'code', accessor: 'code' },
  { Header: 'Name', accessor: 'name' },
  {
    Header: 'Action',
    Cell: (row: any) => (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="view"
          size="small"
          style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '4px',
            border: '1px solid #D0D0D0',
          }}
        >
          <VisibilityIcon sx={{ color: 'primary.main' }} />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="small"
          style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '4px',
            border: '1px solid #D0D0D0',
          }}
        >
          <EditIcon sx={{ color: 'primary.main' }} />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          style={{
            backgroundColor: '#FAFAFA',
            borderRadius: '4px',
            border: '1px solid #D0D0D0',
          }}
        >
          <DeleteIcon sx={{ color: 'error.main' }} />
        </IconButton>
      </Stack>
    ),
  },
];

const CourseList: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: courses } = useCourses({
    itemsPerPage: pageSize,
    page: currentPage + 1, // Adjusted to use 1-based index for the API
    search: '',
  });
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

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
    </Container>
  );
};

export default CourseList;
