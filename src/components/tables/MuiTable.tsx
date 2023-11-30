import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';

interface MuiTableProps {
  checkboxSelection?: boolean;
  columns: any[];
  rows: any[];
  getRowId: (row: any) => string | number;
  onCellEditCommit?: (params: any) => void;
  hideFooter?: boolean;
  rowCount?: number;
  paginationModel?: any;
  onPageinationModelChange?: (params: any) => void;
}

const MuiTable: React.FC<MuiTableProps> = ({
  checkboxSelection,
  columns,
  rows,
  getRowId,
  onCellEditCommit,
  hideFooter,
  rowCount,
  paginationModel,
  onPageinationModelChange,
}) => {
  return (
    <Card style={{ height: 650, width: '100%' }} elevation={0}>
      <DataGrid
        pagination
        paginationMode="server"
        density="comfortable"
        onPaginationModelChange={onPageinationModelChange}
        rowCount={rowCount || 0}
        pageSizeOptions={[15, 20, 30]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeaders ': {
            borderRadius: 0,
            textTransform: 'uppercase',
            bgcolor: 'primary.main',
            color: 'white',
          },
          '& .MuiDataGrid-row': {
            fontSize: '0.9rem',
            '&:nth-of-type(2n)': {
              backgroundColor: '#F2F8F6',
              '&:hover': {
                background: ' #EBF0F4 !important',
              },
            },
          },
        }}
        columnHeaderHeight={40}
        checkboxSelection={checkboxSelection}
        disableColumnMenu
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        hideFooter={hideFooter}
        paginationModel={paginationModel}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </Card>
  );
};

export default MuiTable;
