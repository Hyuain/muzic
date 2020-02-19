import React, {useEffect, useState} from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import {SliderContainer} from './style';

interface ISliderProps {
  bannerList: { imageUrl: string }[]
}

const Slider = (props: ISliderProps) => {
  const [sliderSwiper, setSliderSwiper] = useState<null | Swiper>(null);
  const {bannerList} = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el: '.swiper-pagination'},
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);


  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl + Math.random()}>
                  <div className="img-wrapper">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐"/>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
};

export default React.memo(Slider);