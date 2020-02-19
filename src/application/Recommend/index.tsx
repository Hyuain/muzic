import React, {useEffect} from 'react';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList';
import {connect} from 'react-redux';
import * as actionTypes from './store/actionCreators';
import Scroll from '../../baseUI/Scroll';
import {forceCheck} from 'react-lazyload';
import {Content} from './style';

interface IRecommendProps {
  bannerList: any
  recommendList: any
  getBannerDataDispatch: () => void
  getRecommendListDataDispatch: () => void
}

const Recommend = (props: IRecommendProps) => {
  const {bannerList, recommendList} = props;
  const {getBannerDataDispatch, getRecommendListDataDispatch} = props;

  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
    // eslint-disable-next-line
  }, []);

  const bannerListJS: IBannerItem[] = bannerList ? bannerList.toJS() : [];
  const recommendListJS: IRecommendItem[] = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
};

const mapStateToProps = (state: any) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));