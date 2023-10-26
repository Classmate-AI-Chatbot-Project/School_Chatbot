import React, {useState} from "react";
import "./ListItem.css"
import { ReactComponent as ProfileIcon } from '../../assets/profile-icon.svg'
import { ReactComponent as RedFlag } from '../../assets/flag-red-icon.svg'
import { ReactComponent as YellowFlag } from '../../assets/flag-yellow-icon.svg'
import { ReactComponent as GreenFlag } from '../../assets/flag-green-icon.svg'
import { ReactComponent as NewIcon } from '../../assets/alert-new-icon.svg'
import { API_BASE_URL } from '../config';

interface ListItemProps {
  student_id: number;
  room_id: number;
  nickname: string;
  latestMessageContent: string;
  profilePhoto: string;
  isRead: boolean;
  date: string;
  emotionTemp: number;
}

function ListItem({student_id, room_id, nickname, latestMessageContent, profilePhoto, isRead, date, emotionTemp}: ListItemProps) {
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
        <img src={`${API_BASE_URL}:8000${profilePhoto}`}/>
      </div>
      <div className="ListItem-secondbox">
        <div className="ListItem-text-first">
          <p>{nickname}</p>
        </div>
        <div className="ListItem-text-second">
          <div>
            {flagIcon}
          </div>
          <p>{latestMessageContent}</p>
        </div> 
      </div>
    </div>
    <div className="ListItem-addition">
      <div className="ListItem-addition-date">
        {date}
      </div>
      {!isRead && (
        <div>
          <NewIcon />
        </div>
      )}
    </div>
  </div>
  )
}

export default ListItem;