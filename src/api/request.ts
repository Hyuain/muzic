import {axiosInstance} from './config';

export const getBannerRequest = () => {
  return axiosInstance.get<ServerData>('/banner');
};

export const getRecommendListRequest = () => {
  return axiosInstance.get<ServerData>('/personalized');
};