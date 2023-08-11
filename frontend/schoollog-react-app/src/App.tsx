import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css'
import TopBar from './component/topbar/TopBar';
import SideBar from './component/SideBar.tsx/SideBar';
import BorderLine from './component/BorderLine/BorderLine';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Provider store={store}>
    <div className='App-fullbox'>
      <div>
        <div className='App-contentbox'>
          <TopBar setIsOpen={setIsOpen}/>
          <BorderLine height={'1px'} width={'423px'}/>

          <Outlet/>

        </div>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </div>
    </Provider>
  );
}
export default App;