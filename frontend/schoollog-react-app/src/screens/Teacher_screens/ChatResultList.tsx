import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ConsultationList.css";
import { ReactComponent as WarningIcon } from "../../assets/warning-icon.svg";
import BorderLine from "../../component/BorderLine/BorderLine";
import ChatResultItem from "./ChatResultItem";
import { API_BASE_URL } from '../config';

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
      .get(`${API_BASE_URL}/teacher/chatresult_list`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const listData = res.data.consult_result

        listData.sort((a: Result, b: Result) => {
          const dateA = new Date(a.result_time).getTime();
          const dateB = new Date(b.result_time).getTime();
          return dateB - dateA;
        });

        console.log(res.data.consult_result)
        setResultData(listData);
        console.log(resultData)
    });
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month.replace(/^0/, '')}월 ${day.replace(/^0/, '')}일`;
  }

  function ChatList() {
    return (
      <Fragment>
        {resultData?.map((result, index) => (
          <Fragment key={index}>
            <Link 
              className="ResultItem-link"            
              to={`/teacher/chat/result/${result.chat_id}`}>
              <ChatResultItem
                nickname={result.username}
                keywords={result.category}
                profile_photo={result.profile_photo}
                is_read={result.is_read}
                chat_id={result.chat_id}
                date={formatDate(result.result_time)}
                emotionTemp={result.emotion_temp}
              />
            </Link>
            <BorderLine width="100%" height="1px" />
          </Fragment>
        ))}
      </Fragment>
    );
  }

  return (
    <div className="Consultationlist-fullbox">
      <div className="Consultationlist-name">
        <p>챗봇 대화 분석 리스트</p>
      </div>
      <BorderLine width="100%" height="1px"/>
      <div className="Consultationlist-scrollable">
        <ChatList />
        <BorderLine width="100%" height="1px" />
      </div>
    </div>
  );
}

export default ChatResultList;
