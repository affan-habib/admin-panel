import React, { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, Stack } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTranslation } from 'react-i18next';
import ReactTable from 'components/tables/ReactTable';
import { Add } from '@mui/icons-material';
import ModalComponent from './ModalComponent';
import axios from 'axios';


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

    const [data, setData] = useState<{ data?: any }>({});
    const [selectedUserData, setSelectedUserData] = useState<Row | null>(null);

    const fetchData = async () => {
        try {
            const token = '8IyxRvGlZN8vqSyLoz6xF2tU3vGC7YmFWJwjAxwWoCjWnB5YicoVSMXuyuXSkRTpuCGg8ApRmRa4A5FpbntXIlK0FHfjt1V2yA8176taCN3eUqER9eHJmmnuyjIfXDaLaYzIgV5mWstHLB1E0C1VpnKlRvxQ6kNVa4I4ay1wJ965FBSttPx7aF5bU8eYVnHz75Ycud0tNt7AFNB6bW56hllyVmyXxqRkDOeoWMtZANn7dZeT';
            const response = await axios.get('http://172.16.100.209:8002/api/clms/dev/admins', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const resData = data?.data?.data;

    // if (Array.isArray(resData)) {
    //     resData.map((item) => {
    //         console.log(item.id);
    //         return null;
    //     });
    // }

    const handleVisibilityClick = () => {
        setShowModal(true);
    };

    const [rows, setRows] = useState<Row[]>([]);
    useEffect(() => {
        if (resData) {
            setRows(resData);
        }
    }, [resData]);

    const columns = [
        { Header: '#', accessor: 'id' },
        { Header: t('fullUserName'), accessor: 'name' },
        { Header: t('userName'), accessor: 'username' },
        { Header: t('userRoleName'), accessor: 'type' },
        {
    Header: t('status'),
    accessor: 'status',
    Cell: ({ row }: any) => (
        <Button
            aria-label="toggle-status"
            size="small"
            variant='contained'
            onClick={() => handleToggleStatus(row.original.id)}
            style={{
                backgroundColor: row.original.status === 1 ? 'primary.main' : 'red',
                color: 'white',
                width: '100px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {row.original.status === 1 ? 'Active' : 'Deactive'}
        </Button>
    ),
},

        {
            Header: t('actionButton'),
            accessor: 'actionButton',
            Cell: ({ row }: any) => (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <IconButton
                        aria-label="view"
                        size="small"
                        style={{
                            color: 'rgba(0, 106, 78, 1)',
                            borderRadius: 8,
                            border: '1px solid rgba(208, 208, 208, 1)',
                        }}
                    >
                        <BorderColorOutlinedIcon />
                    </IconButton>
                    <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={handleVisibilityClick}
                        style={{
                            color: 'rgba(20, 146, 230, 1)',
                            borderRadius: 8,
                            border: '1px solid rgba(208, 208, 208, 1)',
                        }}
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        style={{
                            color: 'rgba(255, 74, 95, 1)',
                            borderRadius: 8,
                            border: '1px solid rgba(208, 208, 208, 1)',
                        }}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
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
                    fullName: 'ব্যবহারকারীর নাম',
                    designation: 'লেকচারার',
                    userName: 'ইউজার নেম',
                    emailAddress: 'john@example.com',
                    mobileNumber: '+৮৮০১##########',
                    status: 'একটিভ',
                    roleName: 'এডমিন',
                }} />

        </Container>
    );
};

export default AdminUserList;