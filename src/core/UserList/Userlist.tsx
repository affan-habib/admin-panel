import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ReactTable from 'components/tables/ReactTable';
import PageSizeSelect from 'components/tables/PageSizeSelect';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UserModal from './UserModal';




const CourseList: React.FC = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleVisibilityClick = async (row: any) => {
    try {
      const token = '8IyxRvGlZN8vqSyLoz6xF2tU3vGC7YmFWJwjAxwWoCjWnB5YicoVSMXuyuXSkRTpuCGg8ApRmRa4A5FpbntXIlK0FHfjt1V2yA8176taCN3eUqER9eHJmmnuyjIfXDaLaYzIgV5mWstHLB1E0C1VpnKlRvxQ6kNVa4I4ay1wJ965FBSttPx7aF5bU8eYVnHz75Ycud0tNt7AFNB6bW56hllyVmyXxqRkDOeoWMtZANn7dZeT';
  
      const response = await axios.get(`http://172.16.100.209:8002/api/clms/dev/admins/${row.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data && response.data.data) {
        // Log the response for debugging purposes
        console.log('User Data API Response:', response.data);
  
        // Show the modal with the data fetched from the API
        setSelectedUserData(response.data.data);
        setShowModal(true);
      } else {
        console.error('Invalid API response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const [selectedUserData, setSelectedUserData] = useState<any>({});
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'ব্যবহারকারীর সম্পূর্ন নাম', accessor: 'name' },
    { Header: 'ইউজার নেম', accessor: 'username' },
    { Header: 'ইউজার রোল নেম', accessor: 'type' },
    { Header: 'স্ট্যাটাস', accessor: 'status' },
    {
      Header: 'Actions',
      accessor: 'actions',
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


 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = '8IyxRvGlZN8vqSyLoz6xF2tU3vGC7YmFWJwjAxwWoCjWnB5YicoVSMXuyuXSkRTpuCGg8ApRmRa4A5FpbntXIlK0FHfjt1V2yA8176taCN3eUqER9eHJmmnuyjIfXDaLaYzIgV5mWstHLB1E0C1VpnKlRvxQ6kNVa4I4ay1wJ965FBSttPx7aF5bU8eYVnHz75Ycud0tNt7AFNB6bW56hllyVmyXxqRkDOeoWMtZANn7dZeT';
        const response = await axios.get('http://172.16.100.209:8002/api/clms/dev/admins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          // Log the response for debugging purposes
          console.log('API Response Data:', response.data);

          setData(response.data.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            username: item.username,
            type: item.type,
            status: item.status,
          })));
        } else {
          console.error('Invalid API response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset current page when changing page size
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" color="primary.main" mb={2}>
        পাঠ্যক্রমের তালিকা
      </Typography>

      <ReactTable
        columns={columns}
        data={data}
        totalCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <UserModal
                open={showModal}
                handleClose={() => setShowModal(false)}
                userData={selectedUserData}
            />
    </Container>
  );
  
};

export default CourseList;


