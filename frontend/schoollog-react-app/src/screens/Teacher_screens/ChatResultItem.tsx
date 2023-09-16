import React, {useState} from "react";
import "./ListItem.css"
import { ReactComponent as ProfileIcon } from '../../assets/profile-icon.svg'
import { ReactComponent as RedFlag } from '../../assets/flag-red-icon.svg'
import { ReactComponent as YellowFlag } from '../../assets/flag-yellow-icon.svg'
import { ReactComponent as GreenFlag } from '../../assets/flag-green-icon.svg'
import { ReactComponent as NewIcon } from '../../assets/alert-new-icon.svg'

interface ListItemProps {
  nickname: string;
  keywords: string;
  profile_photo: string;
  is_read: boolean;
  chat_id: number;
  date: string;
  emotionTemp: number;
}

function ChatResultItem({nickname, keywords, profile_photo, is_read, chat_id, date, emotionTemp}: ListItemProps) {
  let flagIcon = null;

  if (emotionTemp >= 0 && emotionTemp < 35) {
    flagIcon = <GreenFlag />;
  } else if (emotionTemp >= 35 && emotionTemp < 65) {
    flagIcon = <YellowFlag />;
  } else if (emotionTemp >= 65 && emotionTemp <= 100) {
    flagIcon = <RedFlag />;
  }

  return (
  <div className="ListItem-fullbox">
    <div className="ListItem-content">
      <div className="ListItem-firstbox">
        <img src={`http://127.0.0.1:8000${profile_photo}`}/> 
      </div>
      <div className="ListItem-secondbox">
        <div className="ListItem-text-first">
          <p>{nickname}</p>
        </div>
        <div className="ListItem-text-second">
          <div>
            {flagIcon}
          </div>
          <p>{keywords}</p>
        </div> 
      </div>
    </div>
    <div className="ListItem-addition">
      <div className="ListItem-addition-date">
        {date}
      </div>
        {!is_read && (
          <div>
            <NewIcon />
          </div>
        )}
    </div>
  </div>
  )
}

export default ChatResultItem;