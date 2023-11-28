import React from 'react';
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MuiTable from 'components/tables/MuiTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridColDef } from '@mui/x-data-grid';
import { Add, FilterList, SaveAlt, Search } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'ক্রমিক_সংখ্যা', headerName: 'ক্রমিক সংখ্যা', width: 150 },
  { field: 'পাঠ্যক্রমের_নাম', headerName: 'পাঠ্যক্রমের নাম', width: 200 },
  { field: 'সংক্ষিপ্ত_বিবরণ', headerName: 'সংক্ষিপ্ত বিবরণ', flex: 1 },
  { field: 'মডিউল_সংখ্যা', headerName: 'মডিউল সংখ্যা', width: 150 },
  {
    field: 'actions',
    headerName: 'অ্যাকশন বাটন',
    width: 200,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
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

const rows = [
  {
    id: 1,
    ক্রমিক_সংখ্যা: 1,
    পাঠ্যক্রমের_নাম: 'Course 1',
    সংক্ষিপ্ত_বিবরণ:
      'দ্বাদশ শ্রেণির শিক্ষা সাধারণত একটি নির্দিষ্ট অঞ্চল বা দেশে অনুসরণ করা শিক্ষা বোর্ড বা পাঠ্যক্রমের...।',
    মডিউল_সংখ্যা: 3,
  },
  {
    id: 2,
    ক্রমিক_সংখ্যা: 2,
    পাঠ্যক্রমের_নাম: 'Course 2',
    সংক্ষিপ্ত_বিবরণ:
      'দ্বাদশ শ্রেণির শিক্ষা সাধারণত একটি নির্দিষ্ট অঞ্চল বা দেশে অনুসরণ করা শিক্ষা বোর্ড বা পাঠ্যক্রমের...।',
    মডিউল_সংখ্যা: 4,
  },
  {
    id: 3,
    ক্রমিক_সংখ্যা: 2,
    পাঠ্যক্রমের_নাম: 'Course 2',
    সংক্ষিপ্ত_বিবরণ:
      'দ্বাদশ শ্রেণির শিক্ষা সাধারণত একটি নির্দিষ্ট অঞ্চল বা দেশে অনুসরণ করা শিক্ষা বোর্ড বা পাঠ্যক্রমের...।',
    মডিউল_সংখ্যা: 4,
  },
  {
    id: 4,
    ক্রমিক_সংখ্যা: 2,
    পাঠ্যক্রমের_নাম: 'Course 2',
    সংক্ষিপ্ত_বিবরণ:
      'দ্বাদশ শ্রেণির শিক্ষা সাধারণত একটি নির্দিষ্ট অঞ্চল বা দেশে অনুসরণ করা শিক্ষা বোর্ড বা পাঠ্যক্রমের...।',
    মডিউল_সংখ্যা: 4,
  },
  {
    id: 5,
    ক্রমিক_সংখ্যা: 2,
    পাঠ্যক্রমের_নাম: 'Course 2',
    সংক্ষিপ্ত_বিবরণ:
      'দ্বাদশ শ্রেণির শিক্ষা সাধারণত একটি নির্দিষ্ট অঞ্চল বা দেশে অনুসরণ করা শিক্ষা বোর্ড বা পাঠ্যক্রমের...।',
    মডিউল_সংখ্যা: 4,
  },
  // Add more courses as needed
];

const CourseList: React.FC = () => {
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
        <div>
          <Button variant="outlined" startIcon={<FilterList />} sx={{ mr: 2 }}>
            ফিল্টার করুন
          </Button>
          <Button variant="contained" startIcon={<Add />} sx={{ mr: 2 }}>
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
      <MuiTable
        columns={columns}
        rows={rows}
        getRowId={(row: any) => row.id}
        // Add other props as needed
      />
    </Container>
  );
};

export default CourseList;
