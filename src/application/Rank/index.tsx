import React, {useEffect} from 'react';
import {getRankList} from './store';
import {connect} from 'react-redux';
import {filterIndex} from '../../api/utils';
import Scroll from '../../baseUI/Scroll';
import Loading from '../../baseUI/Loading';
import {Container, Tracks, List, ListItem} from './style';

interface IRankProps {
  rankList: any
  loading: boolean
  getRankListDataDispatch: () => void
}

const renderRankList = (list: IRankItem[], global: boolean) => {
  return (
    <List globalRank={global}>
      {
        list.map((item) => {
          return (
            <ListItem key={item.coverImgUrl} tracks={item.tracks}>
              <div className="img-wrapper">
                <img src={item.coverImgUrl} width="100%" alt="榜单封面"/>
                <div className="decorate"></div>
                <span className="update-frequency">{item.updateFrequency}</span>
              </div>
              {item.tracks.length ? renderTracks(item.tracks) : null}
            </ListItem>
          );
        })
      }
    </List>
  );
};

const renderTracks = (tracks: ITrackItem[]) => {
  return (
    <Tracks>
      {
        tracks.map((item, index) => {
          return <li key={index}>{index + 1}. {item.first} - {item.second}</li>;
        })
      }
    </Tracks>
  );
};

const Rank = (props: IRankProps) => {
  const {rankList, loading} = props;
  const {getRankListDataDispatch} = props;

  const rankListJS: IRankItem[] = rankList ? rankList.toJS() : [];
  const globalStartIndex = filterIndex(rankListJS);
  const officialList = rankListJS.slice(0, globalStartIndex);
  const globalList = rankListJS.slice(globalStartIndex);

  useEffect(() => {
    getRankListDataDispatch();
    // eslint-disable-next-line
  }, []);

  let displayStyle = loading ? {display: 'none'} : {display: ''};

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList, false)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      {loading ? <Loading/> : null}
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));