import { useQuery } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';

const fetchUserDetails = async (id: any) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${apiBaseUrl}/admins/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Add any additional headers if needed
    },
  });
  return response.data;
};

const useAdminUserDetails = (courseId: any) => {
  return useQuery(['user-details', courseId], () => fetchUserDetails(courseId));
};

export default useAdminUserDetails;
