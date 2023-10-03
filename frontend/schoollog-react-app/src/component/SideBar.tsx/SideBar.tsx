import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import './SideBar.css'
import BorderLine from '../BorderLine/BorderLine';
import { ReactComponent as NewIcon } from '../../assets/alert-new-icon.svg'
import { ReactComponent as SpeechIcon } from '../../assets/side-bar-speech.svg'
import { ReactComponent as StudentsIcon } from '../../assets/side-bar-students.svg'
import { ReactComponent as PaintingIcon } from '../../assets/side-bar-paint.svg'
import { Link } from 'react-router-dom';

function SideBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const [userData, setUserData] = useState({ job: '' });
  const isLoggedIn = cookies.get("isLoggedIn");
  const navigate = useNavigate();
  // const isRead = useSelector((state: RootState) => state.notifications.isRead);
  const [isUnread, setIsUnread] = useState(false);        // 안 읽은 메시지가 있는가?
  const [hasNewResult, setHasNewResult] = useState(false);  // 새로운 상담 결과가 있는가?

  const outside = useRef<any>();
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutside);

    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  });
  
  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(
        `http://127.0.0.1:8000/account/decode/`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((res: any) => {
        const data = res.data;
        setUserData({
          job: data.student.job === 0 ? 'Teacher' : 'Student',
        });
      });
    }
  }, [isLoggedIn]);  // isLoggedIn 상태가 변경될 때만 실행

  // 로그인했을 때만 미확인 메시지 여부 is_unread 데이터 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      axios.get(
        `http://127.0.0.1:8000/consult/check_unread_messages/`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((response) => {
        const { is_unread, has_new_result } = response.data;
        setIsUnread(is_unread);   // 가져온 데이터를 상태에 저장
        setHasNewResult(has_new_result);
        
        console.log('SideBar is_unread: ', is_unread);
        console.log('SideBar has_new_result: ', has_new_result);
      })
      .catch((error) => {
        console.error('Error fetching is_unread:', error);
        console.error('Error fetching has_new_result:', error);
      });
    }
  });

  const gotoChat = () => {
    if (!isLoggedIn) { // 로그인 안되어 있는 경우
      navigate('/login');
    } else { // user_id가 있으면 ChatRoom 생성 및 이동
      axios.post('http://127.0.0.1:8000/chat/create/', null, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }).then((response) => {
          const chatroom_id = response.data.chatroom_url;
          toggleSide();
          navigate(`${chatroom_id}`); 
        })
        .catch((error) => {
          console.error('Error creating ChatRoom:', error);
        });
    }
  };

  const gotoConsult = () => {
    if (!isLoggedIn) { 
      navigate('/initial/consult');
    } else { 
        axios.get('http://127.0.0.1:8000/consult/redirect_room/',
      {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }) 
      .then((response) => {
        toggleSide();
        const consult_room_url = response.data.consult_room_url;
        navigate(`${consult_room_url}`); 
      })
      .catch((error) => {
        navigate('/initial/consult');
      });
    }
  };

  const gotoTest = () => {
    toggleSide();
    navigate('/test/start');
  }

  const gotoTeacherChatList = () => {
    if (!isLoggedIn) { 
      navigate('/login');
    } else {
      toggleSide();
      navigate('/teacher/consultationList');
    };
  }  

  const gotoConsultResulList = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      toggleSide();
      navigate('/teacher/chatResultList');
    };
  }

  const gotoStudentList = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      toggleSide();
      navigate('/teacher/studentList');
    };
  }  

  return (
    <div className={isOpen ? 'Opened-bar':'Closed-bar'} ref={outside}>
      {isLoggedIn && userData.job === "Teacher" ? (
        <ul>
          <li>
            <SpeechIcon/>
            <a className='Menu-item-text' onClick={gotoTeacherChatList}>상담 대화방 목록</a>
            {isUnread && 
              <NewIcon />
            }
          </li>
          <BorderLine width={'100%'} height={'1px'}/>
          <li>
            <SpeechIcon/>
            <a className='Menu-item-text' onClick={gotoConsultResulList}>챗봇 대화 분석 결과 리스트</a>
            {hasNewResult && 
              <NewIcon />
            }
          </li>
          <BorderLine width={'315px'} height={'1px'}/>
          <li>
            <StudentsIcon/>
            <a className='Menu-item-text' onClick={gotoStudentList}>상담 학생 목록</a>
          </li>

          <BorderLine width={'100%'} height={'1px'}/>
        </ul>
      ): (
        <ul>
          <li>
            <PaintingIcon/>
            <a className='Menu-item-text' onClick={gotoTest}>그림 심리 테스트</a>
          </li>
          <BorderLine width={'315px'} height={'1px'}/>
          <li>
            <SpeechIcon/>
            <a className='Menu-item-text' onClick={gotoChat}>챗봇과 상담하기</a>
          </li>
          <BorderLine width={'315px'} height={'1px'}/>
          <li>
            <StudentsIcon/>
            <a className='Menu-item-text' onClick={gotoConsult}>선생님과 상담하기</a>
            {isUnread && 
              <NewIcon />
            }
          </li>
          <BorderLine width={'315px'} height={'1px'}/>
        </ul>
      )}

      <BorderLine width={'2px'} height={'918px'}/> 
    </div>
  );
}

export default SideBar;
