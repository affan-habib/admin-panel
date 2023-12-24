// Import necessary dependencies
import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';

// Define the fetch function that makes the API request
const fetchAssesmentTypes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${apiBaseUrl}/quiz-types`, {
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
const useAssesmentTypes = () => {
  return useQuery('assesmentTypes', () => fetchAssesmentTypes(), {
    // enabled: false, // Do not automatically fetch data
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
  });
};

export default useAssesmentTypes;
