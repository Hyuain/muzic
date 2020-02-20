import React, {forwardRef, FunctionComponent, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import BScroll from 'better-scroll';
import {debounce} from '../../api/utils';
import styled from 'styled-components';
import Loading from '../Loading';
import LoadingV2 from '../LoadingV2';

interface IScrollProps {
  direction?: 'vertical' | 'horizontal'
  click?: boolean
  refresh?: boolean
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  bounceTop?: boolean
  bounceBottom?: boolean
  pullUp?: (() => any) | null
  pullDown?: (() => any) | null
  onScroll?: ((scroll: BScroll) => any) | null
}

const Scroll: FunctionComponent<IScrollProps> = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {direction, click, refresh, bounceTop, bounceBottom, pullUpLoading, pullDownLoading} = props;
  const {pullUp, pullDown, onScroll} = props;

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scroll = new BScroll(scrollContainerRef.current, {
        scrollX: direction === 'horizontal',
        scrollY: direction === 'vertical',
        probeType: 3,
        click: click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom
        }
      });
      setBScroll(scroll);
      return () => {
        setBScroll(null);
      };
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll: BScroll) => {
      onScroll(scroll);
    });
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullUpDebounce, pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (scroll: BScroll) => {
      if (scroll.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
  }, [pullDownDebounce, pullDown, bScroll]);

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const pullUpDisplayStyle = pullUpLoading ? {display: ''} : {display: 'none'};
  const pullDownDisplayStyle = pullDownLoading ? {display: ''} : {display: 'none'};

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading style={pullUpDisplayStyle}><LoadingV2/></PullUpLoading>
      <PullDownLoading style={pullDownDisplayStyle}><Loading/></PullDownLoading>
    </ScrollContainer>
  );
});

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 100px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
  pullUp: null,
  pullDown: null,
  onScroll: null
};

export default Scroll;