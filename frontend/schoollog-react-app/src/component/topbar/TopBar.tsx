import React, {useState} from 'react';
import './TopBar.css'
import SideBar from '../SideBar.tsx/SideBar';
import { ReactComponent as HamburgerIcon } from '../../assets/top-bar-hamburger.svg'
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg'


function TopBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const toggleSide = () => {
    setIsOpen(true);
  };

  return (
    <div className="topnav">
      <HamburgerIcon role="button" onClick={toggleSide}/>
      <a style={{color: 'black'}}>Logo</a>
      <PersonIcon/>

    </div>
  );
}

export default TopBar;
