//react-app Chat.tsx 
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from 'react-router-dom';
import "./Chat.css";
import { ReactComponent as ChatDog } from '../../assets/chat-dog.svg';
import { ReactComponent as ChatBegin } from '../../assets/chat-begin.svg';
import {ReactComponent as Back} from "../../assets/back.svg"
import BorderLine from '../../component/BorderLine/BorderLine';

interface ChatMessage {
  id: number;
  message: string;
  date: string;
  time: string;
  isLoading: boolean;
  answer?: string;
  sender: string;
}

interface ChatHistoryMessage {
  sender: string;
  date: string;
  time: string;
  message: string;
}

export const formatDate = (date: Date) => { // date: "yyyy년 mm월 dd일"
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};
export const currentDate = new Date();

function ChatHistory() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [showDate, setShowDate] = useState(false);
  const {user_id, chatroom_id} = useParams();
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const generateId = () => {return Date.now();};
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1)
  };


  useEffect(() => { // 이전 채팅 메시지를 서버에서 가져옴
    axios
    .get<ChatHistoryMessage[]>(
      `http://127.0.0.1:8000/chat/history/${user_id}/${chatroom_id}/`,
      {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }
    )
    .then((response: AxiosResponse<ChatHistoryMessage[]>) => {
      const chatHistoryData: ChatMessage[] = response.data.map((message) => ({
        id: generateId(),
        message: message.message,
        date: message.date,
        time: message.time,
        isLoading: false,
        sender: message.sender,
      }));
      setChatLog([...chatLog, ...chatHistoryData]);
    })
    .catch((error) => {
      console.error("Error fetching chat history:", error);
    });
  }, [user_id, chatroom_id]);

  


  
  

  const chatOutputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { //메세지 스크롤 자동으로 아래로 이동
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [chatLog]);


  return (
    <div className="Chat-Fullbox">
      <header className="Chat-Contentbox">
        <div className="Chat-history-topBar">
          <Back onClick={handleGoBack} style={{cursor: "pointer"}}/>
          <div className="Chat-history-topText">
            전체 채팅 보기
          </div>
        </div>
        <BorderLine width={'423px'} height={'1px'}/>
        <div className="Chat-Output" ref={chatOutputRef}>
          {chatLog.length === 0 && (
            <div className="Chat-InitialScreen">
              <ChatBegin className="Chat-InitialScreenIcon" />
            </div>
          )}
          {chatLog.map((chat, index) => (
            <div key={chat.id}>
              {index === 0 && chat.date && (
                <div className="Chat-date">{chat.date}</div>
              )}
              {chat.sender === 'student' ? ( //학생
                  <div className={"Chat-history-student"}>
                    <span className="Chat-time">{chat.time}</span>
                    <span className="Chat-message">{chat.message}</span>
                  </div>
                ) : ( //챗봇
                  <div className={"Chat-history-chatbot"}>
                    <div className="ChatDog-icon"><ChatDog /></div>
                    <span className="Chat-answer">{chat.message}</span>
                    <span className="Chat-time">{chat.time}</span>
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className="Chat-Input">
          <button 
            className="Chat-Plus"
          ></button>
          <span className="Chat-history-InputBox">
            <input 
              className="Chat-history-InputMessage"
              type="text"
              placeholder="대화 종료"
              value={message}
              disabled={true}
            />
          </span>
          <button className="Chat-Send-btn" disabled={true}></button>
        </div>
      </header>
    </div>
  );
}

export default ChatHistory;
