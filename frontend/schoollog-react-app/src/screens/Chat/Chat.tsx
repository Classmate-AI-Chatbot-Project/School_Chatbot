import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import ChatModal from "./ChatModal";
import UsageModal from "./UsageModal";
import NoticeModal from "./NoticeModal";
import { Link } from "react-router-dom";
import { ReactComponent as ChatDog } from '../../assets/chat-dog.svg'
import { ReactComponent as ChatBegin } from '../../assets/chat-begin.svg';

// "yyyy년 mm월 dd일"로 표시해주는 함수
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

export const currentDate = new Date();

interface ChatMessage {
  id: number;
  message: string;
  time: string;
  isLoading: boolean;
  answer?: string;
}

function Chat() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [showDate, setShowDate] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [usageModalOpen, setUsageModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);

  const handlePlusButtonClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const chatOutputRef = useRef<HTMLDivElement>(null);

  //종료하기 모달
  const openEndModal = () => {
    setEndModalOpen(true);
  };
  const closeEndModal = () => {
    setEndModalOpen(false);
  };
  //이용방법 모달
  const openUsageModal = () => {
    setUsageModalOpen(true);
  };
  const closeUsageModal = () => {
    setUsageModalOpen(false);
  };
  //유의사항 모달
  const openNoticeModal = () => {
    setNoticeModalOpen(true);
  };
  const closeNoticeModal = () => {
    setNoticeModalOpen(false);
  };

  const generateId = () => {
    return Date.now(); // ChatAnswer에 부여되는 id. 로딩 표현하기 위해 사용
  };

  //setMessage()에 input창의 현재 값 입력.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // 빈 메시지는 보내지 않음
    if (message.trim() === "") {
      return;
    }
  
    // 메시지 보낸 시간 표시
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  
    // input창에 입력한 텍스트 === message
    const newChat: ChatMessage = {
      id: generateId(),
      message,
      time: currentTime,
      isLoading: true,
    };
    setChatLog([...chatLog, newChat]);
    setMessage("");
  
    // 첫 메시지 입력받았을 때 날짜 표시
    if (!showDate && chatLog.length === 0) {
      setShowDate(true);
    }
  
    // 턴 수에 따라 정해진 답변 또는 랜덤 답변 출력
    if (message === "종료하기") {
      handleChatAnswer(newChat.id, "챗봇 종료"); // "종료하기"를 입력 -> 상담 결과 보러가기
      openEndModal();
    } else {
      fetchAnswer(newChat.id, message); // KoGPT2 모델에 MESSAGE를 전송하여 ANSWER을 받아오는 함수 호출
    }    
  };
  
  // KoGPT2 모델에 MESSAGE를 전송하여 ANSWER을 받아오는 함수
  const fetchAnswer = async (id: number, message: string) => {
    try {
      const response = await fetch("https://f732-35-194-149-135.ngrok-free.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error("Error occurred while fetching answer");
      }
  
      const data = await response.json();
      const answer = data.answer;
  
      handleChatAnswer(id, answer); // 받아온 ANSWER로 handleChatAnswer 함수 호출
    } catch (error) {
      console.error(error);
      handleChatAnswer(id); // 에러가 발생한 경우, 로딩 상태를 제거하여 처리할 수 없음을 알림
    }
  };
  
  // 로딩 뒤에 챗봇 Answer 나옴. 
  const handleChatAnswer = (id: number, answer?: string) => {
    setChatLog((prevChatLog) =>
      prevChatLog.map((chat) =>
        chat.id === id 
        ? { ...chat, isLoading: false, answer: answer } 
        : chat
      )
    );
  };
  
  // 로딩 표시
  useEffect(() => {
    const timeout = setTimeout(() => {
      const lastChat = chatLog[chatLog.length - 1];
      if (lastChat && lastChat.isLoading) {
        handleChatAnswer(lastChat.id);
      }
    }, 30000);
    return () => clearTimeout(timeout);
  }, [chatLog]);

  // 스크롤 자동으로 아래로 가도록
  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <div className="Chat-Fullbox">
      <header className="Chat-Contentbox">
        <div className="Chat-Output" ref={chatOutputRef}>
          {showDate && (
            <div className="Chat-date">{formatDate(currentDate)}</div>
          )}
           {chatLog.length === 0 && (
            <div className="Chat-InitialScreen">
              <ChatBegin className="Chat-InitialScreenIcon" />
            </div>
          )}
          {chatLog.map((chat) => (
            <div key={chat.id}>
              <div className="Chat-Q" >
                <span className="Chat-time">{chat.time}</span>
                <span className="Chat-message">{chat.message}</span>
              </div>
              <div className="Chat-A1">
                {chat.isLoading ? (
                  <span className="Chat-loading">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : chat.message === "종료하기" ? (
                  <div>
                    <ChatModal open={endModalOpen} close={closeEndModal} />
                  </div>
                ) : (
                  <div className="Chat-A2">
                    <div className="ChatDog-icon">
                      <ChatDog />
                    </div>
                    <span className="Chat-answer">{chat.answer}
                      그런 일이 있었군요. 많이 기분이 상했겠어요. 하지만 내일은 더 좋은 일이 있을거라 고 생각합니다. 조금만 더 힘을 내요!
                    </span>
                    <span className="Chat-time">{chat.time}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="Chat-Input">
          <button 
            className={`Chat-Plus ${isClicked ? "clicked" : ""}`}
            onClick={() => {handlePlusButtonClick();}}
          ></button>
          <span className="Chat-InputBox">
            <input 
              className="Chat-InputMessage"
              type="text"
              placeholder="메시지 보내기"
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </span>
          <button className="Chat-Send-btn" onClick={handleSubmit}></button>
        </div> 
        {isClicked && (
          <div className={`Chat-Toggle ${isClicked ? "active" : ""}`}>
            <button className="Chat-ToggleButton1" onClick={openEndModal}>종료하기</button>
            <button className="Chat-ToggleButton2" onClick={openUsageModal}>이용방법</button>
            <button className="Chat-ToggleButton2" onClick={openNoticeModal}>유의사항</button>
          </div>
        )}
        <ChatModal open={endModalOpen} close={closeEndModal} />
        <UsageModal open={usageModalOpen} close={closeUsageModal} />
        <NoticeModal open={noticeModalOpen} close={closeNoticeModal} />
      </header>
    </div>
  );
}

export default Chat;
