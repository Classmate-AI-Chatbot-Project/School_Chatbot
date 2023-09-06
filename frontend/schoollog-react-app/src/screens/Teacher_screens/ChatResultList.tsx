import React, { Fragment, useState, useEffect } from "react";
import "./ConsultationList.css";
import { ReactComponent as WarningIcon } from "../../assets/warning-icon.svg";
import BorderLine from "../../component/BorderLine/BorderLine";
import ChatResultItem from "./ChatResultItem";
import axios from "axios";

interface Result {
    username: string;
    category: string;
    profile_photo: string;
    emotion_temp: number;
    chat_id: number;
    is_read: boolean;
    result_time: string;
  }

function ChatResultList() {
const [resultData, setResultData] = useState<Result[]>([]);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옴
    axios
      .get(`http://127.0.0.1:8000/teacher/chatresult_list`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // 학생 별명, 이미지, 상담 기록
        const ListData = res.data.consult_result
        setResultData(ListData); // 상담 결과 데이터를 상태에 저장
        console.log(resultData)
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  // 결과 데이터를 기반으로 ListItem 컴포넌트 출력
  function ChatList() {
    return (
      <div>
        {resultData?.map((result, index) => (
          <div key={index}>
            <ChatResultItem
              nickname={result.username}
              keywords={result.category}
              profile_photo={result.profile_photo}
              is_read={result.is_read}
              chat_id={result.chat_id}
              date={result.result_time}
              type={result.emotion_temp >= 50 ? "red" : "green"}
            />
            <BorderLine width="423px" height="1px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="Consultationlist-fullbox">
      <div className="Consultationlist-name">
        <p>상담 목록</p>
        <WarningIcon />
      </div>
      <BorderLine width="423px" height="1px" />
      <div className="Consultationlist-scrollable">
        {/* ChatList and BorderLine moved to the scrollable area */}
        <ChatList />
        <BorderLine width="423px" height="1px" />
      </div>
    </div>
  );
}

export default ChatResultList;
