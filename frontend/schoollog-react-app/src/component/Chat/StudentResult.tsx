import React, { useState } from "react";
import "./StudentResult.css";
import TopBar from "../TopBar/TopBar";
import {formatDate, currentDate} from "./Chat"



function StudentResult() {  
   const [isOpen, setIsOpen] = useState(false);
   const [isChecked, setIsChecked] = useState(false);

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);
    };

  return (
    <div className='Chat-Full-box'>
      <header className='Chat-Content-box'>
         <TopBar setIsOpen={setIsOpen}/>
         <div className='Chat-Border-line'></div>
         <div className='S-Result-result'>
            <div className='S-Result-title'>
               {formatDate(currentDate)} 상담 결과
            </div>
            <div className='S-Result-content'>
               주제
            </div>
            <div className='S-Result-box'>
               <br />친구, 싸움, 다툼, 성적, 스트레스
            </div>
            
            <div className='S-Result-content'>
               감정
            </div>   
            <div className='S-Result-box'>
               <br />매우 슬픔
            </div>
            <div className='Result-summary'>
               <div><br /><br /><br />대화 내용 요약 <br />~ <br />~ <br />~ </div>
               
            </div>
            
            <div className='Result-Cekbox'>
               <input className='Result-Ceckbox-input'
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
               />
               <span className='Result-text'>상담을 하고싶어요.</span>
            </div>

            <div className='Result-send-btn'>
               <button className='Result-send-result'>상담 결과 전송하기</button>
            </div>

         </div>
      </header>
    </div>
  );
};

export default StudentResult;
