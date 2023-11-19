import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const institutesData = [
  { id: 1, currentBatch: 'ব্যাচ ১', currentCourse: 'শিখন ক্ষেত্র ১ :  শিক্ষা নীতি ও শিক্ষায় ব্যাবস্থাপনা (শিনী)', number: '৫০', progress: 'সক্রিয়', duration: 'অনলাইন: ১০ দিন ব্যক্তিগত : ৫ দিন' },
  { id: 2, currentBatch: 'ব্যাচ ১', currentCourse: 'শিখন ক্ষেত্র ১ :  শিক্ষা নীতি ও শিক্ষায় ব্যাবস্থাপনা (শিনী)', number: '৫০', progress: 'সক্রিয়', duration: 'অনলাইন: ১০ দিন ব্যক্তিগত : ৫ দিন' },
  { id: 3, currentBatch: 'ব্যাচ ১', currentCourse: 'শিখন ক্ষেত্র ১ :  শিক্ষা নীতি ও শিক্ষায় ব্যাবস্থাপনা (শিনী)', number: '৫০', progress: 'সক্রিয়', duration: 'অনলাইন: ১০ দিন ব্যক্তিগত : ৫ দিন' },
  // Add more data as needed
];

const columns: GridColDef[] = [
  { field: 'currentBatch', headerName: 'চলমান ব্যাচ', flex: 1 },
  { field: 'currentCourse', headerName: 'সক্রিয় কোর্স ', flex: 2 },
  { field: 'number', headerName: 'প্রশিক্ষণার্থীর সংখ্যা', flex: 1 },
  { field: 'progress', headerName: 'ব্যাচের অবস্থা', flex: 1 },
  { field: 'duration', headerName: 'কোর্স সময়কাল', flex: 1 },
];

const InstituteList: React.FC = () => {
  return (
    <Box
      maxWidth={900} p={4} mt={4} ml={0} bgcolor="#EDF4F2" borderRadius="10px">
      <Typography mb={2} variant="h6">
        উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের সারসংক্ষেপ
      </Typography>
      <div style={{ height: '100%', width: '100%', background: 'white' }}>
        <DataGrid
          rows={institutesData}
          columns={columns.map((column) => ({
            ...column,
            renderCell: (params) => (
              <div style={{ whiteSpace: 'pre-wrap' }}>{params.value}</div>
            ),
          }))}
          hideFooter
          autoHeight
          style={{ minHeight: '150px' }}
        />
      </div>
    </Box>
  );
};

export default InstituteList;
