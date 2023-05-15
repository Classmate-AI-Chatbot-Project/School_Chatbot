import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './component/TopBar/TopBar';

function App() {
  return (
    <div className='Full-box'>
      <header className='Content-box'>
        <TopBar/>
        <div className='Border-line'></div>  
        <a>content</a>
      </header>
    </div>
  );
}

export default App;
