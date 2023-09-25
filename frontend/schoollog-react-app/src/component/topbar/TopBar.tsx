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

function TopBar({ setIsOpen, isFixed }: { setIsOpen: any, isFixed?: boolean }) {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("isLoggedIn");

  const toggleSide = () => {
    setIsOpen(true);
  };

  // const isRead = useSelector((state: RootState) => state.notifications.isRead);
  const [isUnread, setIsUnread] = useState(false); // isUnread 상태를 useState로 관리

  // 로그인했을 때만 미확인 메시지 여부 is_unread 데이터 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      // axios.get('http://127.0.0.1:8000/consult/check_unread_messages/')
      axios.get(
        `http://127.0.0.1:8000/consult/check_unread_messages/`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      ).then((response) => {
        const { is_unread } = response.data;
        setIsUnread(is_unread); // 가져온 데이터를 상태에 저장
        console.log('미확인 메시지가 있는가 is_unread: ', is_unread);
      })
      .catch((error) => {
        console.error('Error fetching is_unread:', error);
      });
    }
  });

  return (
    <div className={isFixed ? 'topnav-fixed' : 'topnav'}>
      <div className='Topbar-hamburger-menu'>
        <HamburgerIcon role="button" onClick={toggleSide}/>
        {/* isUnread = True면 미확인 새 메시지 알림 아이콘 표시 */}
        {isUnread && 
          <img src={RedIcon} alt="New Message Alert Icon" />
        }
      </div>
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
