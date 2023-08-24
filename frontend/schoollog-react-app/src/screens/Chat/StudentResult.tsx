import React, { useState, useEffect } from "react";
import "./StudentResult.css"
import axios from "axios";
import Result from "./Result";
import { Cookies, useCookies } from "react-cookie";
import { Link, useParams, useLocation } from 'react-router-dom';

function StudentResult() {  
   const [showTooltip, setShowTooltip] = useState(true);
   const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const { user_id, chatroom_id } = useParams();
  const location = useLocation();
  const responseData = location.state;

  console.log(responseData)

   const closeTooltip = () => {
     setShowTooltip(false);
   };

   const postResult = () => {
    axios.post(
      `http://127.0.0.1:8000/chat/result/${user_id}/${chatroom_id}/`,
      responseData, // 전송할 데이터
      {
          headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken, // CSRF 토큰을 적절하게 가져와서 헤더에 추가
          },
          withCredentials: true,
      }
  )
    .then((res: any) => {
        console.log(res)
      })
    }

  return (
   <div>
      <Result />
      <div className="SR-end">
        {showTooltip && (
          <div className="SR-tooltip">
            <span className="SR-tooltipContent">
              상담 결과를 전송해 선생님과 상담을 할 수 있어요.
            </span>
            <button className="SR-closeBtn" onClick={closeTooltip}>✖</button>
          </div>
        )}
        <Link to="/message">
        <button className="SR-endBtn" onClick={postResult}>상담 신청하기</button>
        </Link>
      </div>
   </div>

  );
};

export default StudentResult;
