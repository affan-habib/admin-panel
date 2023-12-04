import React, { useState } from 'react';
import { Button, Container, IconButton, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import ReactTable from 'components/tables/ReactTable';
import { Add } from '@mui/icons-material';
import ModalComponent from './ModalComponent';

interface Row {
    id: number;
    fullUserName: string;
    userName: string;
    userRoleName: string;
    status: string;
}

const AdminUserList: React.FC = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();


    const handleVisibilityClick = () => {
        setShowModal(true); // Set the state to show the modal
    };

    const [rows, setRows] = useState<Row[]>([
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
    ]);

    const columns = [
        { Header: '#', accessor: 'id' },
        { Header: t('fullUserName'), accessor: 'fullUserName' },
        { Header: t('userName'), accessor: 'userName' },
        { Header: t('userRoleName'), accessor: 'userRoleName' },
        {
            Header: t('status'),
            accessor: 'status',
            Cell: ({ row }: any) => (
                <Button
                    aria-label="toggle-status"
                    size="small"
                    variant='contained'
                    onClick={() => handleToggleStatus(row.original.id)}
                >
                    {row.original.status}
                </Button>
            ),
        },
        {
            Header: t('actionButton'),
            accessor: 'actionButton',
            Cell: ({ row }: any) => (
                <>
                    <IconButton
                        aria-label="view"
                        size="small"
                        onClick={handleVisibilityClick} // Open modal on icon click
                    >
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

    const handleToggleStatus = (id: number) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id
                    ? { ...row, status: row.status === 'Active' ? 'Deactive' : 'Active' }
                    : row
            )
        );
    };

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
                <Button variant="contained" startIcon={<Add />} sx={{ mr: 2 }}>
                    Create User
                </Button>
            </Stack>
            <ReactTable
                columns={columns}
                data={rows}
                totalCount={40}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />


            <ModalComponent
                open={showModal}
                handleClose={() => setShowModal(false)}
                userData={{
                    fullName: 'John Doe',
                    designation: 'Developer',
                    userName: 'johndoe123',
                    emailAddress: 'john@example.com',
                    mobileNumber: '+1234567890',
                    status: 'Active',
                    roleName: 'Admin',
                }} />

        </Container>
    );
};

export default AdminUserList;