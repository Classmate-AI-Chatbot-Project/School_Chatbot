import React, { useState } from "react";
import "./Chat.css";
import ChatTopBar from "../chat-topbar/ChatTopBar";

interface ChatMessage {
  message: string;
  time: string;
}

function Chat() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [showDate, setShowDate] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.trim() === "") {
      return; // 빈 메시지는 보내지 않음
    }

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false,
  });

  const newChat: ChatMessage = { message, time: currentTime };
    setChatLog([...chatLog, newChat]);
    setMessage("");

    if (!showDate && chatLog.length === 0) {
      setShowDate(true); // Show the date after the first message is submitted
    }
  };
  

  // "yyyy년 mm월 dd일"로 표시해주는 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  

  // Get the current date
  const currentDate = new Date();

  return (
    <div className='Chat-Full-box'>
      <header className='Chat-Content-box'>
        <ChatTopBar />
        <div className='Chat-Border-line'></div>
        <div className='Chat-Output'>
          {showDate && <div className='Chat-date'>{formatDate(currentDate)}</div>}
          {chatLog.map((chat, index) => (
            <div> 
              <div key={index} className='Chat-output-Q'>
                <span className='Chat-time'>{chat.time}</span>
                <span className='Chat-message'>{chat.message}</span>
              </div>
              <div key={index} className='Chat-output-A'>
                <span className='Chat-answer'> ~ 챗봇 답변 ~ </span>
              </div>
            </div>
          ))}      
        </div>
        <div className='Chat-Input'>
        <input
          className='Chat-Input-box'
          type="text"
          placeholder="챗봇과 상담하기"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
          <button className='Chat-Send-btn' onClick={handleSubmit}></button>
        </div>
      </header>
    </div>
  );
};

export default Chat;