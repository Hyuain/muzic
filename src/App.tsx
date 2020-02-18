import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import store from './store';
import {GlobalStyle} from './style';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        {renderRoutes(routes as RouteConfig[])}
      </HashRouter>
    </Provider>
  );
}

export default App;
