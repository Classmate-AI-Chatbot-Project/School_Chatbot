import React, { useState } from "react";
import "./StudentResult.css";
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

            <div className='S-Result-content'>
               총정리
            </div>   
            <div className='S-Result-box2'>
               <br />오늘 매점에서 친구랑 다투는 바람에 속이 많이 상해요. 
               먼저 화해 요청을 하고 싶은데, 자존심도 상하고 말이 잘 안나와요. 
               친구 문제가 연달아 함께 일어나서 마음이 복잡해졌어요.
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
