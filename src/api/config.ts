import axios from 'axios';

export const baseUrl = 'http://192.168.2.193:3333';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  transformResponse: (response: ServerResponse) => response.data
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log(error, ' 网络错误');
  }
);

export {
  axiosInstance
};