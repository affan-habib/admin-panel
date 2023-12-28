import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';

const fetchCourseQuizzes = async (id: any) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    `${apiBaseUrl}/quizzes?course_assessment_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any additional headers if needed
      },
    },
  );
  return response.data;
};

const useCourseQuizzes = (assesmentId: any) => {
  return useQuery(
    ['couse-quizzes', assesmentId],
    () => fetchCourseQuizzes(assesmentId),
    {
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    },
  );
};

export default useCourseQuizzes;
