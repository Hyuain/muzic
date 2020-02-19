import styled from 'styled-components';
import style from '../../assets/global-style';

export const NavContainer = styled.div`
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
`;

export const ListItem = styled.div`
  display: flex;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style['border-color']};
  .img-wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style['font-size-m']};
    color: ${style['font-color-description']};
    font-weight: 500;
  }
  
`;
