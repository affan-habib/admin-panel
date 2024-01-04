import React, { useState } from 'react';
import {
  Container,
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Breadcrumbs,
  Link
} from '@mui/material';
import {useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Pagination from '@mui/material/Pagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiBaseUrl } from 'config';
import { useDeleteModal } from 'context/DeleteModalContext';
import useDebounce from 'hooks/useDebounce';
import useCourses from 'hooks/useCourses';
import { useTranslation } from 'react-i18next';
import { Add, SaveAlt, Search } from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useSnackbar } from 'context/SnackbarContext';
import { toBanglaNumber } from 'utils/numberUtils';

const CourseList: React.FC = () => {
  const { showSnackbar } = useSnackbar()
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);
  const queryClient = useQueryClient();
  const { openModal } = useDeleteModal();
  const { t } = useTranslation();
  const language = localStorage.getItem('language');
  const { data: courses } = useCourses({
    itemsPerPage: pageSize,
    page: currentPage,
    search: search,
  });
  const navigate = useNavigate();

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const handleDeleteClick = async (videoId: any) => {
    const apiUrl = `${apiBaseUrl}/course/${videoId}`;
    try {
      const response = await fetch(apiUrl, { method: 'DELETE' });

      if (response.ok) {
        const responseData = await response.json();
        showSnackbar(responseData.message, 'success');
        queryClient.invalidateQueries('courses');
      } else {
        // Handle error
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Container maxWidth="xl">
      <Breadcrumbs
          aria-label="breadcrumb"
          separator="››"
          sx={{
            color: 'rgba(28, 27, 31, 1)',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom:'15px'
          }}
        >
          <Link
            href="/"
            sx={{
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            <HomeOutlinedIcon sx={{ marginTop: '8px',color: 'rgba(0, 106, 78, 1)' }} />
          </Link>
          <Typography
            color="primary"
            sx={{ fontSize: '16px', fontWeight: 500 }}
          >
            {t('curriculum')}
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 500,color: 'rgba(255, 74, 95, 1)' }}
          >
            {t('courseList')}
          </Typography>
        </Breadcrumbs>
      <Typography variant="h6" color="primary.main" mb={2}>
        {t('courseList')}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        my={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            {
              <span>
                {t('showing')} {' '}
                {pageSize > courses?.meta?.total
                  ?  toBanglaNumber(courses?.meta?.total)
                  : pageSize}{' '}
                {t('outOf')} {toBanglaNumber(courses?.meta?.total)}
              </span>
            }
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
            sx={{ mr: 2 }}
            onClick={() => navigate('/create-course')}
          >
            {t('addCurriculum')}
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

      {courses?.data && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#B3E0DD !important' }}>
                  <TableCell variant='head' align='center' size='medium' sx={{ fontWeight: 800 }}>#</TableCell>
                  <TableCell variant='head' align='center' size='medium' sx={{ fontWeight: 800 }}>
                    {t('nameAndCode')}
                  </TableCell>
                  <TableCell variant='head' align='center' sx={{ fontWeight: 800 }}>{t('numberOfModule')}</TableCell>
                  <TableCell variant='head' align='center' sx={{ fontWeight: 800 }}>{t('action')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.data.map((course: any, index: number) => (
                  <TableRow key={index + 1}>
                    <TableCell width={60}>{index + 1}</TableCell>
                    <TableCell>
                      {course[`name_${language}`]} : {course.code}
                    </TableCell>
                    <TableCell>{course.course_modules_count}</TableCell>
                    <TableCell sx={{ width: 200 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <IconButton
                          disabled
                          aria-label="view"
                          size="small"
                          style={{
                            backgroundColor: '#FAFAFA',
                            borderRadius: '4px',
                            border: '1px solid #D0D0D0',
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          style={{
                            backgroundColor: '#FAFAFA',
                            borderRadius: '4px',
                            border: '1px solid #D0D0D0',
                          }}
                          onClick={() => navigate(`/course/edit/${course.id}`)}
                        >
                          <EditIcon sx={{ color: 'primary.main' }} />
                        </IconButton>
                        <IconButton
                          style={{
                            backgroundColor: '#FAFAFA',
                            borderRadius: '4px',
                            border: '1px solid #D0D0D0',
                          }}
                          aria-label="Delete"
                          size="small"
                          color="error"
                          onClick={() =>
                            openModal(() => handleDeleteClick(course.id))
                          }
                        >
                          <DeleteIcon />
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
              count={Math.ceil(courses?.meta?.total / pageSize) || 1}
              page={currentPage}
              onChange={handlePaginationChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default CourseList;
