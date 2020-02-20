import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import {Provider} from 'react-redux';
import store from './store';
import {Data} from './application/Singers/Data';
import {GlobalStyle} from './style';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <Data>
          {renderRoutes(routes as RouteConfig[])}
        </Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
