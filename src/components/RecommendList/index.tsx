import React from 'react';
import Icon from '../../assets/icons/Icon';

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
    <div>
      <h1 className="title">推荐歌单</h1>
      <div>
        {
          props.recommendList.map((item, index) => {
            return (
              <div key={item.id + index}>
                <div className="img-wrapper">
                  <div className="decorate"></div>
                  <img src={item.picUrl + '?param=300x300'} alt="推荐歌曲"/>
                  <div className="play-count-wrapper">
                    <Icon.HeadPhone className="icon headphone"/>
                    <span className="play-count">{item.playCount}</span>
                  </div>
                </div>
                <div className="description">
                  {item.name}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default React.memo(RecommendList);