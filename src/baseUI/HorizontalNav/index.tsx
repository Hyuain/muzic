import React, {FunctionComponent, useEffect, useRef} from 'react';
import Scroll from '../Scroll';
import styled from 'styled-components';
import style from '../../assets/global-style';

interface IHorizontalNav {
  list?: {
    key: string
    name: string
  }[]
  oldVal?: string
  title?: string
  handleClick?: ((key: string) => any) | null
}

const HorizontalNav: FunctionComponent<IHorizontalNav> = (props) => {

  const {list, oldVal, title} = props;
  const {handleClick} = props;

  const navBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navBarDOM = navBar.current;
    if (navBarDOM) {
      const tagElements = navBarDOM.querySelectorAll('span');
      let totalWidth = 0;
      Array.from(tagElements).forEach(el => {
        totalWidth += el.offsetWidth;
      });
      navBarDOM.style.width = `${totalWidth}px`
    }
  }, []);

  return (
    <Scroll direction={'horizontal'}>
      <div ref={navBar}>
        <List>
          <span>{title}</span>
          {
            list && list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick && handleClick(item.key)}>
                  {item.name}
                </ListItem>
              );
            })
          }
        </List>
      </div>
    </Scroll>
  );
};

HorizontalNav.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
    vertical-align: middle;
  }
`;

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: .8;
  }
`;

export default React.memo(HorizontalNav);