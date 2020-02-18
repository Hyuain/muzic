import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import {GlobalStyle} from './style';

function App() {
  return (
    <div className="App">
      <HashRouter>
        {renderRoutes(routes as RouteConfig[])}
      </HashRouter>
      <GlobalStyle></GlobalStyle>
    </div>
  );
}

export default App;
