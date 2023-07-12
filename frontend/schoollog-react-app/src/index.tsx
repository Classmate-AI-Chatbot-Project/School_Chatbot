import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Main from './Main';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import SignupInputInform from './screens/SignupInputInformation/SignupInputInform'
import Chat from './screens/Chat/Chat';
import Result from './screens/Chat/Result'
import StudentResult from './screens/Chat/StudentResult'
import Profile from './screens/Profile/Profile';
import Message from './screens/Message/Message';
import DrawingTest from './screens/Test/DrawingTest';
import KakaoRedirect from './screens/Login/KakaoRedirect';
import GoogleRedirect from './screens/Login/GoogleRedirect';
import NaverRedirect from './screens/Login/NaverRedirect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupInform" element={<SignupInputInform /> } />
        <Route path="/profile" element={<Profile/> } />
        <Route path="/googleLogin" element={<GoogleRedirect/>} />
        <Route path="/kakaoLogin" element={<KakaoRedirect/> }/>
        <Route path="/naverLogin" element={<NaverRedirect/> }/>
        <Route path="/test" element={<DrawingTest />} />
      </Route>
      <Route path="/chat" element={<Chat />} />
      <Route path="/detail" element={<Result />} />  
      <Route path="/student_result" element={<StudentResult />} />
      <Route path="/message" element={<Message />} />
      
    </Routes>
  </BrowserRouter>
);

/* 
/detail -> /teacher/detail/{student.member_id} 
/student_reult -> /chat/student/result/{chat_id}
/chat -> /chat/student/{chat_id}
*/
