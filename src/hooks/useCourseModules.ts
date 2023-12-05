import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCourseDetails = async (courseId: any) => {
  const response = await axios.get(
    `http://172.16.100.209:8002/api/clms/dev/course/get-course-module-by-course-id/${courseId}`,
  );
  return response.data;
};

const useCourseModules = (courseId: any) => {
  return useQuery(['courseModules', courseId], () =>
    fetchCourseDetails(courseId),
  );
};

export default useCourseModules;
