import React from 'react';
import Icon from '../../assets/icons/Icon';
import {getCount} from '../../api/utils';
import {
  ListWrapper,
  List,
  ListItem
} from './style';

interface IRecommendListProps {
  recommendList: {
    id: number
    picUrl: string
    playCount: number
    name: string
  }[]
}

const RecommendList = (props: IRecommendListProps) => {
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.recommendList.map((item, index) => {
            return (
              <ListItem key={item.id + index}>
                <div className="img-wrapper">
                  <div className="decorate"></div>
                  <img src={item.picUrl + '?param=300x300'} alt="推荐歌曲"/>
                  <div className="play-count-wrapper">
                    <Icon.HeadPhone className="icon headphone"/>
                    <span className="play-count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="description">
                  {item.name}
                </div>
              </ListItem>
            );
          })
        }
      </List>
    </ListWrapper>
  );
};

export default React.memo(RecommendList);