import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css'
import TopBar from './component/TopBar/TopBar';
import SideBar from './component/SideBar.tsx/SideBar';
import BorderLine from './component/BorderLine/BorderLine';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation(); // 현재 경로 정보를 가져옵니다.

  // 특정 경로에 대한 판단을 여기에서 할 수 있습니다.
  const isSpecificRoute = location.pathname === '/';

  return (
    <Provider store={store}>
    <div className='App-fullbox'>
      <div>
        <div className='App-contentbox'>
            {isSpecificRoute && 
            <TopBar
              isFixed={true}
              setIsOpen={setIsOpen} 
              />}
            {!isSpecificRoute && <TopBar setIsOpen={setIsOpen} /> }
            <BorderLine height={'1px'} width={'100dvw'}/>

          <Outlet/>

        </div>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </div>
    </Provider>
  );
}
export default App;