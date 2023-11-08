import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';

interface MuiTableProps {
  checkboxSelection?: boolean;
  columns: any[]; // Define your column types here
  rows: any[]; // Define your row types here
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
    <Card style={{ minHeight: 800, width: '100%' }}>
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
          '& .MuiDataGrid-columnHeader': {
            borderRadius: 0,
            textTransform: 'uppercase',
            fontSize: '.8rem',
            bgcolor: 'rgb(242, 244, 247)',
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
      />
    </Card>
  );
};

export default MuiTable;
