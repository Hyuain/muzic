import * as actionTypes from './constants';
import {fromJS} from 'immutable';
import {getBannerRequest, getRecommendListRequest} from '../../../api/request';

// TODO
export const changeBannerList = (data: any) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

// TODO
export const changeRecommendList = (data: any) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

export const getBannerList = () => {
  // TODO
  return (dispatch: any) => {
    getBannerRequest().then((response) => {
      const {data} = response;
      dispatch(changeBannerList(data.banners));
    }).catch(() => {
      console.log('轮播图数据传输错误');
    });
  };
};

export const getRecommendList = () => {
  // TODO
  return (dispatch: any) => {
    getRecommendListRequest().then((response) => {
      const {data} = response;
      dispatch(changeRecommendList(data.result));
    }).catch(() => {
      console.log('推荐歌单数据传输错误');
    });
  };
};