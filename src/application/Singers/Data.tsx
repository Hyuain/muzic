import React, {createContext, FunctionComponent, useReducer} from 'react';
import {fromJS} from 'immutable';

export const CategoryDataContext = createContext<{ state: any, dispatch: any }>({state: null, dispatch: null});

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

interface IAction {
  type: string
  data: any
}

const reducer = (state: any, action: IAction) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data);
    case CHANGE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
};

export const Data: FunctionComponent = (props) => {
  const [state, dispatch] = useReducer(reducer, fromJS({
    category: '',
    alpha: ''
  }));
  return (
    <CategoryDataContext.Provider value={{state, dispatch}}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};