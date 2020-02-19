import React, {useState} from 'react';
import HorizontalNav from '../../baseUI/HorizontalNav';
import {alphaTypes, categoryTypes} from '../../api/config';
import Scroll from '../../baseUI/Scroll';
import {NavContainer, List, ListItem, ListContainer} from './style';

interface ISingersProps {

}

const singerList: ISingerItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
  return {
    picUrl: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
    name: '啊哈哈哈哈',
    accountId: 277313426
  };
});

const renderSingerList = () => {
  return (
    <List>
      {
        singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img-wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="歌手"/>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })
      }
    </List>
  );
};

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
    <div>
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
      <ListContainer>
        <Scroll>
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  );
};

export default React.memo(Singers);