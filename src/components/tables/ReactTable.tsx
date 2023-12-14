import React from 'react';
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
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface ReactTableProps {
  columns: any[];
  data: any[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ReactTable: React.FC<ReactTableProps> = ({
  columns,
  data,
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize } as any,
      },
      usePagination,
    ) as any;

  return (
    <Stack>
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
      <Pagination
        sx={{ alignSelf: 'flex-end', mt: 2 }}
        count={Math.ceil(totalCount / pageSize)}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        shape="rounded"
      />
    </Stack>
  );
};

export default ReactTable;
