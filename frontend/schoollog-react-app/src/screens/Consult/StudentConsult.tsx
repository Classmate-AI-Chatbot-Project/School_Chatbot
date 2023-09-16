import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import "../Chat/Chat.css";
import "./Consult.css";
import "../Chat/Modal.css";
import dummyProfile from '../../assets/dummy-profile-img.png';
import { ReactComponent as MesBegin } from '../../assets/mes-begin.svg';
import BorderLine from "../../component/BorderLine/BorderLine";
import { ReactComponent as RedFace } from '../../assets/face-red-icon.svg';
import { ReactComponent as YellowFace } from '../../assets/face-yellow-icon.svg';
import { ReactComponent as GreenFace } from '../../assets/face-green-icon.svg';

interface ModalProps {
  open: boolean;
  close: () => void;
}

interface Message {
  author: string;
  content: string;
  message?: string;
}

function Consult() {
  const { room_name, student_id } = useParams();
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const [showDate, setShowDate] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null); 

  const [roomData, setRoomData] = useState({
    room_id_json: 0,
    username: "",
    other_username: "",
    user_profile: "",
    other_user_profile: "",
    consult_request_messages: [],
    category: "",
    emotion_temp: "",
    result_time: "",
    has_consult_result: false,
  });

  // get roomData
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/room/${room_name}/student/${student_id}/`, {
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        const responseData = response.data;

        setRoomData({
          room_id_json: responseData.room_id_json,
          username: responseData.username,
          other_username: responseData.other_username,
          user_profile: responseData.user_profile,
          other_user_profile: responseData.other_user_profile,
          consult_request_messages: responseData.consult_request_messages,
          category: responseData.category,
          emotion_temp: responseData.emotion_temp,
          result_time: responseData.result_time,
          has_consult_result: responseData.has_consult_result,
        });
      })
      .catch((error) => {
        console.error('Error fetching room_name and student_id:', error);
      });
  }, []);

  // send request message
  useEffect(() => {
    const sendConsultationRequest = () => {
      if (socket) {
        const result_content = `Category: ${roomData.category}, Emotion Temp: ${roomData.emotion_temp}, Result Time: ${roomData.result_time}`;
        const message = {
          command: "new_message",
          message: {
            author: roomData.username, // Use the sender's username
            content: result_content
          },
        };
        socket.send(JSON.stringify(message));
      }
    };

    // Call the function to send the consultation request message
    sendConsultationRequest();
  }, [socket, roomData]);

  const sendMessage = () => {
    if (socket && messageInput) {
      const message = {
        command: "new_message",
        message: {
          author: roomData.username, // Use the sender's username
          content: messageInput,
        },
      };
      socket.send(JSON.stringify(message));
      setMessageInput("");
    }
  };

  // connect websocket
  useEffect(() => {
    const socket = new ReconnectingWebSocket(`ws://${window.location.host}/ws/chat/${room_name}/`);
    
    socket.addEventListener('open', () => {
      console.log("WebSocket 연결 성공!");
      setSocket(socket);
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.command === "new_message") {
        // Append the received message to the chat log
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });

    socket.addEventListener('close', () => {
      console.log("WebSocket 연결 종료");
      // WebSocket 연결 종료 시에 필요한 처리
    });

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      socket.close();
    };
  }, [room_name]);

  // 선생님 프로필 모달 창
  const ProfileModal: React.FC<ModalProps> = (props) => {
    const { open, close } = props;
    const handleCloseButtonClick = () => {
      close();
    };
    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        <section className="MessageModal-contentBox">
          <div className="Modal-main">
            <img className="Consult-modalProfile" src={"http://127.0.0.1:8000/" + roomData.other_user_profile} alt="Profile" />
            <div className="Consult-modalName">{roomData.other_username}</div>
            <div className="Mes-modalSchool">{/* 선생님 학교 */}</div>
            <button className="Modal-gotoResult" onClick={handleCloseButtonClick}>확인</button>
          </div>
        </section>
      </div>
    );
  };

  const currentTime = new Date().toLocaleTimeString("en-US", { //메세지 전송 시간
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const mesOutputRef = useRef<HTMLDivElement>(null);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { sendMessage(); }
  };
  const openProfileModal = () => { setProfileModalOpen(true); };
  const closeProfileModal = () => { setProfileModalOpen(false); };

  return (
    <div className="Chat-Fullbox">
      <header className="Chat-Contentbox">
        <div className="Chat-Output" ref={mesOutputRef}>
          {/* 신청이 있을때 */}
          {roomData.has_consult_result && (
            <>
              <div className="Chat-date">{roomData.result_time}</div>
              <div className="Consult-request">
                <div className="Consult-request-time">{currentTime}</div>
                <div className="Consult-request-box">
                  <span className="Consult-request-title">
                    <span style={{ color: '#35BA95' }}>상담</span>을 신청해요.
                  </span>
                  <BorderLine width={"260px"} height={"1px"} />
                  <span className="Consult-request-emmotion"><RedFace /></span>
                  <span className="Consult-request-category">{roomData.category}</span>
                  <span className="Consult-request-date">{roomData.result_time}</span>
                </div>
              </div>
            </>
          )}

          {/* 만약 message log 가 없으면 아래 화면띄움 */}
          {messages.length === 0 && (
            <div className="Consult-InitialScreen">
              <Link to="/chat">
                <button className="Consult-InitialScreenBtn"></button>
              </Link>
              <MesBegin className="Consult-InitialScreenIcon" />
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index}>
              {/* if (author === username) */}
              {typeof msg === 'string' ? (
                <div className="Chat-student">
                  <span className="Chat-time">{currentTime}</span>
                  <span className="Chat-message">{msg}</span>
                </div>
              ) : (
                <div className="Consult-other">
                  <span className="Consult-other-profile">
                    <img onClick={openProfileModal} src={"http://127.0.0.1:8000/" + roomData.other_user_profile} alt="Profile" />
                  </span>
                  <span className="Consult-other-box">
                    <div className="Consult-other-name">{roomData.other_username}</div>
                    <div className="Consult-other-message">{msg.message}</div>
                  </span>
                  <span className="Chat-time">{currentTime}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="Chat-Input">
          <span className="Consult-InputBox">
            <input
              className="Consult-InputMessage"
              type="text"
              placeholder="메시지 보내기"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </span>
          <button className="Chat-Send-btn" onClick={sendMessage}></button>
        </div>
        <ProfileModal open={profileModalOpen} close={closeProfileModal} />
      </header>
    </div>
  );
}

export default Consult;
