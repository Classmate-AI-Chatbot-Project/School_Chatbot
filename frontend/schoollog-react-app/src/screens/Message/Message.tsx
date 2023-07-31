import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import "../Chat/Chat.css"
import "./Message.css"
import "../Chat/Modal.css";
import dummyProfile from '../../assets/dummy-profile-img.png'
import { ReactComponent as MesBegin } from '../../assets/mes-begin.svg'
import { formatDate, currentDate } from "../Chat/Chat";

interface MessageInput {
  id: number;
  message: string;
  time: string;
  answer?: string;
}

interface ModalProps {
  open: boolean;
  close: () => void;
}

const ProfileModal: React.FC<ModalProps> = (props) => {
  const { open, close } = props;
  const handleCloseButtonClick = () => {
    close();
  };
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      <section className="MessageModal-contentBox">  
        <div className="Modal-main">
          <img className="Mes-modalProfile" src={dummyProfile} />
          <div className="Mes-modalName">조다은 선생님</div>
          <div className="Mes-modalSchool">덕성여자고등학교</div>
          <button className="Modal-gotoResult"  onClick={handleCloseButtonClick}>확인</button>
        </div>
      </section>
    </div>
  );
};

function Message() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<MessageInput[]>([]);
  const [showDate, setShowDate] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const generateId = () => {
    return Date.now(); // ChatAnswer에 부여되는 id. 로딩 표현하기 위해 사용
  };

  const mesOutputRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const newMessage: MessageInput = {
      id: generateId(),
      message,
      time: currentTime,
    };
    setChatLog([...chatLog, newMessage]);
    setMessage("");

    if (!showDate && chatLog.length === 0) {
      setShowDate(true);
    }
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };
  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <div className="Chat-Fullbox">
      <header className="Chat-Contentbox">
        <div className="Chat-Output" ref={mesOutputRef}>
          {showDate && (
            <div className="Chat-date">{formatDate(currentDate)}</div>
          )}
          {chatLog.length === 0 && (
            <div className="Mes-InitialScreen">
              <Link to="/chat">
                <button className="Mes-InitialScreenBtn"></button>
              </Link>
              <MesBegin className= "Mes-InitialScreenIcon" />
            </div>
          )}
          {chatLog.map((chat) => (
            <div key={chat.id}>
              <div className="Chat-Q">
                <span className="Chat-time">{chat.time}</span>
                <span className="Chat-message">{chat.message}</span>
              </div>
              <div className="Mes-A1">
                  <span className="Mes-profile">
                      <img onClick={openProfileModal} src={dummyProfile} />
                  </span>
                  <span className="Mes-A2">
                    <div className="Mes-name">조다은 선생님 </div>
                    <div className="Mes-answer">답변예시 답변예시 답변예시 답변예시 답변예시 답변예시 답변예시 </div>
                  </span>
                  <span className="Chat-time">{chat.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="Chat-Input">
          <span className="Mes-InputBox">
            <input 
              className="Mes-InputMessage"
              type="text"
              placeholder="메시지 보내기"
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </span>
          <button className="Chat-Send-btn" onClick={handleSubmit}></button>
        </div> 
      </header>
      <ProfileModal open={profileModalOpen} close={() => setProfileModalOpen(false)} />
    </div>
  );
}

export default Message;
