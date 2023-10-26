import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Cookies } from "react-cookie";
import './TopBar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import { ReactComponent as HamburgerIcon } from '../../assets/top-bar-hamburger.svg';
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg';
import { ReactComponent as Logo } from '../../assets/main-logo.svg';
import RedIcon from '../../assets/red-alert-icon.webp';
import axios from 'axios';
import { API_BASE_URL } from '../../screens/config';

function TopBar({ setIsOpen, isFixed }: { setIsOpen: any, isFixed?: boolean }) {
  const cookies = new Cookies();
  const [userData, setUserData] = useState({ job: '' });
  const isLoggedIn = cookies.get("isLoggedIn");

  const toggleSide = () => {
    setIsOpen(true);
  };

  // const isRead = useSelector((state: RootState) => state.notifications.isRead);
  const [isUnread, setIsUnread] = useState(false);        // 안 읽은 메시지가 있는가?
  const [hasNewResult, setHasNewResult] = useState(false);  // 새로운 상담 결과가 있는가?

  // 로그인했을 때만 미확인 메시지 여부 is_unread 데이터 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      // axios.get('http://127.0.0.1:8000/consult/check_unread_messages/')
      axios.get(
        `${API_BASE_URL}:8000/consult/check_unread_messages/`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((response) => {
        const { is_unread, has_new_result } = response.data;
        setIsUnread(is_unread);   // 가져온 데이터를 상태에 저장
        setHasNewResult(has_new_result);

        console.log('TopBar is_unread: ', is_unread);
        console.log('TopBar has_new_result: ', has_new_result);
      })
      .catch((error) => {
        console.error('Error fetching is_unread:', error);
        console.error('Error fetching has_new_result:', error);
      });
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(
        `${API_BASE_URL}:8000/account/decode/`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((res: any) => {
        const data = res.data;
        setUserData({
          job: data.student.job === 0 ? 'Teacher' : 'Student',
        });
      });
    }
  }, [isLoggedIn]);  // isLoggedIn 상태가 변경될 때만 실행

  return (
    <div className={isFixed ? 'topnav-fixed' : 'topnav'}>
      {isLoggedIn && userData.job === "Student" ? (
        <div className='Topbar-hamburger-menu'>
          <HamburgerIcon role="button" onClick={toggleSide}/>
          {/* 학생: 새 메시지 알림만 icon 표시*/}
          {isUnread && 
            <img src={RedIcon} alt="New Message Alert Icon" />
          }
        </div>
      ): (
        <div className='Topbar-hamburger-menu'>
          <HamburgerIcon role="button" onClick={toggleSide}/>
          {/* 선생님: 새 메시지 or 새 챗봇 결과 있으면 알림 표시 */}
          {(isUnread || hasNewResult) && 
            <img src={RedIcon} alt="New Message Alert Icon" />
          }
        </div>
      )}
      <Link to='/' style={{alignItems: 'center',display: 'flex'}}>
        <Logo/>
      </Link>
      <Link to='login'>
        <PersonIcon/>
      </Link>
    </div>
  );
}

export default TopBar;
