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
    </div> 
  );
}

export default Main;