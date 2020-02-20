import React from 'react';
import Icon from '../../assets/icons/Icon';
import styled from 'styled-components';
import style from '../../assets/global-style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: ${style["font-color-light"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
  }
  >h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
  }
`;

interface IHeaderProps {
  handleClick: () => void
  title: string
}

const Header: React.FunctionComponent<IHeaderProps> = React.forwardRef((props, ref) => {

  const {handleClick, title} = props;

  return (
    <HeaderContainer>
      <Icon.Back className="icon back" onClick={handleClick}></Icon.Back>
      <h1>{title}</h1>
    </HeaderContainer>
  );
});

Header.defaultProps = {
  handleClick: () => {},
  title: ''
};

export default React.memo(Header);