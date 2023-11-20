import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, Container, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

interface MuiTableProps {
  // ...other props
}

const BatchList: React.FC<MuiTableProps> = (
  {
    /* ...other props */
  },
) => {
  const { t } = useTranslation();
  const columns = [
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
      flex: 1,
      renderCell: () => (
        <Box>
          <IconButton aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Update">
            <UpdateIcon />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Box>
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
      // actionButton: () => true,
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
      // actionButton: 'Edit/Delete',
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
      // actionButton: 'Edit/Delete',
    },
    // Add more rows as needed
  ];

  return (
    <Container maxWidth="xl">
      <DataGrid
        pagination
        paginationMode="server"
        rows={rows}
        columns={columns}
      />
    </Container>
  );
};

export default BatchList;
