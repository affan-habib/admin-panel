import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const institutesData = [
  { id: 1, name: 'ইনস্টিটিউট ১', location: 'ঢাকা', establishedYear: 1985 },
  { id: 2, name: 'ইনস্টিটিউট ২', location: 'চট্টগ্রাম', establishedYear: 1990 },
  { id: 3, name: 'ইনস্টিটিউট ২', location: 'চট্টগ্রাম', establishedYear: 1990 },
  // Add more data as needed
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'আইডি', flex: 1 },
  { field: 'name', headerName: 'ইনস্টিটিউটের নাম', flex: 2 },
  { field: 'location', headerName: 'অবস্থান', flex: 1 },
  { field: 'establishedYear', headerName: 'স্থাপনের বছর', flex: 1 },
];
const InstituteList: React.FC = () => {
  return (
    <Box maxWidth={900} p={4} mt={4} bgcolor="#EDF4F2" borderRadius="10px">
      <Typography mb={2} variant="h6">
        উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের সারসংক্ষেপ
      </Typography>
      <div style={{ height: '100%', width: '100%', background: 'white' }}>
        <DataGrid
          rows={institutesData}
          columns={columns}
          hideFooter
          autoHeight
          style={{ minHeight: '150px' }} 
        />
      </div>
    </Box>
  );
};

export default InstituteList;

