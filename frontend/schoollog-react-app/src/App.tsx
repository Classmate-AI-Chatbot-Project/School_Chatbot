import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css'
import TopBar from './component/TopBar/TopBar';
import SideBar from './component/SideBar.tsx/SideBar';
import BorderLine from './component/BorderLine/BorderLine';
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='App-fullbox'>
      <div className='App-contentbox'>
        <TopBar setIsOpen={setIsOpen}/>
        <BorderLine height={1} width={423}/>

        <Outlet/>

      </div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
}
export default App;