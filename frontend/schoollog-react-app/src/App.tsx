import React, {useState} from 'react';
import './App.css';
import TopBar from './component/TopBar/TopBar';
import SideBar from './component/SideBar.tsx/SideBar';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='Full-box'>
      <div style={{justifyContent: 'flex-start'}}>
      <header className='Content-box'>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className='Border-line'></div>  
        <a>content</a>
      </header>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </div>
  );
}

export default App;
