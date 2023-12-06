import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCourseDetails = async (courseId: any) => {
  const response = await axios.get(`http://172.16.100.209:8002/api/clms/dev/course/details/${courseId}`);
  return response.data;
};

const useCourseDetails = (courseId : any) => {
  return useQuery(['courseDetails', courseId], () => fetchCourseDetails(courseId));
};

export default useCourseDetails;
