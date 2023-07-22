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
  date: string;
  type: string;
}

function ListItem({nickname, keywords, date, type}: ListItemProps) {

  return (
  <div className="ListItem-fullbox">
    <div className="ListItem-content">
      <div className="ListItem-firstbox">
        <ProfileIcon/>
      </div>
      <div className="ListItem-secondbox">
        <div className="ListItem-text-first">
          <p>{nickname}</p>
        </div>
        <div className="ListItem-text-second">
          {type === 'red' && <RedFlag />}
          {type === 'yellow' && <YellowFlag />}
          {type === 'green' && <GreenFlag />}
          <p>{keywords}</p>
        </div> 
      </div>
    </div>
    <div className="ListItem-addition">
      <div className="ListItem-addition-date">
        {date}
      </div>
      <div>
        <NewIcon/>
      </div>
    </div>
  </div>
  )
}

export default ListItem;