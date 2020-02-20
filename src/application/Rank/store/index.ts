import {fromJS} from 'immutable';
import {getRankListRequest} from '../../../api/request';

// constants

export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHANGE_LOADING = 'hone/rank/CHANGE_LOADING';

// reducer

const defaultState = fromJS({
  rankList: [],
  loading: true
});

interface IAction {
  type: string
  data: any
}

const reducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set('rankList', action.data);
    case CHANGE_LOADING:
      return state.set('loading', action.data);
    default:
      return state;
  }
};

export {reducer};

// createActions

const changeRankList = (data: any[]) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
});

const changeLoading = (data: boolean) => ({
  type: CHANGE_LOADING,
  data
});

export const getRankList = () => {
  return (dispatch: any) => {
    getRankListRequest().then((data: any) => {
      dispatch(changeRankList(data.list));
      dispatch(changeLoading(false));
    });
  };
};