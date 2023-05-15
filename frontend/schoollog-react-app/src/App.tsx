import React from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
=======
import TopBar from './component/TopBar/TopBar';

function App() {
  return (
    <div className='Full-box'>
      <header className='Content-box'>
        <TopBar/>
        <div className='Border-line'></div>  
        <a>content</a>
>>>>>>> Stashed changes
      </header>
    </div>
  );
}

export default App;
