import React, { useRef, useCallback, useState } from 'react';
import "./Home.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ReactComponent as PrevImg } from '../../assets/main-carousel-prev.svg';
import { ReactComponent as NextImg } from '../../assets/main-carousel-next.svg';
import step1 from '../../assets/main-carousel-step1.png';
import step2 from '../../assets/main-carousel-step2.png';
import step3 from '../../assets/main-carousel-step3.png';
import step4 from '../../assets/main-carousel-step4.png';

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
        <img src={step1} alt="step1" />
        </div>
        <div>
          <img src={step2} alt="step2" />
        </div>
        <div>
          <img src={step3} alt="step3" />
        </div>
        <div>
          <img src={step4} alt="step4" />
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