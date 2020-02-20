import {
  getHotSingerListRequest,
  getSingerListRequest
} from '../../../api/request';
import * as actionTypes from './constants';
import {fromJS} from 'immutable';

export const changeSingerList = (data: ISingerItem[]) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = (data: number) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const changePullUpLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
});

export const changePullDownLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
});

export const getHotSingerList = () => {
  return (dispatch: any) => {
    getHotSingerListRequest(0).then((data: any) => {
      dispatch(changeSingerList(data.artists));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    });
  };
};

export const refreshMoreHotSingerList = () => {
  return (dispatch: any, getState: any) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(pageCount).then((data: any) => {
      const newSingerList = [...singerList, ...data.artists];
      dispatch(changeSingerList(newSingerList));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    });
  };
};

export const getSingerList = (category: string, alpha: string) => {
  return (dispatch: any, getState: any) => {
    getSingerListRequest(category, alpha, 0).then((data: any) => {
      dispatch(changeSingerList(data.artists));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  };
};

export const refreshMoreSingerList = (category: string, alpha: string) => {
  return (dispatch: any, getState: any) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, pageCount).then((data: any) => {
      const newSingerList = [...singerList, ...data.artists];
      dispatch(changeSingerList(newSingerList));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  };
};