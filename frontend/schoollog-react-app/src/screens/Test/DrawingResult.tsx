import React, { useState } from "react";
import "./DrawingResult.css"
import { Link } from 'react-router-dom';

function DrawingResult() {
  const [showTooltip, setShowTooltip] = useState(true);

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <div className="DR-main">
      <div className="DR-title" >테스트결과</div>
      <div className="DR-board" >img</div>
      <div className="DR-result">
        <div className="DR-resultContent">
          땅을 그리지 않고 나무만 덩그러니 그렸다면 불
          안정한 감정과 우울감이 숨어 있다고 볼 수 있
          어요. 안정적이지 않고 소속감이 없어 보이죠.
          가지는 사회와의 교류를 의미합니다. 잎은 무
          성한데 잎을 받쳐주는 가지가 별로 없다면 욕심
          은 많고 현실은 무시하는 경향이 있으며, 반대
          로 가지가 너무 많다면 사회관계가 불필요할 정
          도로 산만하고 정신없는 사람일 수 있습니다.
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
        <Link to="/chat">
        <button className="DR-endBtn">챗봇과 상담하기</button>
        </Link>
      </div>
    </div>
  );
}

export default DrawingResult;
