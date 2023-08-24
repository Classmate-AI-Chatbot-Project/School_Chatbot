//react-app Chat.tsx 
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import "./Chat.css";
import ChatModal from "./ChatModal";
import UsageModal from "./UsageModal";
import NoticeModal from "./NoticeModal";
import { ReactComponent as ChatDog } from '../../assets/chat-dog.svg';
import { ReactComponent as ChatBegin } from '../../assets/chat-begin.svg';

export const formatDate = (date: Date) => { // "yyyy년 mm월 dd일"로 표시해주는 함수
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
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const { user_id, chatroom_id } = useParams();

  const generateId = () => {return Date.now();};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { // Enter -> 메세지 전송
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  
  // 메세지 전송
  const handleSubmit = async () => {
    if (message.trim() === "") { //빈 메세지는 보내지 않음
      return;
    }
    const currentTime = new Date().toLocaleTimeString("en-US", { //메세지 전송 시간 표시
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const newChat: ChatMessage = {
      id: generateId(),
      message,
      time: currentTime,
      isLoading: true,
    };
    setChatLog([...chatLog, newChat]);
    setMessage("");

    if (!showDate && chatLog.length === 0) {
      setShowDate(true);
    }
  
    if (message === "종료하기") {
      handleChatAnswer(newChat.id, "챗봇 종료");
      openEndModal();
    } else {
      try { //메세지 post, 응답 받아오기
        const response = await axios.post(
          `http://127.0.0.1:8000/chat/${user_id}/${chatroom_id}/`, 
          { message },
          {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken, 
            },
            withCredentials: true,
          }
        );
        const answer = response.data.response;
        handleChatAnswer(newChat.id, answer);
      } catch (error) {
        handleChatAnswer(newChat.id, "post 실패");
      }
    }
  };
  // 챗봇 답변 표시
  const handleChatAnswer = (id: number, answer?: string) => { 
    setChatLog((prevChatLog) =>
      prevChatLog.map((chat) =>
        chat.id === id 
          ? { ...chat, isLoading: false, answer: answer } 
          : chat
      )
    );
  };

  useEffect(() => { //로딩 표시
    const timeout = setTimeout(() => {
      const lastChat = chatLog[chatLog.length - 1];
      if (lastChat && lastChat.isLoading) {
        handleChatAnswer(lastChat.id);
      }
    }, 30000);
    return () => clearTimeout(timeout);
  }, [chatLog]);

  const chatOutputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { //메세지 스크롤 자동으로 아래로 이동
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handlePlusButtonClick = () => { // 메세지 창 + 버튼
    setIsClicked((prevState) => !prevState);
  };
  const openEndModal = () => {setEndModalOpen(true);}; 
  const closeEndModal = () => {setEndModalOpen(false);};
  const openUsageModal = () => {setUsageModalOpen(true);}; 
  const closeUsageModal = () => {setUsageModalOpen(false);};
  const openNoticeModal = () => {setNoticeModalOpen(true);}; 
  const closeNoticeModal = () => {setNoticeModalOpen(false);};

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
                    <span /><span /><span />
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
                    <span className="Chat-answer">{chat.answer}</span>
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
