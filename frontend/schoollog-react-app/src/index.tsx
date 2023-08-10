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
import Profile from './screens/Profile/Profile';
import Message from './screens/Message/Message';
import DrawingTest from './screens/Test/DrawingTest';
import DrawingResult from './screens/Test/DrawingResult';
import KakaoRedirect from './screens/Login/KakaoRedirect';
import GoogleRedirect from './screens/Login/GoogleRedirect';
import NaverRedirect from './screens/Login/NaverRedirect';
import StudentList from './screens/Teacher_screens/StudentList';


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
        <Route path="/signupInform1" element={<SignupInputInformStudent /> } />
        <Route path="/signupInform2" element={<SignupInputInformTeacher /> } />
        <Route path="/profile" element={<Profile/> } />
        <Route path="/googleLogin" element={<GoogleRedirect/>} />
        <Route path="/kakaoLogin" element={<KakaoRedirect/> }/>
        <Route path="/naverLogin" element={<NaverRedirect/> }/>
        <Route path="/test" element={<DrawingTest />} />
        <Route path="/consultationList" element={<ConsultaionList/>} />
        <Route path="/testResult" element={<DrawingResult imageUrl="path/to/image.png" />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:student_id/:i" element={<Chat />} />
        <Route path="/detail" element={<Result />} />  
        <Route path="/student_result" element={<StudentResult />} />
        <Route path="/message" element={<Message />} />
        <Route path="/studentList" element={<StudentList/>} />
        <Route path="/account/kakao/callback/" element={<KakaoRedirect/>}></Route>
      </Route>
      <Route path="/consultations" element={<ConsultationAll/>} />
      
      
    </Routes>
  </BrowserRouter>
);
