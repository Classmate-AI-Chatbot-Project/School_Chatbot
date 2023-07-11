import React, { useState } from "react";
import "../Chat/Chat.css";
import "./Message.css"
import ChatTopBar from "../../component/chat-topbar/ChatTopBar";
import dummyProfile from '../../assets/dummy-profile-img.png'
import { formatDate, currentDate } from "../Chat/Chat";

interface MessageInput {
  id: number;
  message: string;
  time: string;
  answer?: string;
}

function Message() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<MessageInput[]>([]);
  const [showDate, setShowDate] = useState(false);

  const generateId = () => {
    return Date.now(); // ChatAnswer에 부여되는 id. 로딩 표현하기 위해 사용
  };

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

  return (
    <div className="Chat-Full-box">
      <header className="Chat-Content-box">
        <ChatTopBar />
        <div className="Chat-Border-line"></div>
        <div className="Chat-Output">
          {showDate && (
            <div className="Chat-date">{formatDate(currentDate)}</div>
          )}
          {chatLog.map((chat) => (
            <div key={chat.id}>
              <div className="Chat-output-Q">
                <span className="Chat-time">{chat.time}</span>
                <span className="Chat-message">{chat.message}</span>
              </div>
              <div className="M-output-A">
                  <span className="M-profile"><img src={dummyProfile}/></span>
                    <span className="M-answer">답변예시 답변예시 답변예시 답변예시 답변예시 답변예시 답변예시 </span>
                    <span className="M-time">{chat.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="Chat-Input">
          <input
            className="Chat-Input-box"
            type="text"
            placeholder="쪽지 보내기"
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button className="Chat-Send-btn" onClick={handleSubmit}></button>
        </div>
      </header>
    </div>
  );
}

export default Message;
