import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rectangle1 from './Rectangle1.png';
import Rectangle2 from './Rectangle1.png';
import Rectangle from './Rectangle1.png';

const ImageCarousel: React.FC = () => {
  const imageUrls = [
    // give some dummy images from internet
    'https://picsum.photos/800/300/?random',
    'https://picsum.photos/800/301/?random',
    'https://picsum.photos/800/302/?random',
    // './Rectangle1.png',
    // './Rectangle2.png',
    // './Rectangle3.png',
  ];
  // 라이브러리에서 제공하는 이전 화살표 컴포넌트
  const PrevArrow: React.FC = (props) => <div {...props} className="slick-prev" />;

  // 라이브러리에서 제공하는 다음 화살표 컴포넌트
  const NextArrow: React.FC = (props) => <div {...props} className="slick-next" />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <PrevArrow />, // 라이브러리에서 제공하는 이전 화살표 컴포넌트 사용
    // nextArrow: <NextArrow />, // 라이브러리에서 제공하는 다음 화살표 컴포넌트 사용
  };

  return (
    <div style={{
      // display: 'flex',
      // width: '100%',
      // height: '100%',
      zIndex: 1,
    }}>
      <Slider {...settings}>
        {imageUrls.map((url) => (
          <div key={url}>
            <img src={url} alt="slide" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
