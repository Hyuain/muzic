import React from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../application/Home';
import Index from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (
          <Redirect to={'/recommend'}/>
        )
      },
      {
        path: '/recommend',
        component: Index
      },
      {
        path: '/singers',
        component: Singers
      },
      {
        path: '/rank',
        component: Rank
      }
    ]
  }
];