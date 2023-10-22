import React, { useRef, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Modal.css';
import { API_BASE_URL } from '../config';
import { ReactComponent as CloseX } from '../../assets/modal-X.svg';
import { ReactComponent as Img1 } from '../../assets/usageModal-img1.svg';
import { ReactComponent as Img2 } from '../../assets/usageModal-img2.svg';
import { ReactComponent as Img3 } from '../../assets/usageModal-img3.svg';
import { ReactComponent as Img4 } from '../../assets/usageModal-img4.svg';
import { ReactComponent as Arrow1 } from '../../assets/usageModal-arrow1.svg';
import { ReactComponent as Arrow2 } from '../../assets/usageModal-arrow2.svg';
import { ReactComponent as Step1 } from '../../assets/usageModal-step1.svg';
import { ReactComponent as Step2 } from '../../assets/usageModal-step2.svg';
import { ReactComponent as Step3 } from '../../assets/usageModal-step3.svg';
import { ReactComponent as Step4 } from '../../assets/usageModal-step4.svg';


interface ModalProps {
  open: boolean;
  close: () => void;
}

const UsageModal: React.FC<ModalProps> = (props) => {
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

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      <section className="Modal-contentBox2">
        <div className="Modal-close">
          <span className='UM-title'>
            이용방법
          </span>
          <button className="Modal-closeBtn" onClick={handleCloseButtonClick}><CloseX /></button>
        </div>
          <div>
            <Slider {...settings} ref={slickRef}>
              <div>
                <Img1 className='UM-Img'/>
                <div className="UM-arrows">
                  <div className="UM-arrow" onClick={previous}>
                    <Arrow1  />
                  </div>
                  <Step1 className='UM-step'/>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow2 />
                  </div>
                </div>
                <div className='UM-usage'>
                  챗봇에게 채팅을 보내보세요. <br />
                  챗봇이 적절한 답변을 제시해줘요. <br />
                  대화를 이어 나가며 고민을 말해보세요. <br />
                </div>  
              </div>
              <div>
                <Img2 className='UM-Img'/>
                <div className="UM-arrows">
                  <div className="UM-arrow" onClick={previous}>
                    <Arrow2 style={{ transform: 'rotate(180deg)' }} />
                  </div>
                  <Step2 className='UM-step'/>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow2 />
                  </div>
                </div>
                <div className='UM-usage'>
                  대화를 그만하고 싶으면, <br />
                  채팅창에 “종료하기”를 입력하거나 <br />
                  “종료하기” 버튼을 누르세요.
                </div>  
              </div>
              <div>
                <Img3 className='UM-Img'/>
                <div className="UM-arrows">
                  <div className="UM-arrow" onClick={previous}>
                    <Arrow2 style={{ transform: 'rotate(180deg)' }} />
                  </div>
                  <Step3 className='UM-step'/>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow2 />
                  </div>
                </div>
                <div className='UM-usage'>
                  ‘상담결과 보러가기’를 눌러 <br />
                  나의 상담결과를 확인해 보세요. <br />
                  대화 내용을 분석해서 상담 결과를 생성해요.
                </div>  
              </div>
              <div>
                <Img4 className='UM-Img' style={{marginLeft: "30px"}}/>
                <div className="UM-arrows">
                  <div className="UM-arrow" onClick={previous}>
                    <Arrow2 style={{ transform: 'rotate(180deg)' }} />
                  </div>
                  <Step4 className='UM-step4'/>
                  <div className="UM-arrow" onClick={next}>
                    <Arrow1 style={{ transform: 'rotate(180deg)' }} />
                  </div>
                </div>
                <div className='UM-usage'>
                  상담결과 하단의 ‘상담 신청하기’를 통해 <br />
                  실제 선생님과 상담을 할 수 있어요. <br />
                  선생님과 상담하기 메뉴에서 확인할 수 있어요.
                </div>  
              </div>
            </Slider>
          </div>
      </section>
    </div>
  );
};

export default UsageModal;
