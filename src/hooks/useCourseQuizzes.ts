import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';

const fetchCourseQuizzes = async (id: any) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    `${apiBaseUrl}/quizzes?course_assessment_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

const useCourseQuizzes = (assesmentId: any) => {
  const { showSnackbar } = useSnackbar();
  return useQuery(
    ['couse-quizzes', assesmentId],
    () => fetchCourseQuizzes(assesmentId),
    {
      refetchOnWindowFocus: false,

      onError: (error: any) => {
        showSnackbar(error.message || 'An error occurred', 'error');
      },
    },
  );
};

export default useCourseQuizzes;
