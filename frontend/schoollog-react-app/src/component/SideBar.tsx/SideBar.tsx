import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { Cookies } from "react-cookie";
import { useParams, useNavigate } from 'react-router-dom';
import './SideBar.css'
import BorderLine from '../BorderLine/BorderLine';
import { ReactComponent as BookIcon } from '../../assets/side-bar-book.svg'
import { ReactComponent as SpeechIcon } from '../../assets/side-bar-speech.svg'
import { ReactComponent as StudentsIcon } from '../../assets/side-bar-students.svg'
import { ReactComponent as PaintingIcon } from '../../assets/side-bar-paint.svg'
import { Link } from 'react-router-dom';

function SideBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const [userData, setUserData] = useState({
    job: 'student',
  });
  const [roomName, setRoomName] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   axios.get(
  //     `http://127.0.0.1:8000/account/decode/`,
  //     {
  //       headers: {
  //           "Content-type": "application/json",
  //       },
  //       withCredentials: true,
  //   }
  // ).then((res: any) => {
  //   console.log(res.data)
  //   const data = res.data;

  //   setUserData({
  //     job: data.job === 0 ? 'Teacher' : 'Student',
  //   });
  //   console.log(userData)
  // })
  // }, []);

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/consult/create/',
  //   {
  //     headers: {
  //       "Content-type": "application/json",
  //       "X-CSRFToken": csrftoken,
  //     },
  //     withCredentials: true,
  //   })
  //     .then((response) => {
  //       console.log(response.data)
  //       const { room_name, student_id } = response.data;
  //       setRoomName(room_name);
  //       setStudentId(student_id);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching room_name and student_id:', error);
  //     });
  // }, []);

  const gotoChat = () => {
    if (!studentId) { // 로그인 안되어 있는 경우
      navigate('/login');
    } else { // user_id가 있으면 ChatRoom 생성 및 이동
      axios.post('http://127.0.0.1:8000/chat/create/', null, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }).then((response) => {
          const chatroom_id = response.data.chat_id; // Get the chat_id from the response
          navigate(`/chat/${studentId}/${chatroom_id}`); // Use chat_id in the URL
        })
        .catch((error) => {
          console.error('Error creating ChatRoom:', error);
        });
    }
  };

  const gotoConsult = () => {
    if (!roomName || !studentId) { // 로그인 안되어 있는 경우
      navigate('/initial/consult');
    } else { // user_id가 있으면 상담 페이지로 이동
      navigate(`/consult/room/${roomName}/student/${studentId}/`);
    }
  };

  return (
    <div className={isOpen ? 'Opened-bar':'Closed-bar'} ref={outside}>
      {userData.job === "Student" && (
      <ul>
        <li>
          <BookIcon/>
          <a className='Menu-item-text'>스쿨로그 사용법</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <li>
          <PaintingIcon/>
          <a className='Menu-item-text'>그림 심리 테스트</a>
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
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
      </ul>
      )}
      {userData.job === "Teacher" && (
      <ul>
        <li>
          <BookIcon/>
          <a className='Menu-item-text'>스쿨로그 사용법</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <li>
          <SpeechIcon/>
          <a className='Menu-item-text'>상담목록</a>
        </li>
        <BorderLine width={'315px'} height={'1px'}/>
        <Link style={{textDecorationLine: 'none', color: 'black'}} to='/teacher/studentList'>
        <li>
          <StudentsIcon/>
          <a className='Menu-item-text'>상담학생목록</a>
        </li>          
        </Link>

        <BorderLine width={'315px'} height={'1px'}/>
      </ul>
      )}

      <BorderLine width={'2px'} height={'918px'}/> 
    </div>
  );
}

export default SideBar;
