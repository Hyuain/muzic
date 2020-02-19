import styled from 'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .img-wrapper {
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play-count-wrapper {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style['font-size-s']};
      line-height: 15px;
      color: ${style['font-color-light']};
      .play-count {
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .description{
    overflow: hidden;
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    text-align: left;
    font-size: ${style['font-size-s']};
    color: ${style['font-color-description']};
    line-height: 1.4;
  }
`;