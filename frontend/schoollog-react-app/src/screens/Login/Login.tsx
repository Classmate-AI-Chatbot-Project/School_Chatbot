import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { actionCreators as userActions } from "../Redux/Moduels/"
import './Login.css'
import GoogleAuthLogin from "./GoogleLogin";
import Naver from "./NaverLogin";

function Login() {
    const CLIENT_ID = "285aaedc61a36463815654c776b8d225";
    const REDIRECT_URI = "http://localhost:3000/auth";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
  return(
    <div className="Login-FullBox">
      <Link to='/signup'>LOGIN</Link>
      <Link to='/profile'>PROFILE</Link>
      <a
        href={KAKAO_AUTH_URL}>
        카카오 로그인 테스트
      </a>
    <GoogleAuthLogin />
    <Naver/>
    </div>
  )
}

export default Login;