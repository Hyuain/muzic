import * as actionTypes from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
  bannerList: [],
  recommendList: []
});

interface IAction {
  type: string
  data: any
}

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
}