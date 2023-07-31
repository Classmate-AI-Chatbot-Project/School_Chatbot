import React, { useState } from "react";
import "./StudentResult.css"
import Result from "./Result";
import { Link } from 'react-router-dom';

function StudentResult() {  
   const [showTooltip, setShowTooltip] = useState(true);

   const closeTooltip = () => {
     setShowTooltip(false);
   };

  return (
   <div>
      <div className="TR-title">

      </div>
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
        <button className="SR-endBtn">상담 신청하기</button>
        </Link>
      </div>
   </div>
  );
};

export default StudentResult;
