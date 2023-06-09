import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';

import './TopBar.css'
import { ReactComponent as HamburgerIcon } from '../../assets/top-bar-hamburger.svg'
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg'


function TopBar({ setIsOpen }: { setIsOpen: any }) {
  const toggleSide = () => {
    setIsOpen(true);
  };

  return (
    <div className="topnav">
      <HamburgerIcon role="button" onClick={toggleSide}/>
      <Link to='/'>
        <a style={{color: 'black'}}>Logo</a>
      </Link>
      <Link to='login'>
        <PersonIcon/>
      </Link>
    </div>
  );
}

export default TopBar;
