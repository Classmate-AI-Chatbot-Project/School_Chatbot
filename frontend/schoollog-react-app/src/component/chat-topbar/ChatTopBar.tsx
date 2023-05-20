import React from 'react';
import './ChatTopBar.css'
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg'
import { useNavigate } from 'react-router-dom';


function ChatTopBar() {
  const navigate = useNavigate();
  const goBack = ()=> { //이전페이지로 이동
    navigate(-1)
  }

  return (
    <div className="chat-topnav" onClick={goBack}>
      <BackIcon/>
      <div className="person-icon">
        <PersonIcon/> nickname
      </div>
    </div>
  );
}

export default ChatTopBar;