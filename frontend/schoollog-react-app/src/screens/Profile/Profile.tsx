import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import { setLoggedIn } from "../../actions";
import { RootState } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import BorderLine from "../../component/BorderLine/BorderLine";
import dummyProfile from '../../assets/dummy-profile-img.png'
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";

function Profile() {
  const dummyNumber:Number = 7;
  const nickname = useSelector((state: RootState) => state.nickname);
  const email = useSelector((state: RootState) => state.email);

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn']);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redux 상태 업데이트
    dispatch(setLoggedIn(false));

    // 쿠키 삭제
    removeCookie('isLoggedIn');

    // 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <div className="Profile-fullbox">
      <div className="Profile-firstbox">
        <img src={dummyProfile}/>
        <div>
          <p>{nickname}</p>
          <p>{email}</p>
        </div>
      </div>
      <div className="Profile-secondbox">
        <div>
          <p>나의 우울도</p>
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
      <div className="Profile-forthbox">
        <div>
          <p onClick={handleLogout}>로그아웃</p>
        </div>
        {/* <BorderLine width={'360px'} height={'1px'}/> */}
        {/* <div>
          <ConsultResultItem/>
        </div> */}
      </div>
    </div>
  )
}

export default Profile;