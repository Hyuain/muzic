import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';

interface IHomeProps {
  route: RouteConfig
}

const Home = (props: IHomeProps) => {
  const {route} = props;
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
};

export default Home;