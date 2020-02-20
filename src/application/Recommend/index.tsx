import React, {useEffect} from 'react';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList';
import {connect} from 'react-redux';
import * as actions from './store/actionCreators';
import Scroll from '../../baseUI/Scroll';
import Loading from '../../baseUI/Loading';
import {forceCheck} from 'react-lazyload';
import {Content} from './style';

interface IRecommendProps {
  bannerList: any
  recommendList: any
  enterLoading: boolean
  getBannerDataDispatch: () => void
  getRecommendListDataDispatch: () => void
}

const Recommend = (props: IRecommendProps) => {
  const {bannerList, recommendList} = props;
  const {enterLoading} = props;
  const {getBannerDataDispatch, getRecommendListDataDispatch} = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
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
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  );
};

const mapStateToProps = (state: any) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actions.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actions.getRecommendList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));