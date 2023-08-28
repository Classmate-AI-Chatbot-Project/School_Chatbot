//react-app Chat.tsx 
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import "./Chat.css";
import ChatModal from "./ChatModal";
import UsageModal from "./UsageModal";
import NoticeModal from "./NoticeModal";
import { ReactComponent as ChatDog } from '../../assets/chat-dog.svg';
import { ReactComponent as ChatBegin } from '../../assets/chat-begin.svg';

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

function Chat() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [showDate, setShowDate] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [usageModalOpen, setUsageModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false); // Chat 종료 여부 상태 추가
  const {user_id, chatroom_id} = useParams();
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");

  const generateId = () => {return Date.now();};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { // Enter -> 메세지 전송
    if (e.key === "Enter") {
      handleSubmit();
    }
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

  const createAllDialogue = async (all_dialogue: string) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/chat/end/${user_id}/${chatroom_id}/`,
        { all_dialogue },
        {
          headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) { // AllDialogue 모델 생성 성공 처리
        console.log("AllDialogue 모델이 생성되었습니다.");
      }
    } catch (error) {
      console.error("Error creating AllDialogue:", error);
    }
  };
  
  // 메세지 전송
  const handleSubmit = async () => {
    if (message.trim() === "") { return; } //빈 메세지 X
    const currentTime = new Date().toLocaleTimeString("en-US", { //메세지 전송 시간
      hour: "2-digit", 
      minute: "2-digit",
      hour12: false,
    });
    const newChat: ChatMessage = { //새로운 chat
      id: generateId(),
      message,
      date: formatDate(currentDate),
      time: currentTime,
      isLoading: true,
      sender: "student",
    };
    setChatLog([...chatLog, newChat]);
    setMessage('');

    if (!showDate && chatLog.length === 0) {
      setShowDate(true);
    }
  
    if (message === "종료하기") {
      handleChatAnswer(newChat.id, newChat.answer);
      openEndModal();
      setIsChatEnded(true); //Chat 종료 상태로 변경

      //AllDialogue 모델 생성
      const all_dialogue = chatLog
        .filter((chat) => chat.sender === "student")
        .map((chat) => chat.message)
        .join(" ");
      createAllDialogue(all_dialogue);
    } else {
      try { //메세지 post, 응답 받아오기
        const response = await axios.post(
          `http://127.0.0.1:8000/chat/${user_id}/${chatroom_id}/`, 
          { 
            message,
            time: currentTime,
          },
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
    ));
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
          {chatLog.length === 0 && !isChatEnded && (
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
                  <div className={`Chat-${chat.sender}`}>
                    <span className="Chat-time">{chat.time}</span>
                    <span className="Chat-message">{chat.message}</span>
                  </div>
                ) : ( //챗봇
                  <div className={`Chat-${chat.sender}`}>
                    <div className="ChatDog-icon"><ChatDog /></div>
                    <span className="Chat-answer">{chat.message}</span>
                    <span className="Chat-time">{chat.time}</span>
                  </div>
                )}
              <div className="Chat-loadAnswer">
                {chat.isLoading && ( //로딩
                  <div className='Chat-loading'>
                    <span /> <span /> <span />
                  </div>
                )}
                {!chat.isLoading && chat.answer && ( //챗봇 답변
                  <div className={`Chat-${chat.sender}`}>
                    <div className="ChatDog-icon"><ChatDog /></div>
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
              placeholder={isChatEnded ? "대화 종료" : "메시지 보내기"}
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              disabled={isChatEnded}
            />
          </span>
          <button className="Chat-Send-btn" onClick={handleSubmit} disabled={isChatEnded}></button>
        </div> 
        {isClicked && (
          <div className={`Chat-Toggle ${isClicked ? "active" : ""}`}>
            <button className="Chat-ToggleButton1" onClick={() => {
              openEndModal(); 
              setIsChatEnded(true);
              const all_dialogue = chatLog
                .filter((chat) => chat.sender === "student")
                .map((chat) => chat.message)
                .join(" ");
              createAllDialogue(all_dialogue);
              }}>종료하기</button>
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
