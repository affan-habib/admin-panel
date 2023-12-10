import React, { useState, useCallback } from 'react';
import {
  Container,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  InputLabel,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Permission from './Permission';

interface Data {
  role: string;
  permissions: string[];
}

const tableData: Data[] = [
  {
    role: 'All',
    permissions: ['Create Category', 'Create Sub Category', 'Edit Category', 'Edit Category','Edit Category','Edit Category','Edit Category','Edit Category','Edit Category','Edit Category'],
  },
  {
    role: 'Admin',
    permissions: ['Read', 'Write', 'Delete', 'Create'],
  },
  {
    role: 'User',
    permissions: ['Read'],
  },
];

const RoleList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <Container maxWidth="xl" style={{ marginTop: '20px' }}>
      <Grid container>
        <TableContainer sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ height: '20px', backgroundColor: 'rgba(0, 106, 78, 1)'}}>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(0, 106, 78, 1)', color: 'white' }}>Roles</TableCell>
                <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(0, 106, 78, 1)', color: 'white' }}>Permission</TableCell>
                <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #ddd', backgroundColor: 'rgba(0, 106, 78, 1)', color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #ddd' }}>{row.role}</TableCell>
                  <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #ddd', width:'800px' }}>
                    {row.permissions.map((permission, index) => (
                      <Badge key={index} color="primary" sx={{ backgroundColor: 'rgba(0, 106, 78, 1)', color: 'white', padding: '4px 10px 4px 10px',  borderRadius: '10px', marginBottom: '8px', marginRight: 1 }}>
                        {permission}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #ddd' }}>
                    <IconButton color="primary" aria-label="edit" onClick={handleOpenModal}>
                        <EditCalendarOutlinedIcon/>
                    </IconButton>
                    <IconButton color="primary" aria-label="delete">
                        <DeleteOutlinedIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Modal Dialog */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xl">
        <DialogTitle sx={{ backgroundColor: 'rgba(240, 255, 254, 1)', color: 'rgba(0, 106, 78, 1)',  fontWeight: 600,  borderBottom: '1px solid #ddd' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>Create New Role</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseModal} aria-label="close" sx={{color:'red'}}>
              <HighlightOffIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{marginTop:'10px'}}>
         <InputLabel htmlFor="file" sx={{fontWeight:'500' , color:'black'}}>Role Name</InputLabel>
          <TextField placeholder="Write a Name" size="small" fullWidth />
          <Permission />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{border:'2px solid rgba(0, 106, 78, 1)', color:'rgba(0, 48, 42, 1)'}}>Cancel</Button>
          <Button variant="contained"  onClick={handleCloseModal} sx={{backgroundColor:'rgba(0, 106, 78, 1)', color:'white'}}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoleList;