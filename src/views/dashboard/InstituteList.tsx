
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Grid, Typography, Container, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import { useTranslation } from 'react-i18next';


const InstituteList: React.FC = () => {
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    { field: 'currentBatch', headerName: t('currentbatch'), flex: 1 },
    { field: 'currentCourse', headerName: t('activeCourse'), flex: 2 },
    { field: 'number', headerName: t('traineeNumber'), flex: 1 },
    { field: 'progress', headerName: t('batchSituation'), flex: 1 },
    { field: 'duration', headerName: t('courseTimeline'), flex: 1 },
  ];

  const institutesData = [
    { id: 1, currentBatch: t('batchNo'), currentCourse: t('learningField'), number: t('numberOfTrainee'), progress: t('progress'), duration: t('courseDuration') },
    { id: 2, currentBatch: t('batchNo'), currentCourse: t('learningField'), number: t('numberOfTrainee'), progress: t('progress'), duration: t('courseDuration') },
    { id: 3, currentBatch: t('batchNo'), currentCourse: t('learningField'), number: t('numberOfTrainee'), progress: t('progress'), duration: t('courseDuration') },
  ];

  return (
    <Grid sx={{ backgroundColor: "rgba(227, 238, 235, 1)", padding: "20px", marginTop: "40px", borderRadius: "8px" }}>
      <Typography sx={{ marginTop: "5px", marginBottom: "8px", fontSize: "16px", fontWeight: "500", color: "rgba(21, 83, 19, 1)" }}>
        {t('summaryOfTraining')}
      </Typography>
      <TableContainer sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ height: '20px', backgroundColor: 'rgba(222, 238, 198, 1)' }}>
            <TableRow>
              <TableCell sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis', textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(222, 238, 198, 1)', color: 'rgba(29, 29, 31, 1)' }}>{t('currentBatch')}</TableCell>
              <TableCell  sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis', textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(222, 238, 198, 1)', color: 'rgba(29, 29, 31, 1)' }}>{t('activeCourse')}</TableCell>
              <TableCell  sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis', textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(222, 238, 198, 1)', color: 'rgba(29, 29, 31, 1)' }}>{t('traineeNumber')}</TableCell>
              <TableCell  sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis', textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(222, 238, 198, 1)', color: 'rgba(29, 29, 31, 1)' }}>{t('batchSituation')}</TableCell>
              <TableCell  sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis', textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(222, 238, 198, 1)', color: 'rgba(29, 29, 31, 1)' }}>{t('courseTimeline')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutesData.map((row) => (
              <TableRow key={row.id}>
              <TableCell sx={{ textAlign: 'center', borderRight: '1px solid #ddd', backgroundColor: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.currentBatch}</TableCell>
              <TableCell sx={{ textAlign: 'center', borderRight: '1px solid #ddd', backgroundColor: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.currentCourse}</TableCell>
              <TableCell sx={{ textAlign: 'center', borderRight: '1px solid #ddd', backgroundColor: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.number}</TableCell>
              <TableCell sx={{ textAlign: 'center', borderRight: '1px solid #ddd', backgroundColor: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.progress}</TableCell>
              <TableCell sx={{ textAlign: 'center', borderRight: '1px solid #ddd', backgroundColor: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.duration}</TableCell>
            </TableRow>
            
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default InstituteList;