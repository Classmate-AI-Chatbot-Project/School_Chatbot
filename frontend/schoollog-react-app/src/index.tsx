import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import Main from './Main';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import SignupInputInform from './screens/SignupInputInformation/SignupInputInform'
import Chat from './component/Chat/Chat';
import Result from './component/Chat/Result'
import StudentResult from './component/Chat/StudentResult'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/main" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupInform" element={<SignupInputInform /> } />
        
      </Route>
      <Route path="/chat" element={<Chat />} />
      <Route path="/detail" element={<Result />} />  
      <Route path="/student_result" element={<StudentResult />} />
    </Routes>
  </BrowserRouter>
);

/* 
/detail -> /teacher/detail/{student.member_id} 
/student_reult -> /chat/student/result/{chat_id}
/chat -> /chat/student/{chat_id}
*/
