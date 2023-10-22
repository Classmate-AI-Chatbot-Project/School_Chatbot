import React from "react";
import "./StudentItem.css"
import { API_BASE_URL } from '../config';

export interface Student {
  username: string;
  email?: string;
  profile_photo: string;
  avg_emotion: number;
}

function StudentItem({username, profile_photo, avg_emotion}: Student) {
  return (
  <div className="StudentListItem-fullbox">
    <div className="StudentListItem-content">
      <div className="StudentListItem-firstbox">
        <img src={`${API_BASE_URL}:8000${profile_photo}`}/> 
      </div>
      <div className="StudentListItem-secondbox">
        <p>{username}</p>
        <p>{avg_emotion}%</p>
      </div>
    </div>
  </div>
  )
}

export default StudentItem;