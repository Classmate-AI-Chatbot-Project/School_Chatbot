import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
  const [chatCounter, setChatCounter] = useState(1);
  const student_id = "soohyun";

  const handleChatButtonClick = () => {
    const i = chatCounter.toString();
    const newChatCounter = chatCounter + 1;
    setChatCounter(newChatCounter);
  };

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
      </p>
      <Link to="/consultationList">
          상담 기록
        </Link>
        <Link to="/studentList">
          상담 학생 리스트
        </Link>
    </div>
  );
}

export default Main;
