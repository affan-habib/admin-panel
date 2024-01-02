// Import necessary dependencies
import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';

// Define the fetch function that makes the API request
const fetchUsersList = async ({ itemsPerPage, page, search }: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${apiBaseUrl}/admins`, {
      params: {
        itemsPerPage,
        page,
        search,
        pagination: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching userList');
  }
};

// Define the custom hook using useQuery
const useUserList = ({ itemsPerPage, page, search }: any) => {
  const { showSnackbar } = useSnackbar();
  return useQuery(
    ['userList', { itemsPerPage, page, search }],
    () => fetchUsersList({ itemsPerPage, page, search }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus
      onError: (error: any) => {
        showSnackbar(error.message || 'An error occurred', 'error');
      },
    },
  );
};

export default useUserList;
