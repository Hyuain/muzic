import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {Top} from './style'
import Icon from '../../assets/icons/Icon'

interface IHomeProps {
  route: RouteConfig
}

const Home = (props: IHomeProps) => {
  const {route} = props;
  return (
    <div>
      <Top>
        hahah
        <Icon.Menu className="icon"></Icon.Menu>
      </Top>
      {renderRoutes(route.routes)}
    </div>
  );
};

export default Home;