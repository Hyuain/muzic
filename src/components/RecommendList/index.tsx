import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import {getCount} from '../../api/utils';
import LazyLoad from 'react-lazyload';
import {
  ListWrapper,
  List,
  ListItem
} from './style';

interface IRecommendListProps extends RouteComponentProps {
  recommendList: IRecommendItem[]
}

const RecommendList: React.FunctionComponent<IRecommendListProps> = (props) => {

  const enterDetail = (id: number) => {
    props.history.push(`/recommend/${id}`);
  };

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.recommendList.map((item, index) => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                <div className="img-wrapper">
                  <div className="decorate"></div>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                    <img src={item.picUrl + '?param=300x300'} alt="推荐歌曲" width="100%" height="100%"/>
                  </LazyLoad>
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

export default React.memo(withRouter(RecommendList));