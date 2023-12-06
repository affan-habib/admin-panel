import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';

interface PermissionData {
  module: string;
  permissions: string[];
}

const Permission: React.FC = () => {
  // Sample data for the table
  const tableData: PermissionData[] = [
    { module: 'User Role', permissions: ['Create', 'Edit', 'Delete', 'Update'] },
    { module: 'Module', permissions: ['Create', 'Edit', 'Delete', 'Update'] },
  ];

  // Function to handle header checkbox change
  const handleHeaderCheckboxChange = (isChecked: boolean) => {
    console.log('Header Checkbox is checked:', isChecked);
    // Add your logic here to handle the change
  };

  // Function to handle row checkbox change
  const handleRowCheckboxChange = (rowIndex: number, permissionIndex: number, isChecked: boolean) => {
    // Add your logic here to handle the change
  };

  return (
    <Grid maxWidth="xl" style={{ marginTop: '20px' }}>
        <Typography sx={{fontWeight:'600',fontSize:'16px'}}>Assign Permission to Role</Typography>
      <TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(179, 224, 221, 1)", height: '10px' }}>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleHeaderCheckboxChange(e.target.checked)} />}
                  label="Module Name"
                />
              </TableCell>
              <TableCell sx={{fontSize:'1rem',fontWeight:'400'}}>Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <FormControlLabel
                    control={<Checkbox onChange={(e) => handleRowCheckboxChange(rowIndex, -1, e.target.checked)} />}
                    label={row.module}
                  />
                </TableCell>
                <TableCell>
                  {row.permissions.map((permission, permissionIndex) => (
                    <FormControlLabel
                      key={permissionIndex}
                      control={
                        <Checkbox
                          onChange={(e) => handleRowCheckboxChange(rowIndex, permissionIndex, e.target.checked)}
                        />
                      }
                      label={permission}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Permission;