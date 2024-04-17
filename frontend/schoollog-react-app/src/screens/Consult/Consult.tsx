import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import '../Chat/Chat.css';
import './Consult.css';
import '../Chat/Modal.css';
import { API_BASE_URL } from '../config';
import { ReactComponent as MesBegin } from '../../assets/mes-begin.svg';
import BorderLine from '../../components/BorderLine/BorderLine';
import { ReactComponent as RedFace } from '../../assets/face-red-icon.svg';
import { ReactComponent as YellowFace } from '../../assets/face-yellow-icon.svg';
import { ReactComponent as GreenFace } from '../../assets/face-green-icon.svg';
import { ReactComponent as RequestDetail } from '../../assets/consullt-request-detail.svg';
import { ModalProps } from '../../models/modal';

interface Message {
  timestamp: string;
  date: string;
  author: string;
  content: string;
  request: boolean;
}

interface GroupedMessage {
  date: string;
  messages: Message[];
}

interface HistoryMessage {
  timestamp: string;
  date: string;
  author: string;
  content: string;
  request: boolean;
}

function Consult() {
  const { room_name, student_id } = useParams();
  const cookies = new Cookies();
  const csrftoken = cookies.get('csrftoken');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [messages, setMessages] = useState<HistoryMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const groupedMessages = groupMessagesByDate(messages);
  const currentTime = new Date().toLocaleTimeString('en-US', {
    //메세지 전송 시간
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const mesOutputRef = useRef<HTMLDivElement>(null);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  const openProfileModal = () => {
    setProfileModalOpen(true);
  };
  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const [roomData, setRoomData] = useState({
    room_id_json: 0,
    username: '',
    other_username: '',
    user_profile: '',
    other_user_profile: '',
    teacher_school: '',
    student_profile_id: '',
    last_messages: [],
    has_new_consult_result: false,
    category: '',
    emotion_temp: '',
    result_time: '',
  });

  useEffect(() => {
    //스크롤 항상 가장 아래로
    if (mesOutputRef.current) {
      mesOutputRef.current.scrollTop = mesOutputRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // get roomData
    setMessages([]);
    axios
      .get(`${API_BASE_URL}:8000/consult/room/${room_name}/student/${student_id}/`, {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        const responseData = response.data.consult_room_data;

        setRoomData({
          room_id_json: responseData.room_id_json,
          username: responseData.username,
          other_username: responseData.other_username,
          user_profile: responseData.user_profile,
          other_user_profile: responseData.other_user_profile,
          teacher_school: responseData.teacher_school,
          student_profile_id: responseData.student_profile_id,
          last_messages: responseData.last_messages,
          has_new_consult_result: responseData.has_new_consult_result,
          category: responseData.category,
          emotion_temp: responseData.emotion_temp,
          result_time: responseData.result_time,
        });

        console.log(responseData);

        const previousMessagesData: HistoryMessage[] = responseData.last_messages;
        setMessages([...previousMessagesData]);
      })
      .catch((error) => {
        console.error('Error fetching room_name and student_id:', error);
      });
  }, [room_name, student_id]);

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ko-KR', options);
    // 날짜를 "yyyy년 mm월 dd일" 형식으로 맞추기
    const [year, month, day] = formattedDate.split('.');
    return `${year}년${month}월${day}일`;
  }

  // 새 메시지 POST 전송
  const sendMessage = () => {
    axios
      .post(
        `${API_BASE_URL}:8000/consult/room/${room_name}/student/${student_id}/`,
        { message: messageInput },
        {
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log('Message sent:', response.data);
        // 메시지 목록을 업데이트
        const newMessage: Message = {
          timestamp: currentTime,
          date: formatDate(new Date().toISOString()),
          author: roomData.username,
          content: messageInput,
          request: false,
        };
        setMessages([...messages, newMessage]);
        setMessageInput(''); // 메시지 입력창 비우기
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  function groupMessagesByDate(messages: Message[]): GroupedMessage[] {
    const groupedMessages: GroupedMessage[] = [];
    let currentDate: string | null = null;

    messages.forEach((msg) => {
      const messageDate = msg.date; // '%Y년 %m월 %d일' 형식으로 이미 지정된 날짜

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groupedMessages.push({
          date: messageDate,
          messages: [msg],
        });
      } else {
        groupedMessages[groupedMessages.length - 1].messages.push(msg);
      }
    });

    console.log(groupedMessages);
    return groupedMessages;
  }

  //상담신청 내용 불러오기
  function parseRequestMessage(requestMessage: string) {
    requestMessage = requestMessage.replace(/^"(.*)"$/, '$1');
    const parts = requestMessage.split('/n');

    if (parts.length >= 4) {
      const [emotion, category, date, chatIdPart] = parts;
      const chatIdMatch = chatIdPart.match(/\[(\d+)\]/);
      const chat_id = chatIdMatch ? chatIdMatch[1] : '';
      let emotionComponent;

      if (parseInt(emotion) >= 0 && parseInt(emotion) < 35) {
        emotionComponent = <GreenFace />;
      } else if (parseInt(emotion) >= 35 && parseInt(emotion) < 65) {
        emotionComponent = <YellowFace />;
      } else {
        emotionComponent = <RedFace />;
      }

      return (
        <>
          <span className="Consult-request-emotion">{emotionComponent}</span>
          <span className="Consult-request-category">{category}</span>
          <span className="Consult-request-date">{date}</span>
          <Link to={`/teacher/chat/result/${chat_id}`} className="Consult-request-detail">
            <RequestDetail />
          </Link>
        </>
      );
    } else {
      return null; // 오류 처리) null 반환
    }
  }

  // 상대방 프로필 모달 창
  const ProfileModal = (props: ModalProps) => {
    const { open, close } = props;
    const handleCloseButtonClick = () => {
      close();
    };
    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        <section className="MessageModal-contentBox">
          <div className="Modal-main">
            <img
              className="Consult-modalProfile"
              src={`${API_BASE_URL}:8000` + roomData.other_user_profile}
              alt="Profile"
            />
            <div className="Consult-modalName">{roomData.other_username}</div>
            <div className="Consult-modalSchool">{roomData.teacher_school}</div>
            <button className="Modal-gotoResult" onClick={handleCloseButtonClick}>
              확인
            </button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="Chat-Fullbox">
      <header className="Chat-Contentbox">
        <div className="Chat-Output" ref={mesOutputRef}>
          {/* 만약 message log 가 없으면 아래 화면 띄움 */}
          {groupedMessages.length === 0 ? (
            <div className="Consult-InitialScreen">
              <Link to="/chat">
                <button className="Consult-InitialScreenBtn"></button>
              </Link>
              <MesBegin className="Consult-InitialScreenIcon" />
            </div>
          ) : (
            // 메시지 출력
            groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="Consult-date">{group.date}</div>
                {group.messages.map((msg, index) => (
                  <div key={index}>
                    {
                      msg.request && msg.content === '상담을 신청해요.' ? null : !msg.request ? (
                        msg.author === roomData.username ? (
                          <div className="Chat-student">
                            <span className="Chat-time">{msg.timestamp}</span>
                            <span className="Chat-message">{msg.content}</span>
                          </div>
                        ) : (
                          <div className="Consult-other">
                            <span className="Consult-other-profile">
                              <img
                                onClick={openProfileModal}
                                src={`${API_BASE_URL}:8000` + roomData.other_user_profile}
                                alt="Profile"
                              />
                            </span>
                            <span className="Consult-other-box">
                              <div className="Consult-other-name">{roomData.other_username}</div>
                              <div className="Consult-other-message">{msg.content}</div>
                            </span>
                            <span className="Chat-time">{msg.timestamp}</span>
                          </div>
                        )
                      ) : //상담 신청 출력
                      msg.author === roomData.username ? (
                        <>
                          <div className="Consult-request">
                            <div className="Consult-request-time">{msg.timestamp}</div>
                            <div className="Consult-request-box">
                              <span className="Consult-request-title">
                                <span style={{ color: '#35BA95' }}>상담</span>을 신청해요.
                              </span>
                              <BorderLine width={'100%'} height={'1px'} />
                              {parseRequestMessage(msg.content)}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="Consult-other">
                          <span className="Consult-other-profile">
                            <img
                              onClick={openProfileModal}
                              src={`${API_BASE_URL}:8000` + roomData.other_user_profile}
                              alt="Profile"
                            />
                          </span>
                          <span className="Consult-other-box">
                            <div className="Consult-other-name">{roomData.other_username}</div>
                            <div className="Consult-request-box-other">
                              <span className="Consult-request-title">
                                <span style={{ color: '#35BA95' }}>상담</span>을 신청해요.
                              </span>
                              <BorderLine width={'100%'} height={'1px'} />
                              {parseRequestMessage(msg.content)}
                            </div>
                          </span>
                          <span className="Chat-time">{msg.timestamp}</span>
                        </div>
                      ) //
                    }
                  </div>
                ))}
              </div>
            ))
          )}
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
