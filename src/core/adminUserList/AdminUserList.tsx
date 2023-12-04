import React, { useState } from 'react';
import { Badge, Box, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ReactTable from 'components/tables/ReactTable';
import { Add, FilterList, SaveAlt, Search } from '@mui/icons-material';
import PageSizeSelect from 'components/tables/PageSizeSelect';
import { useTranslation } from 'react-i18next';

const AdminUserList: React.FC = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const {t} = useTranslation();


    const columns = [
        { Header: '#', accessor: 'id' },
        { Header: t('fullUserName'), accessor: 'fullUserName' },
        { Header: t('userName'), accessor: 'userName' },
        { Header: t('userRoleName'), accessor: 'userRoleName' },
        { Header: t('status'), accessor: 'status',Cell: ({ value }: any) => (
            <Badge
                color={value === 'Active' ? 'success' : 'error'}
                badgeContent={value}
            />
        ), },
        {
            Header: t('actionButton'),
            accessor: 'actionButton',
            Cell: ({ row }: any) => (
                <>
                    <IconButton aria-label="view" size="small">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="edit" size="small">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    
    const rows = [
        {
            id: 1,
            fullUserName: 'Full User name',
            userName: 'mrakib007',
            userRoleName: 'Admin',
            status: 'Active',
        },
        {
            id: 2,
            fullUserName: 'Full User name',
            userName: 'mrakib007',
            userRoleName: 'Admin',
            status: 'Deactive',
        },
    ];
    

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(0);
    };

    return (
        <Container maxWidth="xl">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Box>
                    <Button variant="contained" startIcon={<Add />} sx={{ mr: 2 }}>
                        ক্রিয়েট ইউজার
                    </Button>
                </Box>
            </Stack>
            <ReactTable
                columns={columns}
                data={rows}
                totalCount={40}
                pageSize={pageSize}
                currentPage={0}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </Container>
    );
};

export default AdminUserList;
