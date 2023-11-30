import React from 'react';
import { useTable, usePagination, HeaderGroup, Row, Cell } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
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
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: currentPage, pageSize } as any, // Cast to 'any' to avoid TypeScript error
        },
        usePagination
    ) as any; // Cast to 'any' to avoid TypeScript error

    return (
        <Stack>
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup: HeaderGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row: Row) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell: Cell) => (
                                        <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
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
                page={currentPage + 1}
                onChange={(_, page) => onPageChange(page - 1)}
                shape="rounded"
            />
        </Stack>
    );
};

export default ReactTable;
