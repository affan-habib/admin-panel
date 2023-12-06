import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';

const fetchCourseDetails = async (courseId: any) => {
  const response = await axios.get(
    `${apiBaseUrl}/course/get-course-module-by-course-id/${courseId}`,
  );
  return response.data;
};

const useCourseModules = (courseId: any) => {
  return useQuery(['courseModules', courseId], () =>
    fetchCourseDetails(courseId),
  );
};

export default useCourseModules;
