import React, { useEffect, useState } from 'react';
import { useTable, usePagination, HeaderGroup, Row, Cell } from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TextField,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Add, SaveAlt, Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ReactTableProps {
  columns: any[];
  data: any[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rightButton: any;
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string; // Add the search change handler
}

const InteractiveTable: React.FC<ReactTableProps> = ({
  columns,
  data,
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
  rightButton,
  onSearchChange,
  searchTerm,
}) => {
  const { t } = useTranslation();

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize } as any,
      },
      usePagination,
    ) as any;
  console.log(pageSize, currentPage, 'helow workd');
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" alignItems="center">
          {
            <span>
              Showing {pageSize > totalCount ? totalCount : pageSize} out of{' '}
              {totalCount}
            </span>
          }
          <FormControl sx={{ width: 80, ml: 2 }}>
            <Select
              size="small"
              labelId="page-size-label"
              id="page-size-select"
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </Stack>
        <div>
          <TextField
            value={searchTerm}
            variant="outlined"
            size="small"
            sx={{ width: 350, mr: 2 }}
            placeholder={t('searchList')}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mr: 2 }}
            onClick={rightButton.onClick}
          >
            {rightButton.title}
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
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: HeaderGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{
                      backgroundColor: 'primary.light',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      borderRight:
                        columnIndex < headerGroup.headers.length - 1
                          ? '1px solid #ddd'
                          : 'none',
                    }}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: Row, index: number) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  sx={{ backgroundColor: index % 2 === 1 ? '#F2F8F6' : '' }}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell
                      {...cell.getCellProps()}
                      sx={{
                        borderRight:
                          cellIndex < row.cells.length - 1
                            ? '1px solid #ddd'
                            : 'none',
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        mt={2}
      >
        <Pagination
          sx={{ alignSelf: 'flex-end' }}
          count={Math.ceil(totalCount / pageSize)}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
};

export default InteractiveTable;
