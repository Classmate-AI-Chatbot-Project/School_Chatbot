import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import { ReactComponent as HamburgerIcon } from '../../assets/top-bar-hamburger.svg'
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg'
import { ReactComponent as Logo } from '../../assets/main-logo.svg'
import RedIcon from '../../assets/red-alert-icon.webp'

function TopBar({ setIsOpen, isFixed }: { setIsOpen: any, isFixed?: boolean }) {
  const toggleSide = () => {
    setIsOpen(true);
  };

  const isRead = useSelector((state: RootState) => state.notifications.isRead);

  return (
    <div className={isFixed ? 'topnav-fixed' : 'topnav'}>
      <div className='Topbar-hamburger-menu'>
        <HamburgerIcon role="button" onClick={toggleSide}/>
        {isRead && 
          <img src={RedIcon} />
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
