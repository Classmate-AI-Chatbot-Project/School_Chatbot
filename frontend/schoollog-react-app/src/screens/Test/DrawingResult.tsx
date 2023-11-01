import React, { useState, useEffect } from "react";
import "./DrawingResult.css"
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function DrawingResult() {
  const [showTooltip, setShowTooltip] = useState(true);
  const location = useLocation();
  const Data = location.state.data;
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const isLoggedIn = cookies.get("isLoggedIn");
  const navigate = useNavigate();
  console.log(Data)
  
  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const gotoChat = () => {
    if (!isLoggedIn) { // 로그인 안되어 있는 경우
      navigate('/login');
    } else { 
      axios.post(`${API_BASE_URL}:8000/chat/create/`, null, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }).then((response) => {
          const chatroom_id = response.data.chatroom_url; 
          navigate(`${chatroom_id}`); 
        })
        .catch((error) => {
          console.error('Error creating ChatRoom:', error);
        });
    }
  };

  return (
    <div className="DR-main">
      <div className="DR-title" >테스트결과</div>
      <div className="DR-board" >
        <img src={Data.image}/>
      </div>
      <div className="DR-result">
        <div className="DR-resultContent">
          <p className="RV-start">나무는 생명의 상징인 동시에 <br/> 자아를 발견하는 과정을 나타내요. <br/><br/> 나무 그림을 통해 당신의 내면을 <br/> 탐색하는 시간을 가져볼까요?</p>
          <br/>
          <p className="RV-detail">가지는 자아 정체감을 상징해요.</p>
          <p>{Data.branch}</p>
          <br/>
          <p className="RV-detail">꽃은 아름다움과 새로운 시작을 상징해요.</p>
          <p>{Data.flower}</p>
          <br/>
          <p className="RV-detail">열매의 개수가 많을수록 <br/>스트레스도가 높다고 해요.</p>
          <p>{Data.fruit}</p>
          <br/>
          <p className="RV-detail">잎은 감수성을 상징해요.</p>
          <p>{Data.leaf}</p>
          <br/>
          <p className="RV-detail">뿌리는 현실을 지배하는 자신의 능력에 대한 인지를 나타내요.</p>
          <p>{Data.root}</p>
          <br/><br/>
          <p className="RV-start">결과 분석은 여기까지예요! <br/>이 테스트 결과는 참고용일 뿐이며, 실제 자신의 상태와는 다를 수 있어요. <br/><br/> 만약 자신의 상태에 대해 궁금한 점이 <br/> 있으면 전문가와 상담하는 것이 좋아요. <br/><br/> 챗봇과 대화를 통해 자신의 감정을 표현하고, 자신을 더 알아보는 시간을 가져보는 건 어떨까요?</p>

        </div>
      </div>
      <div className="DR-end">
        {showTooltip && (
          <div className="DR-tooltip">
            <span className="DR-tooltipContent">
              챗봇과 대화하면 더 자세한 상담이 가능해요.
            </span>
            <button className="DR-closeBtn" onClick={closeTooltip}>✖</button>
          </div>
        )}
        <button className="DR-endBtn" onClick={gotoChat}>챗봇과 상담하기</button>
      </div>
    </div>
  );
}

export default DrawingResult;
