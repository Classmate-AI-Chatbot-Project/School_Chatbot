import React from "react";
import "./Profile.css";
import BorderLine from "../../component/BorderLine/BorderLine";
import dummyProfile from '../../assets/dummy-profile-img.png'
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";

function Profile() {
  const dummyNumber:Number = 7;
  return (
    <div className="Profile-fullbox">
      <div className="Profile-firstbox">
        <img src={dummyProfile}/>
        <div>
          <p>딸기당근수박참외</p>
          <p>whekdms@naver.com</p>
        </div>
      </div>
      <div className="Profile-secondbox">
        <div>
          <p>나의 단어</p>
          <p>고구마 감자 옥수수</p>
        </div>
      </div>
      <div className="Profile-thirdbox">
        <div>
          <p>나의 상담 기록</p>
          <p>{dummyNumber.toString()}</p>
        </div>
        <BorderLine width={'360px'} height={'1px'}/>
        <div>
          <ConsultResultItem/>
        </div>
      </div>
    </div>
  )
}

export default Profile;