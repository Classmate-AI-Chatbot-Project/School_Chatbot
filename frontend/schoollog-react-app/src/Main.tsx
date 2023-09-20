import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './reducers/store'
import './Main.css';
import Home from './screens/Home/Home';

function Main() {
  const navigate = useNavigate();

  const [chatCounter, setChatCounter] = useState(1);
  const student_id = "soohyun";

  const handleChatButtonClick = () => {
    const i = chatCounter.toString();
    const newChatCounter = chatCounter + 1;
    setChatCounter(newChatCounter);
  };

  return (
    <div
    style={{
      display: 'flex',
      width: '100%'
    }}>
      <Home />
    </div>
  );
}

export default Main;
