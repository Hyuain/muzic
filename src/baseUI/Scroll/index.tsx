import React, {forwardRef, FunctionComponent, useEffect, useImperativeHandle, useRef, useState} from 'react';
import BScroll from 'better-scroll';
import styled from 'styled-components';

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
  const {direction, click, refresh, bounceTop, bounceBottom} = props;
  const {pullUp, pullDown, onScroll} = props;

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
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (scroll: BScroll) => {
      if (scroll.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
  });

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

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
    </ScrollContainer>
  );
});

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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