import React, {useState} from 'react';
import HorizontalNav from '../../baseUI/HorizontalNav';
import {alphaTypes, categoryTypes} from '../../api/config';
import {NavContainer} from './style';

interface ISingersProps {

}

const Singers = () => {
  const [category, setCategory] = useState<string>('');
  const [alpha, setAlpha] = useState<string>('');

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  };
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  };

  return (
    <NavContainer>
      <HorizontalNav
        list={categoryTypes}
        title={'分类（默认热门）：'}
        handleClick={(val) => handleUpdateCategory(val)}
        oldVal={category}/>
      <HorizontalNav
        list={alphaTypes}
        title={'首字母：'}
        handleClick={(val) => handleUpdateAlpha(val)}
        oldVal={alpha}/>
    </NavContainer>
  );
};

export default Singers;