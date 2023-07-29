import React, {Fragment} from "react";
import "./ConsultationList.css"
import { ReactComponent as WarningIcon } from '../../assets/warning-icon.svg'
import BorderLine from "../../component/BorderLine/BorderLine";
import ListItem from "./ListItem";

function ConsultationList() {
  const mockChatData = [
    {
      id: 1,
      nickname: "사용자1",
      keywords: "리액트, 자바스크립트, 프론트엔드",
      date: "7월 20일",
      type: "red",
    },
    {
      id: 2,
      nickname: "사용자2",
      keywords: "노드.js, 익스프레스, 백엔드",
      date: "7월 21일",
      type: "yellow",
    },
    {
      id: 3,
      nickname: "사용자3",
      keywords: "HTML, CSS, 웹 디자인",
      date: "7월 22일",
      type: "green",
    },
    {
      id: 4,
      nickname: "사용자4",
      keywords: "리덕스, 상태 관리, 프론트엔드",
      date: "7월 23일",
      type: "red",
    },
    {
      id: 5,
      nickname: "사용자5",
      keywords: "Express.js, REST API, 백엔드",
      date: "7월 24일",
      type: "yellow",
    },
    {
      id: 6,
      nickname: "사용자6",
      keywords: "CSS Flexbox, 레이아웃 디자인, 프론트엔드",
      date: "7월 25일",
      type: "green",
    },
    {
      id: 7,
      nickname: "사용자7",
      keywords: "React Hooks, 컴포넌트 상태, 프론트엔드",
      date: "7월 26일",
      type: "red",
    },
    {
      id: 8,
      nickname: "사용자8",
      keywords: "JWT, 사용자 인증, 백엔드",
      date: "7월 27일",
      type: "yellow",
    },
    {
      id: 9,
      nickname: "사용자9",
      keywords: "CSS Grid, 레이아웃 시스템, 프론트엔드",
      date: "7월 28일",
      type: "green",
    },
    {
      id: 10,
      nickname: "사용자10",
      keywords: "Mongoose, MongoDB, 백엔드",
      date: "7월 29일",
      type: "red",
    },
  ];
  
  function ChatList() {
    return (
    <div>
      {/* Map through the mockChatData array and render ListItem components */}
      {mockChatData.map((chat, index) => (
        <Fragment key={chat.id}>
          <ListItem
            nickname={chat.nickname}
            keywords={chat.keywords}
            date={chat.date}
            type={chat.type}
          />
          {/* Render BorderLine except for the last ListItem */}
          {index !== mockChatData.length - 1 && (
            <BorderLine width="423px" height="1px" />
          )}
        </Fragment>
      ))}
    </div>
    );
  }
  
  return (
  <div className="Consultationlist-fullbox">
    <div className="Consultationlist-name">
      <p>상담 목록</p>
      <WarningIcon/>
    </div>
    <BorderLine width="423px" height="1px"/>
    <div className="Consultationlist-scrollable">
        {/* ChatList and BorderLine moved to the scrollable area */}
        <ChatList />
        <BorderLine width="423px" height="1px" />
      </div>
  </div>
  )
}

export default ConsultationList;