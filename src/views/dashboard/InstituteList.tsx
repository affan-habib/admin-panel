import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import MuiTable from 'components/tables/MuiTable';

const institutesData = [
  { id: 1, name: 'ইনস্টিটিউট ১', location: 'ঢাকা', establishedYear: 1985 },
  { id: 2, name: 'ইনস্টিটিউট ২', location: 'চট্টগ্রাম', establishedYear: 1990 },
  { id: 3, name: 'ইনস্টিটিউট ২', location: 'চট্টগ্রাম', establishedYear: 1990 },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'আইডি', flex: 1 },
  { field: 'name', headerName: 'ইনস্টিটিউটের নাম', flex: 2 },
  { field: 'location', headerName: 'অবস্থান', flex: 1 },
  { field: 'establishedYear', headerName: 'স্থাপনের বছর', flex: 1 },
];

const InstituteList: React.FC = () => {
  return (
    <Box maxWidth={800} mt={4}>
      <Typography mb={2} variant="h6" color="#155313">
        উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের সারসংক্ষেপ
      </Typography>
      <div style={{ width: '100%' }}>
        <MuiTable
          rows={institutesData}
          columns={columns}
          hideFooter
          getRowId={(params) => params.id}
        />
      </div>
    </Box>
  );
};

export default InstituteList;
