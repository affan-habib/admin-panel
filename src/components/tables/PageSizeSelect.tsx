// components/tables/PageSizeSelect.tsx
import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';

interface PageSizeSelectProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  total: number;
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({
  pageSize,
  onPageSizeChange,
  total,
}) => {
  const handlePageSizeChange = (event: any) => {
    const newSize = event.target.value as number;
    onPageSizeChange(newSize);
  };

  return (
    <Box sx={{ display: 'inline', marginRight: 2 }}>
      {
        <span>
          Showing {pageSize > total ? total : pageSize} out of {total}
        </span>
      }
      <Select
        sx={{ ml: 2 }}
        size="small"
        variant="outlined"
        labelId="page-size-label"
        id="page-size"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        {/* Add more options as needed */}
      </Select>
    </Box>
  );
};

export default PageSizeSelect;
