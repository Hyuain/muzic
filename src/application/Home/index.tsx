import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {NavLink} from 'react-router-dom';
import {
  Top,
  Tab,
  TabItem
} from './style'
import Icon from '../../assets/icons/Icon'

interface IHomeProps {
  route: RouteConfig
}

const Home = (props: IHomeProps) => {
  const {route} = props;
  return (
    <div>
      <Top>
        <Icon.Menu className="icon menu"></Icon.Menu>
        <span className="title">Muzic</span>
        <Icon.Search className="icon search"></Icon.Search>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
      </Tab>
      {renderRoutes(route.routes)}
    </div>
  );
};

export default React.memo(Home);