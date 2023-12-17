// Import necessary dependencies
import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';

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

// Define the custom hook using useQuery
const useCourses = ({ itemsPerPage, page, search }: any) => {
  return useQuery(
    ['courses', { itemsPerPage, page, search }],
    () => fetchCourses({ itemsPerPage, page, search }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    },
  );
};

export default useCourses;
