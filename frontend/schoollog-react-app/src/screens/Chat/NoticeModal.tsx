import React, { useRef, useCallback, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Modal.css';
import { API_BASE_URL } from '../config';
import { ReactComponent as CloseX } from '../../assets/modal-X.svg';
import { ReactComponent as Img1 } from '../../assets/noticeModal-img1.svg';
import { ReactComponent as Img2 } from '../../assets/noticeModal-img2.svg';
import { ReactComponent as Img3 } from '../../assets/noticeModal-img3.svg';
import { ReactComponent as Img4 } from '../../assets/noticeModal-img4.svg';
import { ReactComponent as Arrow1 } from '../../assets/usageModal-arrow1.svg';
import { ReactComponent as Arrow2 } from '../../assets/usageModal-arrow2.svg';


interface ModalProps {
  open: boolean;
  close: () => void;
}

const NoticeModal: React.FC<ModalProps> = (props) => {
  const { open, close } = props;

  const handleCloseButtonClick = () => {
    close();
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    appendDots: (dots: any) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom'
  };

  const slickRef = useRef<any>(null);

  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, []);
  
  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  }, []);

  useEffect(() => {
    if (slickRef.current) {
      slickRef.current.slickGoTo(0);
    }
  }, [open]);

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      <section className="Modal-contentBox2">
        <div className="Modal-close">
          <span className='UM-title'>
            유의사항
          </span>
          <button className="Modal-closeBtn" onClick={handleCloseButtonClick}><CloseX /></button>
        </div>
          <div>
            <Slider {...settings} ref={slickRef}>
              <div>
                <Img1 className='NM-Img'/>
                <div className="NM-arrows" style={{marginTop: "100px"}}>
                  <div className="NM-arrow" onClick={previous}>
                    <Arrow1  />
                  </div>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow2 />
                  </div>
                </div>
              </div>
              <div>
                <Img2 className='NM-Img'/>
                <div className="NM-arrows" style={{marginTop: "60px"}}>
                  <div className="NM-arrow" onClick={previous}>
                    <Arrow2 style={{ transform: 'rotate(180deg)' }}  />
                  </div>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow2 />
                  </div>
                </div>
              </div>
              <div>
                <Img3 className='NM-Img'/>
                <div className="NM-arrows" style={{marginTop: "29px"}}>
                  <div className="NM-arrow" onClick={previous}>
                    <Arrow2 style={{ transform: 'rotate(180deg)' }}  />
                  </div>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow2 />
                  </div>
                </div>
              </div>
              <div>
                <Img4 className='NM-Img' />
                <div className="NM-arrows" style={{marginTop: "89px"}}>
                  <div className="NM-arrow" onClick={previous}>
                    <Arrow2 style={{ transform: 'rotate(180deg)' }}  />
                  </div>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow1 style={{ transform: 'rotate(180deg)'}} />
                  </div>
                </div>
              </div>
            </Slider>

          </div>
      </section>
    </div>
  );
};

export default NoticeModal;
