import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Modal.css';
import { ReactComponent as CloseX } from '../../assets/modal-X.svg';
import { ReactComponent as Img1 } from '../../assets/usageModal-typing.svg';
import { ReactComponent as Img2 } from '../../assets/usageModal-img2.svg';
import { ReactComponent as Num1 } from '../../assets/usageModal-num1.svg';
import { ReactComponent as Num2 } from '../../assets/usageModal-num2.svg';

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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '24px',
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

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      <section className="UM-contentBox">
        <div className="Modal-close">
          <button className="Modal-closeBtn" onClick={handleCloseButtonClick}><CloseX /></button>
        </div>
          <div>
            <Slider {...settings}>
              <div className='UM-slide1'>
                <div className='UM-slide'>
                  <Num1 style={{marginBottom: '10px'}} />
                  <div className='UM-title'>채팅하기</div>
                  <div className='UM-usage1'>
                    채팅을 보내세요. <br />
                    챗봇이 적절한 답변을 제시해 줘요. <br />
                    대화를 이어 나가며 고민을 말해보세요. 
                    </div>
                      <Img1 className='UM-Img1'/>
                    <div className="typing-demo">
                      친구랑 싸워서 기분이 우울해.
                    </div>
                </div>
              </div>
              <div className='UM-slide1'>
                <div className='UM-slide'>
                  <div><Num2 /></div>
                  <div className='UM-title'>종료하기</div>
                  <div className='UM-usage1'>
                  대화를 그만하고 싶으면,  <br />
                  채팅창에 “종료하기”를 입력하거나 <br />
                  “종료하기” 버튼을 누르세요. 
                    </div>
                </div>
              </div>
              <div className='UM-slide1'>
                <div className='UM-slide'>
                  <div className='UM-title'>감정분석</div>
                  <div className='UM-usage1'>
                    대화를 종료하면 챗봇과의 대화 내용을 
                    <br/>분석하여 나의 감정 상태를 분석해줘요.
                  </div>
                </div>
              </div>
              <div className='UM-slide1'>
                <div className='UM-slide'>
                  <div className='UM-title'>결과전송</div>
                  <div className='UM-usage1'>
                    
                  </div>
                </div>
              </div>

            </Slider>
          </div>
      </section>
    </div>
  );
};

export default UsageModal;
