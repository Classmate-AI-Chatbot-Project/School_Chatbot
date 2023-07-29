import React, {useState} from "react";
import "./StudentItem.css"
import { ReactComponent as ProfileIcon } from '../../assets/profile-icon.svg'

interface StudentItemProps {
  nickname: string;
  degree: string;
}

function StudentItem({nickname, degree}: StudentItemProps) {
  return (
  <div className="StudentListItem-fullbox">
    <div className="StudentListItem-content">
      <div className="StudentListItem-firstbox">
        <ProfileIcon/>
      </div>
      <div className="StudentListItem-secondbox">
        <p>{nickname}</p>
        <p>{degree}</p>
      </div>
    </div>
  </div>
  )
}

export default StudentItem;