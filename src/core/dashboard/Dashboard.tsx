import { Avatar, Button, Container } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import MuiTable from 'components/tables/MuiTable';
import React, { useEffect, useState } from 'react';

const MyTableContainer: React.FC = () => {
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 1,
  });
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${paginationModel.page}&per_page=${paginationModel.pageSize}`,
        );
        const result = await response.json();
        setData(result.data);
        setRowCount(result.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [paginationModel]);

  const handlePageChange = (params: any) => {
    setPaginationModel({
      page: params.page + 1,
      pageSize: params.pageSize,
    });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <MainCard
        title="Users"
        modalButton={<Button variant="contained">Add User</Button>}
      >
        <MuiTable
          checkboxSelection
          columns={[
            { field: 'id', headerName: 'ID', width: 80 },
            {
              field: 'avatar',
              headerName: 'Image',
              renderCell: (params: any) => {
                return <Avatar src={params.row.avatar} />;
              },
            },
            {
              field: 'fullName',
              headerName: 'Full Name',
              flex: 1,
              valueGetter: (params: any) => {
                return params.row.first_name + ' ' + params.row.last_name;
              },
            },
            { field: 'email', headerName: 'Email', flex: 2 },
          ]}
          rows={data}
          getRowId={(row) => row.id}
          rowCount={rowCount}
          paginationModel={{
            pageSize: paginationModel.pageSize,
            page: paginationModel.page - 1,
          }}
          onPageinationModelChange={handlePageChange}
        />
      </MainCard>
    </Container>
  );
};

export default MyTableContainer;
