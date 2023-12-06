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

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Serial No', accessor: 'serialNo' },
  { Header: 'Batch Name', accessor: 'batchName' },
  { Header: 'Batch Description', accessor: 'batchDescription' },
  { Header: 'Number of Trainees', accessor: 'numberOfTrainee' },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: ({ row }: any) => (
      <>
        <IconButton aria-label="view" size="small">
          <VisibilityIcon />
        </IconButton>
        <IconButton aria-label="edit" size="small">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const rows = [
  {
    id: 1,
    serialNo: 1,
    batchName: 'Batch 1',
    batchDescription: 'Description for Batch 1 dev tested',
    numberOfTrainee: 25,
  },
  // Add more rows as needed
];

const CourseList: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset current page when changing page size
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
      <ReactTable
        columns={columns}
        data={rows}
        totalCount={40}
        pageSize={pageSize}
        currentPage={0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Container>
  );
};

export default CourseList;
