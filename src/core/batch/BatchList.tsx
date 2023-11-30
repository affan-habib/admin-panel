import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import {
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchOutlined } from '@mui/icons-material';
import MuiTable from 'components/tables/MuiTable';

const BatchList: React.FC = () => {
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    { field: 'serialNo', headerName: t('serialNumber'), flex: 1 },
    { field: 'batchName', headerName: t('batchName'), flex: 1 },
    { field: 'batchPhoto', headerName: t('batchPhoto'), flex: 1 },
    { field: 'batchDescription', headerName: t('batchDetails'), flex: 2 },
    { field: 'numberOfTrainee', headerName: t('traineeNumber'), flex: 1 },
    { field: 'timeline', headerName: t('timeLine'), flex: 1 },
    { field: 'batchCode', headerName: t('batchCode'), flex: 1 },
    { field: 'status', headerName: t('status'), flex: 1 },
    {
      field: 'actionButton',
      headerName: t('actionButton'),
      align: 'center',
      headerAlign: 'center',
      width: 150,
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
      serialNo: 1,
      batchName: 'Batch A',
      batchPhoto: 'Photo link',
      batchDescription: 'This is a detailed description of Batch A...',
      numberOfTrainee: 25,
      timeline: '10 days online, 5 days offline',
      batchCode: 'ABC123',
      status: 'Active',
    },
    {
      id: 2,
      serialNo: 2,
      batchName: 'Batch B',
      batchPhoto: 'Photo link',
      batchDescription: 'A description for Batch B...',
      numberOfTrainee: 30,
      timeline: '15 days online, 7 days offline',
      batchCode: 'DEF456',
      status: 'Inactive',
    },
    {
      id: 3,
      serialNo: 3,
      batchName: 'Batch B',
      batchPhoto: 'Photo link',
      batchDescription: 'A description for Batch B...',
      numberOfTrainee: 30,
      timeline: '15 days online, 7 days offline',
      batchCode: 'DEF456',
      status: 'Inactive',
    },
  ];

  return (
    <Container maxWidth="xl">
      <Typography color={'rgba(0, 47, 108, 1)'} marginBottom={'10px'}>
        ব্যাচের তালিকা
      </Typography>
      <TextField
        size="small"
        sx={{ mb: 3 }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
      <MuiTable rows={rows} columns={columns} getRowId={(row: any) => row.id} />
    </Container>
  );
};

export default BatchList;
