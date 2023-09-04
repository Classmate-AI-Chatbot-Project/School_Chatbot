import React, { useRef, useCallback, useState } from 'react';
import "./Home.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ReactComponent as PrevImg } from '../../assets/main-carousel-prev.svg';
import { ReactComponent as NextImg } from '../../assets/main-carousel-next.svg';
import { ReactComponent as Step1 } from '../../assets/home-step-one.svg';
import { ReactComponent as Step2 } from '../../assets/home-step-two.svg';
import { ReactComponent as Step3 } from '../../assets/home-step-three.svg';
import { ReactComponent as Step4 } from '../../assets/home-step-four.svg';


const ImageCarousel: React.FC = () => {
  const settings = {
    centerMode: true,
    centerPadding: '50',
    slidesToShow: 1,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
  };

  const slickRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
      setCurrentSlide((prevSlide) => (prevSlide - 1 + 4) % 4); 
    }
  }, []);

  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
    }
  }, []);

  const handleAfterChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="ImageCarousel-container">
      <Slider {...settings} ref={slickRef} afterChange={handleAfterChange}>
        <div>
          <Step1 />
        </div>
        <div>
          <Step2 />
        </div>
        <div>
          <Step3 />
        </div>
        <div>
          <Step4 />
        </div>
      </Slider>
      <div className="ImageCarousel-sliderBtn">
        <div onClick={previous} className="ImageCarousel-arrow">
          <PrevImg />
        </div>
        <div className="ImageCarousel-page">
          {currentSlide + 1}/4
        </div>
        <div onClick={next} className="ImageCarousel-arrow">
          <NextImg />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;