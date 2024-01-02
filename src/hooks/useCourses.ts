// Import necessary dependencies
import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';

// Define the fetch function that makes the API request
const fetchCourses = async ({ itemsPerPage, page, search }: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${apiBaseUrl}/course`, {
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
    throw new Error('Error fetching courses');
  }
};

const useCourses = ({ itemsPerPage, page, search }: any) => {
  const { showSnackbar } = useSnackbar();
  return useQuery(
    ['courses', { itemsPerPage, page, search }],
    () => fetchCourses({ itemsPerPage, page, search }),
    {
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        showSnackbar(error.message || 'An error occurred', 'error');
      },
    },
  );
};

export default useCourses;
