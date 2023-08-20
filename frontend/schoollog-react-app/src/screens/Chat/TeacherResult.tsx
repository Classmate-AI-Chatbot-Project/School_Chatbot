import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./TeacherResult.css"
import Result from "./Result";
import { Link } from 'react-router-dom';
import {ReactComponent as Back} from "../../assets/back.svg"
import dummyProfile from '../../assets/dummy-profile-img.png'
import BorderLine from '../../component/BorderLine/BorderLine';

function StudentResult() {  
  let emotion = "우울";

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  };

  return (
   <div className="TeacherResult">
      <div className="TR-dateBar">
        <Back onClick={handleGoBack} style={{cursor: "pointer"}}/>
        <div className="TR-date">
          2023.06.13
        </div>
      </div>
      <BorderLine width={'423px'} height={'1px'}/>
      <div className="TR-title">
        <img  className="TR-title-profile" src={dummyProfile} />
        <div className="TR-title-nickname">
          딸기당근수박
        </div>
        <div className={`TR-title-circle ${emotion === "행복" ? "happy" : emotion === "우울" ? "sad" : emotion === "평범" ? "normal" : ""}`}>
        </div>
        <div className="TR-title-keywords">
          친구, 쉬는 시간, 매점
        </div>
      </div>
      <Result />
   </div>
  );
};

export default StudentResult;
