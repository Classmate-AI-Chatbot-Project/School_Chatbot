import React from 'react';

import './TopBar.css'
import { ReactComponent as HamburgerIcon } from '../../assets/top-bar-hamburger.svg'
import { ReactComponent as PersonIcon } from '../../assets/top-bar-person.svg'


function TopBar() {
  return (
    <div className="topnav">
      <HamburgerIcon/>
      <a href="#home"
      style={{color: 'black'}}>Logo</a>
      <PersonIcon/>
    </div>
  );
}

export default TopBar;
