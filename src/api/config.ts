import axios from 'axios';

export const baseUrl = 'http://192.168.2.193:3000';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  response => response.data
  ,
  error => {
    console.log(error, ' 网络错误');
  }
);

export {
  axiosInstance
};