import React from 'react';
import HorizontalNav from '../../baseUI/HorizontalNav';
import {alphaTypes, categoryTypes} from '../../api/config';
import {NavContainer} from './style';

interface ISingersProps {

}

const Singers = () => {
  return (
    <NavContainer>
      <HorizontalNav list={categoryTypes} title={"分类（默认热门）："}></HorizontalNav>
      <HorizontalNav list={alphaTypes} title={"首字母："}></HorizontalNav>
    </NavContainer>
  );
};

export default Singers;