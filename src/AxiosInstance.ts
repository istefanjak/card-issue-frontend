import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const isExceptionResponse = (response: any): boolean => {
  return 'messages' in response;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (isExceptionResponse(error.response.data)) {
        error.response.data.messages.forEach(toast.error);
      } else {
        toast.error('Unknown error.');
      }
    } else if (error.request) {
      toast.error('No response received from the server.');
    } else {
      toast.error('Error setting up the request.');
    }

    return Promise.reject(error);
  }
);

export default api;
