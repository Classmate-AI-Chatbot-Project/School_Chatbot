import React, { useState } from "react";
import "./Result.css";
import { ReactComponent as BeforeIcon } from '../../assets/result-before.svg'
import { ReactComponent as AfterIcon } from '../../assets/result-after.svg'
import TopBar from "../TopBar/TopBar";
import {formatDate, currentDate} from "./Chat"



function Result() {  
   const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='Chat-Full-box'>
      <header className='Chat-Content-box'>
         <TopBar setIsOpen={setIsOpen}/>
         <div className='Chat-Border-line'></div>
         <div className='Result-Date'>
            <BeforeIcon style={{ marginRight: "45px" }} />   
            {formatDate(currentDate)}
               <AfterIcon style={{ marginLeft: "45px" }} />
         </div>
         <div className='Result-result'>
            <div className='Result-Border-line' />
            <div className='Result-Profile'>
               <div className='Result-MyProfile' />
               <div className='Result-Nickname'> nickname </div>
            </div>
            <div className='Result-Border-line' />
         
            <div className='Result-content'>
               주제  
            </div>
            <div className='Result-box'>
               친구, 싸움, 다툼, 성적, 스트레스
            </div>

            <div className='Result-content'>
               감정
            </div>
            <div className='Result-box'>
               매우 슬픔
            </div>

            <div className='Result-center'>
               <button className='Result-send-result'>상담 권유하기</button>
            </div>
         </div>

      </header>
    </div>
  );
};

export default Result;
