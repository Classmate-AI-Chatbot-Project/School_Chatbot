import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Main from './Main';
import Login from './screens/Login/Login';
import ProfileDetail from './screens/Profile/ProfileDetail';
import SignupInputInformStudent from './screens/SignupInputInformation/SignupInputInformStudent'
import SignupInputInformTeacher from './screens/SignupInputInformation/SignupInputInformTeacher'
import ConsultationList from './screens/Teacher_screens/ConsultationList'
import ConsultationAll from './screens/Teacher_screens/ConsultationAll';
import Chat from './screens/Chat/Chat';
import ChatHistory from './screens/Chat/ChatHistory';
import ChatResult from './screens/Chat/ChatResult'
import StudentResult from './screens/Chat/StudentResult'
import TeacherResult from './screens/Chat/TeacherResult'
import Profile from './screens/Profile/Profile';
import ProfileEdit from './screens/Profile/ProfileEdit';
import StudentConsult from './screens/Consult/StudentConsult';
import ChatResultList from './screens/Teacher_screens/ChatResultList'
import DrawingBegin from './screens/Test/DrawingBegin';
import DrawingTest from './screens/Test/DrawingTest';
import DrawingResult from './screens/Test/DrawingResult';
import KakaoRedirect from './screens/Login/KakaoRedirect';
import GoogleRedirect from './screens/Login/GoogleRedirect';
import NaverRedirect from './screens/Login/NaverRedirect';
import StudentList from './screens/Teacher_screens/StudentList';
import StudentProfile from './screens/Teacher_screens/StudentProfile';
import SignupType from './screens/SignupType/SignupType';
import InitialConsult from './screens/Consult/InitialConsult';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupType" element={<SignupType />} />
        <Route path="/signupInform/student" element={<SignupInputInformStudent /> } />
        <Route path="/signupInform/teacher" element={<SignupInputInformTeacher /> } />
        <Route path="/profile" element={<Profile/> } />
        <Route path="/profile/edit/:user_id" element={<ProfileEdit/> } />
        <Route path="/profile/consultlist" element={<ProfileDetail/> } />
        <Route path="/test0" element={<DrawingBegin />} />
        <Route path="/test" element={<DrawingTest />} />
        <Route path="/consultationList" element={<ConsultationList/>} />
        <Route path="/teacher/chatResultList" element={<ChatResultList/>} />
        <Route path="/testResult" element={<DrawingResult/>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:user_id/:chatroom_id" element={<Chat />} />
        <Route path="/chat/result/:user_id/:chatroom_id" element={<ChatResult />} />
        <Route path="/consult/room/:room_name/student/:student_id/" element={<StudentConsult />} />
        <Route path="/consult/" element={<StudentConsult />} />
        <Route path="/initial/consult/" element={<InitialConsult />} />
        <Route path="/teacher/studentlist" element={<StudentList/>} />
        <Route path="/teacher/detail/consultlist/:user_id" element={<ConsultationAll/>} />

        <Route path="/account/naver/callback" element={<NaverRedirect/> }/>
        <Route path="/account/google/callback/" element={<GoogleRedirect/>}/>
        <Route path="/account/kakao/callback/" element={<KakaoRedirect/>}/>
        <Route path="/teacher/detail/:user_id" element={<StudentProfile/>} />
      </Route>
      <Route path="/teacher/detail/consultlist/:user_id" element={<ConsultationAll/>} />
      <Route path="/chat/history/:chatroom_id" element={<ChatHistory />} />
      <Route path="/chat/history/:user_id/:chatroom_id" element={<ChatHistory />} />
      <Route path="/teacher/chat/result/:chatroom_id" element={<TeacherResult />} />
      <Route path="/student/chat/result/:chatroom_id" element={<StudentResult />} />
      
    </Routes>
  </BrowserRouter>
);
