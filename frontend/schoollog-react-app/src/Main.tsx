import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './Main.css';

function Main() {
  return (
    <div>
      <Link to="/chat" className="Chatbot-btn-link">
        <button className="Chatbot-btn">
          챗봇과 채팅하러가기
        </button>
      </Link>
      <p>
        <Link to="/message" >
          <button>
            쪽지 페이지
          </button>
        </Link>
      </p>
      <p>
        <Link to="/detail" >
          <button>
            프로필 + 결과 페이지
          </button>
        </Link>
      </p>
      <p>
        <Link to="/test" >
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