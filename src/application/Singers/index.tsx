import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actionCreators';
import LazyLoad, {forceCheck} from 'react-lazyload';
import {alphaTypes, categoryTypes} from '../../api/config';
import HorizontalNav from '../../baseUI/HorizontalNav';
import Scroll from '../../baseUI/Scroll';
import Loading from '../../baseUI/Loading';
import {NavContainer, List, ListItem, ListContainer} from './style';

interface ISingersProps {
  singerList: any
  pullUpLoading: boolean
  pullDownLoading: boolean
  pageCount: number
  enterLoading: boolean
  getHotSingerDispatch: () => void
  updateDispatch: (category: string, alpha: string) => void
  pullUpRefreshDispatch: (category: string, alpha: string, count: number) => void
  pullDownRefreshDispatch: (category: string, alpha: string) => void
}

const renderSingerList = (singerList: ISingerItem[]) => {
  return (
    <List>
      {
        singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img-wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="歌手"/>}>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="歌手"/>
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })
      }
    </List>
  );
};

const Singers = (props: ISingersProps) => {
  const [category, setCategory] = useState<string>('');
  const [alpha, setAlpha] = useState<string>('');

  const {singerList, pullUpLoading, pullDownLoading, pageCount, enterLoading} = props;
  const {getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch} = props;

  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  const singerListJS: ISingerItem[] = singerList ? singerList.toJS() : [];

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
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
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList(singerListJS)}
        </Scroll>
        {enterLoading ? <Loading/> : null}
      </ListContainer>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotSingerDispatch() {
      dispatch(actions.getHotSingerList());
    },
    updateDispatch(category: string, alpha: string) {
      dispatch(actions.changePageCount(0));
      dispatch(actions.changeEnterLoading(true));
      dispatch(actions.getSingerList(category, alpha));
    },
    pullUpRefreshDispatch(category: string, alpha: string, count: number) {
      dispatch(actions.changePullUpLoading(true));
      dispatch(actions.changePageCount(count + 1));
      if (category === '' && alpha === '') {
        dispatch(actions.refreshMoreHotSingerList());
      } else {
        dispatch(actions.refreshMoreSingerList(category, alpha));
      }
    },
    pullDownRefreshDispatch(category: string, alpha: string) {
      dispatch(actions.changePullDownLoading(true));
      dispatch(actions.changePageCount(0));
      if (category === '' && alpha === '') {
        dispatch(actions.getHotSingerList());
      } else {
        dispatch(actions.getSingerList(category, alpha));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));