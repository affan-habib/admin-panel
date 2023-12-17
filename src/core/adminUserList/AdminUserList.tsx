import React, { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Link,
  Typography,
} from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTranslation } from 'react-i18next';
import ReactTable from 'components/tables/ReactTable';
import { Add } from '@mui/icons-material';
import ModalComponent from './ModalComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';
import Loader from '../../components/common/circularLoader';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import useUserList from 'hooks/useUserList';
import { useQueryClient } from 'react-query';
import { useDeleteModal } from 'context/DeleteModalContext';
import InteractiveTable from 'components/tables/InteractiveTable';
import useDebounce from 'hooks/useDebounce';

const AdminUserList: React.FC = () => {
  const { openModal } = useDeleteModal();
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users, isLoading } = useUserList({
    itemsPerPage: pageSize,
    page: currentPage,
    search: search,
  });

  const { showSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedUserData, setSelectedUserData] = useState<any>({});
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar(response.data.message, 'success');
      queryClient.invalidateQueries('userList');
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error deleting data:', error.response.data.message);
    }
  };

  const handleVisibilityClick = async (row: any) => {
    setSelectedUserData(row);
    setShowModal(true);
  };

  const editUser = async (row: any) => {
    navigate(`/edit-admin-user/${row.id}`);
  };

  const columns = [
    { Header: '#', accessor: (row: any, index: any) => index + 1 },
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
          variant="contained"
          onClick={() => handleToggleStatus(row.original)}
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
            onClick={() => editUser(row.original)}
          >
            <BorderColorOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleVisibilityClick(row.original)}
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
            onClick={() => openModal(() => handleDelete(row.original.id))}
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

  const handleToggleStatus = async (values: any) => {
    try {
      await axios.put(
        `${apiBaseUrl}/admins/${values.id}`,
        {
          status: values.status ? 0 : 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      queryClient.invalidateQueries('userList');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
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
      <Grid item xs={12}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="››"
          sx={{
            color: 'rgba(28, 27, 31, 1)',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          <Link
            href="/"
            sx={{
              color: 'rgba(255, 74, 95, 1)',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            <HomeOutlinedIcon sx={{ marginTop: '5px' }} />
          </Link>
          <Typography
            color="primary"
            sx={{ fontSize: '16px', fontWeight: 500 }}
          >
            {t('userList')}
          </Typography>
        </Breadcrumbs>
      </Grid>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <InteractiveTable
            rightButton={{
              title: t('createUser'),
              onClick: () => navigate('/create-admin-user'),
            }}
            onSearchChange={setSearchTerm}
            searchTerm={searchTerm}
            columns={columns}
            data={users?.data?.data || []}
            totalCount={users?.data?.total}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
          <ModalComponent
            open={showModal}
            handleClose={() => setShowModal(false)}
            userData={selectedUserData}
          />
        </>
      )}
    </Container>
  );
};

export default AdminUserList;
