import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import './Home.css'
import '../Chat/Modal.css'
import ImageCarousel from './ImageCarousel';
import { API_BASE_URL } from '../config';
import { ReactComponent as Circle } from '../../assets/main-circle.svg'
import { ReactComponent as Character } from '../../assets/main-character.svg'
import { ReactComponent as Logo } from '../../assets/main-logo2.svg'
import { ReactComponent as SpeechBubble } from '../../assets/main-speechbubble.svg'
import { ReactComponent as DogDoctor } from '../../assets/main-manual-dog.svg'
import { ReactComponent as ChatManual } from '../../assets/main-manual-chat.svg'
import { ReactComponent as Emoticons } from '../../assets/main-manual-emoticon.svg'
import { ReactComponent as CatFace } from '../../assets/main-test-cat.svg'
import { ReactComponent as Phone } from '../../assets/main-test-phone.svg'
import { ReactComponent as DogFace } from '../../assets/main-dog.svg'
import { ReactComponent as ChatModal } from '../../assets/home-modal-chat.svg'
import { ReactComponent as TestModal } from '../../assets/home-modal-test.svg'
interface ModalProps {
  open: boolean;
  close: () => void;
  imageType: string ;
}

function Home() {
  const [activeButton, setActiveButton] = useState('Schoollog');
  const [ModalOpen, setModalOpen] = useState(false);
  const [modalImageType, setModalImageType] = useState('chat');
  const openModal = (imageType: any) => { 
    setModalImageType(imageType); 
    setModalOpen(true);};
  const closeModal = () => { setModalOpen(false); };
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const [userData, setUserData] = useState({
    job: '', 
  });
  const isLoggedIn = cookies.get("isLoggedIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(
        `${API_BASE_URL}:8000/account/decode/`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((res: any) => {
        const data = res.data;
        setUserData({
          job: data.student.job === 0 ? 'Teacher' : 'Student',
        });
      });
    }
  }, [isLoggedIn]);  // isLoggedIn 상태가 변경될 때만 실행

  const gotoChat = () => {
    if (userData.job === "Teacher") {
      openModal('chat');
    } else if (!isLoggedIn) { // 로그인 안되어 있는 경우
      navigate('/login');
    } else { // user_id가 있으면 ChatRoom 생성 및 이동
      axios.post(`${API_BASE_URL}:8000/chat/create/`, null, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }).then((response) => {
          const chatroom_id = response.data.chatroom_url; 
          navigate(`${chatroom_id}`); 
        })
        .catch((error) => {
          console.error('Error creating ChatRoom:', error);
        });
    }
  };

  const gotoTest = () => {
    if (userData.job === "Teacher") {
      openModal('test');
    } else {
      navigate('/test/start');
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Schoollog', 'DrawingTest', 'Chatbot'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveButton(currentSection);
      }
    }; 

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const handleButtonClick = (buttonId: any) => {
    setActiveButton(buttonId);
  };

  const TeacherModal: React.FC<ModalProps> = (props) => {
    const { open, close, imageType } = props;
    const closeBtn = () => { close(); };
    let modalImage;
    if (imageType === 'test') {
      modalImage = <div className="Modal-completeImg"><TestModal /></div>;
    } else if (imageType === 'chat') {
      modalImage = <div className="Modal-completeImg"><ChatModal /></div>;
    }
    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open && (imageType === 'test' || imageType === 'chat') ? (
          <section className="Modal-contentBox">  
          <div className="Modal-main">
            {modalImage}
            <button className="Modal-gotoResult" onClick={closeBtn}>돌아가기</button>
          </div>
          </section>
        ) : null}
      </div>
    );
  };

  return(
    <div className="Home-fullbox">
      <div className="Home-main-manual" id="Schoollog">
        <div className="Home-mainbox-button">
          <Link
            to="Schoollog"
            smooth={true}
            duration={500}
            onClick={() => handleButtonClick('Schoollog')}
          >
            <div
              className={`Home-button ${
                activeButton === 'Schoollog'
                  ? 'Home-button-inactive'
                  : 'Home-button-disabled'
              }`}
            >
              스쿨로그
            </div>
          </Link>
          <Link
            to="DrawingTest"
            smooth={true}
            duration={500}
            onClick={() => handleButtonClick('DrawingTest')}
          >
            <div
              className={`Home-button ${
                activeButton === 'DrawingTest'
                  ? 'Home-button-inactive'
                  : 'Home-button-disabled'
              }`}
            >
              그림 테스트
            </div>
          </Link>
          <Link
              to="Chatbot"
              smooth={true}
              duration={500}
              onClick={() => handleButtonClick('Chatbot')}
            >
              <div
                className={`Home-button ${
                  activeButton === 'Chatbot'
                    ? 'Home-button-inactive'
                    : 'Home-button-disabled'
                }`}
              >
                챗봇 상담
              </div>
            </Link>
        </div>
        <div className="Home-mainbox">
          <Circle className="position-circle"/>
          <Logo className="position-logo"/>
          <p className="position-text">
            나의 상담 기록: 나를 찾아가는 시간
          </p>
          <Character className="position-character"/>
        </div>
        <div className="Home-manual">
          <SpeechBubble />
          <p>
            즐거운 학교생활을 <br/>
            스쿨로그와 함께 해요.
          </p>
          <p>
            나의 다양한 고민들을 <br/>
            스쿨로그를 통해 해소할 수 있어요. <br/>
            부담스럽지 않은 상담을 경험해 보세요. <br/>
          </p>
          <div className="Home-manual-firstbox">
            <DogDoctor  />
          </div>
          <p className="Home-manual-text">
            언제 어디서나 상담을 받을 수 있어요.
          </p>
          <div className="Home-manual-secondbox">
            <ChatManual />
          </div> 
          <p className="Home-manual-text">
            선생님과 익명으로 상담이 진행돼요.
          </p>
          <div className="Home-manual-thirdbox">
            <Emoticons />
          </div>
          <p className="Home-manual-text">
            나의 상담 분석 보고서를 확인해요.
          </p>
        </div>
        </div>

        <div className="Home-test-manual" id="DrawingTest">
          <CatFace />
          <p>
            그림 테스트를 통해 <br/>
            나의 심리 상태를 파악해요.
          </p>
          <p>
            지금 어떤 감정을 느끼고 있나요? <br/>
            간단한 그림을 그려보는 테스트를 통해 <br/>
            나의 심리 상태를 파악해요. <br />
          </p>
          <Phone />
          <TeacherModal open={ModalOpen} close={closeModal} imageType={modalImageType} />
          <div className="Home-test-manual-button" onClick={gotoTest}>
            테스트하러 가기
          </div>
        </div>
        <div className="Home-chatbot-manual" id="Chatbot">
        <DogFace />
        <p>
          AI 챗봇과 상담하여 <br/>
          나의 심리 상태를 확인해요.
        </p>
        <p>
          요즘 고민이 있나요? <br/>
          AI 챗봇 선생님과 대화를 나눠 보세요. <br/>
          상담 내용을 바탕으로 심리 분석 결과를  제공해요.
        </p>
        <div className="Home-chatbot-manual-slider">
          <div>
            <ImageCarousel />
          </div>
        </div>
        <div className="Home-chatbot-manual-button" onClick={gotoChat}>
          상담하러 가기
        </div>
      </div>
    </div>
  )
}

export default Home;