import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatTopBar from "../chat-topbar/ChatTopBar";
import { Link } from "react-router-dom";

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
}

function Chat() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [showDate, setShowDate] = useState(false);

  const generateId = () => {
    return Date.now();  // ChatAnswer에 부여되는 id. 로딩 표현하기 위해 사용
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
      hour: "2-digit", minute: "2-digit", hour12: false,
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
    //
    if (message === "종료하기") {
      handleChatAnswer(newChat.id, "챗봇 종료"); // "종료하기"를 입력 -> 상담 결과 보러가기
    } else {
      handleChatAnswer(newChat.id, "챗봇 답변"); // 그 외의 경우에는 챗봇 답변 메시지를 표시
    }
  };

  // 로딩 뒤에 챗봇 Answer 나옴. -> 추후에 백엔드에서 입력되는 챗봇 속도에 따라 로딩 속도 조절.
  const handleChatAnswer = (id: number, text: string) => {
    setChatLog((prevChatLog) =>
      prevChatLog.map((chat) =>
        chat.id === id ? { ...chat, isLoading: true } : chat
      )
    );
    setTimeout(() => {
      setChatLog((prevChatLog) =>
        prevChatLog.map((chat) =>
          chat.id === id ? { ...chat, isLoading: false } : chat
        )
      );
    }, 1000);
  };
  // 로딩 표시
  useEffect(() => {
    const timeout = setTimeout(() => {
      const lastChat = chatLog[chatLog.length - 1];
      if (lastChat && lastChat.isLoading) {
        handleChatAnswer(lastChat.id, "챗봇 답변");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [chatLog]);

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
              <div className="Chat-output-A">
                {chat.isLoading ? (
                  <span className="Chat-loading"> 
                    <span /><span /><span />
                  </span>
                )  : chat.message === "종료하기" ? (
                  <div>
                    <Link to="/student_result" className="Chat-close">상담 결과 보러가기</Link>
                  </div>
                ) : (
                  <div>
                    <span className="Chat-answer">챗봇 답변</span>
                    <span className="Chat-time">{chat.time}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="Chat-Input">
          <input
            className="Chat-Input-box"
            type="text"
            placeholder="챗봇과 상담하기"
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

export default Chat;

/* 추후 변경해야 할 것
- Url: /student/chat/{student_id}/{chat_num}
- 로딩 시간
- 결과 보러가기 css?
*/