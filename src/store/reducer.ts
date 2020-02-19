import {combineReducers} from 'redux-immutable';
import recommendReducer from '../application/Recommend/store/reducer';

export default combineReducers({
  recommend: recommendReducer
});