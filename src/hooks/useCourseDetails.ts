import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';

const fetchCourseDetails = async (courseId: any) => {
  const response = await axios.get(`${apiBaseUrl}/course/details/${courseId}`);
  return response.data;
};

const useCourseDetails = (courseId: any) => {
  return useQuery(['courseDetails', courseId], () =>
    fetchCourseDetails(courseId),
  );
};

export default useCourseDetails;
