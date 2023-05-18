import React from 'react';
import './ChatTopBar.css'
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg'


function ChatTopBar() {
  return (
    <div className="chat-topnav">
      <BackIcon/>
      <div className="person-icon">
        <PersonIcon/> nickname
      </div>
      
    </div>
  );
}

export default ChatTopBar;