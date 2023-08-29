import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Main from './Main';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import SignupInputInformStudent from './screens/SignupInputInformation/SignupInputInform'
import SignupInputInformTeacher from './screens/SignupInputInformation/SignupInputInformTeacher'
import ConsultaionList from './screens/Teacher_screens/ConsultationList'
import ConsultationAll from './screens/Teacher_screens/ConsultationAll';
import Chat from './screens/Chat/Chat';
import Result from './screens/Chat/Result'
import StudentResult from './screens/Chat/StudentResult'
import TeacherResult from './screens/Chat/TeacherResult'
import Profile from './screens/Profile/Profile';
import Message from './screens/Message/Message';
import DrawingBegin from './screens/Test/DrawingBegin';
import DrawingTest from './screens/Test/DrawingTest';
import DrawingResult from './screens/Test/DrawingResult';
import KakaoRedirect from './screens/Login/KakaoRedirect';
import GoogleRedirect from './screens/Login/GoogleRedirect';
import NaverRedirect from './screens/Login/NaverRedirect';
import StudentList from './screens/Teacher_screens/StudentList';
import StudentProfile from './screens/Teacher_screens/StudentProfile';
import SignupType from './screens/SignupType/SignupType';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupInform1" element={<SignupInputInformStudent /> } />
        <Route path="/signupInform2" element={<SignupInputInformTeacher /> } />
        <Route path="/signupType" element={<SignupType />} />
        <Route path="/signupInform" element={<SignupInputInformStudent /> } />
        <Route path="/profile" element={<Profile/> } />
        <Route path="/test0" element={<DrawingBegin />} />
        <Route path="/test" element={<DrawingTest />} />
        <Route path="/consultationList" element={<ConsultaionList/>} />
        <Route path="/testResult" element={<DrawingResult/>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:user_id/:chatroom_id" element={<Chat />} />
        <Route path="/detail" element={<Result />} />  
        <Route path="/chat/result/:student_id/:chatroom_id" element={<StudentResult />} />
        <Route path="/teacher/chat/result/:chatroom_id" element={<TeacherResult />} />
        <Route path="/message" element={<Message />} />
        <Route path="/teacher/studentlist" element={<StudentList/>} />


        <Route path="/account/naver/callback" element={<NaverRedirect/> }/>
        <Route path="/account/google/callback/" element={<GoogleRedirect/>} />
        <Route path="/account/kakao/callback/" element={<KakaoRedirect/>}></Route>
        <Route path="/teacher/detail/:user_id" element={<StudentProfile/>} />
      </Route>
      <Route path="/teacher/detail/consultlist/:user_id" element={<ConsultationAll/>} />
      
      
    </Routes>
  </BrowserRouter>
);
