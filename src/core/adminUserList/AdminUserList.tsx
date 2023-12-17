import React, { useState } from 'react';
import {
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import ModalComponent from './ModalComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import useUserList from 'hooks/useUserList';
import { useQueryClient } from 'react-query';
import { useDeleteModal } from 'context/DeleteModalContext';
import Pagination from '@mui/material/Pagination';
import { Search } from '@mui/icons-material';
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

      <>
        <Stack
          direction="row"
          spacing={2}
          my={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2}>
            <Stack direction="row" alignItems="center">
              <span>
                Showing{' '}
                {pageSize > users?.data?.total ? users?.data?.total : pageSize}{' '}
                out of {users?.data?.total}
              </span>
              <FormControl sx={{ width: 80, ml: 2 }}>
                <Select
                  size="small"
                  value={pageSize}
                  onChange={(e: any) => {
                    setPageSize(e.target.value);
                    setCurrentPage(0);
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <div>
            <TextField
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/create-admin-user')}
            >
              {t('createUser')}
            </Button>
          </div>
        </Stack>

        {users?.data && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#B3E0DD !important' }}>
                    <TableCell>#</TableCell>
                    <TableCell>{t('fullUserName')}</TableCell>
                    <TableCell>{t('userName')}</TableCell>
                    <TableCell>{t('userRoleName')}</TableCell>
                    <TableCell>{t('status')}</TableCell>
                    <TableCell>{t('actionButton')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.data?.data.map((user: any, index: number) => (
                    <TableRow key={index + 1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.type}</TableCell>
                      <TableCell>
                        <Button
                          aria-label="toggle-status"
                          size="small"
                          variant="contained"
                          onClick={() => handleToggleStatus(user)}
                          color={user.status == 1 ? 'primary' : 'error'}
                        >
                          {user.status === 1 ? 'Active' : 'Deactive'}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ width: 120 }}>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                        >
                          <IconButton
                            aria-label="view"
                            size="small"
                            style={{
                              color: 'rgba(0, 106, 78, 1)',
                              borderRadius: 8,
                              border: '1px solid rgba(208, 208, 208, 1)',
                            }}
                            onClick={() => editUser(user)}
                          >
                            <BorderColorOutlinedIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => handleVisibilityClick(user)}
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
                            onClick={() =>
                              openModal(() => handleDelete(user.id))
                            }
                            size="small"
                            style={{
                              color: 'rgba(255, 74, 95, 1)',
                              borderRadius: 8,
                              border: '1px solid rgba(208, 208, 208, 1)',
                            }}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="flex-end" marginTop={2}>
              <Pagination
                count={Math.ceil(users?.data?.total / pageSize) || 1}
                page={currentPage}
                onChange={(page: any) => setCurrentPage(page)}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </>
        )}
      </>
      <ModalComponent
        open={showModal}
        handleClose={() => setShowModal(false)}
        userData={selectedUserData}
      />
    </Container>
  );
};

export default AdminUserList;
