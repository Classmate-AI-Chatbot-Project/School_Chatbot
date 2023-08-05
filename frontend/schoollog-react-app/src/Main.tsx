import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './reducers'
import './Main.css';

function Main() {
  const navigate = useNavigate();
  const isTeacher = useSelector((state:RootState) => state.isTeacher);

  const [chatCounter, setChatCounter] = useState(1);
  const student_id = "soohyun";

  const handleChatButtonClick = () => {
    const i = chatCounter.toString();
    const newChatCounter = chatCounter + 1;
    setChatCounter(newChatCounter);
  };

  useEffect(() => {
    if (isTeacher) {
      navigate("/consultationList");
    }
  }, [isTeacher, navigate]);

  return (
    <div>
      <button className="Chatbot-btn" onClick={handleChatButtonClick}>
        <Link to={`/chat/${student_id}/${chatCounter}`}>
          챗봇과 채팅하러가기
        </Link>
      </button>
      <p>
        <Link to="/message">
          <button>
            쪽지 페이지
          </button>
        </Link>
      </p>
      <p>
        <Link to="/detail">
          <button>
            프로필 + 결과 페이지
          </button>
        </Link>
      </p>
      <p>
        <Link to="/test">
          <button>
            그림 테스트
          </button>
        </Link>
        <Link to="/consultationList">
          상담 기록
        </Link>
      </p>
    </div>
  );
}

export default Main;
