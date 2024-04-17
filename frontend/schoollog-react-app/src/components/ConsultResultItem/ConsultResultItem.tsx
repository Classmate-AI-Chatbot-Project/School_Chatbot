import React from "react";
import './ConsultResultItem.css';
import { ReactComponent as RedFace } from '../../assets/face-red-icon.svg'
import { ReactComponent as YellowFace } from '../../assets/face-yellow-icon.svg'
import { ReactComponent as GreenFace } from '../../assets/face-green-icon.svg'


interface ResultItemProps {
  keywords: string;
  date: string;
  emotionTemp: number;
}

function ConsultResultItem({keywords, date, emotionTemp}: ResultItemProps) {
  let emotionIcon = null;

  if (emotionTemp >= 0 && emotionTemp < 35) {
    emotionIcon = <GreenFace />;
  } else if (emotionTemp >= 35 && emotionTemp < 65) {
    emotionIcon = <YellowFace />;
  } else if (emotionTemp >= 65 && emotionTemp <= 100) {
    emotionIcon = <RedFace />;
  }
  return (
    <div className="ResultItem-fullbox">
      <div className="ResultItem-typebox">
        {emotionIcon}
      </div>
      <div className="ResultItem-textbox">
        <p>{keywords}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default ConsultResultItem;