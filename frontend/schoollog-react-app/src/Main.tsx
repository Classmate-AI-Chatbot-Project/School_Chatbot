import React, {useState} from 'react';
import './Main.css';
import TopBar from './component/TopBar/TopBar';
import SideBar from './component/SideBar.tsx/SideBar';
import { Link } from 'react-router-dom';

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='Full-box'>
      <div style={{justifyContent: 'flex-start'}}>
      <header className='Content-box'>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className='Border-line'></div>  
        <a>content</a>
        <Link to="/chat" className="Chatbot-btn-link">
          <button className="Chatbot-btn">
            챗봇과 채팅하러가기
          </button>
        </Link>
      </header>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </div> 
  );
}

export default Main;