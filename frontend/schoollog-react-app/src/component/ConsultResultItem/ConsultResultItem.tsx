import React from "react";
import './ConsultResultItem.css';
import { ReactComponent as RedFace } from '../../assets/face-red-icon.svg'
import { ReactComponent as YellowFace } from '../../assets/face-yellow-icon.svg'
import { ReactComponent as GreenFace } from '../../assets/face-green-icon.svg'


interface ResultItemProps {
  keywords: string;
  date: string;
  type: string;
}

function ConsultResultItem({keywords, date, type}: ResultItemProps) {
  return (
    <div className="ResultItem-fullbox">
      <div className="ResultItem-typebox">
      {type === 'red' && <RedFace />}
          {type === 'yellow' && <YellowFace />}
          {type === 'green' && <GreenFace />}
      </div>
      <div className="ResultItem-textbox">
        <p>{keywords}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default ConsultResultItem;