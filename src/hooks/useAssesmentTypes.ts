// Import necessary dependencies
import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';

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

const useAssesmentTypes = () => {
  const { showSnackbar } = useSnackbar();

  return useQuery('assesmentTypes', () => fetchAssesmentTypes(), {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      showSnackbar(error.message || 'An error occurred', 'error');
    },
  });
};

export default useAssesmentTypes;
