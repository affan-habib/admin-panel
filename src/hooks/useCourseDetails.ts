import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext'; // Replace with the actual path

const fetchCourseDetails = async (courseId: any) => {
  const response = await axios.get(`${apiBaseUrl}/course/details/${courseId}`);
  return response.data;
};

const useCourseDetails = (courseId: any) => {
  const { showSnackbar } = useSnackbar();

  return useQuery(
    ['courseDetails', courseId],
    () => fetchCourseDetails(courseId),
    {
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        showSnackbar(error.message || 'An error occurred', 'error');
      },
    },
  );
};

export default useCourseDetails;
